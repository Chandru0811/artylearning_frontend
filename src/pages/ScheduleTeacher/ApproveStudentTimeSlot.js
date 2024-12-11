import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCheckCircle } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";

function ApproveStudentTimeSlot({ onSuccess, id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelBlock = async () => {
    try {
      const formData = new FormData();
      formData.append("status", "approve");
      const response = await api.put(`/updateScheduleTeacher/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        onSuccess();
        handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <button
        className="btn text-success fs-4"
        style={{ padding: "0px" }}
        onClick={handleShow}
      >
        <FaCheckCircle />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Approve the student?</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-border bg-light text-dark"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="success" onClick={handelBlock}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApproveStudentTimeSlot;
