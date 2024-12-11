import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TbTrashFilled } from "react-icons/tb";

import api from "../../config/URL";
import { toast } from "react-toastify";

function RemoveStudentTimeSlot({ onSuccess, id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelBlock = async () => {
    try {
      const response = await api.put(`/resetStudent/${id}`, {
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
        className="btn text-danger fs-4 px-2"
        style={{ padding: "0px" }}
        onClick={handleShow}
      >
        <TbTrashFilled />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Remove the Student?</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-border bg-light text-dark"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="danger" onClick={handelBlock}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RemoveStudentTimeSlot;
