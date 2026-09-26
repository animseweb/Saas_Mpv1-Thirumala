import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Invoice.css";

/* ==========================================================================
   INVOICE MODULE ICONS (Pixel-accurate SVGs)
   ========================================================================== */

/** Search Icon */
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/** Paper plane / Send Icon */
const PaperPlaneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/** Bell Icon */
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/** Help Question Circle Icon */
const HelpCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/** Calendar Icon */
const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/** Down Chevron */
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/** Settings Gear Icon */
const GearIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

/** 6 Module Icons */
const DashboardModuleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const SalesModuleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const AccountsModuleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="16" y1="14" x2="16" y2="18" />
    <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01" />
  </svg>
);

const ReportsModuleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ImportDataModuleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <polyline points="9 15 12 18 15 15" />
  </svg>
);

export default function Invoice() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(true);
  const [showTaxPopup, setShowTaxPopup] = useState(true);

  // Form states
  const [marketingOfficer, setMarketingOfficer] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [billType, setBillType] = useState("");
  const [remarks, setRemarks] = useState("");

  return (
    <div className="invoice-page-container">
      {/* 1. TOP HEADER (Thirumala Fertilizer Company, Search, + Create, Icons, Profile Dropdown) */}
      <header className="inv-top-header">
        <div className="inv-header-company">
          <span className="inv-company-title">Thirumala Fertilizer Company</span>
          <span className="inv-company-meta">
            FY 2026-27 · <span>Tamil Nadu</span>
          </span>
        </div>

        <div className="inv-header-search">
          <span className="inv-search-icon">
            <SearchIcon />
          </span>
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="inv-search-input"
          />
        </div>

        <div className="inv-header-actions">
          <button className="inv-create-btn">
            <span>+</span> Create
          </button>

          <button className="inv-icon-btn" title="Send">
            <PaperPlaneIcon />
          </button>

          <button className="inv-icon-btn" title="Notifications">
            <BellIcon />
            <span className="inv-bell-dot"></span>
          </button>

          <button className="inv-icon-btn" title="Help">
            <HelpCircleIcon />
          </button>

          {/* Profile Circle Avatar */}
          <div 
            className="inv-avatar-circle"
            onClick={() => setProfileOpen(!profileOpen)}
            title="User Profile"
          >
            SK
          </div>

          {/* User Profile Popup (Rendered exactly like in Image 1 top right) */}
          {profileOpen && (
            <div className="inv-profile-popup">
              <div className="inv-profile-header">
                <span className="inv-profile-name">Sheik Ahamed</span>
                <span className="inv-profile-email">animsdesign2025@gamil.com</span>
              </div>
              <ul className="inv-profile-menu">
                <li className="inv-profile-menu-item">My profile</li>
                <li className="inv-profile-menu-item">My permissions</li>
                <li className="inv-profile-menu-item">Setup checklist</li>
                <li className="inv-profile-menu-item">Trash</li>
                <li 
                  className="inv-profile-menu-item" 
                  style={{ color: "#ef4444", fontWeight: 600, borderTop: "1px solid #f1f5f9", marginTop: 4, paddingTop: 8, cursor: "pointer" }}
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                >
                  Sign out
                </li>
              </ul>
              <div className="inv-profile-footer">
                Help & support
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTENT */}
      <div className="inv-content-body">
        {/* 6 Royal Blue Module Tiles */}
        <div className="inv-modules-row">
          <div className="inv-module-tile">
            <div className="inv-module-icon-box">
              <DashboardModuleIcon />
            </div>
            <span className="inv-module-label">Dash Board</span>
          </div>

          <div className="inv-module-tile">
            <div className="inv-module-icon-box">
              <SalesModuleIcon />
            </div>
            <span className="inv-module-label">Sales</span>
          </div>

          <div className="inv-module-tile">
            <div className="inv-module-icon-box">
              <AccountsModuleIcon />
            </div>
            <span className="inv-module-label">Accounts</span>
          </div>

          <div className="inv-module-tile">
            <div className="inv-module-icon-box">
              <ReportsModuleIcon />
            </div>
            <span className="inv-module-label">Reports</span>
          </div>

          <div className="inv-module-tile">
            <div className="inv-module-icon-box">
              <ImportDataModuleIcon />
            </div>
            <span className="inv-module-label">Import data</span>
          </div>

          <div className="inv-module-tile">
            <div className="inv-module-icon-box">
              <GearIcon size={22} />
            </div>
            <span className="inv-module-label">Settings</span>
          </div>
        </div>

        {/* Breadcrumb Title & Subtitle */}
        <div className="inv-title-section">
          <h1 className="inv-breadcrumb-title">
            Activity / Invoice / <span className="active-title">New Invoice</span>
          </h1>
          <p className="inv-subtitle">
            What you have sold, what has been paid, and what is still owed to you. Every number here is clickable.
          </p>
        </div>

        {/* Toolbar Action Buttons */}
        <div className="inv-toolbar">
          <button className="inv-tool-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Apply Filters
          </button>

          <button className="inv-tool-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            Send
          </button>

          <button className="inv-tool-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print
          </button>

          <button className="inv-new-invoice-btn">
            <span>+</span> New Invoice
          </button>
        </div>

        {/* 3. FORM GRID (Header Details) */}
        <div className="inv-form-grid">
          {/* Row 1, Col 1: Bill Number */}
          <div className="inv-form-group">
            <label className="inv-label">Bill Number</label>
            <div className="inv-value-text">INV26001</div>
            <span className="inv-helper-text">System generated · next will be INV26002</span>
          </div>

          {/* Row 1, Col 2: Bill Type */}
          <div className="inv-form-group">
            <label className="inv-label">
              Bill Type <span className="inv-required-star">*</span>
            </label>
            <div className="inv-underline-box">
              <input 
                type="text" 
                placeholder="Select the invoice type" 
                className="inv-underline-input"
                value={billType}
                onChange={(e) => setBillType(e.target.value)}
              />
              <span className="inv-field-icon">
                <ChevronDownIcon />
              </span>
            </div>
            <span className="inv-helper-text">Select the invoice type</span>
          </div>

          {/* Row 1, Col 3: Date */}
          <div className="inv-form-group">
            <label className="inv-label">Date</label>
            <div className="inv-underline-box">
              <input 
                type="text" 
                defaultValue="14-Sept-2026" 
                className="inv-underline-input"
              />
              <span className="inv-field-icon">
                <CalendarIcon />
              </span>
            </div>
            <span className="inv-helper-text">Defaults to today · 14 Sep 2026</span>
          </div>

          {/* Row 2, Col 1: M.O. Name */}
          <div className="inv-form-group">
            <label className="inv-label">
              M.O. Name <span className="inv-required-star">*</span>
            </label>
            <div className="inv-underline-box">
              <span style={{ color: "#94A3B8", marginRight: "6px", display: "flex", alignItems: "center" }}>
                <SearchIcon />
              </span>
              <span style={{ color: "#CBD5E1", marginRight: "6px" }}>|</span>
              <input 
                type="text" 
                placeholder="Search marketing officer..." 
                className="inv-underline-input"
                value={marketingOfficer}
                onChange={(e) => setMarketingOfficer(e.target.value)}
              />
              <span 
                className="inv-clear-icon" 
                onClick={() => setMarketingOfficer("")}
              >
                ✕
              </span>
            </div>
          </div>

          {/* Row 2, Col 2 & 3: P.O.No and P.O.Date */}
          <div className="inv-form-group" style={{ gridColumn: "span 2" }}>
            <div className="inv-split-row">
              <div>
                <label className="inv-label">
                  P.O.No <span className="inv-required-star">*</span>
                </label>
                <div className="inv-underline-box">
                  <input 
                    type="text" 
                    placeholder="Enter Purchase Order Number" 
                    className="inv-underline-input"
                  />
                </div>
              </div>

              <div>
                <label className="inv-label">
                  P.O.Date <span className="inv-required-star">*</span>
                </label>
                <div className="inv-underline-box">
                  <input 
                    type="text" 
                    defaultValue="14-sept-2026" 
                    className="inv-underline-input"
                  />
                  <span className="inv-field-icon">
                    <CalendarIcon />
                  </span>
                </div>
                <span className="inv-helper-text">Select P.O. Date</span>
              </div>
            </div>
          </div>

          {/* Row 3, Col 1: Customer Name */}
          <div className="inv-form-group">
            <label className="inv-label">
              Customer Name <span className="inv-required-star">*</span>
            </label>
            <div className="inv-underline-box">
              <span style={{ color: "#94A3B8", marginRight: "6px", display: "flex", alignItems: "center" }}>
                <SearchIcon />
              </span>
              <input 
                type="text" 
                placeholder="Search Customer name..." 
                className="inv-underline-input"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                onFocus={() => setShowCustomerPopup(true)}
              />
              <span 
                className="inv-clear-icon" 
                onClick={() => setCustomerName("")}
              >
                ✕
              </span>
            </div>

            {/* Customer Dropdown Autocomplete Popup matching Image 1 */}
            {showCustomerPopup && (
              <div className="inv-autocomplete-popup">
                <div className="inv-popup-badge-grey">
                  No customer found in masters
                </div>
                <div 
                  className="inv-popup-action-blue"
                  onClick={() => {
                    setCustomerName("ABC INDUSTRY");
                    setShowCustomerPopup(false);
                  }}
                >
                  <span>+</span> Create Customer "ABC INDUSTRY"
                </div>
              </div>
            )}
          </div>

          {/* Row 3, Col 2 & 3: Reff.No and Reff.Date */}
          <div className="inv-form-group" style={{ gridColumn: "span 2" }}>
            <div className="inv-split-row">
              <div>
                <label className="inv-label">
                  Reff.No <span className="inv-required-star">*</span>
                </label>
                <div className="inv-underline-box">
                  <input 
                    type="text" 
                    placeholder="Enter Reference Number" 
                    className="inv-underline-input"
                  />
                </div>
              </div>

              <div>
                <label className="inv-label">
                  Reff.Date <span className="inv-required-star">*</span>
                </label>
                <div className="inv-underline-box">
                  <input 
                    type="text" 
                    defaultValue="14-sept-2026" 
                    className="inv-underline-input"
                  />
                  <span className="inv-field-icon">
                    <CalendarIcon />
                  </span>
                </div>
                <span className="inv-helper-text">Select Reff. Date</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. ITEMS DATA TABLE */}
        <div className="inv-table-container">
          <table className="inv-table">
            <thead>
              <tr>
                <th style={{ width: "36px" }} className="inv-col-center">
                  <input type="checkbox" />
                </th>
                <th style={{ width: "45px" }}>No.</th>
                <th>Description</th>
                <th>Print Description</th>
                <th>HSN/SAC</th>
                <th className="inv-col-right">Qty</th>
                <th>UOM</th>
                <th className="inv-col-right">Rate</th>
                <th className="inv-col-right">Amount</th>
                <th style={{ width: "40px" }} className="inv-col-center">
                  <GearIcon size={14} />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="inv-col-center">
                  <input type="checkbox" />
                </td>
                <td>01</td>
                <td>
                  <span>STD MIX NO: 04</span>
                  {/* Floating Product Autocomplete Popup */}
                  {showProductPopup && (
                    <div className="inv-autocomplete-popup" style={{ top: "38px", left: "10px", width: "220px" }}>
                      <div className="inv-popup-badge-grey">
                        No Product found in masters...
                      </div>
                      <div 
                        className="inv-popup-action-blue"
                        onClick={() => setShowProductPopup(false)}
                      >
                        <span>+</span> Create Product "STD MIX NO: 04"
                      </div>
                    </div>
                  )}
                </td>
                <td>STD MIX NO: 04-2526145</td>
                <td>858585</td>
                <td className="inv-col-right">96.325</td>
                <td>KGS</td>
                <td className="inv-col-right">96,000</td>
                <td className="inv-col-right">9,216,000</td>
                <td className="inv-col-center">
                  <button className="inv-remove-pill">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* + Add Item button */}
        <button className="inv-add-item-btn">
          <span>+</span> Add Item
        </button>

        {/* 5. BOTTOM SECTION (Remarks on Left, Financial Summary on Right) */}
        <div className="inv-bottom-section">
          {/* Left: Remarks and Action Buttons */}
          <div className="inv-remarks-box">
            <label className="inv-remarks-label">Remarks :</label>
            <textarea 
              className="inv-remarks-textarea"
              placeholder="Add delivery notes, payment terms or anything the customer should see on this bill..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />

            <div className="inv-bottom-actions">
              <button className="inv-save-btn">
                Save Invoice
              </button>
              <button className="inv-cancel-btn">
                Cancel
              </button>
            </div>
          </div>

          {/* Right: Financial Summary (Exact Image 1 Fidelity) */}
          <div className="inv-summary-container">
            <div className="inv-summary-card">
              <div className="inv-summary-row">
                <span className="inv-summary-label">Grand total of the amount</span>
                <div className="inv-summary-val-box">
                  <span>₹</span> 9,216,000
                </div>
              </div>

              <div className="inv-summary-row">
                <span className="inv-summary-label">Discount</span>
                <div className="inv-summary-val-box">
                  <div className="inv-discount-pill">
                    <span className="inv-disc-btn active">₹</span>
                    <span className="inv-disc-btn">%</span>
                  </div>
                  <span>₹</span> 25,236
                </div>
              </div>

              <div className="inv-summary-row">
                <span className="inv-summary-label">Packing & forwarding</span>
                <div className="inv-summary-val-box">
                  <span>₹</span> 52,255
                </div>
              </div>

              {/* Tax Divider Line & Label */}
              <div className="inv-tax-divider-row">
                <div className="inv-tax-divider-line"></div>
                <span className="inv-tax-divider-text">Tax</span>
              </div>

              <div className="inv-summary-row">
                <span className="inv-summary-label">CGST @ 9%</span>
                <div className="inv-summary-val-box">
                  <span>₹</span> 30,836.98
                </div>
              </div>

              <div className="inv-summary-row">
                <span className="inv-summary-label">SGST @ 9%</span>
                <div className="inv-summary-val-box">
                  <span>₹</span> 30,836.98
                </div>
              </div>

              {/* Tax Master Autocomplete Popup Card */}
              {showTaxPopup && (
                <div className="inv-tax-popup-row">
                  <div className="inv-tax-popup-card">
                    <div className="inv-popup-badge-grey">
                      No Tax Card in masters...
                    </div>
                    <div 
                      className="inv-popup-action-blue"
                      onClick={() => setShowTaxPopup(false)}
                    >
                      <span>+</span> Create Tax Card
                    </div>
                  </div>
                </div>
              )}

              {/* Large Blue Net Amount Banner */}
              <div className="inv-net-amount-banner">
                <span className="inv-net-label">Net Amount :</span>
                <span className="inv-net-val">₹ 4,04,307.06</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
