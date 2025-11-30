// CourseCard.jsx
import React from "react";

export default function CourseCard({ course, onEnroll, showEnroll }) {
  return (
    <div className="course-card">
      <div>
        <h3 className="course-title">{course.title}</h3>
        <div className="course-meta">{course.description}</div>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div className="course-meta">Instructor: <strong>{course.instructorName}</strong></div>
        <div className="course-actions">
          {showEnroll ? <button className="btn" onClick={() => onEnroll(course.id)}>Enroll</button> : <span className="badge">Course</span>}
        </div>
      </div>
    </div>
  );
}
