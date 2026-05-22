"use client";
export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";

export default function ShopPage() {
  const { addItem } = useCart() ?? { addItem: () => {} };
  const router = useRouter();

  const products = [
  { id: 1, img: "/product-1.jpg", name: "red paperboard container", description: "A red paperboard container with a yellow McDonald's logo holds numerous golden fried", price: 0, badge: "NEW" },
  { id: 2, img: "/product-2.jpg", name: "golden-brown sesame bun", description: "A golden-brown sesame bun double cheeseburger with two melted cheese patties, lettuce,", price: 30, badge: "" },
  { id: 3, img: "/product-3.jpg", name: "golden-brown pepperoni pizza", description: "A golden-brown pepperoni pizza with a lifted slice showcasing stringy melted cheese and a", price: 40, badge: "" },
  { id: 4, img: "/product-4.jpg", name: "pile golden-brown fried", description: "A pile of golden-brown fried chicken tenders, one broken to show white meat, with a small", price: 50, badge: "" }
];

  const filters = ["All Products", "Burgers", "Fries", "Pizza", "Chicken"];
  const [activeFilter, setActiveFilter] = useState("All Products");
  const [addedStates, setAddedStates] = useState<{ [key: number]: boolean }>({});
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const revealRefs = useRef<HTMLElement[]>([]);

  const { items } = (useCart() ?? { items: [] }) as { items: { quantity: number }[] };

  useEffect(() => {
    if (items) {
      setCartCount(items.reduce((acc: number, i: { quantity: number }) => acc + i.quantity, 0));
    }
  }, [items]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0px)";
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    const revealEls = document.querySelectorAll(".reveal");
    revealEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(24px)";
      htmlEl.style.transition = "opacity 600ms ease-out, transform 600ms ease-out";
      observer.observe(htmlEl);
    });
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (p: typeof products[0]) => {
    addItem({ id: crypto.randomUUID(), name: p.name, price: p.price, quantity: 1, image: p.img });
    setAddedStates((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => setAddedStates((prev) => ({ ...prev, [p.id]: false })), 1500);
  };

  const filteredProducts =
    activeFilter === "All Products"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital@1&display=swap" rel="stylesheet" />

      <style>{`
        :root {
          --bg: #FDF8F4;
          --surface: #D4A574;
          --primary: #1A1A1A;
          --accent: #E8913D;
          --text: #1A1A1A;
          --muted: #C9A882;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: var(--bg); }
        .card-hover { transition: transform 300ms cubic-bezier(0.4,0,0.2,1), box-shadow 300ms cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .btn-hover { transition: transform 200ms ease, box-shadow 200ms ease; }
        .btn-hover:hover { transform: translateY(-4px); box-shadow: 0 6px 16px rgba(0,0,0,0.18); }
        .btn-press:active { transform: scale(0.98) !important; }
        .img-zoom img { transition: transform 600ms ease; }
        .img-zoom:hover img { transform: scale(1.05); }
        .circle-zoom { transition: transform 280ms cubic-bezier(0.4,0,0.2,1), box-shadow 280ms cubic-bezier(0.4,0,0.2,1); }
        .circle-zoom:hover { transform: scale(1.04); box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
        @media (max-width: 768px) {
          .grid-cols-3 { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .hero-text h1 { font-size: clamp(2.2rem, 8vw, 3.5rem) !important; }
          .section-pad { padding: 64px 24px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .story-split { flex-direction: column !important; }
          .story-left { width: 100% !important; padding: 48px 24px !important; }
          .story-right { width: 100% !important; height: 300px !important; }
          .usps-grid { grid-template-columns: 1fr !important; }
          .spotlight-flex { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .grid-cols-3 { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .grid-cols-3 { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }
        input:focus { outline: 2px solid var(--accent); outline-offset: 2px; }
        button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
      `}</style>

      {/* NAVIGATION */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: scrolled ? "#FFDE34" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.1)" : "none",
        transition: "background-color 250ms ease, border-bottom 250ms ease",
        padding: "0 40px", height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Mobile hamburger */}
        <button
          className="show-mobile btn-press"
          onClick={() => setMobileNavOpen(true)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px", flexDirection: "column", gap: "5px" }}
          aria-label="Open menu"
        >
          {[0,1,2].map((i) => (
            <span key={i} style={{ display: "block", width: "24px", height: "2px", backgroundColor: scrolled ? "#232323" : "#232323", borderRadius: "2px" }} />
          ))}
        </button>

        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#E8913D" />
            <text x="6" y="23" fontFamily="Space Grotesk" fontWeight="700" fontSize="18" fill="#FDF8F4">C</text>
          </svg>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: scrolled ? "#232323" : "var(--text)", letterSpacing: "-0.02em" }}>Crispco</span>
        </div>

        {/* Desktop nav links */}
        <div className="hide-mobile" style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {[
            { label: "Menu", action: () => router.push("/shop") },
            { label: "Our Story", action: () => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" }) },
            { label: "Why Us", action: () => document.getElementById("why-us")?.scrollIntoView({ behavior: "smooth" }) },
          ].map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "1rem", color: scrolled ? "#232323" : "var(--text)", letterSpacing: "0.01em" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Cart icon */}
        <button
          onClick={() => router.push("/checkout")}
          style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "8px" }}
          aria-label="Cart"
          className="btn-press"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={scrolled ? "#232323" : "var(--text)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: "2px", right: "2px",
              width: "20px", height: "20px", borderRadius: "50%",
              backgroundColor: "#FF3E3E", color: "#fff",
              fontSize: "11px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{cartCount}</span>
          )}
        </button>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      {mobileNavOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          backgroundColor: "#fff",
          display: "flex", flexDirection: "column",
          padding: "40px 32px",
          animation: "slideInLeft 350ms ease-out",
        }}>
          <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
          <button
            onClick={() => setMobileNavOpen(false)}
            style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", cursor: "pointer", padding: "8px" }}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#232323" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div onClick={() => { router.push("/"); setMobileNavOpen(false); }} style={{ cursor: "pointer", marginBottom: "48px", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#E8913D" /><text x="6" y="23" fontFamily="Space Grotesk" fontWeight="700" fontSize="18" fill="#FDF8F4">C</text></svg>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#232323" }}>Crispco</span>
          </div>
          {[
            { label: "Menu", action: () => { router.push("/shop"); setMobileNavOpen(false); } },
            { label: "Our Story", action: () => { setMobileNavOpen(false); setTimeout(() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" }), 400); } },
            { label: "Why Us", action: () => { setMobileNavOpen(false); setTimeout(() => document.getElementById("why-us")?.scrollIntoView({ behavior: "smooth" }), 400); } },
          ].map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              style={{ background: "none", border: "none", borderBottom: "1px solid #F0EDE8", cursor: "pointer", textAlign: "left", padding: "16px 0", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.75rem", color: "#232323", letterSpacing: "-0.02em", height: "60px", display: "flex", alignItems: "center" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* SHOP HERO BANNER */}
      <section style={{ position: "relative", width: "100%", minHeight: "55vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/product-1.jpg"
            alt="Golden crispy fries in red paperboard container"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)" }} />
        </div>
        <div className="hero-text" style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", width: "100%", padding: "120px 48px 80px" }}>
          <span style={{ display: "inline-block", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, color: "#FFDE34", marginBottom: "16px", fontFamily: "'DM Sans', sans-serif" }}>The Full Menu</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#FFFFFF", maxWidth: "640px" }}>
            Every Bite.<br />Golden.
          </h1>
          <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", lineHeight: 1.5, color: "#FFFFFF", marginTop: "16px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em", opacity: 0.9 }}>
            Crispy, Golden, Irresistible.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "32px", marginTop: "32px", flexWrap: "wrap" }}>
            <span style={{ color: "#FFFFFF", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", opacity: 0.85 }}>
              ⭐ 4.9 / 5
            </span>
            <span style={{ color: "#FFFFFF", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", opacity: 0.85 }}>
              2M+ Happy Customers
            </span>
            <span style={{ color: "#FFFFFF", fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", opacity: 0.85 }}>
              Free delivery over ₹299
            </span>
          </div>
        </div>
      </section>

      {/* FILTER PILLS + PRODUCT GRID */}
      <section className="section-pad" style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 48px" }}>
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: "48px" }}>
          <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, color: "var(--muted)", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "12px" }}>Browse Everything</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text)" }}>The Golden Archives</h2>
        </div>

        {/* Filter pills */}
        <div className="reveal" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }} data-delay="100">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="btn-press"
              style={{
                height: "36px", padding: "0 20px", borderRadius: "9999px",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.8rem",
                letterSpacing: "0.02em",
                backgroundColor: activeFilter === f ? "#FF3E3E" : "#F0EDE8",
                color: activeFilter === f ? "#FFFFFF" : "#4A4A4A",
                border: activeFilter === f ? "none" : "1px solid #D0D0D0",
                transition: "background-color 180ms ease, color 180ms ease, border-color 180ms ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          className="grid-cols-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}
        >
          {filteredProducts.map((p, idx) => (
            <article
              key={p.id}
              className="reveal card-hover"
              data-delay={`${idx * 80}`}
              style={{
                borderRadius: "12px", backgroundColor: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                overflow: "hidden", position: "relative", cursor: "pointer",
                display: "flex", flexDirection: "column",
              }}
            >
              {/* Card image — top 70% */}
              <div
                className="img-zoom"
                onClick={() => router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`)}
                style={{ overflow: "hidden", aspectRatio: "4/3", backgroundColor: "#F0EDE8", flexShrink: 0 }}
              >
                <img
                  src={p.img}
                  alt={p.description}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
              </div>

              {/* Card info — bottom 30% */}
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  onClick={() => router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`)}
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#232323", letterSpacing: "-0.02em", cursor: "pointer", textTransform: "capitalize" }}
                >
                  {p.name}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#4A4A4A", marginTop: "4px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>
                  {p.descriptor}
                </p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#FF3E3E", marginTop: "8px" }}>
                  ₹{p.price.toLocaleString("en-IN")}
                </p>
                <button
                  onClick={() => handleAddToCart(p)}
                  className="btn-press"
                  style={{
                    marginTop: "16px", height: "40px", width: "100%",
                    backgroundColor: addedStates[p.id] ? "#E8913D" : "#FFDE34",
                    color: "#232323", border: "none", borderRadius: "9999px",
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem",
                    letterSpacing: "0.01em",
                    transition: "background-color 200ms ease, transform 200ms ease",
                  }}
                >
                  {addedStates[p.id] ? "✓ Added!" : "Add to Cart"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* VISUAL FINGERPRINT — CIRCULAR PRODUCT SPOTLIGHT */}
      <section style={{ backgroundColor: "#FFDE34", padding: "96px 48px", overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "64px" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, color: "#232323", opacity: 0.6, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "12px" }}>Star Items</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#232323" }}>Our Craveable Icons</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {products.map((p, idx) => (
              <div
                key={p.id}
                className={`reveal spotlight-flex`}
                data-delay={`${idx * 100}`}
                style={{ display: "flex", alignItems: "center", gap: "32px", flexDirection: idx % 2 === 0 ? "row" : "row-reverse", cursor: "pointer" }}
                onClick={() => router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`)}
              >
                {/* Circular image */}
                <div
                  className="circle-zoom"
                  style={{
                    borderRadius: "50%", aspectRatio: "1/1",
                    width: "clamp(200px, 25vw, 320px)",
                    minWidth: "clamp(200px, 25vw, 320px)",
                    overflow: "hidden", flexShrink: 0,
                    backgroundColor: idx % 2 === 0 ? "#FF3E3E" : "#232323",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.description}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                </div>

                {/* Off-grid text label */}
                <div style={{ marginLeft: idx % 2 === 0 ? "-24px" : "0", marginRight: idx % 2 !== 0 ? "-24px" : "0" }}>
                  <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, color: "#232323", opacity: 0.6, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "8px" }}>{p.category}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#232323", lineHeight: 1.05, textTransform: "capitalize" }}>
                    {p.name}
                  </h3>
                  <p style={{ marginTop: "12px", fontSize: "1rem", lineHeight: 1.65, color: "#4A4A4A", maxWidth: "400px", fontFamily: "'DM Sans', sans-serif" }}>
                    {p.description}
                  </p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#FF3E3E", marginTop: "16px" }}>
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`); }}
                    className="btn-hover btn-press"
                    style={{ marginTop: "24px", height: "48px", padding: "0 32px", backgroundColor: "#232323", color: "#FFDE34", border: "none", borderRadius: "9999px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", letterSpacing: "0.02em" }}
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="our-story" style={{ overflow: "hidden" }}>
        <div className="story-split" style={{ display: "flex", minHeight: "600px" }}>
          {/* Left text */}
          <div className="story-left" style={{ width: "60%", padding: "80px 60px", backgroundColor: "#F0EDE8", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="reveal" style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, color: "var(--muted)", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "12px" }}>Our Flavor Journey</span>
            <h2 className="reveal" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#232323", lineHeight: 1.1 }} data-delay="80">
              Born from a love<br />of the golden crunch.
            </h2>
            <p className="reveal" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "#4A4A4A", marginTop: "24px", maxWidth: "480px", fontFamily: "'DM Sans', sans-serif" }} data-delay="160">
              Crispco started with one obsession: making every bite as satisfying as the first. We source the finest potatoes, perfecting the double-fry technique that delivers that signature shatter-and-melt texture. Every product is made fresh, never frozen, because your hunger deserves the real thing.
            </p>
            <button
              onClick={() => router.push("/shop")}
              className="btn-press"
              style={{ marginTop: "32px", height: "48px", width: "160px", backgroundColor: "#FF3E3E", color: "#FFFFFF", border: "none", borderRadius: "4px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "1rem", transition: "transform 200ms ease, background-color 200ms ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.backgroundColor = "#CC2E2E"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.backgroundColor = "#FF3E3E"; }}
            >
              READ MORE
            </button>
          </div>
          {/* Right image */}
          <div className="story-right" style={{ width: "40%", overflow: "hidden" }}>
            <img
              src="/product-1.jpg"
              alt="Golden fries being prepared — the Crispco story"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE OUR CRUNCH? */}
      <section id="why-us" className="section-pad" style={{ padding: "96px 48px", backgroundColor: "#F5F5F5" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="reveal" style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, color: "var(--muted)", fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: "12px" }}>The Crispco Difference</span>
            <h2 className="reveal" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#232323" }} data-delay="80">
              Why Choose Our Crunch?
            </h2>
          </div>
          <div className="usps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
            {[
              {
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M32 8L36 24H52L40 34L44 50L32 40L20 50L24 34L12 24H28L32 8Z" stroke="#FF3E3E" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                    <path d="M32 20V44M20 32H44" stroke="#FF3E3E" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
                title: "Lightning Fast Delivery",
                body: "Hot, fresh, and at your door in under 30 minutes. Our delivery network is built for speed without compromising temperature.",
              },
              {
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M32 10C20 10 12 20 12 28C12 36 18 42 24 44V52H40V44C46 42 52 36 52 28C52 20 44 10 32 10Z" stroke="#FF3E3E" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                    <path d="M26 28L30 32L38 22" stroke="#FF3E3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Chef-Grade Quality",
                body: "Every item crafted using restaurant-quality techniques. Our recipes are tested over 200+ iterations before reaching your plate.",
              },
              {
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M32 12C26 12 18 18 18 28C18 36 24 40 32 52C40 40 46 36 46 28C46 18 38 12 32 12Z" stroke="#FF3E3E" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                    <circle cx="32" cy="28" r="5" stroke="#FF3E3E" strokeWidth="2" fill="none" />
                  </svg>
                ),
                title: "Farm-Fresh Ingredients",
                body: "Sourced directly from trusted farms across India. Zero preservatives, zero compromises — just honest, golden food.",
              },
            ].map((usp, idx) => (
              <div
                key={usp.title}
                className="reveal"
                data-delay={`${idx * 100}`}
                style={{ padding: "40px", borderRadius: "12px", backgroundColor: "#FFFFFF" }}
              >
                {usp.icon}
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.5rem", color: "#232323", marginTop: "24px", letterSpacing: "-0.02em" }}>{usp.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#4A4A4A", lineHeight: 1.65, marginTop: "16px" }}>{usp.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* JOIN THE FLAVOR REVOLUTION */}
      <section style={{ backgroundColor: "#232323", padding: "60px 48px", overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 60%", minWidth: "280px" }}>
            <h2 className="reveal" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#FFDE34" }}>
              Ready for your<br />golden moment?
            </h2>
            <p className="reveal" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", color: "#FFFFFF", opacity: 0.8, marginTop: "16px", lineHeight: 1.65 }} data-delay="80">
              Every craving starts here. Browse our full menu and order your feast right now.
            </p>
            <button
              className="reveal btn-press"
              data-delay="160"
              onClick={() => router.push("/shop")}
              style={{ marginTop: "32px", height: "56px", minWidth: "280px", padding: "0 32px", backgroundColor: "#FF3E3E", color: "#FFFFFF", border: "none", borderRadius: "9999px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "1.125rem", letterSpacing: "0.01em" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(255,62,62,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              ORDER YOUR FEAST!
            </button>
          </div>
          <div className="reveal" data-delay="200" style={{ flex: "0 0 clamp(200px, 30%, 300px)", aspectRatio: "1/1", borderRadius: "16px", overflow: "hidden" }}
            onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement | null; if (img) img.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement | null; if (img) img.style.transform = "scale(1)"; }}
          >
            <img
              src="/product-1.jpg"
              alt="Golden fries — order your feast"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 400ms ease" }}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#232323", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 48px 0" }}>
        <div className="footer-grid" style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "48px", paddingBottom: "64px" }}>
          {/* Col 1 */}
          <div>
            <div onClick={() => router.push("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#E8913D" /><text x="6" y="23" fontFamily="Space Grotesk" fontWeight="700" fontSize="18" fill="#FDF8F4">C</text></svg>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#FFFFFF", letterSpacing: "-0.02em" }}>Crispco</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#FFFFFF", opacity: 0.8, lineHeight: 1.65, marginBottom: "24px" }}>
              Taste the Golden Standard.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {[
                { label: "Instagram", href: "https://instagram.com", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { label: "Facebook", href: "https://facebook.com", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { label: "TikTok", href: "https://tiktok.com", path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.35a8.16 8.16 0 004.77 1.52V7.44a4.85 4.85 0 01-1-.75z" },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)", transition: "background-color 200ms ease" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFDE34", marginBottom: "20px" }}>Shop</h4>
            {["Full Menu", "Bundles", "Gift Cards", "Seasonal Specials"].map((link) => (
              <button key={link} onClick={() => router.push("/shop")} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#FFFFFF", lineHeight: 2.2, textAlign: "left", padding: 0, opacity: 0.85, transition: "opacity 150ms ease" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
              >{link}</button>
            ))}
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFDE34", marginBottom: "20px" }}>Learn</h4>
            {["Our Story", "Ingredients", "FAQs", "Contact Us"].map((link) => (
              <button key={link} onClick={() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#FFFFFF", lineHeight: 2.2, textAlign: "left", padding: 0, opacity: 0.85, transition: "opacity 150ms ease" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.85"}
              >{link}</button>
            ))}
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.25rem", color: "#FFDE34", marginBottom: "16px" }}>Stay Golden.</h4>
            {subscribed ? (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#FFDE34", lineHeight: 1.65 }}>
                You're in! 🎉 Golden deals incoming.
              </p>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ height: "52px", width: "100%", backgroundColor: "#4A4A4A", border: "none", borderRadius: "9999px", padding: "0 24px", color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
                />
                <button
                  onClick={() => { if (email) { setSubscribed(true); setEmail(""); } }}
                  className="btn-press"
                  style={{ marginTop: "16px", height: "52px", width: "100%", backgroundColor: "#FF3E3E", color: "#FFFFFF", border: "none", borderRadius: "9999px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "1rem" }}
                >
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer bottom strip */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "32px", paddingBottom: "32px", maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "#FFFFFF", opacity: 0.6 }}>
            © 2026 Crispco. All rights reserved.{" "}
            <button onClick={() => router.push("/shop")} style={{ background: "none", border: "none", cursor: "pointer", color: "#FFFFFF", opacity: 0.6, fontSize: "0.8125rem", fontFamily: "'DM Sans', sans-serif", textDecoration: "underline" }}>Privacy Policy</button>
            {" · "}
            <button onClick={() => router.push("/shop")} style={{ background: "none", border: "none", cursor: "pointer", color: "#FFFFFF", opacity: 0.6, fontSize: "0.8125rem", fontFamily: "'DM Sans', sans-serif", textDecoration: "underline" }}>Terms of Service</button>
          </p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {["VISA", "MC", "AMEX", "UPI"].map((pm) => (
              <div key={pm} style={{ height: "28px", padding: "0 8px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", color: "#FFFFFF", fontWeight: 600, letterSpacing: "0.04em" }}>{pm}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { quote: "Honestly the crispiest fries I've ever had delivered to my door. Nothing comes close.", name: "Priya M., Mumbai" },
    { quote: "The double cheeseburger is unreal. I've been ordering every single week since I discovered Crispco.", name: "Rahul K., Bengaluru" },
    { quote: "Finally, a brand that gets it right. Hot, fresh, perfectly seasoned. This is fast food done right.", name: "Sneha T., Delhi" },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ backgroundColor: "#FFDE34", padding: "100px 40px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#232323", lineHeight: 1.3, transition: "opacity 400ms ease", minHeight: "clamp(100px, 15vw, 180px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          "{testimonials[active].quote}"
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "1.125rem", color: "#232323", marginTop: "32px" }}>
          — {testimonials[active].name}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "32px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: "10px", height: "10px", borderRadius: "50%", border: "none", cursor: "pointer", backgroundColor: active === i ? "#232323" : "rgba(35,35,35,0.35)", padding: 0, transition: "background-color 250ms ease" }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}