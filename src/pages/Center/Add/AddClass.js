import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { SiGoogleclassroom } from "react-icons/si";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import fetchAllCentersWithIds from "../../List/CenterList";

function AddClass({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [centerData, setCenterData] = useState([]);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const centerOptions = centerData?.map((center) => ({
    label: center.centerNames,
    value: center.id,
  }));

  const handleClose = () => {
    handleMenuClose();
    formik.resetForm();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    setIsModified(false);
  };
  const validationSchema = yup.object().shape({
    classRoomName: yup.string().required("*Classroom Name is required"),
    classRoomType: yup.string().required("*Classroom Type is required"),
    classRoomCode: yup.string().required("*Classroom Code is required"),
    capacity: yup
      .number()
      .integer("Must be an integer")
      .typeError("Must be a number")
      .positive("Must be positive")
      .required("*Capacity is required"),
  });
  const formik = useFormik({
    initialValues: {
      classRoomName: "",
      classRoomType: "",
      classRoomCode: "",
      capacity: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form values:", values);
      try {
        const response = await api.post(
          `/createCenterClassRooms/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          onSuccess();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.warning(error?.response?.data?.message);
        } else {
          toast.error(error.response.data.message);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (Object.values(values).some((value) => value.trim() !== "")) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });
  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <p
        className="text-start mb-0 menuitem-style"
        style={{ whiteSpace: "nowrap", width: "100%" }}
        onClick={handleShow}
      >
        Add Classroom
      </p>

      <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <DialogTitle>
            <p className="headColor">Add Classroom</p>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Centre<span className="text-danger">*</span>
                </label>
                <MultiSelect
                  options={centerOptions}
                  value={selectedCenters}
                  onChange={(selected) => {
                    setSelectedCenters(selected);
                    formik.setFieldValue(
                      "centerId",
                      selected.map((option) => option.value)
                    );
                  }}
                  labelledBy="Select Centers"
                  className={`form-multi-select ${
                    formik.touched.centerId && formik.errors.centerId
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    height: "37.6px !important", // Set the desired height
                    minHeight: "37.6px", // Ensure the height doesn't shrink
                  }}
                />
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="invalid-feedback">
                    {formik.errors.centerId}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Classroom Name<span className="text-danger">*</span>
                </lable>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    onKeyDown={(e) => e.stopPropagation()}
                    className={`form-control   ${
                      formik.touched.classRoomName &&
                      formik.errors.classRoomName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("classRoomName")}
                  />
                  {formik.touched.classRoomName &&
                    formik.errors.classRoomName && (
                      <div className="invalid-feedback">
                        {formik.errors.classRoomName}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Classroom Code<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  onKeyDown={(e) => e.stopPropagation()}
                  className={`form-control   ${
                    formik.touched.classRoomCode && formik.errors.classRoomCode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("classRoomCode")}
                />
                {formik.touched.classRoomCode &&
                  formik.errors.classRoomCode && (
                    <div className="invalid-feedback">
                      {formik.errors.classRoomCode}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Classroom Type<span className="text-danger">*</span>
                </lable>
                <div className="input-group mb-3">
                  <select
                    className={`form-select   ${
                      formik.touched.classRoomType &&
                      formik.errors.classRoomType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("classRoomType")}
                  >
                    <option></option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                  {formik.touched.classRoomType &&
                    formik.errors.classRoomType && (
                      <div className="invalid-feedback">
                        {formik.errors.classRoomType}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Capacity<span className="text-danger">*</span>
                </lable>
                <input
                  onKeyDown={(e) => e.stopPropagation()}
                  type="text"
                  pattern="^\d+$"
                  className={`form-control   ${
                    formik.touched.capacity && formik.errors.capacity
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("capacity")}
                />
                {formik.touched.capacity && formik.errors.capacity && (
                  <div className="invalid-feedback">
                    {formik.errors.capacity}
                  </div>
                )}
              </div>
              <div className="form-floating">
                <lable>Description</lable>
                <textarea
                  onKeyDown={(e) => e.stopPropagation()}
                  className="form-control p-1"
                  {...formik.getFieldProps("description")}
                  placeholder=""
                  id="floatingTextarea2"
                  eration
                  style={{ height: 100 }}
                ></textarea>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="mt-3">
            <Button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-button btn-sm"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddClass;
