import SelectionBadge from './SelectionBadge.jsx';
import { formatAmount } from '../lib/format.js';

const FIELDS = [
  ['單元編號', '單元編號'], ['樓層', '樓層'], ['戶別', '戶別'], ['用途', '用途'],
  ['產權面積(坪)', '產權面積(坪)'], ['每坪單價(元)', '每坪單價(元)'], ['露台總價', '露台總價'],
  ['該戶總價(元)', '總價(元)'],
];

const AMOUNT_KEYS = new Set(['每坪單價(元)', '露台總價', '該戶總價(元)']);

export default function HouseDetail({ house, count }) {
  return (
    <section className="detail">
      <h2>{house['樓層']}-{house['戶別']}</h2>
      <SelectionBadge count={count} />
      <dl className="detail-list">
        {FIELDS.map(([key, label]) => (
          <div key={key} className="detail-row">
            <dt>{label}</dt>
            <dd>{AMOUNT_KEYS.has(key) ? formatAmount(house[key]) : (house[key] ?? '-')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
