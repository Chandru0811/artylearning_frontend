import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function DontMakeUpClass() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button type="button" class="btn btn-light btn-sm" onClick={handleShow}>
        Do Not MakeUp Class
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Do Not MakeUp Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container py-3">
            <div className="row">
              <p>Are you sure you want to mark this student as Absent?</p>
            </div>
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DontMakeUpClass;
