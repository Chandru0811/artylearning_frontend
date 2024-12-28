import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";
import fetchAllClassRoomWithCenterIds from "../List/ClassRoomList";

const validationSchema = Yup.object({
  classId: Yup.string().required("*Class Name is required"),
  date: Yup.string().required("*Date is required"),
  replacementDate: Yup.string().required("*Replacement Date is required"),
  startTime: Yup.string().required("*Start Time is required"),
  endTime: Yup.string().required("*End Time is required"),
  teacherId: Yup.string().required("*Teacher Name is required"),
  classRoomId: Yup.string().required("*Class Room Name is required"),
});

const ClassReplacement = ({ classId, onDeleteSuccess, onOpen }) => {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [classData, setClassData] = useState({});
  const [teacherData, setTeacherData] = useState([]);
  const [classRoomData, setClassRoomData] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [batchData, setBatchData] = useState(null);
  console.log("classData", classData);
  console.log("teacherData", teacherData);

  const handleClose = () => {
    setOpen(false);
    onOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      className: "",
      classId: "",
      date: "",
      replacementDate: "",
      startTime: "",
      endTime: "",
      teacherId: "",
      classRoomId: "",
      remark: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { className } = values;
      console.log("values", values);
      // setLoadIndicator(true);
      // try {
      //   const response = await api.put(
      //     `/${id}`,
      //     values,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      //   if (response.status === 200) {
      //     onSuccess();
      //     handleClose();
      //     toast.success(response.data.message);
      //   } else {
      //     toast.error(response.data.message);
      //   }
      // } catch (error) {
      //   toast.error(error);
      // } finally {
      //   setLoadIndicator(false);
      // }
    },
    enableReinitialize: true,
  });
  const handleRowSelect = (data = classData) => {
    // if (data.availableSlots === 0) {
    //   toast.warning("Class is Full");
    //   return;
    // }
    // console.log("Selected Row Data:", data);
    // setFormData((prev) => ({ ...prev, coursesData: data }));

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
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      if (date.getDay() === targetDay) {
        days.push({
          value: date.toISOString().split("T")[0],
          label: date.toDateString(),
        });
      }
    }

    return days;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(
          `/getAllCourseClassListingsById/${classId}`
        );
        if (response.status === 200) {
          setClassData(response.data);
          formik.setFieldValue("className", classData.className);
          formik.setFieldValue("classId", classData.id);
        }
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    const fetchListData = async () => {
      try {
        const response = await fetchAllTeacherListByCenter(classData.centerId);
        const classRoom = await fetchAllClassRoomWithCenterIds(
          classData.centerId
        );
        // setTeacherData(response);
        setClassRoomData(classRoom);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (classData.centerId) {
      fetchListData();
      handleRowSelect();
    }
    getData();
  }, [classId, open]);

  const fetchBatchandTeacherData = async (day, centerId) => {
    try {
      const response = await api.get(
        `getTeacherWithBatchListByDay?day=${day}&centerId=${centerId}`
      );
      setTeacherData(response.data.teacherList);
      setBatchData(response.data.batchList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (classData.day && classData.centerId) {
      fetchBatchandTeacherData(classData.day, classData.centerId);
    }
  }, [classData.day, classData.centerId]);

  const calculateEndTime = () => {
    let durationInHrs =classData.durationInHrs
    let durationInMins =classData.durationInMins
    const { startTime } = formik.values;
    if (!startTime) return;

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const endHours =
      (startHours +
        parseInt(durationInHrs) +
        Math.floor((startMinutes + parseInt(durationInMins)) / 60)) %
      24;
    const endMinutes = (startMinutes + parseInt(durationInMins)) % 60;

    const formattedEndTime = `${String(endHours).padStart(2, "0")}:${String(
      endMinutes
    ).padStart(2, "0")}`;
    formik.setFieldValue("endTime", formattedEndTime);
  };

  useEffect(() => {
    calculateEndTime();
  }, [formik.values.startTime,classData.durationInHrs,classData.durationInMins]);

  const convertTo24Hour = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours < 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };
  const normalizeTime = (time) => {
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }

    return formatTo12Hour(time);
  };
  const formatTo12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    let period = "AM";
    let hour = parseInt(hours, 10);

    if (hour === 0) {
      hour = 12;
    } else if (hour >= 12) {
      period = "PM";
      if (hour > 12) hour -= 12;
    }

    return `${hour}:${minutes} ${period}`;
  };
  return (
    <div>
      <span
        onClick={handleOpen}
        style={{
          whiteSpace: "nowrap",
          width: "100% !important",
        }}
      >
        Class Replacement
      </span>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Class Replacement</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Class Listing<span className="text-danger">*</span>
                  </label>
                  <input
                    readOnly
                    type="text"
                    onKeyDown={(e) => e.stopPropagation()}
                    className={`form-control ${
                      formik.touched.className && formik.errors.className
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("className")}
                  />
                  {formik.touched.className && formik.errors.className && (
                    <div className="invalid-feedback">
                      {formik.errors.className}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Class Date<span className="text-danger">*</span>
                  </label>
                  <select
                    type="text"
                    className={`form-select ${
                      formik.touched.date && formik.errors.date
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("date")}
                  >
                    <option value=""></option>
                    {availableDays?.map((data, i) => (
                      <option value={data.value}>{data.label}</option>
                    ))}
                  </select>
                  {formik.touched.date && formik.errors.date && (
                    <div className="invalid-feedback">{formik.errors.date}</div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Replacement Class Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      formik.touched.replacementDate &&
                      formik.errors.replacementDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("replacementDate")}
                  />
                  {formik.touched.replacementDate &&
                    formik.errors.replacementDate && (
                      <div className="invalid-feedback">
                        {formik.errors.replacementDate}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <label className="form-label">
                        Start Time
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        type="text"
                        className={`form-select ${
                          formik.touched.startTime && formik.errors.startTime
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("startTime")}
                      >
                        <option value=""></option>
                        {batchData &&
                          batchData.map((time) => {
                            const displayTime = normalizeTime(time);
                            const valueTime =
                              time.includes("AM") || time.includes("PM")
                                ? convertTo24Hour(time)
                                : time;

                            return (
                              <option key={time} value={valueTime}>
                                {displayTime}
                              </option>
                            );
                          })}
                      </select>
                      {formik.touched.startTime && formik.errors.startTime && (
                        <div className="invalid-feedback">
                          {formik.errors.startTime}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 col-12">
                      <label className="form-label">
                        End Time
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.endTime && formik.errors.endTime
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("endTime")}
                      />
                      {formik.touched.endTime && formik.errors.endTime && (
                        <div className="invalid-feedback">
                          {formik.errors.endTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Teacher<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      formik.touched.teacherId && formik.errors.teacherId
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("teacherId")}
                  >
                    <option value=""></option>
                    {teacherData?.map((data, i) => (
                      <option value={data.teacherId}>{data.teacherName}</option>
                    ))}
                  </select>
                  {formik.touched.teacherId && formik.errors.teacherId && (
                    <div className="invalid-feedback">
                      {formik.errors.teacherId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Class Room<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      formik.touched.classRoomId && formik.errors.classRoomId
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("classRoomId")}
                  >
                    <option value=""></option>
                    {classRoomData?.map((data, i) => (
                      <option value={data.id}>{data.classRoomName}</option>
                    ))}
                  </select>
                  {formik.touched.classRoomId && formik.errors.classRoomId && (
                    <div className="invalid-feedback">
                      {formik.errors.classRoomId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Remark</label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    className={`form-control ${
                      formik.touched.remark && formik.errors.remark
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("remark")}
                  />
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

export default ClassReplacement;
