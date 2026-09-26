import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const RIGHTS_CACHE_KEY = "ba_user_rights";
const COMPANY_DEBOUNCE_MS = 200;
const COMPANY_MIN_LEN = 2;

// Built-in client-side organization directory (No backend required)
const PREDEFINED_COMPANIES = {
    "ANIMS": "Anims Infocare Manufacturing Solutions",
    "MMS": "Anims MMS Material Management System",
    "DEMO": "Demo Manufacturing Industries Ltd",
    "ADMIN": "Anims Enterprise ERP Corp",
    "TATA": "Tata Advanced Materials & Tech",
    "COMP01": "Apex Precision Components Pvt Ltd",
    "INFOCARE": "Anims Infocare Tech Solutions",
    "SAAS": "MMS SaaS Cloud Infrastructure",
    "GLOBAL": "Global Tech Materials Corp",
    "ACME": "Acme Precision Engineering Pvt Ltd",
};

function writeRightsCache(companyCode, username, rights = {}, isSuperAdmin = true) {
    try {
        localStorage.setItem(RIGHTS_CACHE_KEY, JSON.stringify({
            companyCode,
            username,
            rights,
            isSuperAdmin,
            ts: Date.now(),
        }));
    } catch {
        /* ignore */
    }
}

/* ==========================================================================
   ICONS (Exact match to reference UI)
   ========================================================================== */
const IconOrg = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
);

const IconUser = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const IconLock = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const IconEyeOpen = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const IconEyeClosed = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const IconArrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

/* ==========================================================================
   MAIN FRONTEND LOGIN COMPONENT
   ========================================================================== */
export default function LoginPage() {
    const navigate = useNavigate();

    // Form states
    const [userId, setUserId] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyState, setCompanyState] = useState("idle"); // idle | loading | found | error
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginBusy, setLoginBusy] = useState(false);

    const lookupTimerRef = useRef(null);

    // Client-side auto-lookup for organization code
    const handleUserIdChange = (val) => {
        setUserId(val);
        setLoginError("");

        clearTimeout(lookupTimerRef.current);
        const trimmed = val.trim();

        if (!trimmed || trimmed.length < COMPANY_MIN_LEN) {
            setCompanyName("");
            setCompanyState("idle");
            return;
        }

        const upper = trimmed.toUpperCase();

        // Instant match from local directory
        if (PREDEFINED_COMPANIES[upper]) {
            setCompanyName(PREDEFINED_COMPANIES[upper]);
            setCompanyState("found");
            return;
        }

        // Dynamic local resolution for any custom code
        setCompanyState("loading");
        lookupTimerRef.current = setTimeout(() => {
            setCompanyName(`${upper} Manufacturing Industries Ltd`);
            setCompanyState("found");
        }, COMPANY_DEBOUNCE_MS);
    };

    // ── Pure Frontend Login Submit (No backend required) ──
    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError("");

        const uid = userId.trim();
        const uname = username.trim();

        if (!uid) {
            setLoginError("Please enter your organization ID.");
            return;
        }
        if (!uname) {
            setLoginError("Please enter your username.");
            return;
        }
        if (!password) {
            setLoginError("Please enter your password.");
            return;
        }

        setLoginBusy(true);

        // Smooth simulated client-side transition (~400ms)
        setTimeout(() => {
            const orgName = companyName || `${uid.toUpperCase()} Manufacturing Solutions`;
            const userData = {
                message: "Login successful",
                company: orgName,
                company_code: uid.toUpperCase(),
                username: uname,
                designation: "Anims MMS Admin",
                isExpired: false,
                passwordExpired: false,
                passwordAgeDays: 0,
                plan_id: "enterprise",
                license: {
                    dashboard: true,
                    invoice: true,
                    approvals: true,
                    reports: true,
                    mis: true,
                    charts: true,
                    utility: true,
                    plan_id: "enterprise"
                }
            };

            try {
                localStorage.setItem("user", JSON.stringify(userData));
                writeRightsCache(uid.toUpperCase(), uname, { all: true, invoice: true, admin: true }, true);
                localStorage.setItem("ba_last_activity", String(Date.now()));
                sessionStorage.removeItem("ba_nav");
            } catch {
                /* ignore storage errors */
            }

            setLoginBusy(false);
            // Navigate directly to the DBLanding workspace page
            navigate("/landing", { replace: true });
        }, 400);
    };

    return (
        <div className="lp">
            {/* Background Atmosphere Glows */}
            <div className="lp__blob lp__blob--tr" />
            <div className="lp__blob lp__blob--bl" />
            <div className="lp__blob lp__blob--tl" />

            {/* Background 3D Illustration & Curved Wave Layer */}
            <div className="lp__illus">
                <picture>
                    <source srcSet="/Images/login_hero_1200.webp" media="(max-width: 1200px)" type="image/webp" />
                    <source srcSet="/Images/login_hero.webp" type="image/webp" />
                    <img
                        src="/Images/login_hero.webp"
                        alt="Anims MMS Analytics"
                        className="lp__illus-img"
                        loading="eager"
                        decoding="sync"
                    />
                </picture>
            </div>

            {/* ═══ LEFT PANEL ════════════════════════════════════ */}
            <div className="lp__left">
                <div className="lp__brand">
                    <div className="lp__brand-row">
                        <span className="lp__brand-anims">Anims</span>
                        <div className="lp__brand-subcol">
                            <span className="lp__brand-mms">MMS</span>
                            <div className="lp__brand-rule" />
                            <span className="lp__brand-mfg">Manufacturing</span>
                        </div>
                    </div>
                    <h2 className="lp__tagline">Material Management Software</h2>
                </div>

                <p className="lp__desc">
                    Sign in to see live stock position across every plant and depot, follow indent*to*issue movement in one trail, and act on shortages before the line stops.
                </p>
            </div>

            {/* ═══ RIGHT PANEL ═══════════════════════════════════ */}
            <div className="lp__right">
                {/* Official Anims Emblem Logo */}
                <div className="lp__logo">
                    <img
                        src="/Images/logo.png"
                        alt="Anims"
                        className="lp__logo-img"
                    />
                </div>

                {/* Login Card */}
                <div className="lp__card">
                    <div className="lp__card-head">
                        <h1 className="lp__title">Welcome back</h1>
                        <p className="lp__subtitle">
                            Please enter your details to Login to your account.
                        </p>
                    </div>

                    <form className="lp__form" onSubmit={handleLogin} noValidate autoComplete="off">
                        {/* ── User ID ── */}
                        <div className="lp__field">
                            <label className="lp__label" htmlFor="f-uid">User ID</label>
                            <div className="lp__wrap">
                                <span className="lp__ico"><IconOrg /></span>
                                <input
                                    id="f-uid"
                                    type="text"
                                    className="lp__inp"
                                    placeholder="Enter your organization ID"
                                    value={userId}
                                    onChange={(e) => handleUserIdChange(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        {/* ── Customer Name ── */}
                        <div className="lp__field">
                            <label className="lp__label" htmlFor="f-cust">Customer Name</label>
                            <div className="lp__wrap lp__wrap--bare">
                                <input
                                    id="f-cust"
                                    type="text"
                                    className="lp__inp lp__inp--ro"
                                    placeholder="Auto-fetched from User ID"
                                    value={companyName}
                                    readOnly
                                    tabIndex={-1}
                                />
                            </div>
                        </div>

                        {/* ── Username ── */}
                        <div className="lp__field">
                            <label className="lp__label" htmlFor="f-user">Username</label>
                            <div className="lp__wrap">
                                <span className="lp__ico"><IconUser /></span>
                                <input
                                    id="f-user"
                                    type="text"
                                    className="lp__inp"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setLoginError("");
                                    }}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        {/* ── Password ── */}
                        <div className="lp__field">
                            <label className="lp__label" htmlFor="f-pass">Password</label>
                            <div className="lp__wrap">
                                <span className="lp__ico"><IconLock /></span>
                                <input
                                    id="f-pass"
                                    type={showPassword ? "text" : "password"}
                                    className="lp__inp lp__inp--pass"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setLoginError("");
                                    }}
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    className="lp__pass-toggle"
                                    onClick={() => setShowPassword((p) => !p)}
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <span className="lp__eye-icon">
                                        {showPassword ? <IconEyeClosed /> : <IconEyeOpen />}
                                    </span>
                                </button>
                            </div>
                            <div className="lp__forgot-row">
                                <a
                                    href="#forgot"
                                    className="lp__forgot-link"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        {/* Error Message */}
                        {loginError && (
                            <div className="lp__error-banner">
                                ⚠ {loginError}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="lp__btn"
                            disabled={loginBusy}
                        >
                            <span>{loginBusy ? "Logging in…" : "Login"}</span>
                            <IconArrow />
                        </button>
                    </form>

                    {/* Card Footer */}
                    <div className="lp__footer">
                        <p className="lp__copy">© 2026 Anims Infocare Systems</p>
                        <nav className="lp__links">
                            <a className="lp__link" href="https://animse.com" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                            <span className="lp__dot">·</span>
                            <a className="lp__link" href="https://animse.com" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                            <span className="lp__dot">·</span>
                            <a className="lp__link" href="https://animse.com" target="_blank" rel="noopener noreferrer">Contact Support</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}