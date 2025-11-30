// api.js — frontend-only mock API persisted to localStorage

const KEY_USERS = "lms_users_v1";
const KEY_COURSES = "lms_courses_v1";
const KEY_ENROLLMENTS = "lms_enrollments_v1";
const ID = {
  user: "lms_user_next_id_v1",
  course: "lms_course_next_id_v1",
  enrollment: "lms_enroll_next_id_v1",
};

function getNext(key, start = 1) {
  const raw = localStorage.getItem(key);
  let n = raw ? Number(raw) : start;
  localStorage.setItem(key, String(n + 1));
  return n;
}

function ensureInitialData() {
  if (!localStorage.getItem(KEY_USERS)) {
    const users = [
      { id: 1, username: "admin", password: "admin123", role: "ADMIN" },
      { id: 2, username: "inst1", password: "inst123", role: "INSTRUCTOR" },
      { id: 3, username: "stud1", password: "stud123", role: "STUDENT" },
      { id: 4, username: "creator1", password: "creator123", role: "CONTENT_CREATOR" },
    ];
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
    localStorage.setItem(ID.user, String(5));
  }
  if (!localStorage.getItem(KEY_COURSES)) {
    const courses = [
      { id: 1, title: "Java Basics", description: "Intro to Java programming", instructorName: "inst1" },
      { id: 2, title: "React for Beginners", description: "Introductory React course", instructorName: "inst1" },
    ];
    localStorage.setItem(KEY_COURSES, JSON.stringify(courses));
    localStorage.setItem(ID.course, String(3));
  }
  if (!localStorage.getItem(KEY_ENROLLMENTS)) {
    const enrollments = [
      { id: 1, studentId: 3, courseId: 1 }
    ];
    localStorage.setItem(KEY_ENROLLMENTS, JSON.stringify(enrollments));
    localStorage.setItem(ID.enrollment, String(2));
  }
}
ensureInitialData();

// tiny async wrapper
function wait(ms = 120) {
  return new Promise((res) => setTimeout(res, ms));
}

// Users
export async function login(username, password, role) {
  await wait();
  const users = JSON.parse(localStorage.getItem(KEY_USERS) || "[]");
  const user = users.find((u) => u.username === username);
  if (user) {
    if (user.password !== password) {
      // mimic network error
      const e = new Error("Invalid password");
      e.code = 401;
      throw e;
    }
    return { id: user.id, username: user.username, role: user.role };
  } else {
    // create new user with requested role
    const newId = getNext(ID.user);
    const newUser = { id: newId, username, password, role };
    users.push(newUser);
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
    return { id: newUser.id, username: newUser.username, role: newUser.role };
  }
}

export async function fetchUsers() {
  await wait();
  const users = JSON.parse(localStorage.getItem(KEY_USERS) || "[]");
  return users.map(({ password, ...rest }) => rest);
}

// Courses
export async function fetchCourses() {
  await wait();
  return JSON.parse(localStorage.getItem(KEY_COURSES) || "[]");
}

export async function createCourse(title, description, instructorName) {
  await wait();
  const courses = JSON.parse(localStorage.getItem(KEY_COURSES) || "[]");
  const id = getNext(ID.course);
  const c = { id, title, description, instructorName };
  courses.push(c);
  localStorage.setItem(KEY_COURSES, JSON.stringify(courses));
  return c;
}

// Enrollments
export async function enroll(studentId, courseId) {
  await wait();
  const enrollments = JSON.parse(localStorage.getItem(KEY_ENROLLMENTS) || "[]");
  // avoid double-enroll
  if (enrollments.some((e) => e.studentId === studentId && e.courseId === courseId)) {
    return enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
  }
  const id = getNext(ID.enrollment);
  const e = { id, studentId, courseId };
  enrollments.push(e);
  localStorage.setItem(KEY_ENROLLMENTS, JSON.stringify(enrollments));
  return e;
}

export async function fetchStudentCourses(studentId) {
  await wait();
  const enrollments = JSON.parse(localStorage.getItem(KEY_ENROLLMENTS) || "[]");
  const courses = JSON.parse(localStorage.getItem(KEY_COURSES) || "[]");
  const studentEnrolls = enrollments.filter((en) => en.studentId === Number(studentId));
  const courseIds = new Set(studentEnrolls.map((e) => e.courseId));
  return courses.filter((c) => courseIds.has(c.id));
}
