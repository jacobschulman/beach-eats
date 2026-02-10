import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useCallback } from 'react';
import styles from './MarketingHome.module.css';

function useScrollAnimations() {
  const headerRef = useRef(null);
  const parallaxRefs = useRef([]);
  const animatedRefs = useRef([]);

  const addParallaxRef = useCallback((el) => {
    if (el && !parallaxRefs.current.includes(el)) parallaxRefs.current.push(el);
  }, []);

  const addAnimatedRef = useCallback((el) => {
    if (el && !animatedRefs.current.includes(el)) animatedRefs.current.push(el);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    animatedRefs.current.forEach((el) => observer.observe(el));

    // Parallax scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Header background on scroll
          if (headerRef.current) {
            if (scrollY > 60) {
              headerRef.current.classList.add(styles.headerScrolled);
            } else {
              headerRef.current.classList.remove(styles.headerScrolled);
            }
          }

          // Parallax elements
          parallaxRefs.current.forEach((el) => {
            const rate = parseFloat(el.dataset.parallaxRate || '0.3');
            const rect = el.getBoundingClientRect();
            const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
            el.style.transform = `translateY(${centerOffset * rate}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { headerRef, addParallaxRef, addAnimatedRef };
}

export default function MarketingHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const { headerRef, addParallaxRef, addAnimatedRef } = useScrollAnimations();

  useEffect(() => {
    if (location.hash === '#demo') {
      navigate('/demo');
    }
  }, [location, navigate]);

  return (
    <div className={styles.page}>

      {/* ——— Header ——— */}
      <header ref={headerRef} className={styles.header}>
        <h1 className={styles.brandName}>Beach Eats</h1>
        <button
          className={styles.headerCta}
          onClick={() => navigate('/demo')}
        >
          Request a Demo
        </button>
      </header>

      {/* ——— Hero ——— */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h2
            className={styles.heroHeadline}
            ref={addParallaxRef}
            data-parallax-rate="0.06"
          >
            Happier guests.<br />
            Seamless service.<br />
            Hospitality, <em>elevated</em>.
          </h2>
          <p className={styles.heroSub} ref={addAnimatedRef} data-delay="1">
            With Beach Eats, unlock a new service model that feels bespoke, integrates
            effortlessly, and elevates your experience — without the complexity.
          </p>
          <button
            className={styles.heroCta}
            onClick={() => navigate('/demo')}
            ref={addAnimatedRef}
            data-delay="2"
          >
            See It in Action
          </button>
        </div>
        <div className={styles.heroFade} />
      </section>

      {/* ——— Pillars Section ——— */}
      <section className={styles.pillarsSection}>
        <h3 className={styles.sectionHeadline} ref={addAnimatedRef}>
          A system designed for your guests, your team, &amp; the way
          your property <em>actually</em> works.
        </h3>

        <div className={styles.pillarsGrid}>
          <div className={styles.pillar} ref={addAnimatedRef}>
            <h4 className={styles.pillarTitle}>Put guests back in control</h4>
            <p className={styles.pillarBody}>
              Guests order on their own terms — poolside, beachside, or between
              activities — through a beautifully branded experience that feels native
              to your resort.
            </p>
          </div>

          <div className={styles.pillarDivider} />

          <div className={styles.pillar} ref={addAnimatedRef}>
            <h4 className={styles.pillarTitle}>Build happier, more efficient teams</h4>
            <p className={styles.pillarBody}>
              Orders flow directly into a real-time kitchen display, reducing
              miscommunication and manual work.
            </p>
          </div>

          <div className={styles.pillarDivider} />

          <div className={styles.pillar} ref={addAnimatedRef}>
            <h4 className={styles.pillarTitle}>Lift revenue without the heavy-lifting</h4>
            <p className={styles.pillarBody}>
              When ordering feels effortless, guests order more — another round, an
              add-on, a second visit.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Platform Section (dark) ——— */}
      <section className={styles.platformSection}>
        <div className={styles.platformInner}>
          <p className={styles.sectionEyebrowLight} ref={addAnimatedRef}>
            The Platform
          </p>
          <h3 className={styles.platformHeadline} ref={addAnimatedRef}>
            A system that fits your operation
          </h3>
          <p className={styles.platformSub} ref={addAnimatedRef}>
            Beach Eats enhances your existing tools and workflows — no rebuild required.
          </p>

          <div className={styles.platformGrid}>
            {/* Guest Ordering */}
            <div
              className={styles.platformCard}
              ref={(el) => { addAnimatedRef(el); addParallaxRef(el); }}
              data-parallax-rate="0.03"
            >
              <div className={styles.phoneMockup} aria-hidden="true">
                <div className={`${styles.phoneScreen} ${styles.mockupOrdering}`}>
                  <div className={styles.phoneNotch} />
                  <div className={styles.mockupHeader}>Poolside Menu</div>
                  <div className={styles.mockupItem}>
                    <div className={styles.mockupItemImage} />
                    <div className={styles.mockupItemText}>
                      <div className={styles.mockupItemName}>Fish Tacos</div>
                      <div className={styles.mockupItemPrice}>$18</div>
                    </div>
                  </div>
                  <div className={styles.mockupItem}>
                    <div className={styles.mockupItemImage} />
                    <div className={styles.mockupItemText}>
                      <div className={styles.mockupItemName}>Spicy Margarita</div>
                      <div className={styles.mockupItemPrice}>$16</div>
                    </div>
                  </div>
                  <div className={styles.mockupBtn}>Add to Order</div>
                </div>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardAccent} />
                <h4 className={styles.cardTitle}>Guest Ordering Portal</h4>
                <p className={styles.cardBody}>
                  A refined, mobile ordering experience fully branded to your resort.
                  QR-based, bilingual, allergy-aware, and designed to feel like a natural
                  extension of the property.
                </p>
              </div>
            </div>

            {/* Kitchen Display */}
            <div
              className={styles.platformCard}
              ref={(el) => { addAnimatedRef(el); addParallaxRef(el); }}
              data-parallax-rate="0.05"
            >
              <div className={styles.phoneMockup} aria-hidden="true">
                <div className={`${styles.phoneScreen} ${styles.mockupKitchen}`}>
                  <div className={styles.phoneNotch} />
                  <div className={styles.mockupHeader}>Live Orders</div>
                  <div className={`${styles.mockupTicket} ${styles.mockupTicketNew}`}>
                    <div className={styles.mockupTicketHeader}>
                      <span className={styles.mockupTicketId}>#1024</span>
                      <span className={styles.mockupTicketTime}>Just now</span>
                    </div>
                    <div className={styles.mockupTicketItems}>2x Fish Tacos, 1x Margarita</div>
                  </div>
                  <div className={styles.mockupTicket}>
                    <div className={styles.mockupTicketHeader}>
                      <span className={styles.mockupTicketId}>#1023</span>
                      <span className={styles.mockupTicketTime}>2m ago</span>
                    </div>
                    <div className={styles.mockupTicketItems}>1x Ceviche, 2x Corona</div>
                  </div>
                  <div className={styles.mockupTicket}>
                    <div className={styles.mockupTicketHeader}>
                      <span className={styles.mockupTicketId}>#1022</span>
                      <span className={styles.mockupTicketTime}>5m ago</span>
                    </div>
                    <div className={styles.mockupTicketItems}>1x Burger, 1x Fries</div>
                  </div>
                </div>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardAccent} />
                <h4 className={styles.cardTitle}>Kitchen POS Integration</h4>
                <p className={styles.cardBody}>
                  Orders route directly into your existing POS and billing systems,
                  flowing seamlessly to kitchen displays and staff workflows.
                </p>
              </div>
            </div>

            {/* Menu Manager */}
            <div
              className={styles.platformCard}
              ref={(el) => { addAnimatedRef(el); addParallaxRef(el); }}
              data-parallax-rate="0.03"
            >
              <div className={styles.phoneMockup} aria-hidden="true">
                <div className={`${styles.phoneScreen} ${styles.mockupAdmin}`}>
                  <div className={styles.phoneNotch} />
                  <div className={styles.mockupHeader}>Menu Items</div>
                  <div className={styles.mockupMenuRow}>
                    <span className={styles.mockupMenuName}>Fish Tacos</span>
                    <div className={styles.mockupMenuRight}>
                      <span className={styles.mockupMenuPrice}>$18</span>
                      <span className={styles.mockupToggle} />
                    </div>
                  </div>
                  <div className={styles.mockupMenuRow}>
                    <span className={styles.mockupMenuName}>Ceviche</span>
                    <div className={styles.mockupMenuRight}>
                      <span className={styles.mockupMenuPrice}>$22</span>
                      <span className={styles.mockupToggle} />
                    </div>
                  </div>
                  <div className={styles.mockupMenuRow}>
                    <span className={styles.mockupMenuName}>Churros</span>
                    <div className={styles.mockupMenuRight}>
                      <span className={styles.mockupMenuPrice}>$12</span>
                      <span className={`${styles.mockupToggle} ${styles.mockupToggleOff}`} />
                    </div>
                  </div>
                  <div className={styles.mockupMenuRow}>
                    <span className={styles.mockupMenuName}>Margarita</span>
                    <div className={styles.mockupMenuRight}>
                      <span className={styles.mockupMenuPrice}>$16</span>
                      <span className={styles.mockupToggle} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardAccent} />
                <h4 className={styles.cardTitle}>Menu Manager</h4>
                <p className={styles.cardBody}>
                  Update menus, pricing, and availability in real time. Generate QR codes
                  instantly and make changes on the fly — all without developer support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner} ref={addAnimatedRef}>
          <h2 className={styles.ctaHeadline}>Ready to see it live?</h2>
          <button
            className={styles.ctaPrimary}
            onClick={() => navigate('/demo')}
          >
            Get a Demo
          </button>
        </div>
      </section>

      {/* ——— Footer ——— */}
      <footer className={styles.footer}>
        <p className={styles.footerBrand}>Beach Eats</p>
        <p className={styles.footerNote}>Custom-built digital ordering for resort hospitality</p>
      </footer>

    </div>
  );
}
