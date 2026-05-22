"use client";
export const dynamic = 'force-dynamic';

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";

const PRODUCTS = [
  { id: 1, img: "/product-1.jpg", name: "red paperboard container", description: "A red paperboard container with a yellow McDonald's logo holds numerous golden fried potato sticks.", price: 199 },
  { id: 2, img: "/product-2.jpg", name: "golden-brown sesame bun", description: "A golden-brown sesame bun double cheeseburger with two melted cheese patties, lettuce, tomato, onion, pickles, and cream.", price: 30 },
  { id: 3, img: "/product-3.jpg", name: "golden-brown pepperoni pizza", description: "A golden-brown pepperoni pizza with a lifted slice showcasing stringy melted cheese and a steel server with wood handle.", price: 40 },
  { id: 4, img: "/product-4.jpg", name: "pile golden-brown fried", description: "A pile of golden-brown fried chicken tenders, one broken to show white meat, with a small white bowl of red dipping sauce.", price: 50 },
];

const REVIEWS = [
  { name: "Priya S.", date: "12 Jan 2025", rating: 5, text: "Absolutely crispy perfection. These fries hit different — golden, crunchy, and seasoned just right. Ordered twice this week!" },
  { name: "Arjun M.", date: "3 Feb 2025", rating: 5, text: "The texture is unreal. Not a single soggy fry in the box. Crispco truly lives up to its name. Will be back for more." },
  { name: "Kavya R.", date: "19 Mar 2025", rating: 4, text: "Loved the freshness and the packaging is so cute. Slight delay in delivery but worth every bite. Highly recommend!" },
  { name: "Rohit T.", date: "7 Apr 2025", rating: 5, text: "Best fries I've had outside a restaurant. The crunch is audible. Game-changing snack experience." },
];

const SIZE_OPTIONS = ["Regular", "Large", "XL Party"];
const FLAVOUR_OPTIONS = ["Classic Salted", "Peri-Peri", "Cheese & Herbs", "BBQ Smoked"];

function NavBar() {
  const router = useRouter();
  const { items } = useCart() ?? { items: [] };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = items?.reduce((a: number, i: any) => a + i.quantity, 0) ?? 0;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBg = scrolled ? "#FFDE34" : "transparent";
  const navText = scrolled ? "#1A1A1A" : "#1A1A1A";

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: navBg, borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none", transition: "background 250ms ease, border-bottom 250ms ease", padding: "0 40px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#E8913D"/>
            <text x="18" y="24" textAnchor="middle" fill="#FDF8F4" fontSize="14" fontWeight="700" fontFamily="Space Grotesk, sans-serif">C</text>
          </svg>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: navText, letterSpacing: "-0.03em" }}>Crispco</span>
        </button>

        <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="desktop-nav">
          {[["Menu", "/shop"], ["Our Story", "/"], ["Why Us", "/"]].map(([label, path]) => (
            <button key={label} onClick={() => router.push(path)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.9375rem", color: navText, padding: "4px 0" }}>{label}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => router.push("/checkout")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={navText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "18px", height: "18px", borderRadius: "50%", background: "#FF3E3E", color: "#fff", fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
            )}
          </button>
          <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "none" }} className="hamburger-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={navText} strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "#fff", display: "flex", flexDirection: "column", padding: "24px 32px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "48px" }}>
            <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          {[["Menu", "/shop"], ["Our Story", "/"], ["Why Us", "/"]].map(([label, path]) => (
            <button key={label} onClick={() => { router.push(path); setMobileOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.75rem", color: "#1A1A1A", padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.06)", letterSpacing: "-0.02em" }}>{label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= rating ? "#E8913D" : "#D0D0D0"}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}

function ProductContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart() ?? { addItem: () => {} };

  const paramImg   = searchParams.get("img")   ? decodeURIComponent(searchParams.get("img")!)   : null;
  const paramName  = searchParams.get("name")  ? decodeURIComponent(searchParams.get("name")!)  : null;
  const paramPrice = searchParams.get("price") ? Number(searchParams.get("price"))               : null;

  const displayImg   = paramImg  ?? "/product-1.jpg";
  const displayName  = paramName ?? "red paperboard container";
  const rawPrice     = paramPrice && paramPrice > 0 ? paramPrice : 199;
  const displayPrice = rawPrice;

  const product = PRODUCTS.find(p => p.name === displayName) ?? PRODUCTS[0];

  const thumbnails = [displayImg, "/product-2.jpg", "/product-3.jpg", "/product-4.jpg"];

  const [activeThumb, setActiveThumb]     = useState(0);
  const [selectedSize, setSelectedSize]   = useState("Regular");
  const [selectedFlavour, setSelectedFlavour] = useState("Classic Salted");
  const [quantity, setQuantity]           = useState(1);
  const [added, setAdded]                 = useState(false);
  const [lightbox, setLightbox]           = useState(false);
  const [revealed, setRevealed]           = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setRevealed(true); }),
      { threshold: 0.1 }
    );
    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { try { document.body.removeChild(script); } catch {} };
  }, []);

  const handleAddToCart = () => {
    addItem({ id: `product-${product.id}-${selectedSize}-${selectedFlavour}`, name: displayName, price: displayPrice, quantity, image: displayImg });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem({ id: `product-${product.id}-${selectedSize}-${selectedFlavour}`, name: displayName, price: displayPrice, quantity, image: displayImg });
    router.push("/checkout");
  };

  const priceMultiplier = selectedSize === "Large" ? 1.3 : selectedSize === "XL Party" ? 1.7 : 1;
  const finalPrice = Math.round(displayPrice * priceMultiplier);

  const relatedProducts = PRODUCTS.filter(p => p.name !== displayName).slice(0, 3);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <NavBar />

      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital@1&display=swap" rel="stylesheet" />

      {/* Main Product Section */}
      <section style={{ paddingTop: "68px", background: "var(--bg)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 40px", display: "grid", gridTemplateColumns: "55% 45%", gap: "64px", alignItems: "start" }}>

          {/* Left: Sticky Image Gallery */}
          <div style={{ position: "sticky", top: "88px" }}>
            {/* Main Image */}
            <div
              style={{ borderRadius: "20px", overflow: "hidden", background: "#F0EDE8", cursor: "zoom-in", marginBottom: "16px", position: "relative" }}
              onClick={() => setLightbox(true)}
            >
              <img
                src={thumbnails[activeThumb]}
                alt={`${displayName} - main product view`}
                style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center", transition: "transform 600ms ease", display: "block" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", bottom: "16px", right: "16px", background: "rgba(255,255,255,0.9)", borderRadius: "8px", padding: "6px 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, color: "#1A1A1A" }}>Click to zoom</span>
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "8px" }}>
              {thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  style={{ width: "80px", height: "80px", borderRadius: "8px", overflow: "hidden", border: activeThumb === i ? "2px solid #FF3E3E" : "2px solid transparent", cursor: "pointer", padding: 0, background: "#F0EDE8", flexShrink: 0, transition: "border-color 180ms ease" }}
                >
                  <img src={thumb} alt={`Product thumbnail ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>

            {/* Trust badges */}
            <div style={{ marginTop: "24px", padding: "20px", background: "#fff", borderRadius: "16px", display: "flex", gap: "24px", flexWrap: "wrap", boxShadow: "0 4px 16px rgba(26,26,26,0.06)" }}>
              {[
                { icon: "🚚", label: "Free delivery above ₹499" },
                { icon: "✓", label: "Made Fresh Daily" },
                { icon: "★", label: "4.9 / 5 Rating" },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>{b.icon}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "var(--muted)" }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "16px" }}>
            {/* Eyebrow */}
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--accent)" }}>
              Crispco Signature
            </span>

            {/* Product Name */}
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--text)", margin: 0, textTransform: "capitalize" }}>
              {displayName.replace(/-/g, " ")}
            </h1>

            {/* Rating row */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <StarRating rating={5} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted)" }}>4.9 (128 reviews)</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#2CB67D", fontWeight: 600 }}>● In Stock</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "2rem", color: "#FF3E3E" }}>₹{finalPrice.toLocaleString("en-IN")}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "var(--muted)", textDecoration: "line-through" }}>₹{Math.round(finalPrice * 1.2).toLocaleString("en-IN")}</span>
              <span style={{ background: "#FFDE34", color: "#1A1A1A", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "12px", padding: "4px 10px", borderRadius: "999px" }}>20% OFF</span>
            </div>

            {/* Description */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "#4A4A4A", margin: 0, maxWidth: "520px" }}>
              {product.description} Cooked fresh to order, our signature golden fries deliver the perfect crunch in every bite — seasoned with our secret spice blend for that irresistible flavour.
            </p>

            <div style={{ width: "48px", height: "2px", background: "var(--accent)", borderRadius: "2px" }} />

            {/* Size Variant */}
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text)", marginBottom: "12px" }}>Size</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {SIZE_OPTIONS.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px",
                      height: "36px", padding: "0 20px", borderRadius: "999px", cursor: "pointer",
                      background: selectedSize === size ? "#FF3E3E" : "#F0EDE8",
                      color: selectedSize === size ? "#FFFFFF" : "#4A4A4A",
                      border: selectedSize === size ? "none" : "1px solid #D0D0D0",
                      transition: "background 180ms ease, color 180ms ease",
                    }}
                  >{size}</button>
                ))}
              </div>
            </div>

            {/* Flavour Variant */}
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text)", marginBottom: "12px" }}>Flavour</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {FLAVOUR_OPTIONS.map(fl => (
                  <button
                    key={fl}
                    onClick={() => setSelectedFlavour(fl)}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px",
                      height: "36px", padding: "0 16px", borderRadius: "999px", cursor: "pointer",
                      background: selectedFlavour === fl ? "#E8913D" : "#F0EDE8",
                      color: selectedFlavour === fl ? "#FFFFFF" : "#4A4A4A",
                      border: selectedFlavour === fl ? "none" : "1px solid #D0D0D0",
                      transition: "background 180ms ease, color 180ms ease",
                    }}
                  >{fl}</button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text)", marginBottom: "12px" }}>Quantity</p>
              <div style={{ display: "inline-flex", border: "1px solid #D0D0D0", borderRadius: "999px", height: "48px", overflow: "hidden", alignItems: "center" }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ width: "48px", height: "48px", background: "none", border: "none", cursor: "pointer", fontSize: "22px", fontWeight: 300, color: "#4A4A4A", display: "flex", alignItems: "center", justifyContent: "center" }}
                >−</button>
                <span style={{ width: "48px", textAlign: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "18px", color: "var(--text)" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{ width: "48px", height: "48px", background: "none", border: "none", cursor: "pointer", fontSize: "22px", fontWeight: 300, color: "#4A4A4A", display: "flex", alignItems: "center", justifyContent: "center" }}
                >+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1, minWidth: "200px", height: "56px", background: added ? "#C8A020" : "#FFDE34",
                  color: "#232323", border: "none", borderRadius: "999px", cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "16px",
                  transition: "background 200ms ease, transform 200ms ease",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => { if (!added) e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {added ? "✓ Added!" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                style={{
                  flex: 1, minWidth: "200px", height: "56px", background: "#FF3E3E",
                  color: "#fff", border: "none", borderRadius: "999px", cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "16px",
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(255,62,62,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Buy Now
              </button>
            </div>

            {/* Delivery + Guarantee Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { title: "Free Delivery", desc: "On orders above ₹499", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
                { title: "Freshness Guarantee", desc: "Made to order, always fresh", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              ].map((item, i) => (
                <div key={i} style={{ padding: "16px", background: "#fff", borderRadius: "12px", display: "flex", gap: "12px", alignItems: "flex-start", boxShadow: "0 2px 8px rgba(26,26,26,0.04)" }}>
                  <div style={{ flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
                  <div>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text)", margin: 0 }}>{item.title}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL FINGERPRINT: Circular Product Spotlight */}
      <section ref={revealRef} style={{ background: "#FFDE34", padding: "96px 40px", overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(35,35,35,0.6)", display: "block", marginBottom: "48px" }}>
            The Crispco Spotlight
          </span>
          <div style={{ display: "flex", gap: "64px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Circular image */}
            <div
              style={{
                width: "clamp(200px, 25vw, 320px)", height: "clamp(200px, 25vw, 320px)",
                borderRadius: "50%", overflow: "hidden", flexShrink: 0,
                boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                transition: "transform 280ms cubic-bezier(0.4,0,0.2,1), box-shadow 280ms cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 50px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.12)"; }}
            >
              <img
                src={displayImg}
                alt={`${displayName} spotlight view`}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            </div>

            {/* Off-grid label */}
            <div style={{ marginLeft: "-24px" }}>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", letterSpacing: "-0.04em",
                color: "#232323", lineHeight: 1.1, margin: 0, textTransform: "capitalize"
              }}>
                {displayName.replace(/-/g, " ")}
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", color: "#4A4A4A", lineHeight: 1.6, marginTop: "16px", maxWidth: "400px" }}>
                Our golden signature. Cooked to order. Seasoned to perfection. The crunch you can hear from across the room.
              </p>
              <div style={{ display: "flex", gap: "16px", marginTop: "24px", alignItems: "center" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#FF3E3E" }}>₹{finalPrice.toLocaleString("en-IN")}</span>
                <button
                  onClick={handleAddToCart}
                  style={{ background: "#FF3E3E", color: "#fff", border: "none", borderRadius: "999px", height: "44px", padding: "0 24px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", cursor: "pointer", transition: "transform 200ms ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {added ? "✓ Added!" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE OUR CRUNCH */}
      <section style={{ background: "#F5F5F5", padding: "96px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#9A9A9A", display: "block", marginBottom: "12px" }}>Why Crispco</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em", color: "var(--text)", marginBottom: "48px" }}>Why Choose Our Crunch?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="usps-grid">
            {[
              {
                headline: "Lightning Fast",
                body: "From fryer to your door in under 20 minutes. We engineered our kitchen for speed without compromise.",
                icon: <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#FFF5EC"/><polygon points="36,12 20,36 30,36 28,52 44,28 34,28" fill="#FF3E3E"/></svg>
              },
              {
                headline: "Chef Crafted Quality",
                body: "Every batch is seasoned by hand and fried to golden perfection by our trained culinary team.",
                icon: <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#FFF5EC"/><ellipse cx="32" cy="26" rx="14" ry="10" fill="none" stroke="#FF3E3E" strokeWidth="2.5"/><rect x="20" y="36" width="24" height="6" rx="3" fill="#FF3E3E" opacity="0.3"/><rect x="22" y="42" width="20" height="4" rx="2" fill="#FF3E3E"/></svg>
              },
              {
                headline: "Always Fresh Ingredients",
                body: "We source locally, use zero preservatives, and never freeze our potatoes. Real food, real flavour.",
                icon: <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#FFF5EC"/><path d="M32 48 C32 48 20 38 20 28 A12 12 0 0 1 44 28 C44 38 32 48 32 48Z" fill="#FF3E3E" opacity="0.8"/><path d="M32 22 L32 36 M26 28 C26 28 29 26 32 28 C35 26 38 28 38 28" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              }
            ].map((usp, i) => (
              <div key={i} style={{ padding: "40px", borderRadius: "12px", background: "#FFFFFF", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                <div>{usp.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "24px", color: "#232323", marginTop: "24px", marginBottom: "0", letterSpacing: "-0.02em" }}>{usp.headline}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#4A4A4A", lineHeight: 1.6, marginTop: "16px" }}>{usp.body}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .usps-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* REVIEWS SECTION */}
      <section style={{ background: "var(--bg)", padding: "96px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#9A9A9A", display: "block", marginBottom: "12px" }}>Customer Love</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3vw, 2.8rem)", letterSpacing: "-0.04em", color: "var(--text)", marginBottom: "48px" }}>What Our Fans Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }} className="reviews-grid">
            {REVIEWS.map((review, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 16px rgba(26,26,26,0.05)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <StarRating rating={review.rating} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.7, color: "#4A4A4A", margin: 0, fontStyle: "italic" }}>"{review.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text)" }}>{review.name}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "var(--muted)" }}>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .reviews-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* RELATED PRODUCTS — The Golden Archives */}
      <section style={{ background: "#F5F5F5", padding: "96px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#9A9A9A", display: "block", marginBottom: "12px" }}>You May Also Like</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3vw, 2.8rem)", letterSpacing: "-0.04em", color: "var(--text)", marginBottom: "48px" }}>The Golden Archives</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="related-grid">
            {relatedProducts.map((p, i) => {
              const bgColors = ["#FF3E3E", "#FFDE34", "#F0EDE8"];
              const bg = bgColors[i % bgColors.length];
              return (
                <div
                  key={p.id}
                  onClick={() => router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`)}
                  style={{ position: "relative", aspectRatio: "1/1", borderRadius: "16px", overflow: "hidden", cursor: "pointer", background: bg }}
                  onMouseEnter={e => { const img = e.currentTarget.querySelector("img"); if (img) (img as HTMLImageElement).style.transform = "scale(1.05)"; const btn = e.currentTarget.querySelector(".explore-btn"); if (btn) (btn as HTMLElement).style.opacity = "1"; }}
                  onMouseLeave={e => { const img = e.currentTarget.querySelector("img"); if (img) (img as HTMLImageElement).style.transform = "scale(1)"; const btn = e.currentTarget.querySelector(".explore-btn"); if (btn) (btn as HTMLElement).style.opacity = "0"; }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 250ms ease", display: "block" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 55%)" }} />
                  <span style={{ position: "absolute", bottom: "24px", left: "24px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "22px", color: "#fff", letterSpacing: "-0.03em", textTransform: "capitalize" }}>{p.name.replace(/-/g, " ")}</span>
                  <button className="explore-btn" style={{ position: "absolute", bottom: "24px", right: "24px", background: "none", border: "1px solid #fff", borderRadius: "999px", padding: "8px 16px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", cursor: "pointer", opacity: 0, transition: "opacity 250ms ease" }}>Explore</button>
                </div>
              );
            })}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .related-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* JOIN THE FLAVOR REVOLUTION */}
      <section style={{ background: "#232323", padding: "80px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
        <div style={{ flex: "0 1 60%" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em", color: "#FFDE34", margin: 0, lineHeight: 1.1 }}>Join the Flavor Revolution</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: "#fff", opacity: 0.8, marginTop: "16px", lineHeight: 1.6 }}>Discover every item on our menu. From crispy fries to loaded burgers — your feast awaits.</p>
          <button
            onClick={() => router.push("/shop")}
            style={{ marginTop: "32px", display: "inline-flex", alignItems: "center", height: "56px", padding: "0 32px", background: "#FF3E3E", color: "#fff", border: "none", borderRadius: "999px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "18px", cursor: "pointer", minWidth: "280px", justifyContent: "center", transition: "transform 200ms ease, box-shadow 200ms ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(255,62,62,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >ORDER YOUR FEAST!</button>
        </div>
        <div style={{ flex: "0 1 280px", overflow: "hidden", borderRadius: "16px" }}>
          <img
            src="/product-1.jpg"
            alt="Crispco feast lifestyle"
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block", transition: "transform 8s ease-in-out" }}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#232323", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "80px 40px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginBottom: "60px" }} className="footer-grid">
            {/* Col 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#E8913D"/><text x="18" y="24" textAnchor="middle" fill="#FDF8F4" fontSize="14" fontWeight="700" fontFamily="Space Grotesk, sans-serif">C</text></svg>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#fff", letterSpacing: "-0.03em" }}>Crispco</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#fff", opacity: 0.8, lineHeight: 1.6 }}>Taste the Golden Standard.</p>
              <div style={{ display: "flex", gap: "16px" }}>
                {["Instagram", "Facebook", "TikTok"].map(social => (
                  <button key={social} onClick={() => window.open("https://www.instagram.com", "_blank")} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {social === "Instagram" && <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></>}
                      {social === "Facebook" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
                      {social === "TikTok" && <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>}
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFDE34", marginBottom: "20px" }}>Shop</p>
              {["Full Menu", "Bundles", "Gift Cards", "Seasonal Specials"].map(link => (
                <button key={link} onClick={() => router.push("/shop")} style={{ display: "block", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#fff", padding: "0 0 8px", lineHeight: 2.2 }}>{link}</button>
              ))}
            </div>

            {/* Col 3 */}
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFDE34", marginBottom: "20px" }}>Learn</p>
              {["Our Story", "Ingredients", "FAQs", "Contact Us"].map(link => (
                <button key={link} onClick={() => router.push("/")} style={{ display: "block", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#fff", padding: "0 0 8px", lineHeight: 2.2 }}>{link}</button>
              ))}
            </div>

            {/* Col 4 */}
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "20px", color: "#FFDE34", marginBottom: "16px" }}>Stay Golden.</p>
              <input type="email" placeholder="Enter your email" style={{ width: "100%", height: "52px", background: "#4A4A4A", border: "none", borderRadius: "999px", padding: "0 24px", fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#fff", outline: "none", boxSizing: "border-box" }} />
              <button onClick={() => {}} style={{ marginTop: "12px", width: "100%", height: "52px", background: "#FF3E3E", color: "#fff", border: "none", borderRadius: "999px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "16px", cursor: "pointer" }}>Subscribe</button>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#fff", opacity: 0.6, margin: 0 }}>© 2026 Crispco. All rights reserved. Privacy Policy · Terms of Service</p>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {["VISA", "MC", "UPI", "AMEX"].map(card => (
                <div key={card} style={{ background: "rgba(255,255,255,0.1)", borderRadius: "4px", padding: "4px 8px" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", fontWeight: 700, color: "#fff" }}>{card}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </footer>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}
        >
          <div style={{ position: "relative", maxWidth: "700px", width: "100%" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox(false)} style={{ position: "absolute", top: "-40px", right: 0, background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <img src={thumbnails[activeThumb]} alt="Lightbox product view" style={{ width: "100%", borderRadius: "16px", objectFit: "contain", maxHeight: "80vh" }} />
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
              {thumbnails.map((t, i) => (
                <button key={i} onClick={() => setActiveThumb(i)} style={{ width: "56px", height: "56px", borderRadius: "8px", overflow: "hidden", border: activeThumb === i ? "2px solid #FFDE34" : "2px solid transparent", cursor: "pointer", padding: 0 }}>
                  <img src={t} alt={`Thumbnail ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 150, background: "#fff", borderTop: "1px solid rgba(0,0,0,0.1)", padding: "12px 20px", display: "flex", gap: "12px", alignItems: "center" }} className="mobile-sticky-bar">
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "18px", color: "#FF3E3E", margin: 0 }}>₹{finalPrice.toLocaleString("en-IN")}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--muted)", margin: 0 }}>{selectedSize} · {selectedFlavour}</p>
        </div>
        <button
          onClick={handleAddToCart}
          style={{ background: added ? "#C8A020" : "#FFDE34", color: "#232323", border: "none", borderRadius: "999px", height: "48px", padding: "0 24px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", cursor: "pointer", flexShrink: 0 }}
        >
          {added ? "✓ Added!" : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          style={{ background: "#FF3E3E", color: "#fff", border: "none", borderRadius: "999px", height: "48px", padding: "0 24px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", cursor: "pointer", flexShrink: 0 }}
        >
          Buy Now
        </button>
      </div>

      <style>{`
        @media (min-width: 769px) { .mobile-sticky-bar { display: none !important; } }
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 55%"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg)" }} />}>
      <ProductContent />
    </Suspense>
  );
}