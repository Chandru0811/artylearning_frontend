// TeacherSummary.jsx
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function StudentSummary({ data }) {
    console.log("Summary Data", data)
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const handleClose = () => {
    setShowSummaryModal(false);
  };

  const handleSummaryShow = () => setShowSummaryModal(true);

  // Check if data exists and is not empty

  const isDataAvailable =
    data && Object.keys(data).length !== 0 ;

  return (
    <>
      <button
        type="button"
        onClick={handleSummaryShow}
        className="btn btn-border btn-sm ms-3"
      >
        <span>Summary</span>
      </button>
      <Modal show={showSummaryModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isDataAvailable ? (
            <div>
              <ul>
                <div className="row">
                  <div className="d-flex align-items-center mb-3">
                    {data ? (
                      <box-icon
                        name="check-circle"
                        type="solid"
                        color="#0bda5d"
                      ></box-icon>
                    ) : (
                      <box-icon
                        name="x-circle"
                        type="solid"
                        color="#d42615"
                      ></box-icon>
                    )}
                    &nbsp; &nbsp;
                    <li className="list-unstyled d-flex align-items-center">
                      Student Details
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.studentParentsDetails.length === 0 ? (
                      <box-icon
                        name="x-circle"
                        type="solid"
                        color="#d42615"
                      ></box-icon>
                    ) : (
                      <box-icon
                        name="check-circle"
                        type="solid"
                        color="#0bda5d"
                      ></box-icon>
                    )}
                    &nbsp; &nbsp;
                    <li className="list-unstyled d-flex align-items-center">
                      Parents / Guardian
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.studentEmergencyContacts.length === 0 ? (
                      <box-icon
                        name="x-circle"
                        type="solid"
                        color="#d42615"
                      ></box-icon>
                    ) : (
                      <box-icon
                        name="check-circle"
                        type="solid"
                        color="#0bda5d"
                      ></box-icon>
                    )}
                    &nbsp; &nbsp;
                    <li className="list-unstyled d-flex align-items-center">
                      Emergency Contact
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.studentCourseDetailModels.length === 0 ? (
                      <box-icon
                        name="x-circle"
                        type="solid"
                        color="#d42615"
                      ></box-icon>
                    ) : (
                      <box-icon
                        name="check-circle"
                        type="solid"
                        color="#0bda5d"
                      ></box-icon>
                    )}
                    &nbsp; &nbsp;
                    <li className="list-unstyled d-flex align-items-center">
                      Course Detail
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.studentRelationModels.length === 0 ? (
                      <box-icon
                        name="x-circle"
                        type="solid"
                        color="#d42615"
                      ></box-icon>
                    ) : (
                      <box-icon
                        name="check-circle"
                        type="solid"
                        color="#0bda5d"
                      ></box-icon>
                    )}
                    &nbsp; &nbsp;
                    <li className="list-unstyled d-flex align-items-center">
                      Student Relation
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.studentTermsAndConditions.length === 0 ? (
                      <box-icon
                        name="x-circle"
                        type="solid"
                        color="#d42615"
                      ></box-icon>
                    ) : (
                      <box-icon
                        name="check-circle"
                        type="solid"
                        color="#0bda5d"
                      ></box-icon>
                    )}
                    &nbsp; &nbsp;
                    <li className="list-unstyled d-flex align-items-center">
                      Terms & Condition
                    </li>
                  </div>
                  {/* Add more items as needed */}
                </div>
              </ul>
            </div>
          ) : (
            <p>Data is not available yet.</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StudentSummary;
