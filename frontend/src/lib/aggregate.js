export function countSelections(selections, houseField, parkingField) {
  const houseCounts = {};
  const parkingCounts = {};
  for (const s of selections || []) {
    const h = s[houseField];
    if (h !== undefined && h !== null && String(h).trim() !== '') {
      const hKey = String(h).trim();
      houseCounts[hKey] = (houseCounts[hKey] || 0) + 1;
    }
    const p = s[parkingField];
    if (p !== undefined && p !== null && String(p).trim() !== '') {
      const pKey = String(p).trim();
      parkingCounts[pKey] = (parkingCounts[pKey] || 0) + 1;
    }
  }
  return { houseCounts, parkingCounts };
}

export function badgeColor(count) {
  if (count >= 2) return 'red';
  if (count === 1) return 'blue';
  return 'default';
}
