import { describe, it, expect } from 'vitest';
import {
  getPaintableArea,
  getPaintableAreaDetails,
  calculateRequiredLitres,
  calculatePaintRequirement,
  getPackRecommendations,
  calculatePackPrices,
  calculateTotalCost,
  STANDARD_DOOR_SQFT,
  STANDARD_WINDOW_SQFT,
} from '../../src/utilities/calculatorLogic';

describe('Paint Calculator Logic', () => {
  describe('getPaintableArea', () => {
    it('calculates area correctly in feet with no deductions', () => {
      // 10x10 room, 10ft high
      // 2 * (10+10) * 10 = 400
      expect(getPaintableArea(10, 10, 10)).toBe(400);
    });

    it('calculates area correctly in feet with deductions', () => {
      // 400 - (1 * STANDARD_DOOR_SQFT) - (1 * STANDARD_WINDOW_SQFT)
      const expected = 400 - (1 * STANDARD_DOOR_SQFT) - (1 * STANDARD_WINDOW_SQFT);
      expect(getPaintableArea(10, 10, 10, 1, 1)).toBe(expected);
    });

    it('includes ceiling area when option is enabled', () => {
      // 10x10 room, 10ft high + ceiling (100 sq.ft)
      const details = getPaintableAreaDetails(10, 10, 10, 0, 0, true, 'feet');
      expect(details.wallAreaSqFt).toBe(400);
      expect(details.ceilingAreaSqFt).toBe(100);
      expect(details.grossAreaSqFt).toBe(500);
      expect(details.netPaintableSqFt).toBe(500);
    });

    it('returns 0 for negative or zero inputs', () => {
      expect(getPaintableArea(0, 10, 10)).toBe(0);
      expect(getPaintableArea(10, -5, 10)).toBe(0);
    });

    it('handles null, NaN, and empty inputs by treating them as 0', () => {
      // @ts-ignore - testing runtime tolerance of invalid/null types
      expect(getPaintableArea(10, 10, 10, null, NaN)).toBe(400); // gross area 400, deductions 0
      // @ts-ignore
      expect(getPaintableArea(NaN, 10, 10)).toBe(0);
    });

    it('handles metric conversion correctly', () => {
      // 3m x 4m room, 3m high
      // L = 9.84252, W = 13.12336, H = 9.84252
      // Gross = 2 * (9.84252 + 13.12336) * 9.84252 = 452.08 sq.ft
      const area = getPaintableArea(3, 4, 3, 0, 0, 'metres');
      expect(area).toBeCloseTo(452.1, 0);
    });
  });

  describe('calculatePaintRequirement & calculateRequiredLitres', () => {
    it('calculates realistic paint requirement for standard 2 coats', () => {
      // 400 sq.ft, 180 sq.ft/L coverage, 2 coats, smooth surface
      const req = calculatePaintRequirement(400, 180, 2, 'smooth', true);
      expect(req.baseLitres).toBeGreaterThan(0);
      expect(req.bufferLitres).toBeCloseTo(req.baseLitres * 0.1, 1);
      expect(req.totalLitres).toBe(Math.round((req.baseLitres + req.bufferLitres) * 100) / 100);
    });

    it('adjusts for fresh plaster absorption (+15%) and recommends primer', () => {
      const smoothReq = calculatePaintRequirement(400, 180, 2, 'smooth', false);
      const freshReq = calculatePaintRequirement(400, 180, 2, 'fresh_plaster', false);
      expect(freshReq.baseLitres).toBeGreaterThan(smoothReq.baseLitres);
      expect(freshReq.primerLitres).toBeGreaterThan(0);
    });

    it('returns 0 for invalid inputs', () => {
      expect(calculateRequiredLitres(0, 100, 2)).toBe(0);
      expect(calculateRequiredLitres(400, 0, 2)).toBe(0);
    });
  });

  describe('getPackRecommendations', () => {
    it('recommends exact packs for standard quantities', () => {
      const p20 = getPackRecommendations(20);
      expect(p20[20]).toBe(1);

      const p10 = getPackRecommendations(10);
      expect(p10[10]).toBe(1);

      const p4 = getPackRecommendations(4);
      expect(p4[4]).toBe(1);

      const p1 = getPackRecommendations(1);
      expect(p1[1]).toBe(1);
    });

    it('recommends combination of packs minimizing cost and waste', () => {
      const rec = getPackRecommendations(14);
      const totalVol = rec[20] * 20 + rec[10] * 10 + rec[4] * 4 + rec[1] * 1;
      expect(totalVol).toBeGreaterThanOrEqual(14);
    });
  });

  describe('calculateTotalCost & calculatePackPrices', () => {
    it('calculates pack prices with bulk discounts', () => {
      const prices = calculatePackPrices(500);
      expect(prices[1]).toBe(500);
      expect(prices[4]).toBe(Math.round(500 * 4 * 0.96));
      expect(prices[10]).toBe(Math.round(500 * 10 * 0.92));
      expect(prices[20]).toBe(Math.round(500 * 20 * 0.88));
    });

    it('calculates total cost correctly', () => {
      const recommendation = { 20: 1, 10: 1, 4: 1, 1: 1 };
      const prices = { 20: 10000, 10: 5500, 4: 2500, 1: 700 };
      // 10000 + 5500 + 2500 + 700 = 18700
      expect(calculateTotalCost(recommendation, prices)).toBe(18700);
    });
  });
});

