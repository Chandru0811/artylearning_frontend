import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaEye } from "react-icons/fa";
import api from "../../config/URL";

function SendNotificationView({ id }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  console.log("Data", data);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllSmsPushNotificationsById/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEye />
      </button>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">View Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mt-2 pb-3">
              <div className="col-md-6 col-12">
                <div className="row  mb-2">
                  <div className="col-6  ">
                    <p className="fw-medium">Event Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.messageTitle}</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row   mb-2">
                  <div className="col-12 ">
                    <p className="fw-medium">Message</p>
                  </div>
                  <div className="col-12">
                    <p className="text-muted text-sm">
                      {data.messageDescription}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6 col-12">
                <div className="row  mb-2">
                  <div className="col-6  ">
                    <p className="fw-medium">Attachments</p>
                  </div>
                  <div className="col-12">
                    <p className="text-muted text-sm">{data.status}</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SendNotificationView;
