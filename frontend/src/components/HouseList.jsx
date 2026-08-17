import SelectionBadge from './SelectionBadge.jsx';

export default function HouseList({ houses, houseCounts, onSelect }) {
  if (!houses.length) return <p className="empty">尚無房屋資料</p>;
  return (
    <ul className="card-list">
      {houses.map((h, i) => {
        const id = h['單元編號'];
        const count = houseCounts[h['單元編號']] || 0;
        return (
          <li key={id ?? i} className="card" onClick={() => onSelect(h)}>
            <div className="card-main">
              <span className="card-title">{h['樓層']}-{h['戶別']}</span>
              <span className="card-sub">{h['用途'] || ''} · {h['產權面積(坪)']} 坪</span>
            </div>
            <div className="card-side">
              <span className="card-price">{h['該戶總價(元)']} 元</span>
              <SelectionBadge count={count} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
