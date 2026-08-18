import { describe, it, expect } from 'vitest';
import { formatAmount } from './format.js';

describe('formatAmount', () => {
  it('取整數並加仟位分隔符', () => {
    expect(formatAmount(3350000)).toBe('3,350,000');
    expect(formatAmount(1234.567)).toBe('1,235');
  });
  it('處理空值與非數值', () => {
    expect(formatAmount('')).toBe('-');
    expect(formatAmount(undefined)).toBe('-');
    expect(formatAmount(null)).toBe('-');
    expect(formatAmount('N/A')).toBe('N/A');
  });
});