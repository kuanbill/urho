import SelectionBadge from './SelectionBadge.jsx';
import { formatAmount } from '../lib/format.js';

const FIELDS = [
  ['車位編號', '車位編號'], ['樓層', '樓層'], ['車位單價/元', '車位單價(元)'],
  ['車位屬性', '車位屬性'], ['車位大小', '車位大小'], ['規格 (公分)', '規格(公分)'],
];

const AMOUNT_KEYS = new Set(['車位單價/元']);

export default function ParkingDetail({ parking, count }) {
  return (
    <section className="detail">
      <h2>{parking['車位編號']}</h2>
      <SelectionBadge count={count} />
      <dl className="detail-list">
        {FIELDS.map(([key, label]) => (
          <div key={key} className="detail-row">
            <dt>{label}</dt>
            <dd>{AMOUNT_KEYS.has(key) ? formatAmount(parking[key]) : (parking[key] ?? '-')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
