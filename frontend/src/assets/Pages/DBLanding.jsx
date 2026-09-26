import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./DBLanding.css";

/* ═══════════════════════════════════════════════════════════════════
   PRECISE SVG ICONS (Direct match to reference design)
   ═══════════════════════════════════════════════════════════════════ */

/** 1. Company Office Building Icon (Top Nav) */
const CompanyBuildingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left taller building */}
    <rect x="3" y="4" width="13" height="21" rx="2" fill="#2563EB" />
    {/* Right lower building wing */}
    <rect x="15" y="11" width="10" height="14" rx="2" fill="#3B82F6" />
    {/* Left building windows (2x4 grid) */}
    <rect x="5.5" y="7" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
    <rect x="10.5" y="7" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
    <rect x="5.5" y="11.5" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
    <rect x="10.5" y="11.5" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
    <rect x="5.5" y="16" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
    <rect x="10.5" y="16" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
    <rect x="7" y="20.5" width="4.5" height="4.5" rx="0.8" fill="#1D4ED8" />
    {/* Right wing windows */}
    <rect x="18" y="14" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
    <rect x="21.5" y="14" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
    <rect x="18" y="18" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
    <rect x="21.5" y="18" width="2.2" height="2.2" rx="0.5" fill="#FFFFFF" />
  </svg>
);

/** 2. Notification Bell Icon */
const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/** 3. Help Question Mark Icon */
const HelpCircleIcon = () => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/** 4. Search Icon */
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7.5" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
    <path d="M6 11h2" strokeLinecap="round" />
  </svg>
);

/** 5. Banner Info Icon */
const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   MODULE TILE ICONS (Exact match to reference tiles)
   ═══════════════════════════════════════════════════════════════════ */

/** Tile 1: Dash Board (2x2 alternating solid/outline squares) */
const DashBoardIcon = () => (
  <svg width="42" height="42" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top Left: Solid blue */}
    <rect x="2" y="2" width="14" height="14" rx="4" fill="#2563EB" />
    {/* Top Right: Outline blue */}
    <rect x="20" y="2" width="14" height="14" rx="4" fill="none" stroke="#93C5FD" strokeWidth="2.2" />
    {/* Bottom Left: Outline blue */}
    <rect x="2" y="20" width="14" height="14" rx="4" fill="none" stroke="#93C5FD" strokeWidth="2.2" />
    {/* Bottom Right: Solid blue */}
    <rect x="20" y="20" width="14" height="14" rx="4" fill="#2563EB" />
  </svg>
);

/** Tile 2: Sales (Document with lines & circular downward arrow) */
const SalesIcon = () => (
  <svg width="42" height="42" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Document sheet */}
    <rect x="4" y="2" width="20" height="26" rx="3.5" fill="none" stroke="#93C5FD" strokeWidth="2" />
    <line x1="9" y1="8" x2="19" y2="8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="13" x2="16" y2="13" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="18" x2="14" y2="18" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
    {/* Downward arrow in blue circle badge */}
    <circle cx="25" cy="25" r="9" fill="#2563EB" />
    <path d="M25 20v9M21.5 25.5l3.5 3.5 3.5-3.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Tile 3: Accounts (Document with ₹ + Calculator) */
const AccountsIcon = () => (
  <svg width="44" height="44" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Invoice Sheet */}
    <path d="M4 4h16a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="none" stroke="#93C5FD" strokeWidth="1.8" />
    {/* Rupee Symbol */}
    <text x="6" y="14" fill="#2563EB" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">₹</text>
    {/* Mini Chart Bars on sheet */}
    <rect x="6" y="20" width="2" height="4" rx="0.5" fill="#2563EB" />
    <rect x="10" y="18" width="2" height="6" rx="0.5" fill="#2563EB" />
    <rect x="14" y="16" width="2" height="8" rx="0.5" fill="#2563EB" />
    {/* Calculator on Right */}
    <rect x="19" y="12" width="16" height="22" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
    {/* Calculator Screen */}
    <rect x="22" y="15" width="10" height="4" rx="1" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1" />
    {/* Calculator Keypad */}
    <rect x="22" y="22" width="2" height="2" rx="0.5" fill="#2563EB" />
    <rect x="26" y="22" width="2" height="2" rx="0.5" fill="#2563EB" />
    <rect x="30" y="22" width="2" height="2" rx="0.5" fill="#2563EB" />
    <rect x="22" y="26" width="2" height="2" rx="0.5" fill="#2563EB" />
    <rect x="26" y="26" width="2" height="2" rx="0.5" fill="#2563EB" />
    <rect x="30" y="26" width="2" height="2" rx="0.5" fill="#2563EB" />
    <rect x="22" y="30" width="2" height="2" rx="0.5" fill="#2563EB" />
    <rect x="26" y="30" width="6" height="2" rx="0.5" fill="#2563EB" />
  </svg>
);

/** Tile 4: Reports (Solid blue squircle with white rising bars & underlines) */
const ReportsIcon = () => (
  <svg width="42" height="42" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Solid Blue Rounded Background Box */}
    <rect x="2" y="2" width="32" height="32" rx="8" fill="#2563EB" />
    {/* 3 Rising White Bar Charts */}
    <rect x="9" y="17" width="3.5" height="7" rx="1" fill="#FFFFFF" />
    <rect x="16" y="13" width="3.5" height="11" rx="1" fill="#FFFFFF" />
    <rect x="23" y="9" width="3.5" height="15" rx="1" fill="#FFFFFF" />
    {/* Horizontal Baseline & Underline */}
    <line x1="8" y1="26" x2="28" y2="26" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="8" y1="29" x2="21" y2="29" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** Tile 5: Import data (Inbox tray with document & down arrow) */
const ImportDataIcon = () => (
  <svg width="42" height="42" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Document coming in */}
    <rect x="9" y="3" width="18" height="18" rx="2.5" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.8" />
    <line x1="13" y1="7" x2="23" y2="7" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="13" y1="10" x2="19" y2="10" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
    {/* Blue Tray Base */}
    <path d="M4 16h8l2.5 4h7l2.5-4h8v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V16z" fill="#2563EB" />
    {/* White Arrow pointing into tray */}
    <path d="M18 15v7M15 19l3 3 3-3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Small 'import' text at bottom */}
    <text x="18" y="30.5" fill="#FFFFFF" fontSize="5.5" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">import</text>
  </svg>
);

/** Tile 6: Settings (Gear with equalizer/filter slider badge) */
const SettingsTileIcon = () => (
  <svg width="44" height="44" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blue Cog / Gear */}
    <path d="M15 5.5l1.2-2.8a1.5 1.5 0 0 1 1.8-.8l2.8 1.1a1.5 1.5 0 0 1 .9 1.8L21 7.6a10.5 10.5 0 0 1 2.5 1.5l2.8-1.2a1.5 1.5 0 0 1 1.9.7l1.4 2.6a1.5 1.5 0 0 1-.5 2l-2.4 1.8a10 10 0 0 1 .4 2.8l2.8 1.1a1.5 1.5 0 0 1 .9 1.8l-1.1 2.8a1.5 1.5 0 0 1-1.8.9l-2.8-1.2a10.5 10.5 0 0 1-2.5 1.5l.7 2.8a1.5 1.5 0 0 1-.9 1.8l-2.8 1.1a1.5 1.5 0 0 1-1.8-.9l-1.2-2.8a10.5 10.5 0 0 1-2.8-.4l-1.8 2.4a1.5 1.5 0 0 1-2 .5l-2.6-1.4a1.5 1.5 0 0 1-.7-1.9l1.2-2.8a10.5 10.5 0 0 1-1.5-2.5l-2.8.7a1.5 1.5 0 0 1-1.8-.9l-1.1-2.8a1.5 1.5 0 0 1 .9-1.8l2.8-1.2a10.5 10.5 0 0 1-.4-2.8l-2.8-1.1a1.5 1.5 0 0 1-.9-1.8l1.1-2.8a1.5 1.5 0 0 1 1.8-.9l2.8 1.2a10.5 10.5 0 0 1 2.5-1.5L9.6 4a1.5 1.5 0 0 1 .9-1.8l2.8-1.1a1.5 1.5 0 0 1 1.8.9L16 4.8" fill="#2563EB" />
    <circle cx="16" cy="16" r="4.5" fill="#FFFFFF" />
    {/* Equalizer Slider Badge on Bottom Right */}
    <circle cx="28" cy="27" r="8" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="1.5" />
    <line x1="23" y1="24.5" x2="33" y2="24.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="26" cy="24.5" r="1.5" fill="#FFFFFF" />
    <line x1="23" y1="29.5" x2="33" y2="29.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="30" cy="29.5" r="1.5" fill="#FFFFFF" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   MODULE DEFINITIONS
   ═══════════════════════════════════════════════════════════════════ */
const MODULE_TILES_ROW1 = [
  { id: "dashboard", label: "Dash Board", icon: DashBoardIcon, path: "/dashboard" },
  { id: "sales", label: "Sales", icon: SalesIcon, path: "/invoice" },
  { id: "accounts", label: "Accounts", icon: AccountsIcon, path: "/tax" },
  { id: "reports", label: "Reports", icon: ReportsIcon, path: "/reports" },
];

const MODULE_TILES_ROW2 = [
  { id: "import", label: "Import data", icon: ImportDataIcon, path: "/product" },
  { id: "settings", label: "Settings", icon: SettingsTileIcon, path: "/settings" },
];

/* ═══════════════════════════════════════════════════════════════════
   DBLANDING MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function DBLanding() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Retrieve current user data from localStorage
  const [currentUser, setCurrentUser] = useState({
    company: "Thirumala Fertilizer Company",
    fiscalYear: "FY 2026–27 · Tamil Nadu",
    username: "Admin",
    initials: "SK"
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        const comp = u.company || "Thirumala Fertilizer Company";
        const uname = u.username || "Admin";
        let inits = "SK";
        if (uname && uname.length >= 2) {
          inits = uname.substring(0, 2).toUpperCase();
        }
        setCurrentUser({
          company: comp,
          fiscalYear: "FY 2026–27 · Tamil Nadu",
          username: uname,
          initials: inits
        });
      }
    } catch {
      /* ignore JSON parse errors */
    }
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleTileClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("ba_last_activity");
    navigate("/login", { replace: true });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    if (q.includes("sale") || q.includes("inv") || q.includes("order")) {
      navigate("/invoice");
    } else if (q.includes("dash") || q.includes("board")) {
      navigate("/dashboard");
    } else if (q.includes("acc") || q.includes("tax") || q.includes("gst")) {
      navigate("/tax");
    } else if (q.includes("rep") || q.includes("analy")) {
      navigate("/reports");
    } else if (q.includes("imp") || q.includes("prod") || q.includes("stock")) {
      navigate("/product");
    } else if (q.includes("set") || q.includes("config")) {
      navigate("/settings");
    } else {
      // Default to invoice
      navigate("/invoice");
    }
  };

  return (
    <div className="dbl">
      {/* ── 1. Top Navigation Bar ──────────────────────────────── */}
      <header className="dbl__nav">
        {/* Left: Building Icon & Company Info */}
        <div className="dbl__nav-left">
          <div className="dbl__nav-logo-box">
            <CompanyBuildingIcon />
          </div>
          <div className="dbl__nav-meta">
            <span className="dbl__nav-company">{currentUser.company}</span>
            <span className="dbl__nav-subtitle">{currentUser.fiscalYear}</span>
          </div>
        </div>

        {/* Right: Notifications, Help, Profile Avatar */}
        <div className="dbl__nav-right" ref={profileRef}>
          <button 
            type="button" 
            className="dbl__nav-btn" 
            title="Notifications"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="dbl__bell-dot" />
          </button>

          <button 
            type="button" 
            className="dbl__nav-btn" 
            title="Help & Support"
            aria-label="Help & Support"
          >
            <HelpCircleIcon />
          </button>

          <button 
            type="button" 
            className="dbl__nav-avatar" 
            onClick={() => setShowProfile(!showProfile)}
            title="Account Menu"
            aria-label="Account Menu"
          >
            {currentUser.initials}
          </button>

          {/* Profile Dropdown Popup */}
          {showProfile && (
            <div className="dbl__profile-menu">
              <div className="dbl__profile-head">
                <div className="dbl__profile-name">{currentUser.username}</div>
                <div className="dbl__profile-email">{currentUser.company}</div>
              </div>
              <button 
                type="button" 
                className="dbl__profile-item" 
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </button>
              <button 
                type="button" 
                className="dbl__profile-item" 
                onClick={() => navigate("/settings")}
              >
                Account Settings
              </button>
              <button 
                type="button" 
                className="dbl__profile-item dbl__profile-item--danger" 
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── 2. Main Content Canvas ────────────────────────────── */}
      <main className="dbl__main">
        {/* Setup Progress Banner Card */}
        {showBanner && (
          <div className="dbl__banner">
            <div className="dbl__banner-left">
              <div className="dbl__banner-icon">
                <InfoIcon />
              </div>
              <div className="dbl__banner-text">
                <span className="dbl__banner-title">Setup is 60% complete</span>
                <span className="dbl__banner-sub">
                  Add stock and tax details so invoices and reports come out right.
                </span>
              </div>
            </div>
            <div className="dbl__banner-right">
              <button 
                type="button" 
                className="dbl__upgrade-btn"
                onClick={() => navigate("/tax")}
              >
                Upgrade
              </button>
              <button 
                type="button" 
                className="dbl__banner-close" 
                onClick={() => setShowBanner(false)}
                title="Dismiss"
                aria-label="Dismiss banner"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Hero Title & Subtitle */}
        <div className="dbl__hero">
          <h1 className="dbl__title">What do you want to work on?</h1>
          <p className="dbl__subtitle">
            Search across products, orders and stock, or jump straight into a module.
          </p>
        </div>

        {/* Pill Search Input */}
        <form className="dbl__search-wrapper" onSubmit={handleSearchSubmit}>
          <span className="dbl__search-icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="dbl__search-input"
            placeholder="Search products, orders, stock & more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* ── 3. Module Tiles (2 Rows) ────────────────────────── */}
        <div className="dbl__tiles-container">
          {/* Row 1: Dash Board, Sales, Accounts, Reports */}
          <div className="dbl__tiles-row">
            {MODULE_TILES_ROW1.map((tile) => {
              const IconComp = tile.icon;
              return (
                <button
                  type="button"
                  key={tile.id}
                  className="dbl__tile"
                  onClick={() => handleTileClick(tile.path)}
                >
                  <div className="dbl__tile-card">
                    <IconComp />
                  </div>
                  <span className="dbl__tile-label">{tile.label}</span>
                </button>
              );
            })}
          </div>

          {/* Row 2: Import data, Settings */}
          <div className="dbl__tiles-row">
            {MODULE_TILES_ROW2.map((tile) => {
              const IconComp = tile.icon;
              return (
                <button
                  type="button"
                  key={tile.id}
                  className="dbl__tile"
                  onClick={() => handleTileClick(tile.path)}
                >
                  <div className="dbl__tile-card">
                    <IconComp />
                  </div>
                  <span className="dbl__tile-label">{tile.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
