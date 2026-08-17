export function badgeColor(count) {
  if (count >= 2) return 'red';
  if (count === 1) return 'blue';
  return 'default';
}
