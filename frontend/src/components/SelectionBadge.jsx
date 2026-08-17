import { badgeColor } from '../lib/aggregate.js';

export default function SelectionBadge({ count }) {
  const cls = badgeColor(count);
  return <span className={`badge badge-${cls}`}>{count} 人選</span>;
}
