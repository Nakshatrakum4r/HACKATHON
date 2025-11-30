// SearchBar.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange, placeholder="Search courses..." }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8,background:"#fff",padding:"8px 10px",borderRadius:10,boxShadow:"0 6px 18px rgba(11,34,70,0.04)"}}>
        <FaSearch color="#7b8794" />
        <input className="input" value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} />
      </div>
    </div>
  );
}
