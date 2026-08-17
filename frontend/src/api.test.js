import { describe, it, expect, vi } from 'vitest';
import { fetchAllData } from './api.js';

describe('fetchAllData', () => {
  it('拉取 all 資料並回傳 JSON', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ houses: [], parking: [], selections: [] }),
    });
    const data = await fetchAllData();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('type=all'));
    expect(data.houses).toEqual([]);
  });

  it('HTTP 非 ok 時拋出錯誤', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    await expect(fetchAllData()).rejects.toThrow('500');
  });
});
