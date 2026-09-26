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
            <Route path="/dashboard"            element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
            <Route path="/invoice"              element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
            <Route path="/tax"                  element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
            <Route path="/company"              element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
            <Route path="/product"              element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
            <Route path="/customers"            element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
            <Route path="/reports"              element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
            <Route path="/print-studio"         element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
            <Route path="/settings"             element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
            <Route path="/AnimsBusinessAnalytics" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />

            {/* Catch-all → login if not authenticated */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}