import { useState, useEffect } from 'react';
import { proteins as defaultProteins, formats as defaultFormats, addons as defaultAddons, menuItems as defaultMenuItems, exclusions as defaultExclusions } from '../config/menu';
import styles from './MenuAdmin.module.css';

const STORAGE_KEY = 'beachEatsMenuConfig';

function getStoredMenu() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveMenu(menu) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
}

function initializeWithPrices(items, defaultPrice = 0) {
  return items.map(item => ({
    ...item,
    price: item.price ?? defaultPrice,
    available: item.available ?? true,
  }));
}

function initializeMenuItems(menuItems) {
  const result = {};
  Object.keys(menuItems).forEach(category => {
    result[category] = menuItems[category].map(item => ({
      ...item,
      price: item.price ?? 0,
      available: item.available ?? true,
    }));
  });
  return result;
}

export default function MenuAdmin() {
  const [activeTab, setActiveTab] = useState('proteins');
  const [menu, setMenu] = useState(() => {
    const stored = getStoredMenu();
    if (stored) return stored;
    return {
      proteins: initializeWithPrices(defaultProteins),
      formats: initializeWithPrices(defaultFormats),
      addons: initializeWithPrices(defaultAddons),
      exclusions: initializeWithPrices(defaultExclusions),
      menuItems: initializeMenuItems(defaultMenuItems),
    };
  });
  const [saved, setSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('picaditos');

  useEffect(() => {
    document.title = 'Beach Eats Admin';
  }, []);

  const handleSave = () => {
    saveMenu(menu);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Reset all menu items to defaults? This cannot be undone.')) {
      const defaultMenu = {
        proteins: initializeWithPrices(defaultProteins),
        formats: initializeWithPrices(defaultFormats),
        addons: initializeWithPrices(defaultAddons),
        exclusions: initializeWithPrices(defaultExclusions),
        menuItems: initializeMenuItems(defaultMenuItems),
      };
      setMenu(defaultMenu);
      saveMenu(defaultMenu);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const updateItem = (section, index, field, value) => {
    setMenu(prev => {
      const updated = { ...prev };
      if (section === 'menuItems') {
        updated.menuItems = { ...prev.menuItems };
        updated.menuItems[selectedCategory] = [...prev.menuItems[selectedCategory]];
        updated.menuItems[selectedCategory][index] = {
          ...updated.menuItems[selectedCategory][index],
          [field]: value,
        };
      } else {
        updated[section] = [...prev[section]];
        updated[section][index] = { ...updated[section][index], [field]: value };
      }
      return updated;
    });
  };

  const tabs = [
    { id: 'proteins', label: 'Proteins', icon: '🥩' },
    { id: 'formats', label: 'Formats', icon: '🌮' },
    { id: 'addons', label: 'Add-ons', icon: '🥑' },
    { id: 'exclusions', label: 'Exclusions', icon: '🚫' },
    { id: 'menuItems', label: 'Menu Items', icon: '📋' },
  ];

  const menuCategories = Object.keys(menu.menuItems);

  const renderPriceInput = (section, index, item) => (
    <div className={styles.priceGroup}>
      <label className={styles.priceLabel}>
        <input
          type="checkbox"
          checked={item.price === 0}
          onChange={(e) => updateItem(section, index, 'price', e.target.checked ? 0 : 5)}
          className={styles.checkbox}
        />
        <span>Complimentary</span>
      </label>
      {item.price > 0 && (
        <div className={styles.priceInput}>
          <span className={styles.currency}>$</span>
          <input
            type="number"
            value={item.price}
            onChange={(e) => updateItem(section, index, 'price', parseFloat(e.target.value) || 0)}
            min="0"
            step="0.5"
            className={styles.numberInput}
          />
        </div>
      )}
    </div>
  );

  const renderItemEditor = (section, items) => (
    <div className={styles.itemList}>
      {items.map((item, index) => (
        <div key={item.id} className={`${styles.itemCard} ${!item.available ? styles.unavailable : ''}`}>
          <div className={styles.itemHeader}>
            <div className={styles.itemInfo}>
              <input
                type="text"
                value={item.name?.en || item.name || ''}
                onChange={(e) => {
                  const newName = typeof item.name === 'object'
                    ? { ...item.name, en: e.target.value }
                    : e.target.value;
                  updateItem(section, index, 'name', newName);
                }}
                className={styles.nameInput}
                placeholder="Item name"
              />
              {item.description && (
                <input
                  type="text"
                  value={item.description?.en || item.description || ''}
                  onChange={(e) => {
                    const newDesc = typeof item.description === 'object'
                      ? { ...item.description, en: e.target.value }
                      : e.target.value;
                    updateItem(section, index, 'description', newDesc);
                  }}
                  className={styles.descInput}
                  placeholder="Description"
                />
              )}
            </div>
            <label className={styles.availableToggle}>
              <input
                type="checkbox"
                checked={item.available}
                onChange={(e) => updateItem(section, index, 'available', e.target.checked)}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
          {renderPriceInput(section, index, item)}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Menu Manager</h1>
          <span className={styles.subtitle}>Beach Eats CMS</span>
        </div>
        <div className={styles.headerActions}>
          <button onClick={handleReset} className={styles.resetBtn}>
            Reset to Defaults
          </button>
          <button onClick={handleSave} className={`${styles.saveBtn} ${saved ? styles.saved : ''}`}>
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>
      </header>

      <nav className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className={styles.content}>
        {activeTab === 'menuItems' && (
          <div className={styles.categorySelector}>
            {menuCategories.map(cat => (
              <button
                key={cat}
                className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.activeCategory : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'proteins' && renderItemEditor('proteins', menu.proteins)}
        {activeTab === 'formats' && renderItemEditor('formats', menu.formats)}
        {activeTab === 'addons' && renderItemEditor('addons', menu.addons)}
        {activeTab === 'exclusions' && renderItemEditor('exclusions', menu.exclusions)}
        {activeTab === 'menuItems' && renderItemEditor('menuItems', menu.menuItems[selectedCategory] || [])}
      </main>

      <footer className={styles.footer}>
        <p>Changes are saved to this browser. Open the <a href="/" target="_blank">guest app</a> or <a href="/?chef" target="_blank">kitchen display</a> to see updates.</p>
      </footer>
    </div>
  );
}
