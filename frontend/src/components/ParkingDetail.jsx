import SelectionBadge from './SelectionBadge.jsx';

const FIELDS = [
  ['車位編號', '車位編號'], ['樓層', '樓層'], ['車位單價/元', '車位單價(元)'],
  ['車位屬性', '車位屬性'], ['車位大小', '車位大小'], ['規格 (公分)', '規格(公分)'],
];

export default function ParkingDetail({ parking, count, onBack }) {
  return (
    <section className="detail">
      <button className="back" onClick={onBack}>← 返回</button>
      <h2>{parking['車位編號']}</h2>
      <SelectionBadge count={count} />
      <dl className="detail-list">
        {FIELDS.map(([key, label]) => (
          <div key={key} className="detail-row">
            <dt>{label}</dt>
            <dd>{parking[key] ?? '-'}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
