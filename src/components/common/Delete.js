import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";

function Delete({ onSuccess, path, staffmsg, teachermsg }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteButtonRef = useRef(null);

  const handelDelete = async () => {
    try {
      const response = await api.delete(path);
      if (response.status === 201) {
        onSuccess();
        handleClose();
        if (staffmsg) {
          toast.success(staffmsg);
        } else if (teachermsg) {
          toast.success(teachermsg);
        } else {
          toast.success(response.data.message);
        }
      } else if (response.status === 200) {
        onSuccess();
        handleClose();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.warning(error?.response?.data?.message);
        handleClose();
      } else {
        toast.error("Error deleting data:", error);
      }
    }
  };
  useEffect(() => {
    if (show && deleteButtonRef.current) {
      deleteButtonRef.current.focus();
    }
  }, [show]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (show) {
          handelDelete();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [show]);

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
          <Button
            variant="danger"
            onClick={handelDelete}
            className={show ? "focused-button" : ""}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Delete;
