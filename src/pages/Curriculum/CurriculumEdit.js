import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function CurriculumEdit({ id, onSuccess, curriculumOutletId }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleShow = () => {
    setShow(true);
    setIsModified(false);
  };
  const handleClose = () => setShow(false);
  const userName = localStorage.getItem("userName");

  const validationSchema = Yup.object({
    curriculumCode: Yup.string().required("*Curriculum Code is required"),
    lessonNo: Yup.string().required("*Lesson No is required"),
    curriculumNo: Yup.string().required("*Curriculum Code is required"),
    // description: Yup.string().required("*Description is required"),
    status: Yup.string().required("*Status is required"),
    description: Yup.string()
      .notRequired()
      .max(200, "*The maximum length is 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      curriculumCode: "",
      lessonNo: "",
      curriculumNo: "",
      description: "",
      status: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      setLoadIndicator(true);
      // console.log(values);
      values.curriculumOutletId = curriculumOutletId;
      try {
        const response = await api.put(
          `/updateCourseCurriculumCode/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          onSuccess();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (
        Object.values(values).some(
          (value) => typeof value === "string" && value.trim() !== ""
        )
      ) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/getAllCourseCurriculumCodesById/${id}`);
      formik.setValues(response.data);
    };
    if (show) {
      getData();
    }
  }, [show]);

  return (
    <>
      <span
        onClick={handleShow}
        style={{
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        Edit
      </span>
      <Dialog
        open={show}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        disableBackdropClick={isModified}
        disableEscapeKeyDown={isModified}
      >
          <DialogTitle className="headColor">Edit Curriculum</DialogTitle>
       
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <DialogContent>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Lesson No<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("lessonNo")}
                    class={`form-select  ${
                      formik.touched.lessonNo && formik.errors.lessonNo
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option value="" selected></option>
                    {Array.from({ length: 150 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  {formik.touched.lessonNo && formik.errors.lessonNo && (
                    <div className="invalid-feedback">
                      {formik.errors.lessonNo}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Curriculum Code<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("curriculumCode")}
                    className={`form-control  ${
                      formik.touched.curriculumCode &&
                      formik.errors.curriculumCode
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.curriculumCode &&
                    formik.errors.curriculumCode && (
                      <div className="invalid-feedback">
                        {formik.errors.curriculumCode}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Curriculum Number<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("curriculumNo")}
                    className={`form-control  ${
                      formik.touched.curriculumNo && formik.errors.curriculumNo
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.curriculumNo &&
                    formik.errors.curriculumNo && (
                      <div className="invalid-feedback">
                        {formik.errors.curriculumNo}
                      </div>
                    )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Status<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("status")}
                    class={`form-select  ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option value=""></option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Description</label>
                  <textarea
                    type="text"
                    {...formik.getFieldProps("description")}
                    className={`form-control  ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="invalid-feedback">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogActions>
              <Button
                className="btn btn-sm btn-border bg-light text-dark"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button variant="danger" type="submit" disabled={loadIndicator}>
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Update
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default CurriculumEdit;
