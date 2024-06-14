import React, { useState } from 'react'
import { Link } from "react-router-dom";
import View from "../../assets/clientimage/View.jpeg";
import { FaEdit, FaSave } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";

const CmsNewsUpdate = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [headline, setheadline] = useState("Stay informed with our latest news and updates.Discover exciting news and upcoming events from Arty Learning. Come join us on our journey of continuous learning and growth");
  // const [heading, setheading] = useState(" 2024 Arty Learning Calender");
  // const [admin, setadmin] = useState("admin");
  // const [calender, setcalender] = useState("October 1st, 2023");
  // const [comments, setcomments] = useState("No Comments");
  const [newImage, setNewImage] = useState(View);
  const [content, setContent] = useState({
    heading: "2024 Arty Learning Calender",
    admin: "admin",
    calender: "October 1st, 2023",
    comments: "No Comments",
  });

  const [tempContent, setTempContent] = useState({ ...content });

  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
  };

  const handleShowModal = () => {
    setTempContent({ ...content });
    setTempImage(newImage);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    setContent({ ...tempContent });
    setNewImage(tempImage);
    setShowModal(false);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempImage(URL.createObjectURL(file));
    }
  };

  return (
    <div class="news">
      <div className="container card py-2">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Header</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            <button className="btn btn-sm btn-outline-primary border ms-2">
              Save
            </button>
            <button className="btn btn-sm btn-outline-danger border ms-2">
              Save & Publish
            </button>
          </div>
        </div>
      </div>
      
      <div class="container py-5">
        <span className='edit-container'>
          <div class="content my-4">
            {editingField === "headline" ? (
              <input
                type="text"
                value={headline}
                onChange={(e) => setheadline(e.target.value)}
                className="topbar-wordpress w-100"
              />
            ) : (
              headline
            )}
            {editingField === "headline" ? (
              <button
                className="btn btn-sm btn-outline-primary border ms-2"
                onClick={saveContent}
              >
                <FaSave />
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                onClick={() => toggleEdit("headline")}
              >
                <FaEdit />
              </button>
            )}
          </div>
        </span>

        <div class="row">
          <button
            className="btn btn-edit"
            onClick={handleShowModal}
          >
            <FaEdit />
          </button>
          <div className="col-md-4 col-12 calender">
            <span className="edit-container">
              <div class="card align-items-center mx-3 mt-2 pt-3">
                <img src={newImage} alt="view" className="img-fluid" />

                <div class="card-body">
                  <div class="mt-3 mx-2">
                    <h6 class="card-title">
                      {content.heading}
                    </h6>
                    /
                    {content.admin}
                    /
                    {content.calender}
                    <div>
                      <Link to="/calender">
                        <button class="button mt-4">Read More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImage">
              <Form.Label>Upload Image File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.gif" />
            </Form.Group>

            <Form.Group controlId="formHeading">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                name="heading"
                value={tempContent.heading}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAdmin">
              <Form.Label>Admin</Form.Label>
              <Form.Control
                type="text"
                name="admin"
                value={tempContent.admin}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCalender">
              <Form.Label>Calender</Form.Label>
              <Form.Control
                type="text"
                name="calender"
                value={tempContent.calender}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formComments" className="mt-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                name="comments"
                rows={3}
                value={tempContent.comments}
                onChange={handleChange}
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

  )
}

export default CmsNewsUpdate