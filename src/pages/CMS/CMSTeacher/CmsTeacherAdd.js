import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const validationSchema = Yup.object().shape({
  files: Yup.mixed().required("*Image file is required"),
  teacherName: Yup.string().required("*Name details are required"),
  // role: Yup.string().required("Image details are required"),
  teacherRoleName: Yup.string().required("*RoleName details are required"),
  experience: Yup.string().required("*Experience are required"),
  teacherDescription: Yup.string().required(
    "*Description details are required"
  ),
});

const CmsTeacherAdd = ({ getData }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const userName  = localStorage.getItem('userName');

  const handleSaveChanges = () => {
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    formik.resetForm();
    setSelectedFile(null);
  };

  const formik = useFormik({
    initialValues: {
      teacherName: "",
      role: "",
      teacherRoleName: "",
      experience: "",
      files: "",
      teacherDescription: "",
    },
    // validationSchema,
    onSubmit: async (data) => {
      console.log(data);
      const formData = new FormData();
      formData.append("file", data.files);
      formData.append("teacherName ", data.teacherName);
      formData.append("teacherDescription ", data.teacherDescription);
      formData.append("teacherRoleName ", data.teacherRoleName);
      formData.append("experience ", data.experience);
      formData.append("role ", data.role);
      formData.append("createdBy ", userName);


      try {
        const response = await api.post("/createTeacherSave",formData);
        if (response.status === 201) {
          toast.success(response.data.message);
          getData();
          formik.resetForm();
          setShowModal(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        // setLoadIndicator(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("files", file); // Update Formik's form state with the file
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-button btn-sm me-2"
          onClick={handleShowModal}
        >
          Add <i class="bx bx-plus"></i>
        </button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Teacher</Modal.Title>
        </Modal.Header>
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <Modal.Body>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="teacherName" className="form-label">
                  Name
                </label>
                <input
                  id="teacherName"
                  name="teacherName "
                  className="form-control"
                  {...formik.getFieldProps("teacherName")}
                />
                {formik.touched.teacherName && formik.errors.teacherName && (
                  <div className="text-danger">{formik.errors.teacherName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-select"
                  {...formik.getFieldProps("role")}
                >
                  {" "}
                  <option value="">Select a role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="ENGLISH">English Teacher</option>
                  <option value="CHINESE">Chinese Teacher</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                  <div className="text-danger">{formik.errors.role}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="teacherRoleName " className="form-label">
                  Role Name
                </label>
                <input
                  id="teacherRoleName "
                  name="teacherRoleName "
                  className="form-control"
                  {...formik.getFieldProps("teacherRoleName")}
                />
                {formik.touched.teacherRoleName &&
                  formik.errors.teacherRoleName && (
                    <div className="text-danger">
                      {formik.errors.teacherRoleName}
                    </div>
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
                  {...formik.getFieldProps("experience")}
                />
                {formik.touched.experience && formik.errors.experience && (
                  <div className="text-danger">{formik.errors.experience}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="files" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  className="form-control"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.files && formik.errors.files && (
                  <div className="text-danger">{formik.errors.files}</div>
                )}
              </div>
              {selectedFile && (
                <div>
                  {selectedFile.type.startsWith("image") && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected File"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="teacherDescription " className="form-label">
                  Description
                </label>
                <textarea
                  id="teacherDescription "
                  name="teacherDescription "
                  className="form-control"
                  {...formik.getFieldProps("teacherDescription")}
                />
                {formik.touched.teacherDescription &&
                  formik.errors.teacherDescription && (
                    <div className="text-danger">
                      {formik.errors.teacherDescription}
                    </div>
                  )}
              </div>
            </div>
          </Modal.Body>
        </form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            className="btn btn-button btn-sm"
            type=""
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CmsTeacherAdd;
