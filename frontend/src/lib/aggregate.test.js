import { describe, it, expect } from 'vitest';
import { badgeColor } from './aggregate.js';

describe('badgeColor', () => {
  it('依人數回傳顏色', () => {
    expect(badgeColor(0)).toBe('default');
    expect(badgeColor(1)).toBe('blue');
    expect(badgeColor(2)).toBe('red');
    expect(badgeColor(5)).toBe('red');
  });
});
