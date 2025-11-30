// Navbar.jsx
import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar({ user }) {
  return (
    <div className="topbar">
      <div className="brand">
        <img src="/favicon.ico" alt="logo" style={{width:36,height:36,borderRadius:6}}/>
        <div>
          <h1>Learning Management System</h1>
          <small>Intermediate UI — built with localStorage</small>
        </div>
      </div>

      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <button style={{background:"transparent",border:"none",color:"rgba(255,255,255,0.95)",cursor:"pointer"}}>
          <FaBell size={18} />
        </button>

        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <FaUserCircle size={22} color="white"/>
          <div style={{textAlign:"right"}}>
            <div style={{fontWeight:700,fontSize:13}}>{user?.username}</div>
            <div style={{fontSize:12,opacity:0.9}}>{user?.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
