"use client";
export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items = [], clearCart } = useCart() ?? {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCartCount(items.reduce((s, i) => s + i.quantity, 0));
  }, [items]);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(24px)";
      (el as HTMLElement).style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const getPrice = (price: number) => (price === 0 ? 149 : price);

  const subtotal = items.reduce(
    (sum, item) => sum + getPrice(item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 99;
  const total = subtotal + shipping;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required.";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.state.trim()) newErrors.state = "State is required.";
    if (!form.pin.trim() || !/^\d{6}$/.test(form.pin))
      newErrors.pin = "Enter a valid 6-digit PIN code.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setPlacing(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const order = await res.json();

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new (window as any).Razorpay({
          key: "rzp_test_",
          amount: order.amount,
          currency: "INR",
          name: "Crispco",
          description: "Your Crispco Order",
          handler: () => {
            clearCart?.();
            setOrderSuccess(true);
            setTimeout(() => router.push("/"), 2000);
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          theme: { color: "#E8913D" },
        });
        rzp.open();
        setPlacing(false);
      };
      script.onerror = () => setPlacing(false);
      document.body.appendChild(script);
    } catch {
      setPlacing(false);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    height: "52px",
    padding: "0 20px",
    borderRadius: "12px",
    border: errors[field] ? "2px solid #E8913D" : "1.5px solid #E8D5C0",
    backgroundColor: "#FFFFFF",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    color: "var(--text)",
    outline: "none",
    transition: "border-color 200ms ease",
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#1A1A1A",
    marginBottom: "8px",
  };

  if (orderSuccess) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#E8913D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.03em",
          }}
        >
          Order Placed!
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "1rem" }}>
          Redirecting you home…
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* CSS variables */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --bg: #FDF8F4;
              --surface: #D4A574;
              --primary: #1A1A1A;
              --accent: #E8913D;
              --text: #1A1A1A;
              --muted: #C9A882;
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            input:focus, select:focus { border-color: #E8913D !important; box-shadow: 0 0 0 3px rgba(232,145,61,0.15); }
          `,
        }}
      />

      {/* ═══ NAV ═══ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: navScrolled ? "#FFDE34" : "var(--bg)",
          borderBottom: navScrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(0,0,0,0.06)",
          transition: "background-color 250ms ease, border-color 250ms ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            aria-label="Crispco Home"
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#E8913D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="14" width="18" height="2" rx="1" fill="#fff" />
                <rect x="5" y="10" width="14" height="2" rx="1" fill="#fff" />
                <rect x="7" y="6" width="10" height="2" rx="1" fill="#fff" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}
            >
              Crispco
            </span>
          </button>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "0.9375rem",
            }}
          >
            {["Menu", "Our Story", "Why Us"].map((link) => (
              <button
                key={link}
                onClick={() => {
                  if (link === "Menu") router.push("/shop");
                  else if (link === "Our Story") router.push("/shop");
                  else router.push("/shop");
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                  padding: "4px 0",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E8913D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => router.push("/checkout")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              padding: "8px",
            }}
            aria-label={`Cart, ${cartCount} items`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "#E8913D",
                  color: "#fff",
                  fontSize: "11px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            padding: "32px",
          }}
        >
          <button
            onClick={() => setMobileNavOpen(false)}
            style={{
              alignSelf: "flex-end",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Close navigation"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginTop: "40px" }}>
            {["Menu", "Our Story", "Why Us"].map((link) => (
              <button
                key={link}
                onClick={() => {
                  setMobileNavOpen(false);
                  router.push("/shop");
                }}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #F0EDE8",
                  cursor: "pointer",
                  color: "#1A1A1A",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.75rem",
                  padding: "20px 0",
                  textAlign: "left",
                  letterSpacing: "-0.02em",
                }}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ MAIN CONTENT ═══ */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 40px 96px" }}>
        {/* Page header */}
        <div className="reveal" style={{ marginBottom: "56px" }}>
          <span
            style={{
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#E8913D",
              display: "block",
              marginBottom: "12px",
            }}
          >
            You're almost there
          </span>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "var(--text)",
            }}
          >
            Complete Your Order
          </h1>
        </div>

        {/* Empty cart state */}
        {items.length === 0 ? (
          <div
            className="reveal"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              padding: "80px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#F0EDE8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.75rem",
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}
            >
              Your cart is empty
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "400px" }}>
              Looks like you haven't added anything yet. Explore our golden menu and find something crave-worthy.
            </p>
            <button
              onClick={() => router.push("/shop")}
              style={{
                padding: "16px 48px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#E8913D",
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                letterSpacing: "0.02em",
                boxShadow: "0 10px 30px -10px #E8913D80",
                transition: "transform 200ms ease, box-shadow 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 30px -8px #E8913D80";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px -10px #E8913D80";
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Two-column layout */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px",
            }}
            className="checkout-grid"
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  @media (min-width: 900px) {
                    .checkout-grid { grid-template-columns: 1.4fr 1fr !important; }
                  }
                  @media (max-width: 600px) {
                    main { padding: 40px 20px 64px !important; }
                    .form-row { grid-template-columns: 1fr !important; }
                    .nav-desktop { display: none !important; }
                  }
                `,
              }}
            />

            {/* ── LEFT: FORM ── */}
            <div className="reveal">
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "48px",
                  boxShadow: "0 4px 40px rgba(26,26,26,0.06)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "var(--text)",
                    letterSpacing: "-0.03em",
                    marginBottom: "32px",
                  }}
                >
                  Delivery Details
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Full Name */}
                  <div>
                    <label style={labelStyle} htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Arjun Sharma"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle("name")}
                    />
                    {errors.name && (
                      <p style={{ marginTop: "6px", fontSize: "12px", color: "#E8913D", fontFamily: "'DM Sans', sans-serif" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle} htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="arjun@email.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle("email")}
                    />
                    {errors.email && (
                      <p style={{ marginTop: "6px", fontSize: "12px", color: "#E8913D", fontFamily: "'DM Sans', sans-serif" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle} htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      value={form.phone}
                      onChange={handleChange}
                      style={inputStyle("phone")}
                    />
                    {errors.phone && (
                      <p style={{ marginTop: "6px", fontSize: "12px", color: "#E8913D", fontFamily: "'DM Sans', sans-serif" }}>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label style={labelStyle} htmlFor="address">Delivery Address</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Flat 4B, Green Park Apartments, MG Road"
                      value={form.address}
                      onChange={handleChange}
                      style={inputStyle("address")}
                    />
                    {errors.address && (
                      <p style={{ marginTop: "6px", fontSize: "12px", color: "#E8913D", fontFamily: "'DM Sans', sans-serif" }}>
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City + State */}
                  <div
                    className="form-row"
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                  >
                    <div>
                      <label style={labelStyle} htmlFor="city">City</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Mumbai"
                        value={form.city}
                        onChange={handleChange}
                        style={inputStyle("city")}
                      />
                      {errors.city && (
                        <p style={{ marginTop: "6px", fontSize: "12px", color: "#E8913D", fontFamily: "'DM Sans', sans-serif" }}>
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="state">State</label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        placeholder="Maharashtra"
                        value={form.state}
                        onChange={handleChange}
                        style={inputStyle("state")}
                      />
                      {errors.state && (
                        <p style={{ marginTop: "6px", fontSize: "12px", color: "#E8913D", fontFamily: "'DM Sans', sans-serif" }}>
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* PIN */}
                  <div>
                    <label style={labelStyle} htmlFor="pin">PIN Code</label>
                    <input
                      id="pin"
                      name="pin"
                      type="text"
                      placeholder="400001"
                      maxLength={6}
                      value={form.pin}
                      onChange={handleChange}
                      style={inputStyle("pin")}
                    />
                    {errors.pin && (
                      <p style={{ marginTop: "6px", fontSize: "12px", color: "#E8913D", fontFamily: "'DM Sans', sans-serif" }}>
                        {errors.pin}
                      </p>
                    )}
                  </div>
                </div>

                {/* Trust signals */}
                <div
                  style={{
                    marginTop: "32px",
                    padding: "20px 24px",
                    borderRadius: "12px",
                    backgroundColor: "var(--bg)",
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {[
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="3" width="15" height="13" rx="1" />
                          <path d="M16 8h4l3 5v3h-7V8z" />
                          <circle cx="5.5" cy="18.5" r="2.5" />
                          <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                      ),
                      text: "Free shipping over ₹500",
                    },
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      ),
                      text: "Secure checkout",
                    },
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ),
                      text: "Made in India",
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {item.icon}
                      <span
                        style={{
                          fontSize: "13px",
                          color: "var(--muted)",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: ORDER SUMMARY ── */}
            <div className="reveal" style={{ position: "relative" }}>
              <div
                style={{
                  position: "sticky",
                  top: "96px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "40px",
                  boxShadow: "0 4px 40px rgba(26,26,26,0.06)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "var(--text)",
                    letterSpacing: "-0.03em",
                    marginBottom: "28px",
                  }}
                >
                  Order Summary
                </h2>

                {/* Items list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        paddingBottom: "16px",
                        borderBottom: "1px solid #F5EFE8",
                      }}
                    >
                      {/* Product circular image — VISUAL FINGERPRINT */}
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          flexShrink: 0,
                          backgroundColor: "#F0EDE8",
                          boxShadow: "0 4px 14px rgba(232,145,61,0.2)",
                          transition: "transform 280ms cubic-bezier(0.4,0,0.2,1), box-shadow 280ms cubic-bezier(0.4,0,0.2,1)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(232,145,61,0.2)";
                        }}
                      >
                        <img
                          src={item.image || "/product-1.jpg"}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.9375rem",
                            color: "var(--text)",
                            letterSpacing: "-0.02em",
                            marginBottom: "4px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "var(--muted)",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "#E8913D",
                          flexShrink: 0,
                        }}
                      >
                        ₹{(getPrice(item.price) * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Subtotal / Shipping / Total */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "var(--muted)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Subtotal
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        color: "var(--text)",
                      }}
                    >
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "var(--muted)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Shipping
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        color: shipping === 0 ? "#52a55a" : "var(--text)",
                      }}
                    >
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--muted)",
                        fontFamily: "'DM Sans', sans-serif",
                        backgroundColor: "var(--bg)",
                        padding: "10px 14px",
                        borderRadius: "8px",
                      }}
                    >
                      Add ₹{(500 - subtotal).toLocaleString("en-IN")} more for FREE delivery
                    </p>
                  )}

                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "#F0EDE8",
                      margin: "4px 0",
                    }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.0625rem",
                        color: "var(--text)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.375rem",
                        color: "#E8913D",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  style={{
                    marginTop: "28px",
                    width: "100%",
                    height: "56px",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: placing ? "not-allowed" : "pointer",
                    backgroundColor: placing ? "#C9A882" : "#E8913D",
                    color: "#FFFFFF",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "1rem",
                    letterSpacing: "0.02em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: placing ? "none" : "0 10px 30px -10px #E8913D80",
                    transition: "transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!placing) {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 14px 30px -8px #E8913D80";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = placing ? "none" : "0 10px 30px -10px #E8913D80";
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "scale(0.98)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  aria-label="Place Order and Pay Now"
                >
                  {placing ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Processing…
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      Place Order / Pay Now
                    </>
                  )}
                </button>

                {/* Payment trust */}
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A882" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    256-bit SSL encrypted · Powered by Razorpay
                  </span>
                </div>

                {/* Payment icons */}
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {["VISA", "MC", "UPI", "GPay"].map((method) => (
                    <div
                      key={method}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "1px solid #E8D5C0",
                        backgroundColor: "#FAFAFA",
                        fontSize: "10px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        color: "#1A1A1A",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer
        style={{
          backgroundColor: "#1A1A1A",
          padding: "80px 40px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "48px",
          }}
        >
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#E8913D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="14" width="18" height="2" rx="1" fill="#fff" />
                  <rect x="5" y="10" width="14" height="2" rx="1" fill="#fff" />
                  <rect x="7" y="6" width="10" height="2" rx="1" fill="#fff" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                }}
              >
                Crispco
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              Taste the Golden Standard.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.7)", display: "flex" }}
                aria-label="Instagram"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.7)", display: "flex" }}
                aria-label="Facebook"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.7)", display: "flex" }}
                aria-label="TikTok"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#E8913D",
                marginBottom: "20px",
              }}
            >
              Shop
            </h3>
            {["Full Menu", "Bundles", "Gift Cards", "Seasonal Specials"].map((link) => (
              <button
                key={link}
                onClick={() => router.push("/shop")}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  lineHeight: "2.2",
                  textAlign: "left",
                  padding: 0,
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E8913D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Col 3: Learn */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#E8913D",
                marginBottom: "20px",
              }}
            >
              Learn
            </h3>
            {["Our Story", "Ingredients", "FAQs", "Contact Us"].map((link) => (
              <button
                key={link}
                onClick={() => router.push("/shop")}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  lineHeight: "2.2",
                  textAlign: "left",
                  padding: 0,
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E8913D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "1.125rem",
                color: "#E8913D",
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              Stay Golden.
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              Get exclusive deals and fresh drops straight to your inbox.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                borderRadius: "9999px",
                padding: "0 24px",
                color: "#FFFFFF",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              style={{
                marginTop: "12px",
                width: "100%",
                height: "50px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#E8913D",
                color: "#FFFFFF",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "0.9375rem",
                transition: "transform 200ms ease, background-color 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.backgroundColor = "#D4822E";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.backgroundColor = "#E8913D";
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "48px auto 0",
            padding: "28px 0 32px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            © 2026 Crispco. All rights reserved.{" "}
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              Privacy Policy
            </button>{" "}
            ·{" "}
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              Terms of Service
            </button>
          </p>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {["VISA", "MC", "UPI", "RuPay", "GPay"].map((m) => (
              <div
                key={m}
                style={{
                  height: "28px",
                  padding: "0 8px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.06em",
                }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}