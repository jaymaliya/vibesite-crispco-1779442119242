"use client";
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../components/CartContext"

const products = [
  { id: 1, img: "/product-1.jpg", name: "red paperboard container", description: "A red paperboard container with a yellow McDonald's logo holds numerous golden fried potato sticks.", price: 199 },
  { id: 2, img: "/product-2.jpg", name: "golden-brown sesame bun", description: "A golden-brown sesame bun double cheeseburger with two melted cheese patties, lettuce, tomato, onion, pickles, and cream", price: 30 },
  { id: 3, img: "/product-3.jpg", name: "golden-brown pepperoni pizza", description: "A golden-brown pepperoni pizza with a lifted slice showcasing stringy melted cheese and a steel server with wood handle.", price: 40 },
  { id: 4, img: "/product-4.jpg", name: "pile golden-brown fried", description: "A pile of golden-brown fried chicken tenders, one broken to show white meat, with a small white bowl of red dipping sauce", price: 50 },
]

const cardBgs = ["#FF3E3E", "#FFDE34", "#F0EDE8", "#FF3E3E"]

const testimonials = [
  { quote: "Honestly the crispiest fries I've ever had. That golden crunch is absolutely unmatched — I order twice a week now.", name: "Priya S., Mumbai" },
  { quote: "The double cheeseburger is a masterpiece. Every bite is layered, warm, and impossibly satisfying.", name: "Arjun K., Bengaluru" },
  { quote: "From the fries to the pizza — Crispco just gets it right every single time. Trusted. Obsessed.", name: "Meera T., Delhi" },
]

const collections = [
  { title: "Burger Combos", sub: "Stack. Sauce. Devour.", img: "/product-2.jpg" },
  { title: "Family Feast", sub: "For the whole crew.", img: "/product-3.jpg" },
  { title: "Sides & Dips", sub: "Golden add-ons.", img: "/product-1.jpg" },
  { title: "Crispy Chicken", sub: "Tender. Juicy. Golden.", img: "/product-4.jpg" },
]

export default function HomePage() {
  const router = useRouter()
  const { addItem, items } = useCart()
  const cartCount = items.reduce((a, b) => a + b.quantity, 0)

  const [navSolid, setNavSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [addedId, setAddedId] = useState<number | null>(null)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null)

  const carouselRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 100)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 7000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed")
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleAddToCart = (p: typeof products[0], e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({ id: String(p.id), name: p.name, price: p.price, quantity: 1, image: p.img })
    setAddedId(p.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0)
    scrollLeft.current = carouselRef.current?.scrollLeft || 0
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current.offsetLeft || 0)
    const walk = (x - startX.current) * 1.2
    carouselRef.current.scrollLeft = scrollLeft.current - walk
  }
  const onMouseUp = () => { isDragging.current = false }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500&family=Playfair+Display:ital@1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --bg: #FDF8F4; --surface: #D4A574; --primary: #1A1A1A; --accent: #E8913D; --text: #1A1A1A; --muted: #C9A882; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
        h1,h2,h3,h4 { font-family: 'Space Grotesk', sans-serif; }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .stagger-1 { transition-delay: 0.08s; }
        .stagger-2 { transition-delay: 0.16s; }
        .stagger-3 { transition-delay: 0.24s; }
        .stagger-4 { transition-delay: 0.32s; }
        :focus-visible { outline: 2px solid #E8913D; outline-offset: 3px; }
        @media (max-width: 768px) {
          .hero-text { top: 20% !important; left: 24px !important; right: 24px !important; }
          .hero-h1 { font-size: clamp(2.4rem, 9vw, 4rem) !important; }
          .split-left { width: 100% !important; padding: 64px 32px !important; }
          .split-right { display: none !important; }
          .usp-grid { grid-template-columns: 1fr !important; }
          .archives-grid { grid-template-columns: 1fr 1fr !important; }
          .revolution-img { display: none !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .footer-bottom { flex-direction: column !important; gap: 16px !important; text-align: center !important; }
        }
        @media (max-width: 480px) {
          .archives-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes floatRotate {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.02) rotate(1deg); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: navSolid ? "#FFDE34" : "transparent",
        borderBottom: navSolid ? "1px solid rgba(0,0,0,0.08)" : "none",
        transition: "background 250ms ease, border-bottom 250ms ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: "72px"
      }}>
        <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#E8913D" />
            <path d="M8 26 L12 10 L18 22 L24 10 L28 26" stroke="#FDF8F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: navSolid ? "#1A1A1A" : "#FFFFFF", letterSpacing: "-0.03em" }}>Crispco</span>
        </button>
        <div className="desktop-nav" style={{ display: "flex", gap: "40px" }}>
          {[["Menu", "/shop"], ["Our Story", "#story"], ["Why Us", "#why"]].map(([label, href]) => (
            <button key={label} onClick={() => href.startsWith("/") ? router.push(href) : document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: navSolid ? "#1A1A1A" : "#FFFFFF", letterSpacing: "0.01em" }}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => router.push("/checkout")} style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={navSolid ? "#1A1A1A" : "#FFFFFF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#FF3E3E", color: "#fff", width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{cartCount}</span>
            )}
          </button>
          <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "none" }} className="hamburger-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={navSolid ? "#1A1A1A" : "#FFFFFF"} strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "#FFFFFF", display: "flex", flexDirection: "column", padding: "32px", animation: "fadeSlide 0.28s ease-out" }}>
          <button onClick={() => setMobileOpen(false)} style={{ alignSelf: "flex-end", background: "none", border: "none", cursor: "pointer" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginTop: "32px" }}>
            {[["Menu", () => { router.push("/shop"); setMobileOpen(false) }],
              ["Our Story", () => { document.getElementById("story")?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false) }],
              ["Why Us", () => { document.getElementById("why")?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false) }],
              ["Cart", () => { router.push("/checkout"); setMobileOpen(false) }]].map(([label, action]) => (
              <button key={label as string} onClick={action as () => void}
                style={{ background: "none", border: "none", borderBottom: "1px solid #F0EDE8", cursor: "pointer", textAlign: "left", height: "60px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.75rem", color: "#1A1A1A", letterSpacing: "-0.03em" }}>
                {label as string}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
        <img src="/product-1.jpg" alt="Red paperboard container with golden fries" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0) 70%)" }} />
        <div className="hero-text" style={{ position: "absolute", top: "25%", left: "calc(50% - 45vw + 40px)", maxWidth: "640px" }}>
          <span style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#FFDE34", marginBottom: "16px" }}>Golden. Crispy. Irresistible.</span>
          <h1 className="hero-h1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(3.5rem, 7vw, 6rem)", letterSpacing: "-0.05em", lineHeight: 1.05, color: "#FFFFFF" }}>
            The Golden<br />Standard.
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "clamp(1.1rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", color: "#FFFFFF", marginTop: "16px" }}>Crispy, Golden, Irresistible.</p>
          <button onClick={() => router.push("/shop")}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none" }}
            style={{ marginTop: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#FFDE34", color: "#232323", border: "none", borderRadius: "999px", height: "56px", minWidth: "240px", padding: "0 32px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "18px", letterSpacing: "0.02em", cursor: "pointer", transition: "transform 200ms ease, box-shadow 200ms ease" }}>
            GET YOUR FRIES!
          </button>
          <div style={{ display: "flex", gap: "24px", marginTop: "16px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#FFFFFF", opacity: 0.8 }}>⭐ 4.9 / 5 rating</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#FFFFFF", opacity: 0.8 }}>2.4M+ orders delivered</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#FFFFFF", opacity: 0.8 }}>Free delivery over ₹499</span>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#FFFFFF", opacity: 0.8, marginTop: "8px" }}>Trusted by millions, loved by all.</p>
        </div>
      </section>

      {/* GOLDEN ARCHIVES */}
      <section style={{ background: "var(--bg)", padding: "96px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "56px" }}>
            <span style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#9A9A9A", marginBottom: "12px" }}>Our Menu</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", letterSpacing: "-0.04em", color: "var(--text)" }}>The Golden Archives</h2>
          </div>
          <div className="archives-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
            {products.map((p, i) => (
              <article key={p.id} className={`reveal stagger-${i + 1}`}
                onClick={() => router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`)}
                onMouseEnter={() => setHoveredCard(p.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ cursor: "pointer", position: "relative", aspectRatio: "1/1", borderRadius: "16px", overflow: "hidden", background: cardBgs[i], transition: "transform 300ms cubic-bezier(0.4,0,0.2,1), box-shadow 300ms cubic-bezier(0.4,0,0.2,1)", transform: hoveredCard === p.id ? "translateY(-4px)" : "translateY(0)", boxShadow: hoveredCard === p.id ? "0 20px 48px rgba(26,26,26,0.18)" : "0 4px 16px rgba(26,26,26,0.08)" }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 600ms ease", transform: hoveredCard === p.id ? "scale(1.05)" : "scale(1)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 55%)" }} />
                <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1.2, maxWidth: "60%" }}>{p.name}</span>
                  <button onClick={e => { e.stopPropagation(); router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`) }}
                    style={{ background: "transparent", border: "1px solid #FFFFFF", borderRadius: "999px", padding: "8px 16px", color: "#FFFFFF", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer", opacity: hoveredCard === p.id ? 1 : 0, transition: "opacity 250ms ease" }}>
                    Explore
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VISUAL FINGERPRINT — Circular Product Spotlight */}
      <section style={{ background: "#FF3E3E", padding: "80px 40px", overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "48px" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.7)", marginBottom: "12px", display: "block" }}>Spotlight</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em", color: "#FFFFFF" }}>What Makes Us Golden</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
            {products.map((p, i) => (
              <div key={p.id} className={`reveal stagger-${i + 1}`} style={{ display: "flex", alignItems: "center", gap: "0", cursor: "pointer" }}
                onClick={() => router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`)}>
                <div
                  onMouseEnter={() => setHoveredCircle(p.id)}
                  onMouseLeave={() => setHoveredCircle(null)}
                  style={{
                    width: "clamp(160px, 20vw, 240px)", height: "clamp(160px, 20vw, 240px)", borderRadius: "50%", overflow: "hidden", flexShrink: 0,
                    boxShadow: hoveredCircle === p.id ? "0 8px 30px rgba(0,0,0,0.25)" : "0 4px 16px rgba(0,0,0,0.15)",
                    transition: "transform 280ms cubic-bezier(0.4,0,0.2,1), box-shadow 280ms cubic-bezier(0.4,0,0.2,1)",
                    transform: hoveredCircle === p.id ? "scale(1.04)" : "scale(1)"
                  }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)", letterSpacing: "-0.04em", color: "#FFFFFF", marginLeft: "-20px", maxWidth: "180px", lineHeight: 1.15, alignSelf: "center" }}>{p.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" style={{ display: "flex", minHeight: "600px", overflow: "hidden" }}>
        <div className="split-left reveal" style={{ width: "60%", background: "#F0EDE8", padding: "96px 72px", display: "flex", flexDirection: "column", gap: "24px", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#9A9A9A" }}>Our Story</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", letterSpacing: "-0.04em", color: "#232323", lineHeight: 1.1 }}>The Flavor<br />Journey</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", lineHeight: 1.65, color: "#4A4A4A", maxWidth: "480px" }}>Born from a deep love of honest, crave-worthy food — Crispco started with one simple belief: every bite should be worth remembering. We source ingredients with care, cook with precision, and deliver that golden satisfaction you can taste from the first crunch.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", lineHeight: 1.65, color: "#4A4A4A", maxWidth: "480px" }}>From our crispy fries to our loaded burgers, every item on the menu is a tribute to flavor done right. Made in India, loved everywhere.</p>
          <button
            onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLButtonElement).style.background = "#CC2E2E" }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.background = "#FF3E3E" }}
            style={{ alignSelf: "flex-start", background: "#FF3E3E", color: "#FFFFFF", border: "none", borderRadius: "4px", height: "48px", width: "160px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "16px", cursor: "pointer", transition: "transform 200ms ease, background 200ms ease" }}>
            READ MORE
          </button>
        </div>
        <div className="split-right" style={{ width: "40%", overflow: "hidden" }}>
          <img src="/product-2.jpg" alt="Freshly made golden-brown sesame bun burger" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </section>

      {/* WHY CHOOSE OUR CRUNCH */}
      <section id="why" style={{ background: "#F5F5F5", padding: "96px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "64px" }}>
            <span style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#9A9A9A", marginBottom: "12px" }}>Our Promise</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", letterSpacing: "-0.04em", color: "#232323" }}>Why Choose Our Crunch?</h2>
          </div>
          <div className="usp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
            {[{
              icon: <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#FF3E3E" strokeWidth="2.5" /><path d="M20 44 L32 20 L44 44" stroke="#FF3E3E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M24 36 h16" stroke="#FF3E3E" strokeWidth="2.5" strokeLinecap="round" /></svg>,
              title: "Lightning-Fast Delivery", body: "From our kitchen to your door in under 30 minutes. We know hunger doesn't wait, and neither do we."
            }, {
              icon: <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M32 12 C20 12 12 22 12 32 C12 44 22 52 32 52 C42 52 52 44 52 32 C52 22 44 12 32 12Z" stroke="#FF3E3E" strokeWidth="2.5" fill="none" /><path d="M22 32 C22 26 27 20 32 20 C37 20 42 26 42 32" stroke="#FF3E3E" strokeWidth="2.5" strokeLinecap="round" fill="none" /><circle cx="32" cy="36" r="4" fill="#FF3E3E" /></svg>,
              title: "Chef-Grade Quality", body: "Every recipe is tested, tasted, and perfected by culinary experts who refuse to compromise on flavor."
            }, {
              icon: <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M32 8 L32 16 M20 12 L24 19 M12 20 L19 24 M8 32 L16 32 M12 44 L19 40 M20 52 L24 45 M32 56 L32 48 M44 52 L40 45 M52 44 L45 40 M56 32 L48 32 M52 20 L45 24 M44 12 L40 19" stroke="#FF3E3E" strokeWidth="2.5" strokeLinecap="round" /><circle cx="32" cy="32" r="10" fill="none" stroke="#FF3E3E" strokeWidth="2.5" /><circle cx="32" cy="32" r="4" fill="#FF3E3E" /></svg>,
              title: "Always Fresh Ingredients", body: "We source locally, prepare daily. No freezer shortcuts — only produce that meets our golden standard."
            }].map((item, i) => (
              <div key={i} className={`reveal stagger-${i + 1}`} style={{ padding: "40px", borderRadius: "12px", background: "#FFFFFF", boxShadow: "0 4px 16px rgba(26,26,26,0.06)" }}>
                {item.icon}
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "22px", color: "#232323", marginTop: "24px", letterSpacing: "-0.02em" }}>{item.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#4A4A4A", lineHeight: 1.65, marginTop: "16px" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAVE-WORTHY COLLECTIONS — drag carousel */}
      <section style={{ background: "var(--bg)", padding: "96px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "40px" }}>
          <div className="reveal" style={{ marginBottom: "48px", paddingRight: "40px" }}>
            <span style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#9A9A9A", marginBottom: "12px" }}>Collections</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", letterSpacing: "-0.04em", color: "var(--text)" }}>Crave-Worthy Collections</h2>
          </div>
        </div>
        <div ref={carouselRef}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
          style={{ display: "flex", gap: "24px", overflowX: "auto", paddingLeft: "40px", paddingRight: "40px", paddingBottom: "16px", cursor: "grab", scrollbarWidth: "none", userSelect: "none" }}>
          {collections.map((col, i) => {
            const [hov, setHov] = useState(false)
            return (
              <div key={i} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                onClick={() => router.push("/shop")}
                style={{ position: "relative", flexShrink: 0, width: "clamp(280px, 33vw, 380px)", aspectRatio: "4/3", borderRadius: "16px", overflow: "hidden", cursor: "pointer" }}>
                <img src={col.img} alt={col.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 250ms ease", transform: hov ? "scale(1.04)" : "scale(1)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0) 55%)" }} />
                <div style={{ position: "absolute", bottom: "40px", left: "32px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)", color: "#FFFFFF", letterSpacing: "-0.04em", lineHeight: 1.15 }}>{col.title}</h3>
                </div>
                <button onClick={e => { e.stopPropagation(); router.push("/shop") }}
                  style={{ position: "absolute", bottom: "16px", left: "32px", background: "none", border: "none", color: "#FFDE34", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", textDecoration: "underline", cursor: "pointer" }}>
                  VIEW COLLECTION
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "#FFDE34", padding: "100px 40px", textAlign: "center" }}>
        <div className="reveal" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(35,35,35,0.6)", marginBottom: "32px", display: "block" }}>What Our Fans Say</span>
          <div key={testimonialIdx} style={{ animation: "fadeSlide 0.5s ease-out" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#232323", lineHeight: 1.35, letterSpacing: "-0.01em" }}>"{testimonials[testimonialIdx].quote}"</p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "18px", color: "#232323", marginTop: "32px" }}>{testimonials[testimonialIdx].name}</p>
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "32px" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)}
                style={{ width: "10px", height: "10px", borderRadius: "50%", background: i === testimonialIdx ? "#232323" : "rgba(35,35,35,0.35)", border: "none", cursor: "pointer", transition: "background 300ms ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* JOIN THE FLAVOR REVOLUTION */}
      <section style={{ background: "#232323", padding: "60px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", overflow: "hidden" }}>
        <div className="reveal" style={{ flex: "0 0 65%", maxWidth: "65%" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,222,52,0.7)", marginBottom: "16px", display: "block" }}>It's Time</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.04em", color: "#FFDE34", lineHeight: 1.1 }}>Join the Flavor Revolution</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: "#FFFFFF", opacity: 0.8, marginTop: "16px", maxWidth: "480px", lineHeight: 1.65 }}>The full menu is waiting. Every crunch, every melt, every golden bite — crafted to satisfy. Don't just eat. Experience it.</p>
          <button onClick={() => router.push("/shop")}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(255,62,62,0.4)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none" }}
            style={{ marginTop: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#FF3E3E", color: "#FFFFFF", border: "none", borderRadius: "999px", height: "56px", minWidth: "280px", padding: "0 32px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "18px", cursor: "pointer", transition: "transform 200ms ease, box-shadow 200ms ease" }}>
            ORDER YOUR FEAST!
          </button>
        </div>
        <div className="revolution-img reveal" style={{ flex: "0 0 30%", maxWidth: "30%", aspectRatio: "1/1", borderRadius: "16px", overflow: "hidden" }}>
          <img src="/product-4.jpg" alt="Golden fried chicken tenders arranged artfully" style={{ width: "100%", height: "100%", objectFit: "cover", animation: "floatRotate 8s ease-in-out infinite" }} />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#232323", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "80px 40px 0 40px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "1280px", margin: "0 auto" }}>
          {/* Col 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#E8913D" /><path d="M8 26 L12 10 L18 22 L24 10 L28 26" stroke="#FDF8F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#FFFFFF", letterSpacing: "-0.03em" }}>Crispco</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#FFFFFF", opacity: 0.8, lineHeight: 1.65 }}>Taste the Golden Standard.</p>
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              {["instagram", "facebook", "tiktok"].map(s => (
                <button key={s} onClick={() => window.open("https://" + s + ".com", "_blank")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  {s === "instagram" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>}
                  {s === "facebook" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>}
                  {s === "tiktok" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>}
                </button>
              ))}
            </div>
          </div>
          {/* Col 2 */}
          <div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFDE34", marginBottom: "16px" }}>Shop</h4>
            {["Full Menu", "Bundles", "Gift Cards", "Seasonal Specials"].map(link => (
              <button key={link} onClick={() => router.push("/shop")} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#FFFFFF", lineHeight: "2.2", padding: 0, textAlign: "left" }}>{link}</button>
            ))}
          </div>
          {/* Col 3 */}
          <div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFDE34", marginBottom: "16px" }}>Learn</h4>
            {["Our Story", "Ingredients", "FAQs", "Contact Us"].map(link => (
              <button key={link} onClick={() => link === "Our Story" ? document.getElementById("story")?.scrollIntoView({ behavior: "smooth" }) : undefined}
                style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#FFFFFF", lineHeight: "2.2", padding: 0, textAlign: "left" }}>{link}</button>
            ))}
          </div>
          {/* Col 4 Newsletter */}
          <div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "20px", color: "#FFDE34", marginBottom: "16px", letterSpacing: "-0.02em" }}>Stay Golden.</h4>
            {subscribed ? (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#FFDE34", lineHeight: 1.65 }}>You're in! Welcome to the fam.</p>
            ) : (
              <>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
                  style={{ width: "100%", height: "52px", background: "#4A4A4A", border: "none", borderRadius: "999px", padding: "0 24px", color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif", fontSize: "16px", outline: "none" }} />
                <button onClick={() => { if (email) setSubscribed(true) }}
                  style={{ width: "100%", height: "52px", background: "#FF3E3E", color: "#FFFFFF", border: "none", borderRadius: "999px", marginTop: "16px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "16px", cursor: "pointer", transition: "opacity 200ms ease" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>
        {/* Bottom strip */}
        <div className="footer-bottom" style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "64px", paddingTop: "32px", paddingBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#FFFFFF", opacity: 0.6 }}>
            © 2026 Crispco. All rights reserved.{" "}
            <button onClick={() => undefined} style={{ background: "none", border: "none", color: "#FFFFFF", opacity: 0.6, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>Privacy Policy</button>{" "}·{" "}
            <button onClick={() => undefined} style={{ background: "none", border: "none", color: "#FFFFFF", opacity: 0.6, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>Terms of Service</button>
          </p>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {["Visa", "MC", "Amex", "UPI"].map(p => (
              <div key={p} style={{ height: "28px", padding: "0 8px", borderRadius: "4px", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", fontWeight: 600, color: "#FFFFFF" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}