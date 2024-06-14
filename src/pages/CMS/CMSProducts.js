import React, { useState } from "react";
import imgs1 from "../../assets/clientimage/threebookArty.png";
import imgs2 from "../../assets/clientimage/ntxauso.png";
import imgs3 from "../../assets/clientimage/antbook.png";
import imgs4 from "../../assets/clientimage/watermelonfruits.png";
import imgs5 from "../../assets/clientimage/cards-animated.gif";
import { IoIosCart } from "react-icons/io";
import Carousel from "react-multi-carousel";
import { Button, Modal, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa"; // Import the edit icon

function CMSProducts() {
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [content, setContent] = useState({
    title: "A-Z Phonics Card",
    description1: "These cards are specially designed for parents to entice and help children to the letter sounds and association. Each box of cards has a different set of words so it will never be repeated.",
    description2: "There is a QR code which links the user to a private Youtube channel on the phonics sounds as well as any new updates Arty Learning puts up.",
  });
  const [tempContent, setTempContent] = useState({ ...content });

  const handleShowModal = () => {
    setTempContent({ ...content });
    setTempImage(newImage);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSaveChanges = () => {
    setContent({ ...tempContent });
    setNewImage(tempImage);
    setShowModal(false);
  };

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 576 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6 col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="text-center fw-bolder mt-5" style={{ fontSize: "xxx-large" }}>
                {content.title}
              </h1>
              <FaEdit className="ms-3" size={30} style={{ cursor: "pointer" }} onClick={handleShowModal} />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <img className="img-fluid" src={newImage || imgs5} alt="Slide 4" />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="text-center fw-small mt-3" style={{ fontSize: "large" }}>
                {content.description2}
              </p>
              {/* <Button className="m-5 shadow btn btn-danger" style={{ background: "red" }}>
                <IoIosCart />
                &nbsp; Buy Now
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={tempContent.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
                <Form.Label>Upload Image File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.gif" />
              </Form.Group>
            <Form.Group controlId="formDescription2" className="mt-3">
              <Form.Label>Description 2</Form.Label>
              <Form.Control
                as="textarea"
                name="description2"
                rows={3}
                value={tempContent.description2}
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
    </>
  );
}

export default CMSProducts;
