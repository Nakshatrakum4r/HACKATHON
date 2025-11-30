import React, { useEffect, useState } from "react";
import { fetchCourses } from "../api";

function ContentCreatorDashboard({ user, logout }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then(setCourses).catch(console.error);
  }, []);

  return (
    <div className="dashboard-section">
      <h2>Content Creator Dashboard ✍</h2>
      <p>Welcome, {user.username}</p>

      <div className="content-box">
        <h3>Develop / Update Materials</h3>
        <p>
          Content creators can work with instructors to create and improve course
          materials. This is a simplified placeholder section.
        </p>
      </div>

      <div className="content-box">
        <h3>Available Courses (for quality review)</h3>
        <ul>
          {courses.map((c) => (
            <li key={c.id}>
              {c.title} – Instructor: {c.instructorName}
            </li>
          ))}
        </ul>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default ContentCreatorDashboard;
