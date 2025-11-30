// InstructorDashboard.jsx (upgraded)
import React, { useEffect, useState } from "react";
import { fetchCourses, createCourse } from "../api";
import CourseCard from "../components/CourseCard";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

export default function InstructorDashboard({ user, logout }) {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  // form
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const loadCourses = async () => {
    const data = await fetchCourses();
    setCourses(data.filter(c => c.instructorName === user.username));
  };

  useEffect(()=>{ loadCourses(); }, []); // eslint-disable-line

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    await createCourse(title.trim(), desc.trim(), user.username);
    setTitle(""); setDesc(""); setOpenCreate(false);
    await loadCourses();
  };

  useEffect(()=>{ if (page > totalPages) setPage(totalPages); }, [totalPages]); // keep page valid

  return (
    <div className="main-panel">
      <div className="panel">
        <div className="header-row">
          <div>
            <h2 className="h-title">Instructor Dashboard <span style={{fontSize:18}}>👨‍🏫</span></h2>
            <div className="h-sub">Welcome, {user.username}</div>
          </div>

          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <SearchBar value={search} onChange={(v)=>{ setSearch(v); setPage(1); }} />
            <button className="btn" onClick={()=>setOpenCreate(true)}>Create Course</button>
            <button className="btn ghost" onClick={logout}>Logout</button>
          </div>
        </div>

        <div style={{marginTop:8}}>
          <div style={{fontWeight:700,marginBottom:8}}>Your Courses</div>
          <div className="courses-grid">
            {pageData.length === 0 ? <div style={{padding:18,gridColumn:"1/-1"}}>No courses found.</div> :
              pageData.map(c => <CourseCard key={c.id} course={c} showEnroll={false} />)}
          </div>

          <Pagination page={page} total={totalPages} onPage={setPage} />
        </div>
      </div>

      <Modal open={openCreate} title="Create Course" onClose={()=>setOpenCreate(false)}>
        <form onSubmit={handleCreate} style={{display:"grid",gap:12}}>
          <input className="input-lg" placeholder="Course title" value={title} onChange={e=>setTitle(e.target.value)} required />
          <textarea className="input-lg" rows={5} placeholder="Course description" value={desc} onChange={e=>setDesc(e.target.value)} required />
          <div style={{display:"flex",justifyContent:"flex-end",gap:10}}>
            <button type="button" className="btn ghost" onClick={()=>setOpenCreate(false)}>Cancel</button>
            <button type="submit" className="btn">Create</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
