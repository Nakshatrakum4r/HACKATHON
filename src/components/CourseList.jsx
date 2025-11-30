import React from "react";

function CourseList({ courses, onEnroll, showEnrollButton }) {
  if (!courses || courses.length === 0) return <div>No courses found.</div>;

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <h4>{course.title}</h4>
          <p>{course.description}</p>
          <p>
            <strong>Instructor:</strong> {course.instructorName}
          </p>
          {showEnrollButton && (
            <button onClick={() => onEnroll(course.id)}>Enroll</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseList;
