import React, { useState } from 'react';
import View from "../../assets/clientimage/View.jpeg";
import { MdEdit } from "react-icons/md";
import { Button, Modal, Form } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import api from "../../../config/URL";

const CmsNewsUpdate = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [newImage, setNewImage] = useState(View);
  const [selectedFile, setSelectedFile] = useState(null);

  const [content, setContent] = useState([
    {
      heading: "2024 Arty Learning Calender 2024 Arty Learning Calender",
      admin: "admin",
      calender: "October 1st, 2023",
      comments: "No Comments",
      image: newImage
    },
    {
      heading: "2023 Arty Learning Calender",
      admin: "Staff",
      calender: "October 1st, 2024",
      comments: "Hii111111111",
      image: newImage
    }
  ]);
  const contentArray = Array.isArray(content) ? content : [];

  const validationSchema = yup.object().shape({
    file: yup.string().required("*Package Name is required"),
    heading: yup.string().required("*Number of Lesson is required"),
    comments: yup.string().required("*Number of Lesson is required"),
  });

  const formik = useFormik({
    initialValues: {
      file: null,
      heading: "",
      comments: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form values:", values);
      // try {
      //   const response = await api.post(`/createCenterPackages/${id}`, values, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   if (response.status === 201) {
      //     toast.success(response.data.message);
      //     onSuccess();
      //     handleClose();
      //   } else {
      //     toast.error(response.data.message);
      //   }
      // } catch (error) {
      //   toast.error(error);
      // } finally {
      //   setLoadIndicator(false);
      // }
    },
  });

  const [tempContent, setTempContent] = useState({ ...content });

  const handleShowEditModal = () => {
    setTempContent({ ...content });
    setTempImage(newImage);
    setShowEditModal(true);
  };

  const handleShowAddModal = () => {
    setContent({
      heading: '',
      admin: '',
      calender: '',
      comments: ''
    });
    setTempImage(null);
    setShowAddModal(true);
  };

  // const handleSaveEditChanges = () => {
  //   setContent({ ...tempContent });
  //   setNewImage(tempImage);
  //   setShowEditModal(false);
  // };

  // const handleSaveAddChanges = () => {
  //   // Handle adding news logic here
  //   setShowAddModal(false);
  // };

  const handleCloseEditModal = () =>{
    setShowEditModal(false)
  };
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTempContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };
  // const handleFileChange = event => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   selectedFile('image', file);
  // };

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue('image', file);
  };

  return (
    <div className="news">
      <div className="container cms-header shadow-sm py-2">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>News & Updates</h4>
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

      <div className="container py-3">
        <div className='d-flex align-content-end justify-content-end'>

          <button
            className="btn btn-button"
            onClick={handleShowAddModal}
          >
            Add News <IoMdAdd />
          </button>
        </div>

        <div className="row">
          {contentArray.map((item, index) => (
            <div className="col-md-4 col-12 calendar-item" key={index}>
              <div className="custom-card shadow-lg h-100 d-flex flex-column align-items-center mx-3 mt-2 pt-3 position-relative">
                <span
                  className="btn custom-edit-button"
                  onClick={handleShowEditModal}
                >
                  <MdEdit />
                </span>
                <img src={item.image} alt="view" className="custom-img-fluid" />
                <div className="custom-card-body d-flex flex-column p-2">
                  <div className="custom-content">
                    <h6 className="custom-card-title">
                      {item.heading}
                    </h6>
                    <p>
                      {item.admin} / {item.calender} / {item.comments}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button className="custom-button mt-4">Read More</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div controlId="formImage2">
              <label>Upload Image File</label>
              <div type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.gif" />
            </div>
            {selectedFile && (
              <div>
                {selectedFile.type.startsWith('image') && (
                  <img src={URL.createObjectURL(selectedFile)} alt="Selected File" style={{ maxWidth: '100%' }} />
                )}
              </div>
            )}

            <div controlId="formHeading2">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                name="heading"
                value={content.heading}
                onChange={handleAddChange}
              />
            </div>

            <Form.Group controlId="formComments2" className="mt-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                name="comments"
                rows={3}
                value={content.comments}
                onChange={handleAddChange}
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button type="submit"
            className="btn btn-button btn-sm"
            onClick={handleSaveAddChanges}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> */}

      <form onSubmit={formik.handleSubmit}>
        <Modal
          show={showAddModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={handleCloseAddModal}
        >
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                <p className="headColor">Add News</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div class="col-md-6 col-12 mb-2">
                  <lable className="form-lable">
                    Upload Image File
                  </lable>
                  <div class="input-group mb-3">
                    <input
                      type="file"
                      className={`form-control   ${formik.touched.file && formik.errors.file
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("file")}
                    />
                    {formik.touched.file && formik.errors.file && (
                      <div className="invalid-feedback">
                        {formik.errors.file}
                      </div>
                    )}
                  </div>
                  {selectedFile && (
                    <div>

                      {selectedFile.type.startsWith('image') && (
                        <img src={URL.createObjectURL(selectedFile)} alt="Selected File" style={{ maxWidth: '100%' }} />
                      )}
                    </div>
                  )}
                </div>
                <div class="col-md-6 col-12 mb-2">
                  <lable class="">
                    Heading<span class="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control   ${formik.touched.heading && formik.errors.heading
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("heading")}
                  />
                  {formik.touched.heading && formik.errors.heading && (
                    <div className="invalid-feedback">{formik.errors.heading}</div>
                  )}
                </div>

                <div class="col-md-6 col-12 mb-2">
                  <lable class="">
                    Comments<span class="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control   ${formik.touched.comments && formik.errors.comments
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("comments")}
                  />
                  {formik.touched.comments && formik.errors.comments && (
                    <div className="invalid-feedback">{formik.errors.comments}</div>
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="mt-5">
              <Button variant="secondary" onClick={handleCloseAddModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn btn-button btn-sm"
              // disabled={loadIndicator}
              >
                {/* {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )} */}
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </form>

      <form onSubmit={formik.handleSubmit}>
        <Modal
          show={showEditModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit News</Modal.Title>
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
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group controlId="formComments" className="mt-3">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  name="comments"
                  rows={3}
                  value={tempContent.comments}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button
              type="submit"
              className="btn btn-button btn-sm"
              onClick={handleCloseEditModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </form>

    </div>
  );
}

export default CmsNewsUpdate;
