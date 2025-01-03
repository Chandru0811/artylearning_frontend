import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  classId: Yup.string().required("*Class Name is required"),
  startDate: Yup.string().required("*Date is required"),
  userId: Yup.string().required("*Teacher Name is required"),
});

const Replacement = ({ classId, onOpen }) => {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [classData, setClassData] = useState({});
  const [centerID, setCenterId] = useState({});
  console.log("CenterID:",centerID);
  console.log("ClassID:",classId);
  const [teacherData, setTeacherData] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);

  const handleClose = () => {
    setOpen(false);
    onOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      classId: "",
      startDate: "",
      userId: "",
      remark: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { classId, startDate, userId, remark } = values;
      setLoadIndicator(true);
      try {
        // Interpolate query parameters
        const response = await api.put(
          `doTeacherReplacement?classId=${classId}&startDate=${startDate}&userId=${userId}&remark=${remark}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("An error occurred while processing the request");
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
  });

  const handleRowSelect = (data = classData) => {
    if (data.startDate && data.endDate) {
      const days = calculateDays(data.startDate, data.endDate, data.day);
      setAvailableDays(days);
    } else {
      setAvailableDays([]);
    }
  };

  const calculateDays = (startDate, endDate, selectedDay) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = [];

    const dayMapping = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
    };

    const targetDay = dayMapping[selectedDay?.toUpperCase()];

    for (
      let startDate = new Date(start);
      startDate <= end;
      startDate.setDate(startDate.getDate() + 1)
    ) {
      if (startDate.getDay() === targetDay) {
        days.push({
          value: startDate.toISOString().split("T")[0],
          label: startDate.toDateString(),
        });
      }
    }

    return days;
  };

  const fetchAvailableTeachersWithExclusion = async (selectedDate) => {
    try {
      const startDate = selectedDate || formik.values.startDate; 
      if (centerID && classId && startDate) {
        const response = await api.get(
          `getAvailableTeachersWithExclusion/${centerID}?classId=${classId}&startDate=${startDate}`
        );
        setTeacherData(response.data);
        console.log("Fetched Teachers:", response.data);
      } else {
        toast.error("Missing necessary parameters."); 
      }
    } catch (error) {
      toast.error("Error fetching teacher data.");
      console.error(error);
    }
  };

  
  const getCourseClassLData = async () => {
    try {
      const response = await api.get(
        `/getAllCourseClassListingsById/${classId}`
      );
      if (response.status === 200) {
        setClassData(response.data);
        handleRowSelect(response.data);
        setCenterId(response.data.centerId);
        formik.setFieldValue("className", classData.className);
        formik.setFieldValue("classId", classData.id);
      }
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    // fetchAvailableTeachersWithExclusion();
    getCourseClassLData();
  }, [open]);

  return (
    <div>
      <span
        onClick={handleOpen}
        className="text-start mb-0 menuitem-style"
        style={{
          whiteSpace: "nowrap",
          width: "100% !important",
        }}
      >
        Teacher Replacement
      </span>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Teacher Replacement</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Class Listing<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formik.values.className}
                    className={`form-control ${
                      formik.touched.className && formik.errors.className
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Class Date<span className="text-danger">*</span>
                  </label>
                  <select
                    type="text"
                    className={`form-select ${
                      formik.touched.startDate && formik.errors.startDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("startDate")}
                    onChange={(e) => {
                      formik.handleChange(e);
                      fetchAvailableTeachersWithExclusion(e.target.value); // Call API with selected date
                    }}
                  >
                    <option value=""></option>
                    {availableDays?.map((data, i) => (
                      <option value={data.value}>{data.label}</option>
                    ))}
                  </select>
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="invalid-feedback">
                      {formik.errors.startDate}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Teacher<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      formik.touched.userId && formik.errors.userId
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("userId")}
                  >
                    <option value=""></option>
                    {teacherData?.map((data, i) => (
                      <option value={data.id}>{data.teacherName}</option>
                    ))}
                  </select>
                  {formik.touched.userId && formik.errors.userId && (
                    <div className="invalid-feedback">
                      {formik.errors.userId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Remark</label>
                  <textarea
                    rows={5}
                    onKeyDown={(e) => e.stopPropagation()}
                    className={`form-control ${
                      formik.touched.remark && formik.errors.remark
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("remark")}
                  />
                  {formik.touched.remark && formik.errors.remark && (
                    <div className="invalid-feedback">
                      {formik.errors.remark}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-button btn-sm">
              Submit
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Replacement;
