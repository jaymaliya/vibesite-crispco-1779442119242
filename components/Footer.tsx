"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setEmail("");
  }

  const linkStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    color: "#1A1A1A",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "6px 0",
    textAlign: "left",
    outline: "none",
    transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
    display: "block",
  };

  return (
    <footer
      style={{
        background: "#FDF8F4",
        borderTop: "1px solid rgba(26,26,26,0.08)",
        paddingTop: "96px",
        paddingBottom: "48px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px 32px",
            marginBottom: "64px",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <button
              onClick={() => router.push("/")}
              aria-label="Crispco — go to homepage"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                outline: "none",
              }}
              onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
              onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
            >
              <svg
                height="32"
                viewBox="0 0 120 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="0" y="10" width="6" height="18" rx="3" fill="#E8913D" />
                <rect x="8" y="5" width="6" height="23" rx="3" fill="#E8913D" />
                <rect x="16" y="8" width="6" height="20" rx="3" fill="#E8913D" />
                <rect x="0" y="24" width="22" height="6" rx="3" fill="#1A1A1A" />
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
            <p
              style={{
                color: "#C9A882",
                fontSize: "14px",
                lineHeight: 1.7,
                margin: "0 0 24px 0",
                maxWidth: "220px",
              }}
            >
              Golden. Fast. Craveable.
              <br />
              Real fries, real crunch — delivered to your door across India.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Crispco on Instagram"
                style={{
                  color: "#1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(26,26,26,0.05)",
                  transition: "background 0.2s cubic-bezier(0.4,0,0.2,1), color 0.2s cubic-bezier(0.4,0,0.2,1)",
                  outline: "none",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(232,145,61,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#E8913D";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,26,26,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A1A";
                }}
                onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "2px solid #E8913D"; }}
                onBlur={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "none"; }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Crispco on Twitter"
                style={{
                  color: "#1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(26,26,26,0.05)",
                  transition: "background 0.2s cubic-bezier(0.4,0,0.2,1), color 0.2s cubic-bezier(0.4,0,0.2,1)",
                  outline: "none",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(232,145,61,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#E8913D";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,26,26,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A1A";
                }}
                onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "2px solid #E8913D"; }}
                onBlur={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "none"; }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0020 4.5a4.5 4.5 0 00-7.72 4.1A12.75 12.75 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Crispco on WhatsApp"
                style={{
                  color: "#1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(26,26,26,0.05)",
                  transition: "background 0.2s cubic-bezier(0.4,0,0.2,1), color 0.2s cubic-bezier(0.4,0,0.2,1)",
                  outline: "none",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(232,145,61,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#E8913D";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,26,26,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#1A1A1A";
                }}
                onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "2px solid #E8913D"; }}
                onBlur={(e) => { (e.currentTarget as HTMLAnchorElement).style.outline = "none"; }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#C9A882",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 20px 0",
              }}
            >
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <button
                style={linkStyle}
                onClick={() => router.push("/")}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#E8913D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A"; }}
                onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
                onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
              >
                Home
              </button>
              <button
                style={linkStyle}
                onClick={() => router.push("/shop")}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#E8913D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A"; }}
                onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
                onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
              >
                Shop
              </button>
              <button
                style={linkStyle}
                onClick={() => {
                  const el = document.getElementById("about");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#E8913D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A"; }}
                onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
                onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
              >
                Our Story
              </button>
              <button
                style={linkStyle}
                onClick={() => {
                  const el = document.getElementById("why-us");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#E8913D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A"; }}
                onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
                onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
              >
                Why Us
              </button>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#C9A882",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 20px 0",
              }}
            >
              Info
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: "shield", text: "100% Veg Certified" },
                { icon: "truck", text: "Free shipping above ₹499" },
                { icon: "map-pin", text: "Made in India" },
                { icon: "refresh", text: "Easy returns within 7 days" },
              ].map(({ icon, text }) => (
                <li key={text} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {icon === "shield" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                  {icon === "truck" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="1" y="3" width="15" height="13" rx="1" />
                      <path d="M16 8h4l3 3v5h-7V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  )}
                  {icon === "map-pin" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  )}
                  {icon === "refresh" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                    </svg>
                  )}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#1A1A1A", lineHeight: 1.5 }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#C9A882",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 12px 0",
              }}
            >
              Stay Crispy
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "#C9A882",
                lineHeight: 1.6,
                margin: "0 0 20px 0",
              }}
            >
              Get exclusive deals, new drops and crunch-worthy updates.
            </p>
            {subscribed ? (
              <div
                role="alert"
                style={{
                  background: "rgba(232,145,61,0.10)",
                  border: "1px solid rgba(232,145,61,0.30)",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8913D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#E8913D",
                  }}
                >
                  You're on the list! Stay crispy.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="footer-email" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#C9A882" }}>
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    placeholder="you@example.com"
                    aria-describedby={emailError ? "footer-email-error" : undefined}
                    aria-invalid={!!emailError}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "#1A1A1A",
                      background: "#fff",
                      border: emailError ? "1.5px solid #c0392b" : "1.5px solid rgba(26,26,26,0.15)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      outline: "none",
                      width: "100%",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "#E8913D"; }}
                    onBlur={(e) => { if (!emailError) (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(26,26,26,0.15)"; }}
                  />
                  {emailError && (
                    <span
                      id="footer-email-error"
                      role="alert"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "#c0392b",
                      }}
                    >
                      {emailError}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  style={{
                    background: "#E8913D",
                    color: "#FDF8F4",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    outline: "none",
                    width: "100%",
                    transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                  onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
                  onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                  onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #1A1A1A"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(26,26,26,0.08)",
            paddingTop: "32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "#C9A882",
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} Crispco. All rights reserved. Made with love in India.
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
              <button
                key={item}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "#C9A882",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  outline: "none",
                  transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
                }}
                onClick={() => {
                  const el = document.getElementById("about");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#E8913D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#C9A882"; }}
                onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #E8913D"; }}
                onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}