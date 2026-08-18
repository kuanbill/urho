export function formatAmount(v) {
  if (v === undefined || v === null || v === '') return '-';
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return Math.round(n).toLocaleString('en-US');
}