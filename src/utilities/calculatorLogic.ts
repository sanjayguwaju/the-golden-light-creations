export const STANDARD_DOOR_SQFT = 21; // ~3ft x 7ft
export const STANDARD_WINDOW_SQFT = 15; // ~3ft x 5ft
export const SQM_TO_SQFT = 10.7639;
export const STANDARD_PRIMER_COVERAGE_SQFT_PER_LITRE = 160; // 1 coat primer

export type Unit = 'feet' | 'metres';
export type SurfaceCondition = 'smooth' | 'fresh_plaster' | 'rough_textured';

export const SURFACE_MULTIPLIERS: Record<SurfaceCondition, number> = {
  smooth: 1.0,           // Previously painted or smooth, primed walls
  fresh_plaster: 1.15,    // Fresh masonry / dry plaster (+15% absorption)
  rough_textured: 1.30,   // Textured, brick, or rough exterior (+30% absorption)
};

export const SURFACE_LABELS: Record<SurfaceCondition, string> = {
  smooth: 'Smooth / Previously Painted (Standard)',
  fresh_plaster: 'Fresh Plaster / New Masonry (+15% paint)',
  rough_textured: 'Textured / Rough Exterior (+30% paint)',
};

export type AreaCalculation = {
  wallAreaSqFt: number;
  ceilingAreaSqFt: number;
  grossAreaSqFt: number;
  deductionsSqFt: number;
  netPaintableSqFt: number;
  netPaintableSqM: number;
};

export function getPaintableAreaDetails(
  length: number,
  width: number,
  height: number,
  doors: number = 0,
  windows: number = 0,
  includeCeiling: boolean = false,
  unit: Unit = 'feet'
): AreaCalculation {
  const lVal = Number(length) || 0;
  const wVal = Number(width) || 0;
  const hVal = Number(height) || 0;
  const dVal = Number(doors) || 0;
  const winVal = Number(windows) || 0;

  if (lVal <= 0 || wVal <= 0 || hVal <= 0) {
    return {
      wallAreaSqFt: 0,
      ceilingAreaSqFt: 0,
      grossAreaSqFt: 0,
      deductionsSqFt: 0,
      netPaintableSqFt: 0,
      netPaintableSqM: 0,
    };
  }

  // Convert dimensions to feet if entered in metres
  const l = unit === 'metres' ? lVal * 3.28084 : lVal;
  const w = unit === 'metres' ? wVal * 3.28084 : wVal;
  const h = unit === 'metres' ? hVal * 3.28084 : hVal;

  const wallAreaSqFt = 2 * (l + w) * h;
  const ceilingAreaSqFt = includeCeiling ? l * w : 0;
  const grossAreaSqFt = wallAreaSqFt + ceilingAreaSqFt;

  const deductionsSqFt = (dVal * STANDARD_DOOR_SQFT) + (winVal * STANDARD_WINDOW_SQFT);
  const netPaintableSqFt = Math.max(0, grossAreaSqFt - deductionsSqFt);
  const netPaintableSqM = netPaintableSqFt / SQM_TO_SQFT;

  return {
    wallAreaSqFt: Math.round(wallAreaSqFt * 10) / 10,
    ceilingAreaSqFt: Math.round(ceilingAreaSqFt * 10) / 10,
    grossAreaSqFt: Math.round(grossAreaSqFt * 10) / 10,
    deductionsSqFt: Math.round(deductionsSqFt * 10) / 10,
    netPaintableSqFt: Math.round(netPaintableSqFt * 10) / 10,
    netPaintableSqM: Math.round(netPaintableSqM * 10) / 10,
  };
}

export function getPaintableArea(
  length: number,
  width: number,
  height: number,
  doors: number = 0,
  windows: number = 0,
  unit: Unit = 'feet',
  includeCeiling: boolean = false
): number {
  const details = getPaintableAreaDetails(length, width, height, doors, windows, includeCeiling, unit);
  return details.netPaintableSqFt;
}

export type PaintRequirement = {
  baseLitres: number;
  bufferLitres: number;
  totalLitres: number;
  primerLitres: number;
  effectiveCoverageSqFtPerLitre: number;
};

export function calculateRequiredLitres(
  paintableAreaSqFt: number,
  coverageRateSqFtPerLitre: number,
  coats: number = 2,
  surfaceCondition: SurfaceCondition = 'smooth',
  includeBuffer: boolean = true
): number {
  const req = calculatePaintRequirement(paintableAreaSqFt, coverageRateSqFtPerLitre, coats, surfaceCondition, includeBuffer);
  return req.totalLitres;
}

export function calculatePaintRequirement(
  paintableAreaSqFt: number,
  coverageRateSqFtPerLitre: number,
  coats: number = 2,
  surfaceCondition: SurfaceCondition = 'smooth',
  includeBuffer: boolean = true
): PaintRequirement {
  if (paintableAreaSqFt <= 0 || coverageRateSqFtPerLitre <= 0 || coats <= 0) {
    return {
      baseLitres: 0,
      bufferLitres: 0,
      totalLitres: 0,
      primerLitres: 0,
      effectiveCoverageSqFtPerLitre: 0,
    };
  }

  const surfaceFactor = SURFACE_MULTIPLIERS[surfaceCondition] ?? 1.0;

  // Realistic multi-coat spread formula:
  // First coat absorbs into wall (scaled by surface porosity).
  // Second/third coat glides over first coat with higher spread efficiency (~1.08x).
  let totalLitresNeeded = 0;
  for (let coat = 1; coat <= coats; coat++) {
    if (coat === 1) {
      totalLitresNeeded += (paintableAreaSqFt * surfaceFactor) / coverageRateSqFtPerLitre;
    } else {
      totalLitresNeeded += paintableAreaSqFt / (coverageRateSqFtPerLitre * 1.08);
    }
  }

  const baseLitres = Math.round(totalLitresNeeded * 100) / 100;
  // 10% standard buffer for roller absorption, tray residue, wall edge cuts, and touchups
  const bufferLitres = includeBuffer ? Math.round(baseLitres * 0.10 * 100) / 100 : 0;
  const totalLitres = Math.round((baseLitres + bufferLitres) * 100) / 100;

  // Primer recommendation (1 coat of primer if fresh plaster or rough texture)
  const primerLitres = surfaceCondition !== 'smooth'
    ? Math.round((paintableAreaSqFt / STANDARD_PRIMER_COVERAGE_SQFT_PER_LITRE) * 100) / 100
    : 0;

  const effectiveCoverageSqFtPerLitre = totalLitres > 0
    ? Math.round((paintableAreaSqFt / totalLitres) * 10) / 10
    : 0;

  return {
    baseLitres,
    bufferLitres,
    totalLitres,
    primerLitres,
    effectiveCoverageSqFtPerLitre,
  };
}

export type PackRecommendations = {
  20: number;
  10: number;
  4: number;
  1: number;
  totalVolume?: number;
};

export type PackPrices = {
  20: number;
  10: number;
  4: number;
  1: number;
};

export function calculatePackPrices(basePricePerLitre: number): PackPrices {
  const p = Number(basePricePerLitre) || 500;
  return {
    20: Math.round(p * 20 * 0.88), // ~12% bulk discount on 20L drum
    10: Math.round(p * 10 * 0.92), // ~8% bulk discount on 10L bucket
    4: Math.round(p * 4 * 0.96),   // ~4% bulk discount on 4L gallon
    1: Math.round(p * 1),          // 1L tin base price
  };
}

export function getPackRecommendations(
  requiredLitres: number,
  prices?: PackPrices
): PackRecommendations {
  if (requiredLitres <= 0) {
    return { 20: 0, 10: 0, 4: 0, 1: 0, totalVolume: 0 };
  }

  // Find the optimal combination of standard pack sizes (20L, 10L, 4L, 1L)
  // to meet or exceed requiredLitres with minimum cost & minimum wasted volume.
  const target = Math.ceil(requiredLitres * 10) / 10;
  const p20 = prices ? prices[20] : 20 * 0.88;
  const p10 = prices ? prices[10] : 10 * 0.92;
  const p4 = prices ? prices[4] : 4 * 0.96;
  const p1 = prices ? prices[1] : 1;

  let bestCost = Infinity;
  let bestPacks: PackRecommendations = { 20: 0, 10: 0, 4: 0, 1: 0, totalVolume: 0 };

  const max20 = Math.ceil(target / 20) + 1;
  const max10 = 2;
  const max4 = 3;
  const max1 = 4;

  for (let c20 = 0; c20 <= max20; c20++) {
    for (let c10 = 0; c10 <= max10; c10++) {
      for (let c4 = 0; c4 <= max4; c4++) {
        for (let c1 = 0; c1 <= max1; c1++) {
          const vol = c20 * 20 + c10 * 10 + c4 * 4 + c1 * 1;
          if (vol >= target) {
            const cost = c20 * p20 + c10 * p10 + c4 * p4 + c1 * p1;
            // Prefer lower cost, and if equal cost, prefer lower excess volume
            if (cost < bestCost || (cost === bestCost && vol < (bestPacks.totalVolume ?? Infinity))) {
              bestCost = cost;
              bestPacks = {
                20: c20,
                10: c10,
                4: c4,
                1: c1,
                totalVolume: vol,
              };
            }
          }
        }
      }
    }
  }

  return bestPacks;
}

export function calculateTotalCost(
  recommendation: PackRecommendations,
  prices: PackPrices
): number {
  return (
    (recommendation[20] * prices[20]) +
    (recommendation[10] * prices[10]) +
    (recommendation[4] * prices[4]) +
    (recommendation[1] * prices[1])
  );
}
