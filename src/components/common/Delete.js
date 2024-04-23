import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";

function Delete({ onSuccess, path }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelDelete = async () => {
    try {
      const response = await api.delete(path);
      if (response.status === 201) {
        onSuccess();
        handleClose();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaTrash />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handelDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Delete;
