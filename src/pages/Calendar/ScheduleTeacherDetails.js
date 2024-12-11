import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Example using react-bootstrap

function ScheduleTeacherDetails({ id, showViewModal, onClose }) {
  const [data, setData] = useState([]);
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [activeTab, setActiveTab] = useState(""); // To manage active tab
  console.log("Id:", id);

  // Hardcoded data for the teacher schedule and details
  const hardcodedDetails = [
    {
      time: "2:30 PM",
      details: [
        { lesson: "Math", teacher: "John Doe", duration: "1 hour" },
        { lesson: "Science", teacher: "Jane Smith", duration: "1 hour" },
      ],
    },
    {
      time: "3:30 PM",
      details: [
        { lesson: "History", teacher: "Mary Johnson", duration: "1 hour" },
        { lesson: "English", teacher: "Mike Brown", duration: "1 hour" },
      ],
    },
    {
      time: "5:00 PM",
      details: [
        { lesson: "Geography", teacher: "Sarah Lee", duration: "1 hour" },
        { lesson: "Physics", teacher: "David Wilson", duration: "1 hour" },
      ],
    },
  ];

  useEffect(() => {
    // Simulate fetching data and setting the default tab if available
    if (hardcodedDetails.length > 0) {
      setTeacherDetails(hardcodedDetails);
      setActiveTab(hardcodedDetails[0].time); // Set the first tab as active by default
    }
  }, []);

  return (
    <Modal show={showViewModal} onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Schedule Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Check if teacherDetails data is available */}
        {teacherDetails &&
        Array.isArray(teacherDetails) &&
        teacherDetails.length > 0 ? (
          <>
            {/* Dynamic Tabs based on hardcodedDetails */}
            <ul className="nav nav-tabs" style={{ justifyContent: "start" }}>
              {teacherDetails.map((item) => (
                <li className="nav-item" key={item.time}>
                  <button
                    className={`nav-link ${
                      activeTab === item.time ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(item.time)}
                    style={{
                      borderTop:
                        activeTab === item.time
                          ? "3px solid #287f71"
                          : "none",
                      borderRadius: "0px",
                    }}
                  >
                    {item.time}
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content mt-2">
              {teacherDetails.map(
                (item) =>
                  activeTab === item.time && (
                    <div key={item.time}>
                      {/* <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Lesson</th>
                            <th>Teacher</th>
                            <th>Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.details.map((detail, index) => (
                            <tr key={index}>
                              <td>{detail.lesson}</td>
                              <td>{detail.teacher}</td>
                              <td>{detail.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table> */}
                      <div className="container py-4">
                        <div className="row">
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Start Date</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.centerName}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Lesson Outline Set Effective Start Date</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.course}</p>
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
                                <p>:&nbsp;{data.className}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Effective Start Date</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.teacher}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Lesson No</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.days}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">End Date</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.classRoom}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Teacher</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.startDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">End Date</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.endDate}</p>
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
                                <p>:&nbsp;{data.startDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Class Venue</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.endDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Last lesson</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.startDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Assistant Teacher</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.endDate}</p>
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
                                <p>:&nbsp;{data.startDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">No of Students</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.endDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Remarks</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.startDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 mb-2">
                            <div className="row">
                              <div className="col-5">
                                <p className="">Students</p>
                              </div>
                              <div className="col-7">
                                <p>:&nbsp;{data.endDate}</p>
                              </div>
                            </div>
                          </div>
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
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ScheduleTeacherDetails;
