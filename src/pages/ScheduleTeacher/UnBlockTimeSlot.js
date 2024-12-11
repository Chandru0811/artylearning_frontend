import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImBlocked } from "react-icons/im";

import api from "../../config/URL";
import { toast } from "react-toastify";

function UnBlockTimeSlot({ onSuccess, id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelBlock = async () => {
    try {
      const formData = new FormData();
      formData.append("blocked", false); // Corrected append method
      formData.append("studentId", null);
      formData.append("name", null);
      formData.append("status", null);
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
      <button className="btn text-dark fs-4" onClick={handleShow}>
        <ImBlocked />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Unblock Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Unblock the Slot?</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-border bg-light text-dark"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="danger" onClick={handelBlock}>
            Unblock
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UnBlockTimeSlot;
