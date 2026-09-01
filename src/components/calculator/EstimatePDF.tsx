import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { PackPrices } from '@/utilities/calculatorLogic';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
  },
  contentWrapper: {
    paddingTop: 95,
    paddingBottom: 45,
    paddingHorizontal: 36,
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 8,
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A2540',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 9,
    color: '#C59B27',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  metaContainer: {
    alignItems: 'flex-end',
  },
  metaText: {
    fontSize: 8.5,
    color: '#64748B',
    marginBottom: 2,
  },
  metaHighlight: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0A2540',
  },
  grid2: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  gridCol: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0A2540',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  rowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEF2F6',
  },
  label: {
    fontSize: 8.5,
    color: '#64748B',
  },
  value: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  highlightValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0A2540',
  },
  table: {
    width: '100%',
    marginVertical: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0A2540',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  tableHeaderCell: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
  },
  tableCell: {
    fontSize: 8.5,
    color: '#1E293B',
  },
  totalBox: {
    backgroundColor: '#0A2540',
    borderRadius: 6,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8,
  },
  totalBoxLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalBoxSub: {
    color: '#94A3B8',
    fontSize: 7.5,
    marginTop: 2,
  },
  totalBoxValue: {
    color: '#FACC15',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notesCard: {
    backgroundColor: 'rgba(255, 253, 245, 0.85)',
    borderColor: '#FEF08A',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 0,
  },
  notesTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#854D0E',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  notesText: {
    fontSize: 7.5,
    color: '#713F12',
    lineHeight: 1.3,
    marginBottom: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7,
    color: '#94A3B8',
  },
});

export type PDFData = {
  referenceId: string;
  generatedDate: string;
  companyName?: string;
  websiteUrl?: string;
  helpline?: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
    doors: number;
    windows: number;
    includeCeiling: boolean;
    surfaceCondition: string;
    surfaceLabel: string;
    coats: number;
  };
  area: {
    wallAreaSqFt: number;
    ceilingAreaSqFt: number;
    grossAreaSqFt: number;
    deductionsSqFt: number;
    netPaintableSqFt: number;
    netPaintableSqM: number;
  };
  results: {
    product: {
      title: string;
      pricePerLitre: number;
      coverageRate: number;
    };
    paintableArea: number;
    baseLitres: number;
    bufferLitres: number;
    totalLitres: number;
    primerLitres: number;
    packs: {
      20: number;
      10: number;
      4: number;
      1: number;
      totalVolume?: number;
    };
    packPrices: PackPrices;
    totalCost: number;
  };
};

export const EstimatePDF = ({ data }: { data: PDFData }) => {
  const { referenceId, generatedDate, dimensions, area, results } = data;
  const prices = results.packPrices || {
    20: Math.round(results.product.pricePerLitre * 20 * 0.88),
    10: Math.round(results.product.pricePerLitre * 10 * 0.92),
    4: Math.round(results.product.pricePerLitre * 4 * 0.96),
    1: results.product.pricePerLitre,
  };

  const packRows = [
    { label: '20 Litre Drum', count: results.packs[20], price: prices[20] },
    { label: '10 Litre Bucket', count: results.packs[10], price: prices[10] },
    { label: '4 Litre Gallon', count: results.packs[4], price: prices[4] },
    { label: '1 Litre Tin', count: results.packs[1], price: prices[1] },
  ].filter((p) => p.count > 0);

  return (
    <Document title={`Reliance-Paints-Estimate-${referenceId}`} author="Reliance Paints Nepal">
      <Page size="A4" style={styles.page}>
        <Image src="/letterhead.png" style={styles.background} fixed />
        
        <View style={styles.contentWrapper}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.metaContainer}>
              <Text style={styles.metaText}>Estimate ID: <Text style={styles.metaHighlight}>{referenceId}</Text></Text>
              <Text style={styles.metaText}>Date: {generatedDate}</Text>
              <Text style={styles.metaText}>Valid for: 30 Days</Text>
            </View>
          </View>

        {/* Section 1: Dimensions & Surface Details */}
        <View style={styles.grid2}>
          <View style={[styles.card, styles.gridCol]}>
            <Text style={styles.cardTitle}>1. Room Dimensions</Text>
            <View style={[styles.row, styles.rowBorder]}>
              <Text style={styles.label}>Room Dimensions (L x W x H)</Text>
              <Text style={styles.value}>
                {dimensions.length} x {dimensions.width} x {dimensions.height} {dimensions.unit}
              </Text>
            </View>
            <View style={[styles.row, styles.rowBorder]}>
              <Text style={styles.label}>Ceiling Included</Text>
              <Text style={styles.value}>{dimensions.includeCeiling ? 'Yes' : 'No'}</Text>
            </View>
            <View style={[styles.row, styles.rowBorder]}>
              <Text style={styles.label}>Openings Deducted</Text>
              <Text style={styles.value}>
                {dimensions.doors} Door(s), {dimensions.windows} Window(s)
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Deduction Area</Text>
              <Text style={styles.value}>- {area.deductionsSqFt} sq. ft</Text>
            </View>
          </View>

          <View style={[styles.card, styles.gridCol]}>
            <Text style={styles.cardTitle}>2. Paintable Surface</Text>
            <View style={[styles.row, styles.rowBorder]}>
              <Text style={styles.label}>Gross Wall & Ceiling Area</Text>
              <Text style={styles.value}>{area.grossAreaSqFt} sq. ft</Text>
            </View>
            <View style={[styles.row, styles.rowBorder]}>
              <Text style={styles.label}>Surface Condition</Text>
              <Text style={styles.value}>{dimensions.surfaceLabel || dimensions.surfaceCondition}</Text>
            </View>
            <View style={[styles.row, styles.rowBorder]}>
              <Text style={styles.label}>Number of Coats</Text>
              <Text style={styles.highlightValue}>{dimensions.coats} Coat{dimensions.coats > 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Net Paintable Area</Text>
              <Text style={[styles.highlightValue, { color: '#0A2540', fontSize: 10 }]}>
                {area.netPaintableSqFt} sq. ft ({area.netPaintableSqM} m²)
              </Text>
            </View>
          </View>
        </View>

        {/* Section 2: Technical Specifications & Volume Requirements */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>3. Paint Specification & Requirement</Text>
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.label}>Selected Product</Text>
            <Text style={[styles.highlightValue, { fontSize: 10 }]}>{results.product.title}</Text>
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.label}>Theoretical Spread Rate (1-Coat)</Text>
            <Text style={styles.value}>{results.product.coverageRate} sq. ft / Litre / coat</Text>
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.label}>Net Paint Volume Needed</Text>
            <Text style={styles.value}>{results.baseLitres} Litres</Text>
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.label}>Application & Wastage Allowance (+10%)</Text>
            <Text style={styles.value}>+ {results.bufferLitres} Litres</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { fontWeight: 'bold', color: '#0A2540' }]}>
              Total Paint Volume to Purchase
            </Text>
            <Text style={[styles.highlightValue, { color: '#E31837', fontSize: 11 }]}>
              {results.totalLitres} Litres
            </Text>
          </View>
          {results.primerLitres > 0 && (
            <View style={[styles.row, { marginTop: 4, paddingTop: 4, borderTopWidth: 0.5, borderTopColor: '#E2E8F0' }]}>
              <Text style={[styles.label, { color: '#B45309' }]}>Recommended Undercoat Primer (1 Coat)</Text>
              <Text style={[styles.value, { color: '#B45309' }]}>{results.primerLitres} Litres</Text>
            </View>
          )}
        </View>

        {/* Section 3: Recommended Pack Breakdown Table */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>4. Recommended Container Pack Sizes</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Container Size</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Capacity</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Recommended Qty</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1.5, textAlign: 'right' }]}>Total Volume (L)</Text>
            </View>
            {packRows.map((pack, idx) => {
              const capacity = pack.label.includes('20') ? 20 : pack.label.includes('10') ? 10 : pack.label.includes('4') ? 4 : 1;
              return (
                <View key={idx} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 2, fontWeight: 'bold' }]}>{pack.label}</Text>
                  <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}>{capacity}L</Text>
                  <Text style={[styles.tableCell, { flex: 1, textAlign: 'center', fontWeight: 'bold' }]}>x {pack.count}</Text>
                  <Text style={[styles.tableCell, { flex: 1.5, textAlign: 'right', fontWeight: 'bold' }]}>
                    {pack.count * capacity} Litres
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Grand Total Volume Box */}
        <View style={styles.totalBox}>
          <View>
            <Text style={styles.totalBoxLabel}>Total Estimated Paint Requirement</Text>
            <Text style={styles.totalBoxSub}>Calculated for {dimensions.coats} coat(s) including standard 10% application buffer</Text>
          </View>
          <Text style={styles.totalBoxValue}>{results.totalLitres} Litres</Text>
        </View>

        {/* Guidelines / Important Notes */}
        <View style={styles.notesCard}>
          <Text style={styles.notesTitle}>Application & Preparation Guidelines</Text>
          <Text style={styles.notesText}>• Surface Preparation: Ensure walls are dry, clean, and free of dust, grease, and loose particles.</Text>
          <Text style={styles.notesText}>• Priming: For fresh plaster or rough masonry, apply 1 coat of Reliance Acrylic Cement Primer before topcoat.</Text>
          <Text style={styles.notesText}>• Recoat Interval: Allow 3 to 4 hours drying time between consecutive coats for optimal adhesion.</Text>
          <Text style={styles.notesText}>• Note: Actual coverage may vary with surface texture, porosity, and application method (roller vs brush).</Text>
        </View>

        </View>
      </Page>
    </Document>
  );
};

