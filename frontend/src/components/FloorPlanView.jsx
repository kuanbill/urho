import { buildGrid } from '../lib/floorplan.js';
import { badgeColor } from '../lib/aggregate.js';

export default function FloorPlanView({ rows, idField, counts, labelField, onSelect }) {
  const grid = buildGrid(rows, idField, counts);
  const floors = [...grid.keys()].sort();
  return (
    <div className="floorplan">
      {floors.map((floor) => (
        <div key={floor} className="fp-floor">
          <div className="fp-floor-label">{floor}</div>
          <div className="fp-units">
            {[...grid.get(floor).entries()].map(([id, cell]) => (
              <button
                key={id}
                className={`fp-cell fp-${badgeColor(cell.count)}`}
                onClick={() => onSelect(cell)}
              >
                <span className="fp-id">{cell[labelField] ?? id}</span>
                <span className="fp-count">{cell.count}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
