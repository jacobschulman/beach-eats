import { useNavigate } from 'react-router-dom';
import styles from './MarketingHome.module.css';

export default function MarketingHome() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.brandName}>Beach Eats</h1>
        <button
          className={styles.headerLink}
          onClick={() => navigate('/demo')}
        >
          Request a Demo
        </button>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <h2 className={styles.heroHeadline}>
          Digital ordering for resort hospitality
        </h2>
        <p className={styles.heroSub}>
          Built from both sides of service — by people who've been the guest
          waiting, and who understand what your team needs to deliver.
        </p>
        <button
          className={styles.heroCta}
          onClick={() => navigate('/demo')}
        >
          See It in Action
        </button>
      </section>

      <hr className={styles.divider} />

      {/* Pillars */}
      <section className={styles.pillarsSection}>
        <p className={styles.sectionLabel}>Why Beach Eats</p>

        <div className={styles.pillarsGrid}>
          <div className={styles.pillar}>
            <h3 className={styles.pillarHeadline}>
              Elevate the guest experience
            </h3>
            <p className={styles.pillarBody}>
              We built this because we've been the guest — settled into a lounge
              chair, ready to order, watching staff walk past. Beach Eats puts
              ordering in your guests' hands. Bilingual, allergy-aware, and
              designed to feel like a natural extension of your resort — not a
              tech product bolted on.
            </p>
          </div>

          <div className={styles.pillar}>
            <h3 className={styles.pillarHeadline}>
              Simplify shifts &amp; increase efficiency
            </h3>
            <p className={styles.pillarBody}>
              Orders flow directly to a real-time kitchen display — no paper
              tickets getting lost, no miscommunication across the pool deck.
              Your team spends less time taking orders and more time delivering
              great service. Menu changes happen in seconds.
            </p>
          </div>

          <div className={styles.pillar}>
            <h3 className={styles.pillarHeadline}>
              Drive incremental revenue
            </h3>
            <p className={styles.pillarBody}>
              When ordering is effortless, guests order more — it's that simple.
              Capture the revenue you lose every time someone decides it's not
              worth flagging down a server. Built-in customization and add-ons
              lift average ticket naturally, without any upsell pressure your
              guests can feel.
            </p>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* Product Overview */}
      <section className={styles.productSection}>
        <div className={styles.productInner}>
          <p className={styles.sectionLabel}>The Platform</p>

          <div className={styles.productsGrid}>
            <div className={styles.productCard}>
              <h3 className={styles.productTitle}>Guest Ordering</h3>
              <p className={styles.productBody}>
                A mobile ordering experience that feels like your resort, not a
                tech demo. QR code to confirmation in under a minute —
                bilingual, allergy-aware, fully branded.
              </p>
            </div>

            <div className={styles.productCard}>
              <h3 className={styles.productTitle}>Kitchen Display</h3>
              <p className={styles.productBody}>
                A real-time order queue built for the pace of high-volume
                service. Every order timestamped, tracked, and visible — no
                paper, no shouting, no guessing.
              </p>
            </div>

            <div className={styles.productCard}>
              <h3 className={styles.productTitle}>Menu Manager</h3>
              <p className={styles.productBody}>
                Your menu, updated in seconds. Toggle availability, adjust
                pricing, generate QR codes — all from your phone, no developer
                required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaHeadline}>Ready to see it live?</h2>
        <button
          className={styles.ctaPrimary}
          onClick={() => navigate('/demo')}
        >
          Get a Demo
        </button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>Beach Eats</p>
      </footer>

    </div>
  );
}
