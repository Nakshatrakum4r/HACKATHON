// App.js (wrap UI)
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardRouter from "./pages/DashboardRouter";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem("lms_current_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  React.useEffect(() => {
    if (user) sessionStorage.setItem("lms_current_user", JSON.stringify(user));
    else sessionStorage.removeItem("lms_current_user");
  }, [user]);

  return (
    <div>
      {/* Top Navigation Bar */}
      <Navbar user={user || { username: "Guest", role: "GUEST" }} />

      {/* Main Layout Grid: Sidebar + Page Content */}
      <div className="app-grid">
        <Sidebar />

        {/* Page Content */}
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <DashboardRouter user={user} setUser={setUser} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="*"
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
