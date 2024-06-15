import React,{useState} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaYoutube, FaInstagram, FaEdit, FaSave } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

const CmsTeacherEdit = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleSaveChanges = () => {
    setShowModal(false);
  };
  const initialValues = {
    name: "", // To store the uploaded image file
    role: "", // To store the uploaded image file
    roleName: "", // To store the uploaded image file
    experience: "", // To store the uploaded image file
    image: "", // To store the uploaded image file
    details: "", // Details about the image
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue('image', file); // Update Formik's form state with the file
  };

  return (
    <>
      <button className="btn btn-sm text-end"  onClick={handleShowModal}>
        <FaEdit />
      </button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="details"
                  name="name"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-danger">{formik.errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                > <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="english teacher">English Teacher</option>
                <option value="chinese teacher">Chinese Teacher</option></select>
                {formik.touched.role && formik.errors.role && (
                  <div className="text-danger">{formik.errors.role}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="roleName" className="form-label">
                  Role Name
                </label>
                <input
                  id="roleName"
                  name="roleName"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.roleName}
                />
                {formik.touched.roleName && formik.errors.roleName && (
                  <div className="text-danger">{formik.errors.roleName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="experience" className="form-label">
                Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.experience}
                />
                {formik.touched.experience && formik.errors.experience && (
                  <div className="text-danger">{formik.errors.experience}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="text-danger">{formik.errors.image}</div>
                )}
              </div>
              {selectedFile && (
                <div>
                  {selectedFile.type.startsWith("image") && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected File"
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="details" className="form-label">
                  Description
                </label>
                <textarea
                  id="details"
                  name="details"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.details}
                />
                {formik.touched.details && formik.errors.details && (
                  <div className="text-danger">{formik.errors.details}</div>
                )}
              </div>
            </div>
          </Modal.Body>
        </form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" type="" onClick={formik.handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
};

export default CmsTeacherEdit;
