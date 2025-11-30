// StudentDashboard.jsx (upgraded)
import React, { useEffect, useState } from "react";
import { fetchCourses, enroll, fetchStudentCourses } from "../api";
import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

export default function StudentDashboard({ user, logout }) {
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const loadAll = async () => {
    const data = await fetchCourses();
    setAllCourses(data);
  };

  const loadMine = async () => {
    const data = await fetchStudentCourses(user.id);
    setMyCourses(data);
  };

  useEffect(()=>{ loadAll(); loadMine(); }, []); // eslint-disable-line

  const filtered = allCourses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  useEffect(()=>{ if (page > totalPages) setPage(totalPages); }, [totalPages]);

  const handleEnroll = async (courseId) => {
    await enroll(user.id, courseId);
    await loadMine();
    alert("Enrolled successfully!");
  };

  return (
    <div className="main-panel">
      <div className="panel">
        <div className="header-row">
          <div>
            <h2 className="h-title">Student Dashboard 🎓</h2>
            <div className="h-sub">Welcome, {user.username}</div>
          </div>

          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <SearchBar value={search} onChange={(v)=>{ setSearch(v); setPage(1); }} />
            <button className="btn ghost" onClick={logout}>Logout</button>
          </div>
        </div>

        <div style={{marginTop:8}}>
          <div style={{fontWeight:700,marginBottom:8}}>Available Courses</div>
          <div className="courses-grid">
            {pageData.length === 0 ? <div style={{padding:18,gridColumn:"1/-1"}}>No courses found.</div> :
              pageData.map(c => <CourseCard key={c.id} course={c} showEnroll={true} onEnroll={handleEnroll} />)}
          </div>

          <Pagination page={page} total={totalPages} onPage={setPage} />

          <div style={{marginTop:22}}>
            <div style={{fontWeight:700,marginBottom:8}}>My Enrolled Courses</div>
            <div className="courses-grid">
              {myCourses.length === 0 ? <div style={{padding:18,gridColumn:"1/-1"}}>You are not enrolled in any courses.</div> :
                myCourses.map(c => <CourseCard key={c.id} course={c} showEnroll={false} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
