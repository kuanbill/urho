import { ListIcon, CarIcon, BuildingIcon, ParkingIcon } from './icons.jsx';

const ICONS = [ListIcon, CarIcon, BuildingIcon, ParkingIcon];

export default function BottomNav({ tabs, active, onSelect }) {
  return (
    <nav className="bottom-nav">
      {tabs.map((t, i) => {
        const Icon = ICONS[i];
        return (
          <button
            key={t.key}
            className={`bn-item${i === active ? ' active' : ''}`}
            onClick={() => onSelect(i)}
            aria-label={t.label}
          >
            <Icon />
            <span className="bn-label">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
