import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Invoice from "./Invoice";
import "./DashboardLayout.css";

/* ==========================================================================
   PIXEL-PERFECT SVG ICONS (Direct match to reference image)
   ========================================================================== */

/** Anims MMS Monogram Logo (white badge with dark navy emblem) */
const AnimsLogo = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized sharp pyramid / delta monogram */}
    <path
      d="M16 4L6 22H11L16 12L21 22H26L16 4Z"
      fill="#132B5C"
    />
    <path
      d="M13 23.5H19M11 26H21"
      stroke="#132B5C"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/** 1. Dashboard Icon (4 squares grid) */
const DashboardIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

/** 2. Invoice Icon (Ticket voucher with side scalloped notches and $ sign inside) */
const InvoiceIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Ticket with side perforated notches */}
    <path d="M6 3h12a2 2 0 0 1 2 2v2a1.5 1.5 0 0 0 0 3v4a1.5 1.5 0 0 0 0 3v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a1.5 1.5 0 0 0 0-3v-4a1.5 1.5 0 0 0 0-3V5a2 2 0 0 1 2-2z" />
    {/* Centered Dollar symbol */}
    <path d="M12 7v10" />
    <path d="M14.5 9.8a2 2 0 0 0-2-1.3h-1a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-1a2 2 0 0 1-2-1.5" />
  </svg>
);

/** 3. Tax / GST Icon (Clipboard with checkmark) */
const TaxIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="m9 14 2 2 4-4" />
  </svg>
);

/** 4. Company Icon (Office building with window grids) */
const CompanyIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
  </svg>
);

/** 5. Product Icon (3D Isometric Cube Box) */
const ProductIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

/** 6. Customers Icon (Two Users Outline) */
const CustomersIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/** 7. Reports Icon (L-axis with 3 vertical ascending bars) */
const ReportsIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19h16" />
    <path d="M7 19v-4" />
    <path d="M12 19v-9" />
    <path d="M17 19v-13" />
  </svg>
);

/** 8. Print Studio Icon (Printer) */
const PrintStudioIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

/** 9. Settings Icon (Gear) */
const SettingsIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/** 10. Logout Icon (Arrow exiting door) */
const LogoutIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

/** Double Chevrons for Edge Toggle */
const ChevronsLeftIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="11 17 6 12 11 7" />
    <polyline points="18 17 13 12 18 7" />
  </svg>
);

const ChevronsRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
);

/* ==========================================================================
   NAVIGATION CONFIGURATION (Exact match to Image 1)
   ========================================================================== */
const NAV_SECTIONS = [
  {
    category: "SALES",
    items: [
      { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
      { id: "invoice", label: "Invoice", icon: InvoiceIcon, path: "/invoice" },
      { id: "reports", label: "Reports", icon: ReportsIcon, path: "/reports" },
    ]
  },
  {
    category: "CORE",
    items: [
      { id: "product", label: "Product", icon: ProductIcon, path: "/product" },
      { id: "customers", label: "Customers", icon: CustomersIcon, path: "/customers" },
      { id: "tax", label: "Tax / GST", icon: TaxIcon, path: "/tax" },
    ]
  }
];

const NAV_ITEMS_BOTTOM = [
  { id: "print-studio", label: "Print Studio", icon: PrintStudioIcon, path: "/print-studio" },
  { id: "settings", label: "Settings", icon: SettingsIcon, path: "/settings" },
  { id: "logout", label: "Logout", icon: LogoutIcon, path: null },
];

/* ==========================================================================
   STANDALONE SIDEBAR COMPONENT (Exact Match to Image 1)
   ========================================================================== */
export function MMSNavSidebar({
  isCollapsed,
  onToggleCollapse,
  activeId = "invoice",
  onSelect
}) {
  return (
    <aside className={`mms-sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
      {/* Edge Circular Toggle Button */}
      {onToggleCollapse && (
        <button
          className="mms-toggle-btn"
          onClick={onToggleCollapse}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronsRightIcon /> : <ChevronsLeftIcon />}
        </button>
      )}

      {/* Brand Header */}
      <div className="mms-brand-container">
        <div className="mms-logo-box">
          <img
            src="/Images/logo.png"
            alt="Anims MMS"
            className="mms-logo-img"
          />
        </div>
        {!isCollapsed && (
          <div className="mms-brand-text">
            <span className="mms-brand-title">Anims MMS</span>
            <span className="mms-brand-subtitle">Material Management System</span>
          </div>
        )}
      </div>

      {/* Navigation Sections: SALES & CORE */}
      <div className="mms-nav-sections">
        {NAV_SECTIONS.map((section) => (
          <div key={section.category} className="mms-nav-section">
            {!isCollapsed ? (
              <div className="mms-section-label">{section.category}</div>
            ) : (
              <div className="mms-section-divider" />
            )}
            <ul className="mms-nav-group">
              {section.items.map((item) => {
                const IconComp = item.icon;
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <div
                      className={`mms-nav-item ${isActive ? "active" : ""}`}
                      onClick={() => onSelect && onSelect(item.id, item.path)}
                    >
                      <div className="mms-icon-wrapper">
                        <IconComp
                          size={19}
                          color={isActive ? "#FFFFFF" : "#475569"}
                        />
                      </div>
                      {!isCollapsed && (
                        <span className="mms-nav-label">{item.label}</span>
                      )}
                      {isCollapsed && (
                        <div className="mms-tooltip">{item.label}</div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Items: Print Studio, Settings & Logout */}
      <ul className="mms-nav-bottom-group">
        {NAV_ITEMS_BOTTOM.map((item) => {
          const IconComp = item.icon;
          const isActive = activeId === item.id;
          const isLogout = item.id === "logout";
          return (
            <li key={item.id}>
              <div
                className={`mms-nav-item ${isActive ? "active" : ""} ${isLogout ? "logout-item" : ""}`}
                onClick={() => onSelect && onSelect(item.id, item.path)}
                title={item.label}
              >
                <div className="mms-icon-wrapper">
                  <IconComp
                    size={19}
                    color={isActive ? "#FFFFFF" : isLogout ? "#64748B" : "#475569"}
                  />
                </div>
                {!isCollapsed && (
                  <span className="mms-nav-label">{item.label}</span>
                )}
                {isCollapsed && (
                  <div className="mms-tooltip">{item.label}</div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/* ==========================================================================
   MAIN DASHBOARD LAYOUT COMPONENT
   ========================================================================== */
export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialTab = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("dashboard")) return "dashboard";
    if (path.includes("tax")) return "tax";
    if (path.includes("company")) return "company";
    if (path.includes("product")) return "product";
    if (path.includes("customers")) return "customers";
    if (path.includes("reports")) return "reports";
    if (path.includes("print-studio")) return "print-studio";
    if (path.includes("settings")) return "settings";
    return "invoice";
  };

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);

  // Sync route with active item or perform action
  const handleItemSelect = (id, path) => {
    if (id === "logout") {
      localStorage.removeItem("user");
      localStorage.removeItem("ba_last_activity");
      navigate("/login", { replace: true });
      return;
    }
    setActiveTab(id);
    if (path) {
      navigate(path);
    }
  };

  const getActiveItemLabel = () => {
    for (const sec of NAV_SECTIONS) {
      const match = sec.items.find(item => item.id === activeTab);
      if (match) return match.label;
    }
    const bottomMatch = NAV_ITEMS_BOTTOM.find(item => item.id === activeTab);
    return bottomMatch ? bottomMatch.label : "Invoice";
  };

  return (
    <div className="mms-dashboard-wrapper">
      {/* 1. Primary Interactive Sidebar (Existing Blue Color Sidebar Intact) */}
      <MMSNavSidebar
        isCollapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        activeId={activeTab}
        onSelect={handleItemSelect}
      />

      {/* 2. Main Workspace Content Area */}
      <main className="mms-main-content">
        {activeTab === "dashboard" ? (
          /* Exact Match to Dashboard Page Image */
          <div className="mms-dashboard-img-view">
            <img
              src="/DBImg/Dashoard_page-0001.jpg"
              alt="Dashboard Overview"
              className="mms-dashboard-hero-img"
            />
          </div>
        ) : activeTab === "product" ? (
          /* Exact Match to Product Home Image */
          <div className="mms-dashboard-img-view">
            <img
              src="/DBImg/PRODUCT MASTER.jpg"
              alt="Product Home"
              className="mms-dashboard-hero-img"
            />
          </div>
        ) : activeTab === "customers" ? (
          /* Exact Match to Customer Master Image */
          <div className="mms-dashboard-img-view">
            <img
              src="/DBImg/customer%20master.jpg"
              alt="Customer Master"
              className="mms-dashboard-hero-img"
            />
          </div>
        ) : activeTab === "tax" ? (
          /* Exact Match to Create Tax Image */
          <div className="mms-dashboard-img-view">
            <img
              src="/DBImg/cREATE%20TAX.jpg"
              alt="Create Tax"
              className="mms-dashboard-hero-img"
            />
          </div>
        ) : activeTab === "invoice" ? (
          /* Exact Match to Invoice Image */
          <div className="mms-dashboard-img-view">
            <img
              src="/DBImg/iNVOICE%20SCEEN1.jpg"
              alt="Invoice Screen"
              className="mms-dashboard-hero-img"
            />
          </div>
        ) : (
          <>
            {/* Top Header Bar for other modules */}
            <header className="mms-top-header">
              <div className="mms-header-left">
                <div className="mms-header-title-group">
                  <div className="mms-header-breadcrumb">
                    Pages / <span>{getActiveItemLabel()}</span>
                  </div>
                  <h1>{getActiveItemLabel()} Management</h1>
                </div>
              </div>

              <div className="mms-header-right">
                <div className="mms-search-box">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search modules, materials..."
                    className="mms-search-input"
                  />
                </div>

                <div className="mms-user-profile">
                  <div className="mms-user-avatar">SK</div>
                  <div className="mms-user-info">
                    <span className="mms-user-name">Sheik Ahamed</span>
                    <span className="mms-user-role">Anims MMS Admin</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Other Module Workspace Body */}
            <div className="mms-page-body">
              <div className="mms-table-card" style={{ padding: "48px 24px", textAlign: "center" }}>
                <div style={{ maxWidth: "480px", margin: "0 auto" }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "#EEF4FD",
                    color: "#3177DB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto"
                  }}>
                    {activeTab === "dashboard" && <DashboardIcon size={28} color="#3177DB" />}
                    {activeTab === "tax" && <TaxIcon size={28} color="#3177DB" />}
                    {activeTab === "company" && <CompanyIcon size={28} color="#3177DB" />}
                    {activeTab === "product" && <ProductIcon size={28} color="#3177DB" />}
                    {activeTab === "customers" && <CustomersIcon size={28} color="#3177DB" />}
                    {activeTab === "reports" && <ReportsIcon size={28} color="#3177DB" />}
                    {activeTab === "print-studio" && <PrintStudioIcon size={28} color="#3177DB" />}
                    {activeTab === "settings" && <SettingsIcon size={28} color="#3177DB" />}
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
                    {getActiveItemLabel()} Module
                  </h3>
                  <p style={{ color: "#64748B", fontSize: "14px", marginBottom: "20px" }}>
                    This is the workspace for {getActiveItemLabel()}. Click on <strong>Invoice</strong> in the sidebar to view the New Invoice form.
                  </p>
                  <button
                    className="mms-btn-primary"
                    style={{ margin: "0 auto" }}
                    onClick={() => handleItemSelect("invoice", "/invoice")}
                  >
                    Go to Invoice (Image 1 View)
                  </button>
                </div>
              </div>

              <Outlet />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
