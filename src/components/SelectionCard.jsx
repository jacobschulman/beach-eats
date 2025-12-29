import { icons, dietaryFlags } from '../config/menu';
import styles from './SelectionCard.module.css';

function MenuIcon({ iconName }) {
  const svgString = icons[iconName];
  if (!svgString) return null;

  return (
    <div
      className={styles.icon}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

function DietaryBadges({ dietary = [], language = 'en' }) {
  if (!dietary || dietary.length === 0) return null;

  return (
    <div className={styles.dietaryBadges}>
      {dietary.map((flag) => (
        <span
          key={flag}
          className={styles.badge}
          title={dietaryFlags[flag]?.name[language]}
        >
          {dietaryFlags[flag]?.label}
        </span>
      ))}
    </div>
  );
}

export default function SelectionCard({
  name,
  description,
  selected = false,
  onClick,
  variant = 'single',
  icon,
  dietary,
  language = 'en',
}) {
  return (
    <button
      className={`${styles.card} ${selected ? styles.selected : ''} ${styles[variant]}`}
      onClick={onClick}
      type="button"
    >
      {icon && <MenuIcon iconName={icon} />}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <DietaryBadges dietary={dietary} language={language} />
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.indicator}>
        {variant === 'multi' ? (
          <span className={styles.checkbox}>
            {selected && <span className={styles.checkmark}>&#10003;</span>}
          </span>
        ) : (
          <span className={styles.radio}>
            {selected && <span className={styles.radioDot} />}
          </span>
        )}
      </div>
    </button>
  );
}
