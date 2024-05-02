// TeacherSummary.jsx
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function TeacherSummary({ data }) {
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const handleClose = () => {
    setShowSummaryModal(false);
  };

  const handleSummaryShow = () => setShowSummaryModal(true);

  // Check if data exists and is not empty
  const isDataAvailable =
    data && Object.keys(data).length !== 0 && data.userAccountInfo;

  return (
    <>
      <button
        type="button"
        onClick={handleSummaryShow}
        className="btn btn-border btn-sm"
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
                      Personal Information
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.userAccountInfo.length === 0 ? (
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
                      Account Information
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.userContactInfo.length === 0 ? (
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
                      Contact Information
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.userLoginInfoModels.length === 0 ? (
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
                      Login Information
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.userDocumentInfo.length === 0 ? (
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
                      Required Information
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.userSalaryCreationModels.length === 0 ? (
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
                      Salary Information
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.userLeaveCreationModels.length === 0 ? (
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
                      Leave Information
                    </li>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    {data.userContractCreationModels.length === 0 ? (
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
                      Contract Information
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

export default TeacherSummary;
