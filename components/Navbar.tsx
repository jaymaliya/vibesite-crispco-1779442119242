"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [badgePop, setBadgePop] = useState(false);
  const prevTotalRef = useRef(totalItems);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (totalItems !== prevTotalRef.current) {
      setBadgePop(true);
      const t = setTimeout(() => setBadgePop(false), 350);
      prevTotalRef.current = totalItems;
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  function handleScrollTo(id: string) {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  const navLinkBase: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    color: "#1A1A1A",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "8px",
    letterSpacing: "0.01em",
    transition: "color 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s cubic-bezier(0.4,0,0.2,1)",
    outline: "none",
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#FDF8F4",
          boxShadow: scrolled
            ? "0 2px 16px 0 rgba(26,26,26,0.10)"
            : "0 1px 0 0 rgba(26,26,26,0.07)",
          transition: "box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => { setMenuOpen(false); router.push("/"); }}
            aria-label="Crispco — go to homepage"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
              display: "flex",
              alignItems: "center",
              outline: "none",
              flexShrink: 0,
            }}
            onFocus={(e) => (e.currentTarget.style.outline = "2px solid #E8913D")}
            onBlur={(e) => (e.currentTarget.style.outline = "none")}
          >
            <svg
              height="32"
              viewBox="0 0 120 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Fry icon */}
              <rect x="0" y="10" width="6" height="18" rx="3" fill="#E8913D" />
              <rect x="8" y="5" width="6" height="23" rx="3" fill="#E8913D" />
              <rect x="16" y="8" width="6" height="20" rx="3" fill="#E8913D" />
              <rect x="0" y="24" width="22" height="6" rx="3" fill="#1A1A1A" />
              {/* Wordmark */}
              <text
                x="30"
                y="24"
                fontFamily="'Space Grotesk', sans-serif"
                fontWeight="700"
                fontSize="20"
                fill="#1A1A1A"
                letterSpacing="-0.5"
              >
                Crispco
              </text>
            </svg>
          </button>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            className="hidden-mobile"
          >
            <button
              style={navLinkBase}
              onClick={() => { setMenuOpen(false); router.push("/shop"); }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#E8913D";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,145,61,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
              onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
              onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
            >
              Menu
            </button>
            <button
              style={navLinkBase}
              onClick={() => handleScrollTo("about")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#E8913D";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,145,61,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
              onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
              onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
            >
              Our Story
            </button>
            <button
              style={navLinkBase}
              onClick={() => handleScrollTo("why-us")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#E8913D";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,145,61,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
              onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
              onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
            >
              Why Us
            </button>
          </div>

          {/* Right side: Cart + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Cart */}
            <button
              onClick={() => { setMenuOpen(false); router.push("/checkout"); }}
              aria-label={`Open cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
              style={{
                position: "relative",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
                transition: "background 0.2s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,145,61,0.10)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
              onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
              onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
            >
              {/* Cart SVG */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>

              {/* Badge */}
              {totalItems > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "9999px",
                    background: "#FF3E3E",
                    color: "#fff",
                    fontSize: "12px",
                    fontFamily: "'Outfit', 'DM Sans', sans-serif",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                    border: "2px solid #FDF8F4",
                    transform: badgePop ? "scale(1.25)" : "scale(1)",
                    transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="show-mobile"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                outline: "none",
              }}
              onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
              onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#1A1A1A",
                  borderRadius: "2px",
                  transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#1A1A1A",
                  borderRadius: "2px",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.2s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#1A1A1A",
                  borderRadius: "2px",
                  transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#FDF8F4",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            padding: "32px 24px",
            gap: "8px",
            overflowY: "auto",
          }}
        >
          <button
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "18px",
              color: "#1A1A1A",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "16px 0",
              borderBottom: "1px solid rgba(26,26,26,0.08)",
              textAlign: "left",
              outline: "none",
              transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
            onClick={() => { setMenuOpen(false); router.push("/shop"); }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Menu
          </button>
          <button
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "18px",
              color: "#1A1A1A",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "16px 0",
              borderBottom: "1px solid rgba(26,26,26,0.08)",
              textAlign: "left",
              outline: "none",
              transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
            onClick={() => handleScrollTo("about")}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Our Story
          </button>
          <button
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "18px",
              color: "#1A1A1A",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "16px 0",
              borderBottom: "1px solid rgba(26,26,26,0.08)",
              textAlign: "left",
              outline: "none",
              transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
            onClick={() => handleScrollTo("why-us")}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            Why Us
          </button>
          <button
            style={{
              marginTop: "24px",
              background: "#E8913D",
              color: "#FDF8F4",
              border: "none",
              borderRadius: "12px",
              padding: "16px 24px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              outline: "none",
              transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
            onClick={() => { setMenuOpen(false); router.push("/checkout"); }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
            onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            View Cart ({totalItems})
          </button>
        </div>
      )}

      {/* Responsive helpers via Tailwind-compatible approach using inline style media equivalent */}
      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}