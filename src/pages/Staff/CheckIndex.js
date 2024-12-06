import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckIndex = () => {
  const [workingMode, setWorkingMode] = useState("");
  const [attendanceAction, setAttendanceAction] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!workingMode || !attendanceAction) {
      setError("Please select a working mode and an action.");
      return;
    }

    setError("");
    setIsLoading(true); // Set loading to true when submitting

    // Simulate form submission (e.g., API call)
    setTimeout(() => {
      console.log("Form Values:", { attendanceAction, workingMode });
      setWorkingMode("");
      setAttendanceAction("");
      setIsLoading(false); // Set loading to false after submission
    }, 2000); // Simulated delay of 2 seconds
  };

  const handleCheckIn = () => {
    setAttendanceAction("Check In");
  };

  const handleCheckOut = () => {
    setAttendanceAction("Check Out");
  };

  const handleWorkingModeChange = (e) => {
    setWorkingMode(e.target.value);
  };

  return (
    <div className="pt-3">
      <div className="container  text-center">
        <ol
          className="breadcrumb "
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          <li>
            <Link to="/" className="custom-breadcrumb">
              Home
            </Link>
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li>
            Staffing
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Check Attendance
          </li>
        </ol>
        <h2 className="mb-4">Marked Attendance</h2>

        <div className="d-flex justify-content-center mb-4 gap-3">
          <button
            type="button"
            className="btn px-4 py-2 rounded-pill"
            onClick={handleCheckIn}
            style={{
              backgroundColor:
                attendanceAction === "Check In" ? "#28a745" : "#fce1c8",
              color: attendanceAction === "Check In" ? "#fff" : "#6c757d",
              border: "none",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            Check In
          </button>
          <button
            type="button"
            className="btn px-4 py-2 rounded-pill"
            onClick={handleCheckOut}
            style={{
              backgroundColor:
                attendanceAction === "Check Out" ? "#dc3545" : "#fce1c8",
              color: attendanceAction === "Check Out" ? "#fff" : "#6c757d",
              border: "none",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            Check Out
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{
            maxWidth: "450px",
            backgroundColor: "#f8f9fa",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="mb-3">
            <label htmlFor="workingMode" className="form-label">
              Working Mode
            </label>
            <select
              id="workingMode"
              className="form-select"
              value={workingMode}
              onChange={handleWorkingModeChange}
              style={{
                borderColor: "#ced4da",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <option value="">Select Working Mode</option>
              <option value="workFromOffice">Work from Office</option>
              <option value="workFromHome">Work from Home</option>
            </select>
          </div>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100 py-2 rounded-pill mt-3"
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckIndex;
