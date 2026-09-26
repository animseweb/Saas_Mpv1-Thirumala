import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./assets/Pages/DashboardLayout";
import LoginPage from "./assets/Pages/Login";
import DBLanding from "./assets/Pages/DBLanding";

export default function Router() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/landing" element={<DBLanding />} />
            <Route path="/db-landing" element={<DBLanding />} />
            <Route path="/" element={<DBLanding />} />
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/invoice" element={<DashboardLayout />} />
            <Route path="/tax" element={<DashboardLayout />} />
            <Route path="/company" element={<DashboardLayout />} />
            <Route path="/product" element={<DashboardLayout />} />
            <Route path="/customers" element={<DashboardLayout />} />
            <Route path="/reports" element={<DashboardLayout />} />
            <Route path="/print-studio" element={<DashboardLayout />} />
            <Route path="/settings" element={<DashboardLayout />} />
            <Route path="/AnimsBusinessAnalytics" element={<DashboardLayout />} />
            <Route path="*" element={<DashboardLayout />} />
        </Routes>
    );
}