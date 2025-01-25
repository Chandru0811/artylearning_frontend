import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../config/URL";
import Delete from "../../components/common/Delete.js";

function CmsNewsUpdateEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleShow = () => setShow(true);
  const currentData = new Date().toISOString().split("T")[0];
  const userName = localStorage.getItem("userName");

  const validationSchema = yup.object().shape({
    // file: yup
    //   .mixed()
    //   .required("File is required")
    //   .test("fileType", "Only JPG, JPEG, PNG files are allowed", (value) => {
    //     return (
    //       value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
    //     );
    //   }),
    heading: yup
      .string()
      .required("Heading is required")
      .min(3, "Heading must be at least 3 characters"),
    comment: yup
      .string()
      .required("Comment is required")
      .min(3, "Comment must be at least 3 characters"),
    para: yup
      .string()
      .required("Paragraph is required")
      .min(10, "Paragraph must be at least 10 characters"),
  });

  const formik = useFormik({
    initialValues: {
      cardImg: "",
      heading: "",
      role: "",
      date: "",
      comment: "",
      para: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      console.log("data");
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("heading ", data.heading);
      formData.append("role ", "Admin");
      formData.append("date ", currentData);
      formData.append("comment ", data.comment);
      formData.append("para ", data.para);
      formData.append("updatedBy ", userName);

      setLoadIndicator(true);
      try {
        const response = await api.put(
          `/updateNewsUpdatedSaveImages/${id}`,
          formData,
          {}
        );
        if (response.status === 201 || response.status === 200) {
          handleClose();
          onSuccess();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleClose = () => {
    setShow(false);
  };

  const getData = async () => {
    try {
      const response = await api.get(`/getNewsUpdatedSavesById/${id}`);
      formik.setValues(response.data);
      setDatas(response.data);
    } catch (error) {
      toast.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("file", file);
  };

  return (
    <div>
      <button className="btn" onClick={handleShow}>
        <MdEdit />
      </button>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="headColor">Edit News</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={formik.handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !formik.isSubmitting) {
                e.preventDefault(); // Prevent default form submission
              }
            }}
          >
            <div className="row">
              <div className="col-12 mb-2">
                <label className="form-label">Upload Image File<span className="text-danger">*</span></label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className={`form-control ${
                      formik.touched.file && formik.errors.file
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.file && formik.errors.file && (
                    <div className="invalid-feedback">{formik.errors.file}</div>
                  )}
                </div>
              </div>

              {/* Display Image */}
              <div className="col-12 mb-2">
                {selectedFile ? (
                  selectedFile.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected File"
                      style={{ maxHeight: "200px" }}
                    />
                  ) : (
                    <div>Invalid file type, please select an image file.</div>
                  )
                ) : (
                  <img
                    src={datas.cardImg || ""}
                    alt="Uploaded File"
                    style={{ maxHeight: "200px" }}
                  />
                )}
              </div>
              <div className=" col-12 mb-2">
                <lable className="">Heading<span className="text-danger">*</span></lable>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${
                      formik.touched.heading && formik.errors.heading
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="heading"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("heading")}
                  />
                  {formik.touched.heading && formik.errors.heading && (
                    <div className="invalid-feedback">
                      {formik.errors.heading}
                    </div>
                  )}
                </div>
              </div>

              <div className=" col-12 mb-2">
                <lable className="">Comment<span className="text-danger">*</span></lable>
                <input
                  type="text"
                  className={`form-control   ${
                    formik.touched.comment && formik.errors.comment
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("comment")}
                />
                {formik.touched.comment && formik.errors.comment && (
                  <div className="invalid-feedback">
                    {formik.errors.comment}
                  </div>
                )}
              </div>

              <div className=" col-12 mb-2">
                <lable className="">Paragraph<span className="text-danger">*</span></lable>
                <textarea
                  type="text"
                  className={`form-control   ${
                    formik.touched.para && formik.errors.para
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("para")}
                />
                {formik.touched.para && formik.errors.para && (
                  <div className="invalid-feedback">{formik.errors.para}</div>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="mt-5">
          {storedScreens?.newsUpdatesDelete && (
            <Delete
              path={`/deleteNewsUpdatedSave/${id}`}
              onSuccess={onSuccess}
            />
          )}
          <Button
            className="btn btn-sm btn-border bg-light text-dark"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={formik.handleSubmit}
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
      </Modal>
    </div>
  );
}

export default CmsNewsUpdateEdit;
