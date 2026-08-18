import SelectionBadge from './SelectionBadge.jsx';
import { formatAmount } from '../lib/format.js';

export default function ParkingList({ parking, parkingCounts, onSelect }) {
  if (!parking.length) return <p className="empty">尚無車位資料</p>;
  return (
    <ul className="card-list">
      {parking.map((p, i) => {
        const id = p['車位編號'];
        const count = parkingCounts[p['車位編號']] || 0;
        return (
          <li key={id ?? i} className="card" onClick={() => onSelect(p)}>
            <div className="card-main">
              <span className="card-title">{id}</span>
              <span className="card-sub">{p['車位屬性'] || ''} · {p['車位大小'] || ''}</span>
            </div>
            <div className="card-side">
              <span className="card-price">{formatAmount(p['車位單價/元'])} 元</span>
              <SelectionBadge count={count} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
