import { describe, it, expect } from 'vitest';
import { countSelections, badgeColor } from './aggregate.js';

const selections = [
  { '房屋選配': 'A1', '車位選配': 'B1-1' },
  { '房屋選配': 'A1', '車位選配': 'B1-2' },
  { '房屋選配': 'B2', '車位選配': 'B1-2' },
  { '房屋選配': '', '車位選配': 'B2-16' },
];

describe('countSelections', () => {
  it('統計房屋與車位選取人數', () => {
    const { houseCounts, parkingCounts } = countSelections(selections, '房屋選配', '車位選配');
    expect(houseCounts['A1']).toBe(2);
    expect(houseCounts['B2']).toBe(1);
    expect(parkingCounts['B1-1']).toBe(1);
    expect(parkingCounts['B1-2']).toBe(2);
    expect(parkingCounts['B2-16']).toBe(1);
  });
});

describe('badgeColor', () => {
  it('依人數回傳顏色', () => {
    expect(badgeColor(0)).toBe('default');
    expect(badgeColor(1)).toBe('blue');
    expect(badgeColor(2)).toBe('red');
    expect(badgeColor(5)).toBe('red');
  });
});
