// Pagination.jsx
import React from "react";

export default function Pagination({ page, total, onPage }) {
  if (total <= 1) return null;
  const pages = [...Array(total)].map((_,i)=>i+1);
  return (
    <div className="pager">
      <button className="page-btn" onClick={()=>onPage(Math.max(1,page-1))}>Prev</button>
      {pages.map(p => (
        <button key={p} className={`page-btn ${p===page ? "active" : ""}`} onClick={()=>onPage(p)}>{p}</button>
      ))}
      <button className="page-btn" onClick={()=>onPage(Math.min(total,page+1))}>Next</button>
    </div>
  );
}
