import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./assets/Pages/DashboardLayout";
import LoginPage from "./assets/Pages/Login";
import DBLanding from "./assets/Pages/DBLanding";

/* ─── Auth Guard ────────────────────────────────────────────────
   Checks localStorage for a saved user session.
   If not logged in → redirect to /login.
   ─────────────────────────────────────────────────────────────── */
function ProtectedRoute({ children }) {
    const user = (() => {
        try { return JSON.parse(localStorage.getItem("user")); }
        catch { return null; }
    })();

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default function Router() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Root → always go to login first */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Protected routes – only accessible after login */}
            <Route path="/landing"              element={<ProtectedRoute><DBLanding /></ProtectedRoute>} />
            <Route path="/db-landing"           element={<ProtectedRoute><DBLanding /></ProtectedRoute>} />
            {/* Dashboard Layout & Modules - stays mounted so images never reload or flicker */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route path="/dashboard"            element={null} />
                <Route path="/invoice"              element={null} />
                <Route path="/tax"                  element={null} />
                <Route path="/company"              element={null} />
                <Route path="/product"              element={null} />
                <Route path="/customers"            element={null} />
                <Route path="/reports"              element={null} />
                <Route path="/print-studio"         element={null} />
                <Route path="/settings"             element={null} />
                <Route path="/AnimsBusinessAnalytics" element={null} />
            </Route>

            {/* Catch-all → login if not authenticated */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}