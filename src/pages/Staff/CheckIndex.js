import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";

const CheckIndex = () => {
  const [workingMode, setWorkingMode] = useState("WORK_FROM_OFFICE");
  const [attendanceAction, setAttendanceAction] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const centerId = localStorage.getItem("centerId");
  const userId = localStorage.getItem("userId");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!workingMode || !attendanceAction) {
      setError("Please select a working mode and an action.");
      return;
    }

    setError("");
    setIsLoading(true);

    // const currentDate = new Date().toISOString();

    const payload = {
      // createdBy: currentDate,
      workingMode,
      centerId: centerId,
      userId: userId,
    };

    if (attendanceAction === "Check Out") {
      payload.updatedBy = "string";
    }

    const endpoint =
      attendanceAction === "Check In" ? "/userCheckIn" : "/userCheckOut";

    api
      .post(endpoint, payload)
      .then((response) => {
        toast.success(response.data.message);
        setIsLoading(false);
        setAttendanceAction("");
      })
      .catch((error) => {
        console.error("Error submitting form:", error.message);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }

        setIsLoading(false);
      });
  };

  const handleCheckIn = () => {
    setAttendanceAction("Check In");
    setError(""); 
  };

  const handleCheckOut = () => {
    setAttendanceAction("Check Out");
    setError(""); 
  };

  const handleWorkingModeChange = (e) => {
    setWorkingMode(e.target.value);
  };

  return (
    <div className="pt-3">
      <div className="container text-center">
        <ol
          className="breadcrumb"
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
        <h2 className="mb-4">Mark Attendance</h2>

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
              <option value="WORK_FROM_OFFICE">Work from Office</option>
              <option value="WORK_FROM_HOME">Work from Home</option>
            </select>
          </div>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error === "You have already checkIn on this date."
                ? "You have already checked-in on this date."
                : error === "You have already checked out for this date."
                ? "You have already checked-out on this date."
                : error}
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
