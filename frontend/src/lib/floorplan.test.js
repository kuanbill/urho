import { describe, it, expect } from 'vitest';
import { buildGrid } from './floorplan.js';

const houses = [
  { '樓層': '1F', '戶別': 'A1', '該戶總價(元)': 1000 },
  { '樓層': '1F', '戶別': 'A2', '該戶總價(元)': 1200 },
  { '樓層': '2F', '戶別': 'A1', '該戶總價(元)': 1100 },
];
const counts = { 'A1': 2, 'A2': 0 };

describe('buildGrid', () => {
  it('依樓層與戶別建立格線並附上選取人數', () => {
    const grid = buildGrid(houses, '戶別', counts);
    expect([...grid.keys()]).toEqual(['1F', '2F']);
    const floor1 = grid.get('1F');
    expect(floor1.get('A1').count).toBe(2);
    expect(floor1.get('A2').count).toBe(0);
    expect(floor1.get('A1')['該戶總價(元)']).toBe(1000);
    expect(grid.get('2F').get('A1').count).toBe(2);
  });
});
