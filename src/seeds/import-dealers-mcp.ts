import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { NEPAL_GEO, type Province } from '../utilities/nepalGeo'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MCP_ENDPOINT = 'https://reliancepaintsnepal.com/api/mcp'
const MCP_TOKEN = '71365731-c107-4d55-b9b1-edaf48e7813b'

// Canonical district to standard province map
const districtToProvince: Record<string, Province> = {}
for (const [prov, dists] of Object.entries(NEPAL_GEO)) {
  for (const d of dists) {
    districtToProvince[d.toLowerCase()] = prov as Province
  }
}

// Special district aliases or typos in CSV data
const districtAliases: Record<string, string> = {
  'nawalparasi west': 'Parasi',
  'sindhupalchowk': 'Sindhupalchok',
  'bapatari': 'Saptari',
  'parasi': 'Parasi',
}

const areaToProvince: Record<string, Province> = {
  'PROVISION-1': 'Koshi',
  'PROVISION-2': 'Madhesh',
  'PROVISION-3': 'Bagmati',
  'PROVISION-4': 'Gandaki',
  'PROVISION-5': 'Lumbini',
  'PROVISION-6': 'Karnali',
  'PROVISION-7': 'Sudurpashchim',
}

function parseCSV(text: string): string[][] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  const rows: string[][] = []
  const startIdx = lines[0].toLowerCase().includes('dealer address details') ? 1 : 0

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const row: string[] = []
    let inQuotes = false
    let token = ''
    for (let j = 0; j < line.length; j++) {
      const c = line[j]
      if (c === '"') {
        inQuotes = !inQuotes
      } else if (c === ',' && !inQuotes) {
        row.push(token.trim().replace(/^"|"$/g, ''))
        token = ''
      } else {
        token += c
      }
    }
    row.push(token.trim().replace(/^"|"$/g, ''))
    rows.push(row)
  }
  return rows
}

async function callMcpTool(name: string, args: Record<string, any>, id = 1): Promise<any> {
  const res = await fetch(MCP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      Authorization: `Bearer ${MCP_TOKEN}`,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id,
      method: 'tools/call',
      params: {
        name,
        arguments: args,
      },
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`MCP call failed with HTTP ${res.status}: ${errText}`)
  }

  const rawText = await res.text()
  // Parse event-stream format
  const match = rawText.match(/data:\s*(\{.*\})/s)
  if (match && match[1]) {
    try {
      const json = JSON.parse(match[1])
      return json
    } catch {
      // Fallback
    }
  }
  return JSON.parse(rawText)
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function importDealersViaMcp() {
  console.log('🚀 Starting Remote MCP Dealer Import to Reliance Paints CMS...')

  const csvPath = path.resolve(
    process.cwd(),
    'Dealer address data for Websites - Machine Report Data(ALL).csv'
  )

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found at ${csvPath}`)
    process.exit(1)
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const rows = parseCSV(csvContent)
  const dataRows = rows.slice(1) // skip headers

  console.log(`📄 Found ${dataRows.length} dealer records in CSV.`)

  // Step 1: Fetch all existing stores from remote CMS to avoid duplicate creation
  console.log('🔍 Fetching existing stores from remote MCP...')
  const existingMap = new Map<string, any>()

  try {
    let page = 1
    let hasMore = true
    while (hasMore) {
      const response = await callMcpTool('findStores', { limit: 100, page })
      const textContent = response?.result?.content?.[0]?.text || ''
      
      // Extract JSON blocks from response text
      const jsonBlocks = textContent.match(/```json\n([\s\S]*?)\n```/g) || []
      if (jsonBlocks.length === 0) {
        hasMore = false
        break
      }

      for (const block of jsonBlocks) {
        const jsonStr = block.replace(/```json\n|\n```/g, '').trim()
        try {
          const doc = JSON.parse(jsonStr)
          if (doc.storeName) {
            existingMap.set(doc.storeName.toLowerCase().trim(), doc)
          }
        } catch {
          // ignore
        }
      }

      if (jsonBlocks.length < 100) {
        hasMore = false
      } else {
        page++
      }
    }
    console.log(`📊 Found ${existingMap.size} existing unique stores on remote CMS.`)
  } catch (err: any) {
    console.warn(`⚠️ Could not fetch all existing stores: ${err.message}. Proceeding with caution.`)
  }

  let createdCount = 0
  let updatedCount = 0
  let errorCount = 0

  for (let idx = 0; idx < dataRows.length; idx++) {
    const [sn, area, rawName, rawAddress, rawDistrict, rawContact] = dataRows[idx]

    const storeName = (rawName || '').trim().replace(/\s+/g, ' ')
    if (!storeName) {
      continue
    }

    const cleanArea = (area || '').trim()
    const address = (rawAddress || '').trim().replace(/\s+/g, ' ')

    // Resolve canonical district name
    let district = (rawDistrict || '').trim()
    const districtKey = district.toLowerCase()
    if (districtAliases[districtKey]) {
      district = districtAliases[districtKey]
    } else {
      for (const [, dists] of Object.entries(NEPAL_GEO)) {
        const found = dists.find((d) => d.toLowerCase() === districtKey)
        if (found) {
          district = found
          break
        }
      }
    }

    // Resolve standard province
    let province: Province = districtToProvince[district.toLowerCase()]
    if (!province) {
      province = areaToProvince[cleanArea] || 'Bagmati'
    }

    // Clean phone number
    let phone = (rawContact || '').trim()
    if (phone.toLowerCase() === 'no data') {
      phone = ''
    }

    // Google Maps Search URL
    const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
      `${storeName}, ${address}, ${district}, Nepal`
    )}`

    const storePayload = {
      storeName,
      province,
      district,
      address,
      phone,
      googleMapsUrl,
      showOnHomepage: false,
    }

    const existing = existingMap.get(storeName.toLowerCase().trim())

    let success = false
    let attempts = 0
    while (!success && attempts < 3) {
      attempts++
      try {
        if (existing && existing.id) {
          await callMcpTool('updateStores', {
            id: existing.id,
            ...storePayload,
          }, idx + 10)
          updatedCount++
        } else {
          const res = await callMcpTool('createStores', storePayload, idx + 10)
          // Add to existing map to avoid duplicates if same name is repeated
          existingMap.set(storeName.toLowerCase().trim(), { id: 'created' })
          createdCount++
        }
        success = true
      } catch (err: any) {
        if (attempts >= 3) {
          console.error(`❌ Failed to save [${idx + 1}] "${storeName}": ${err.message}`)
          errorCount++
        } else {
          await delay(1000)
        }
      }
    }

    // Rate limiting pacing
    await delay(100)

    if ((idx + 1) % 25 === 0 || idx === dataRows.length - 1) {
      console.log(
        `⏳ Progress: ${idx + 1}/${dataRows.length} (Created: ${createdCount}, Updated: ${updatedCount}, Errors: ${errorCount})`
      )
    }
  }

  console.log('\n🎉 Remote MCP Import Complete!')
  console.log(`   • Total Processed: ${dataRows.length}`)
  console.log(`   • Created: ${createdCount}`)
  console.log(`   • Updated: ${updatedCount}`)
  console.log(`   • Errors: ${errorCount}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  importDealersViaMcp()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Fatal error:', err)
      process.exit(1)
    })
}
