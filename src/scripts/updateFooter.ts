import { getPayload } from "payload";
import config from "../payload.config";

async function run() {
  const payload = await getPayload({ config });
  
  // get media
  const media = await payload.find({
    collection: "media",
    limit: 100,
  });

  const logo = media.docs.find(d => d.filename && (d.filename.toLowerCase().includes("logo") || d.filename.toLowerCase().includes("reliance")));

  if (!logo) {
    console.log("No logo found in media!");
    console.log(media.docs.map(d => d.filename));
  } else {
    console.log("Found logo:", logo.filename, "id:", logo.id);
  }
  
  const footer = await payload.findGlobal({ slug: "footer" });
  
  await payload.updateGlobal({
    slug: "footer",
    data: {
      ...footer,
      companyInfo: {
        ...footer.companyInfo,
        facebookUrl: "https://www.facebook.com/reliancepaintsnepal?mibextid=wwXIfr&rdid=S7jXQ7dwwSbQbEn1&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Ak6GmXjxk%2F%3Fmibextid%3DwwXIfr",
        instagramUrl: "https://www.instagram.com/reliance_paintsnepal?igsh=MXduajBvbDl0NG10NA%3D%3D",
        tiktokUrl: "https://www.tiktok.com/@reliancepaints?_r=1&_t=ZS-98XXke6EWhw",
        logo: logo ? logo.id : (footer.companyInfo?.logo || undefined)
      }
    }
  });

  console.log("Footer updated!");
  process.exit(0);
}

run();
