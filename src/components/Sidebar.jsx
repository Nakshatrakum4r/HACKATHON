// Sidebar.jsx
import React from "react";
import { FaTachometerAlt, FaBookOpen, FaChalkboardTeacher, FaUsers } from "react-icons/fa";

export default function Sidebar({ active="dashboard" }) {
  return (
    <aside className="sidebar">
      <div style={{fontWeight:800,marginBottom:12,fontSize:14}}>Navigation</div>

      <div className="nav-item"><FaTachometerAlt/> Dashboard</div>
      <div className="nav-item"><FaBookOpen/> Courses</div>
      <div className="nav-item"><FaChalkboardTeacher/> Instructors</div>
      <div className="nav-item"><FaUsers/> Users</div>

      <div className="nav-sub">Quick actions</div>
      <div style={{marginTop:10}}>
        <div className="nav-item" style={{fontWeight:600}}>Create course</div>
        <div style={{height:10}}></div>
        <div style={{fontSize:13,color:"var(--muted)"}}>Pro tip: use modal to create courses quickly.</div>
      </div>
    </aside>
  );
}
