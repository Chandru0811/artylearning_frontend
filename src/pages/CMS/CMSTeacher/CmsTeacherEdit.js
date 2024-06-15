import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaYoutube, FaInstagram, FaEdit, FaSave } from "react-icons/fa";

const CmsTeacherEdit = ({showModal,handleShowModal,handleSaveChanges,handleCloseModal}) => {
  return (
    <div>
      <button className="btn btn-sm" >
        <FaEdit
          className="ms-3 d-flex"
          size={30}
          style={{
            cursor: "pointer",
            position: "absolute",
            left: "26.5rem",
          }}
          onClick={handleShowModal}
        />
      </button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="title"
                // value={content.title}
                // onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="experience"
                // value={content.title}
                // onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                name="experience"
                // value={content.title}
                // onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Profile</Form.Label>
              <Form.Control
                type="file"
                // onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.gif"
              />
            </Form.Group>
            <Form.Group controlId="formDescription2" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="description2"
                rows={3}
                // value={content.description2}
                // onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CmsTeacherEdit;
