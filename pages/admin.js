import React, { useState, useEffect } from "react";

const TOKEN_KEY = "admin_jwt";

// Set this to your deployed backend URL!
const BACKEND_URL = "https://bp-golf-app-backend.vercel.app";

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [pars, setPars] = useState(Array(18).fill(""));
  const [checking, setChecking] = useState(true);

  // On mount, check if token exists and is valid
  useEffect(() => {
    async function checkToken() {
      if (typeof window === "undefined") {
        setChecking(false);
        return;
      }
      const t = localStorage.getItem(TOKEN_KEY);
      if (!t) {
        setChecking(false);
        setToken(null);
        return;
      }
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/protected`, {
          headers: { Authorization: "Bearer " + t }
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setToken(t);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }
      setChecking(false);
    }
    checkToken();
  }, []);

  // Fetch courses when authenticated
  useEffect(() => {
    if (token) fetchCourses();
  }, [token]);

  // Login handler (PASSWORD ONLY, no username)
  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) throw new Error(data.error || "Login failed");
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setLoginError(err.message);
    }
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setCourses([]);
  }

  // Add course handler
  async function handleAddCourse(e) {
    e.preventDefault();
    if (!courseName || pars.some((p) => !p || isNaN(Number(p)))) {
      alert("Please fill all fields with valid values.");
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ name: courseName, pars: pars.map(Number) }),
      });
      if (!res.ok) throw new Error("Failed to add course");
      setCourseName("");
      setPars(Array(18).fill(""));
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  }

  // Fetch courses
  async function fetchCourses() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/courses`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setCourses(Array.isArray(data.courses) ? data.courses : []);
    } catch (err) {
      setCourses([]);
    }
  }

  // Delete course
  async function deleteCourse(id) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/courses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!res.ok) throw new Error("Failed to delete course");
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  }

  if (checking) return <div className="container mt-4">Loading...</div>;

  // Authenticated admin UI
  if (token) {
    return (
      <div className="container mt-4">
        <h1 className="text-center mb-4">Admin Panel</h1>
        <div className="card mb-4">
          <div className="card-header">
            <h3>Add New Course</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddCourse} autoComplete="off">
              <div className="mb-3">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />
              </div>
              <div className="row">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div className="col-2 mb-2" key={i}>
                    <label className="form-label">Hole {i + 1}</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      required
                      value={pars[i]}
                      onChange={(e) => {
                        const next = [...pars];
                        next[i] = e.target.value;
                        setPars(next);
                      }}
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Add Course
              </button>
            </form>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3>Current Courses</h3>
          </div>
          <div className="card-body">
            <div>
              {courses.length === 0 ? (
                <p>No courses found.</p>
              ) : (
                courses.map((course) => (
                  <div
                    className="mb-2 p-2 border rounded d-flex justify-content-between align-items-center"
                    key={course.id || course._id}
                  >
                    <span>
                      <strong>{course.name}</strong> (Pars:{" "}
                      {Array.isArray(course.pars)
                        ? course.pars.join(", ")
                        : ""}
                      )
                    </span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCourse(course.id || course._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Login form (PASSWORD ONLY)
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Panel</h1>
      <div
        className="card mx-auto mb-4"
        style={{ maxWidth: 400, display: "block" }}
      >
        <div className="card-header">
          <h3>Admin Login</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          {loginError && (
            <div className="text-danger mt-2" style={{ display: "block" }}>
              {loginError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}