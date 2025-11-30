import React from "react";
import AdminDashboard from "./AdminDashboard";
import InstructorDashboard from "./InstructorDashboard";
import StudentDashboard from "./StudentDashboard";
import ContentCreatorDashboard from "./ContentCreatorDashboard";

function DashboardRouter({ user, setUser }) {
  const logout = () => {
    setUser(null);
  };

  if (!user) return null;

  if (user.role === "ADMIN") {
    return <AdminDashboard user={user} logout={logout} />;
  } else if (user.role === "INSTRUCTOR") {
    return <InstructorDashboard user={user} logout={logout} />;
  } else if (user.role === "STUDENT") {
    return <StudentDashboard user={user} logout={logout} />;
  } else if (user.role === "CONTENT_CREATOR") {
    return <ContentCreatorDashboard user={user} logout={logout} />;
  } else {
    return <div className="dashboard-section">Unknown role</div>;
  }
}

export default DashboardRouter;
