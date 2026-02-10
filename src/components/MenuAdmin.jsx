import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { generateShareURL } from '../hooks/useMenu';
import styles from './MenuAdmin.module.css';

// Generate QR code URL
const getQRCodeUrl = (url, size = 180) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=2d2d2d`;
};

function getStorageKey(resortId) {
  return `beach-eats-menu-${resortId}`;
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

function getDefaultMenu(resortConfig) {
  const menuConfig = resortConfig.menu;
  return {
    proteins: initializeWithPrices(menuConfig.proteins),
    formats: initializeWithPrices(menuConfig.formats),
    addons: initializeWithPrices(menuConfig.addons),
    exclusions: initializeWithPrices(menuConfig.exclusions),
    menuItems: initializeMenuItems(menuConfig.menuItems),
  };
}

function mergeItems(defaults, stored) {
  if (!stored) return defaults;
  return defaults.map(defaultItem => {
    const storedItem = stored.find(s => s.id === defaultItem.id);
    return storedItem ? { ...defaultItem, ...storedItem } : defaultItem;
  });
}

function mergeMenuItems(defaults, stored) {
  if (!stored) return defaults;
  const result = {};
  Object.keys(defaults).forEach(category => {
    result[category] = mergeItems(defaults[category], stored[category]);
  });
  return result;
}

function getStoredMenu(resortConfig, resortId) {
  const storageKey = getStorageKey(resortId);
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      const defaults = getDefaultMenu(resortConfig);
      return {
        proteins: mergeItems(defaults.proteins, parsed.proteins),
        formats: mergeItems(defaults.formats, parsed.formats),
        addons: mergeItems(defaults.addons, parsed.addons),
        exclusions: mergeItems(defaults.exclusions, parsed.exclusions),
        menuItems: mergeMenuItems(defaults.menuItems, parsed.menuItems),
      };
    }
  } catch {
    // Fall through to defaults
  }
  return getDefaultMenu(resortConfig);
}

// Dietary badge display
function DietaryBadges({ dietary = [], dietaryFlags }) {
  if (!dietary || dietary.length === 0) return null;
  return (
    <span className={styles.badges}>
      {dietary.map(flag => (
        <span key={flag} className={styles.badge}>
          {dietaryFlags[flag]?.label}
        </span>
      ))}
    </span>
  );
}

// Single item row — compact read view with inline edit
function ItemRow({ item, section, index, category, onUpdate, onToggleAvailable, dietaryFlags, initialEditing = false }) {
  const [editing, setEditing] = useState(initialEditing);

  const handleNameChange = (e) => {
    const newName = typeof item.name === 'object'
      ? { ...item.name, en: e.target.value }
      : e.target.value;
    onUpdate(section, index, 'name', newName, category);
  };

  const handleDescChange = (e) => {
    const newDesc = typeof item.description === 'object'
      ? { ...item.description, en: e.target.value }
      : e.target.value;
    onUpdate(section, index, 'description', newDesc, category);
  };

  const handlePriceToggle = (e) => {
    onUpdate(section, index, 'price', e.target.checked ? 0 : 5, category);
  };

  const handlePriceChange = (e) => {
    onUpdate(section, index, 'price', parseFloat(e.target.value) || 0, category);
  };

  const handleDietaryToggle = (flag) => {
    const current = item.dietary || [];
    const updated = current.includes(flag)
      ? current.filter(f => f !== flag)
      : [...current, flag];
    onUpdate(section, index, 'dietary', updated, category);
  };

  const name = item.name?.en || item.name || '';
  const description = item.description?.en || item.description || '';

  return (
    <div className={`${styles.itemRow} ${!item.available ? styles.unavailable : ''}`}>
      <div className={styles.itemReadRow}>
        <div className={styles.itemMain}>
          <div className={styles.itemNameRow}>
            <span className={styles.itemName}>{name}</span>
            <DietaryBadges dietary={item.dietary} dietaryFlags={dietaryFlags} />
            {item.price > 0 && <span className={styles.itemPrice}>${item.price}</span>}
          </div>
          {description && (
            <p className={styles.itemDesc}>{description}</p>
          )}
        </div>
        <div className={styles.itemActions}>
          <button
            className={`${styles.editBtn} ${editing ? styles.editBtnActive : ''}`}
            onClick={() => setEditing(!editing)}
          >
            {editing ? 'Done' : 'Edit'}
          </button>
          <label className={styles.availableToggle}>
            <input
              type="checkbox"
              checked={item.available}
              onChange={(e) => onToggleAvailable(section, index, e.target.checked, category)}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>
      </div>

      {editing && (
        <div className={styles.itemEditPanel}>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Name</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className={styles.editInput}
              placeholder="Item name"
            />
          </div>
          {item.description !== undefined && (
            <div className={styles.editField}>
              <label className={styles.editLabel}>Description</label>
              <input
                type="text"
                value={description}
                onChange={handleDescChange}
                className={styles.editInput}
                placeholder="Description"
              />
            </div>
          )}
          <div className={styles.editField}>
            <label className={styles.editLabel}>Price</label>
            <div className={styles.priceControls}>
              <label className={styles.priceLabel}>
                <input
                  type="checkbox"
                  checked={item.price === 0}
                  onChange={handlePriceToggle}
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
                    onChange={handlePriceChange}
                    min="0"
                    step="0.5"
                    className={styles.numberInput}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Dietary / Allergens</label>
            <div className={styles.dietaryControls}>
              {Object.entries(dietaryFlags).map(([key, flag]) => (
                <label key={key} className={styles.dietaryOption}>
                  <input
                    type="checkbox"
                    checked={(item.dietary || []).includes(key)}
                    onChange={() => handleDietaryToggle(key)}
                    className={styles.checkbox}
                  />
                  <span className={styles.dietaryLabel}>{flag.label}</span>
                  <span className={styles.dietaryName}>{flag.name.en}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuAdmin() {
  const { resortConfig, resortId } = useApp();
  const navigate = useNavigate();
  const firstCategory = resortConfig.menu.menuCategories.find(c => c.id !== 'build-your-own')?.id || 'build-your-own';
  const [activeTab, setActiveTab] = useState(firstCategory);
  const [menu, setMenu] = useState(() => getStoredMenu(resortConfig, resortId));
  const [saved, setSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState('');
  const [customSections, setCustomSections] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [lastAddedId, setLastAddedId] = useState(null);

  const menuCategories = resortConfig.menu.menuCategories;
  const dietaryFlags = resortConfig.menu.dietaryFlags;

  useEffect(() => {
    document.title = 'Menu Manager — ' + (resortConfig.branding.name.en || 'Beach Eats');
  }, [resortConfig]);

  const storageKey = getStorageKey(resortId);

  const saveMenu = (menuData) => {
    localStorage.setItem(storageKey, JSON.stringify(menuData));
  };

  const handleSave = () => {
    saveMenu(menu);
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Reset all menu items to defaults? This cannot be undone.')) {
      const defaultMenu = getDefaultMenu(resortConfig);
      setMenu(defaultMenu);
      saveMenu(defaultMenu);
      setDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const updateItem = (section, index, field, value, category) => {
    setDirty(true);
    setMenu(prev => {
      const updated = { ...prev };
      if (section === 'menuItems') {
        updated.menuItems = { ...prev.menuItems };
        updated.menuItems[category] = [...prev.menuItems[category]];
        updated.menuItems[category][index] = {
          ...updated.menuItems[category][index],
          [field]: value,
        };
      } else {
        updated[section] = [...prev[section]];
        updated[section][index] = { ...updated[section][index], [field]: value };
      }
      return updated;
    });
  };

  const toggleAvailable = (section, index, available, category) => {
    updateItem(section, index, 'available', available, category);
  };

  const addItem = (section, category) => {
    const id = `custom-${Date.now()}`;
    const newItem = {
      id,
      name: '',
      description: '',
      price: 0,
      available: true,
    };
    setLastAddedId(id);
    setDirty(true);
    setMenu(prev => {
      const updated = { ...prev };
      if (section === 'menuItems') {
        updated.menuItems = { ...prev.menuItems };
        updated.menuItems[category] = [...(prev.menuItems[category] || []), newItem];
      } else {
        updated[section] = [...prev[section], newItem];
      }
      return updated;
    });
  };

  // Generate share URLs with current config
  const guestUrl = generateShareURL(menu, '', resortConfig, resortId);
  const kitchenUrl = generateShareURL(menu, 'chef', resortConfig, resortId);

  const handleCopy = (url, label) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  const addSection = () => {
    const sectionName = prompt('Enter section name:');
    if (!sectionName || !sectionName.trim()) return;
    const sectionId = sectionName.trim().toLowerCase().replace(/\s+/g, '-');
    if (menu.menuItems[sectionId]) {
      alert('A section with that name already exists.');
      return;
    }
    setDirty(true);
    setCustomSections(prev => [...prev, { id: sectionId, label: sectionName.trim() }]);
    setMenu(prev => ({
      ...prev,
      menuItems: { ...prev.menuItems, [sectionId]: [] },
    }));
    setActiveTab(sectionId);
  };

  // Build tab list from menuCategories, with Build Your Own moved to end
  const tabs = [
    ...menuCategories.filter(cat => cat.id !== 'build-your-own'),
    ...customSections.map(s => ({ id: s.id, label: s.label })),
    ...menuCategories.filter(cat => cat.id === 'build-your-own'),
  ].map(cat => ({
    id: cat.id,
    label: cat.label || cat.name?.en,
  }));

  // Count items per tab
  const getTabCount = (tabId) => {
    if (tabId === 'build-your-own') {
      return menu.proteins.length + menu.formats.length + menu.addons.length + menu.exclusions.length;
    }
    return (menu.menuItems[tabId] || []).length;
  };

  // Sub-groups for Build Your Own
  const byoGroups = [
    { key: 'proteins', label: 'Proteins', items: menu.proteins },
    { key: 'formats', label: 'Formats', items: menu.formats },
    { key: 'addons', label: 'Add-ons', items: menu.addons },
    { key: 'exclusions', label: 'Exclusions', items: menu.exclusions },
  ];

  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Menu Manager</h1>
          <span className={styles.subtitle}>{resortConfig.branding.name.en}</span>
        </div>
        <div className={styles.headerActions}>
          <button onClick={() => {
            if (dirty) {
              const action = confirm('You have unsaved changes. Save before leaving?');
              if (action) {
                saveMenu(menu);
                setDirty(false);
              }
            }
            navigate(`/resorts/${resortId}/demo`);
          }} className={styles.backBtn}>
            Back to Demo
          </button>
          <button onClick={() => setShowShareModal(true)} className={styles.shareBtn}>
            Share
          </button>
          <button onClick={handleReset} className={styles.resetBtn}>
            Reset
          </button>
          <button onClick={handleSave} className={`${styles.saveBtn} ${saved ? styles.saved : ''}`}>
            {saved ? 'Saved' : 'Save'}
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
            <span className={styles.tabLabel}>{tab.label}</span>
            <span className={styles.tabCount}>{getTabCount(tab.id)}</span>
          </button>
        ))}
        <button className={styles.addSectionBtn} onClick={addSection}>
          + Section
        </button>
      </nav>

      <main className={styles.content}>
        {activeTab === 'build-your-own' && (
          <div className={styles.byoContent}>
            {byoGroups.map(group => (
              <div key={group.key} className={styles.subGroup}>
                <h3 className={styles.subGroupLabel}>
                  {group.label}
                  <span className={styles.subGroupCount}>{group.items.length}</span>
                </h3>
                <div className={styles.itemList}>
                  {group.items.map((item, index) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      section={group.key}
                      index={index}
                      onUpdate={updateItem}
                      onToggleAvailable={toggleAvailable}
                      dietaryFlags={dietaryFlags}
                      initialEditing={item.id === lastAddedId}
                    />
                  ))}
                </div>
                <button
                  className={styles.addItemBtn}
                  onClick={() => addItem(group.key)}
                >
                  + Add {group.label.replace(/s$/, '')}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab !== 'build-your-own' && menu.menuItems[activeTab] !== undefined && (
          <>
            {menu.menuItems[activeTab].length > 0 && (
              <div className={styles.itemList}>
                {menu.menuItems[activeTab].map((item, index) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    section="menuItems"
                    index={index}
                    category={activeTab}
                    onUpdate={updateItem}
                    onToggleAvailable={toggleAvailable}
                    dietaryFlags={dietaryFlags}
                    initialEditing={item.id === lastAddedId}
                  />
                ))}
              </div>
            )}
            <button
              className={styles.addItemBtn}
              onClick={() => addItem('menuItems', activeTab)}
            >
              + Add Item
            </button>
          </>
        )}
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className={styles.modalOverlay} onClick={() => setShowShareModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowShareModal(false)}>×</button>
            <h2 className={styles.modalTitle}>Share Your Menu</h2>
            <p className={styles.modalDesc}>
              These QR codes contain your current menu configuration.
              Scan them on any device to load the same settings.
            </p>

            <div className={styles.shareCards}>
              <div className={styles.shareCard}>
                <h3>Guest Ordering</h3>
                <img
                  src={getQRCodeUrl(guestUrl)}
                  alt="Guest ordering QR"
                  className={styles.qrCode}
                />
                <button
                  className={`${styles.copyBtn} ${copied === 'guest' ? styles.copied : ''}`}
                  onClick={() => handleCopy(guestUrl, 'guest')}
                >
                  {copied === 'guest' ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              <div className={styles.shareCard}>
                <h3>Kitchen Display</h3>
                <img
                  src={getQRCodeUrl(kitchenUrl)}
                  alt="Kitchen display QR"
                  className={styles.qrCode}
                />
                <button
                  className={`${styles.copyBtn} ${copied === 'kitchen' ? styles.copied : ''}`}
                  onClick={() => handleCopy(kitchenUrl, 'kitchen')}
                >
                  {copied === 'kitchen' ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            <p className={styles.modalNote}>
              <strong>Note:</strong> Save your changes first, then share these links.
              Anyone who scans will see your exact menu configuration.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
