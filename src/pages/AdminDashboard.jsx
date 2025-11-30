// AdminDashboard.jsx (slight update)
import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";

export default function AdminDashboard({ user, logout }) {
  const [users, setUsers] = useState([]);

  useEffect(() => { fetchUsers().then(setUsers).catch(console.error) }, []);

  return (
    <div className="main-panel">
      <div className="panel">
        <div className="header-row">
          <div>
            <h2 className="h-title">Admin Dashboard 👑</h2>
            <div className="h-sub">Welcome, {user.username}</div>
          </div>
          <div>
            <button className="btn ghost" onClick={logout}>Logout</button>
          </div>
        </div>

        <div style={{marginTop:10}}>
          <div style={{fontWeight:700,marginBottom:8}}>Manage Users</div>
          <div style={{background:"var(--panel)",padding:14,borderRadius:10}}>
            <ul style={{margin:0,paddingLeft:20}}>
              {users.map(u => (
                <li key={u.id} style={{marginBottom:8}}>
                  <strong>{u.username}</strong> — <span style={{fontWeight:800}}>{u.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
