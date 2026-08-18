export function buildGrid(rows, idField, counts) {
  const grid = new Map();
  for (const row of rows) {
    const floor = row['樓層'];
    const id = row[idField];
    if (floor === undefined || floor === null || String(floor).trim() === '') continue;
    if (id === undefined || id === null || String(id).trim() === '') continue;
    if (!grid.has(floor)) grid.set(floor, new Map());
    grid.get(floor).set(id, { ...row, count: counts[id] || 0 });
  }
  return grid;
}

export function sortFloorsByField(grid, sortField) {
  return [...grid.keys()].sort((a, b) => {
    const va = minField(grid.get(a), sortField);
    const vb = minField(grid.get(b), sortField);
    return va - vb;
  });
}

function minField(units, sortField) {
  let min = Infinity;
  for (const cell of units.values()) {
    const v = Number(cell[sortField]);
    if (!Number.isNaN(v) && v < min) min = v;
  }
  return min;
}
