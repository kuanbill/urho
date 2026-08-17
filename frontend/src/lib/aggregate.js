export function countSelections(selections, houseField, parkingField) {
  const houseCounts = {};
  const parkingCounts = {};
  for (const s of selections) {
    const h = s[houseField];
    if (h !== undefined && h !== null && String(h).trim() !== '') {
      houseCounts[h] = (houseCounts[h] || 0) + 1;
    }
    const p = s[parkingField];
    if (p !== undefined && p !== null && String(p).trim() !== '') {
      parkingCounts[p] = (parkingCounts[p] || 0) + 1;
    }
  }
  return { houseCounts, parkingCounts };
}

export function badgeColor(count) {
  if (count >= 2) return 'red';
  if (count === 1) return 'blue';
  return 'default';
}
