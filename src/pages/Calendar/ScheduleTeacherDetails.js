import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "../../config/URL";
import { Link } from "react-router-dom";

function ScheduleTeacherDetails({ showViewModal, teacherDetail, onClose }) {
  const { teacherId, startDate } = teacherDetail || {};
  const [teacherDetails, setTeacherDetails] = useState([]); // To store API response
  const [activeTab, setActiveTab] = useState(""); // To manage active tab
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    if (!teacherId || !startDate) return; // Prevent API call if data is incomplete

    const fetchScheduleDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/getAllSpecificTeacherScheduleInfo/${teacherId}?date=${startDate}`
        );

        if (response && response.data.length > 0) {
          setTeacherDetails(response.data);
          setActiveTab(response.data[0]?.batchTime || ""); // Set the first batch as active
        } else {
          setError("No schedule data found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch schedule data.");
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleDetails();
  }, [teacherId, startDate]);

  if (loading) {
    return (
      <Modal show={showViewModal} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5 fw-medium">Schedule Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Loading...</p>
        </Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={showViewModal} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{error}</p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={showViewModal} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Schedule Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {teacherDetails.length > 0 ? (
          <>
            {/* Tabs Navigation */}
            <ul className="nav nav-active-tabs">
              {teacherDetails.map((item) => (
                <li className="nav-item" key={item.batchTime}>
                  <button
                    className={`nav-link ${
                      activeTab === item.batchTime ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(item.batchTime)}
                    style={{
                      borderTop:
                        activeTab === item.batchTime
                          ? "3px solid #287f71"
                          : "none",
                      color:
                        activeTab === item.batchTime ? "orange" : "inherit",
                    }}
                  >
                    {item.batchTime}
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content mt-3">
              {teacherDetails.map(
                (item) =>
                  activeTab === item.batchTime && (
                    <div
                      key={item.batchTime}
                      className="container py-4"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {/* Details Content */}
                      <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">Start Date</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.startDate || "--"}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">End Date</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.endDate || "--"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">Class Id</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.classUniqueId || "--"}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">Lesson No</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.lessonNo || "--"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">Available Slot</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.availableSlot || "--"}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">Teacher</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.teacherName || "--"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">First Lesson</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.firstLesson || "--"}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">Last lesson</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.classVenue || "--"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">No of Students</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.noOfStudents || "--"}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                          <div className="row">
                            <div className="col-5">
                              <p className="">Remarks</p>
                            </div>
                            <div className="col-7">
                              <p>:&nbsp;{item.details.remarks || "--"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 mb-2">
                          Students:
                          <ol>
                            {item.details.students &&
                            item.details.students.length > 0 ? (
                              item.details.students.map((student) => (
                                <li key={student.id}>
                                  <Link
                                    to={`/student/view/${student.id}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                    }}
                                  >
                                    {student.studentName} ({student.uniqueId})
                                  </Link>
                                </li>
                              ))
                            ) : (
                              <p>No Students</p>
                            )}
                          </ol>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </>
        ) : (
          <p>No schedule data available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-sm btn-border bg-light text-dark"
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ScheduleTeacherDetails;
