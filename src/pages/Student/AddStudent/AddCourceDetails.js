import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form, useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import $ from "jquery";
import { Link } from "react-router-dom";
import { BsTable } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import fetchAllCoursesWithIds from "../../List/CourseList";
import fetchAllCoursesWithIdsC from "../../List/CourseListByCenter";
import fetchAllPackageListByCenter from "../../List/PackageListByCenter";

// const validationSchema = Yup.object().shape({
//   courseId: Yup.string().required("*Course is required"),
//   courseDay: Yup.string().required("*CourseDay is required"),
// });

const AddcourseDetail = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [courseData, setCourseData] = useState(null);
    const [packageData, setPackageData] = useState(null);
    const [availableDays, setAvailableDays] = useState([]); // State for available days in select

    const tableRef = useRef(null);
    const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    // console.log("courseId pass ScheduleTeacher:", datas.courseId);

    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null); // Add state for selected row

    const handleClose = () => setShow(false);
    const handleShow = (rowData) => {
      // setSelectedRowData(rowData);
      setShow(true);
    };

    const formik = useFormik({
      initialValues: {
        courseId: formData.courseId || "",
        startDate: formData.startDate || "",
        startTime: formData.startTime || "",
        days: formData.days || "",
        packageId: formData.packageId || "",
        batch: formData.batch || "",
        endDate: formData.endDate || "",
        endTime: formData.endTime || "",
        studentId: formData.student_id || "",
      },
      // validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        try {
          const response = await api.post(`/createStudentCourseDetails`, data);

          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const fetchData = async () => {
      try {
        const courseData = await fetchAllCoursesWithIdsC(formData.centerId);
        setCourseData(courseData);
      } catch (error) {
        toast.error(error);
      }
    };

    const fetchPackageData = async () => {
      try {
        const packageData = await fetchAllPackageListByCenter(
          formData.centerId
        );
        setPackageData(packageData);
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
      fetchData();
      fetchPackageData();
    }, []);

    const getData = async () => {
      destroyDataTable();
      setLoading(true);
      let params = {};

      if (formik.values.courseId !== "") {
        params.courseId = formik.values.courseId;
      }

      if (formik.values.days !== "") {
        params.day = formik.values.days;
      }

      if (formik.values.batch !== "") {
        params.batchId = formik.values.batch;
      }

      try {
        const response = await api.get("/getAllScheduleTeacher", { params });
        setDatas(response.data);
        initializeDataTable();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getData();
    }, [formik.values.courseId, formik.values.batch, formik.values.days]);

    useEffect(() => {
      if (!loading) {
        initializeDataTable();
      }
      return () => {
        destroyDataTable();
      };
    }, [loading]);

    const initializeDataTable = () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        return;
      }
      $(tableRef.current).DataTable();
    };

    const destroyDataTable = () => {
      const table = $(tableRef.current).DataTable();
      if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
        table.destroy();
      }
    };

    // const refreshData = async () => {
    //   destroyDataTable();
    //   setLoading(true);
    //   try {
    //     const response = await api.get("/getAllScheduleTeacher");
    //     setDatas(response.data);
    //     initializeDataTable();
    //   } catch (error) {
    //     console.error("Error refreshing data:", error);
    //   }
    //   setLoading(false);
    // };

    const handleRowSelect = (data) => {
      if (data.availableSlots === 0) {
        toast.error("Class is Full");
        return; // Prevent further actions
      }
      setSelectedRow(data.id);
      console.log("Selected Row Data:", data);
      setFormData((prev) => ({ ...prev, ...data })); // Store selected row data in formData
      // Calculate days between startDate and endDate
      if (data.startDate && data.endDate) {
        const days = calculateDays(data.startDate, data.endDate);
        setAvailableDays(days);
      }
    };
    
    const calculateDays = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = [];
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        days.push({
          value: date.toISOString().split("T")[0],
          label: date.toDateString(),
        });
      }
      return days;
    };
    useImperativeHandle(ref, () => ({
      CourseDetail: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <div className="border-0 mb-5">
            <div className="mb-5">
              <div className="border-0 my-2 px-2">
                <p class="headColor">Course Detail</p>
                <div className="row mt-2">
                  <div className="col-md-4">
                    <select
                      {...formik.getFieldProps("courseId")}
                      class={`form-select  ${
                        formik.touched.courseId && formik.errors.courseId
                          ? "is-invalid"
                          : ""
                      }`}
                      id="courseId"
                      name="courseId"
                    >
                      <option value="" disabled selected>
                        Select Course
                      </option>
                      {courseData &&
                        courseData.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.courseNames}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select
                      {...formik.getFieldProps("days")}
                      class={`form-select  ${
                        formik.touched.days && formik.errors.days
                          ? "is-invalid"
                          : ""
                      }`}
                      id="days"
                      name="days"
                    >
                      <option value="" disabled selected>
                        Select Day
                      </option>
                      <option value="MONDAY">MONDAY</option>
                      <option value="TUESDAY">TUESDAY</option>
                      <option value="WEDNESDAY">WEDNESDAY</option>
                      <option value="THURSDAY">THURSDAY</option>
                      <option value="FRIDAY">FRIDAY</option>
                      <option value="SATURDAY">SATURDAY</option>
                      <option value="SUNDAY">SUNDAY</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select " id="batch" name="batch">
                      <option value="" disabled selected>
                        Select Batch Time
                      </option>
                      <option value="1">2:30 pm</option>
                      <option value="2">3:30 pm</option>
                      <option value="3">5:00 pm</option>
                      <option value="4">7:00 pm</option>
                      <option value="5">12:00 pm</option>
                      <option value="6">1:00 pm</option>
                    </select>
                  </div>
                </div>
                <div className="container my-4">
                  {loading ? (
                    <div className="loader-container">
                      <div className="loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="table-responsive">
                        <table ref={tableRef} className="display">
                          {/* Table Header */}
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Course</th>
                              <th scope="col">Batch</th>
                              <th scope="col">Start Date</th>
                              <th scope="col">End Date</th>
                              <th scope="col">Day</th>
                              <th scope="col">Available Slot</th>
                            </tr>
                          </thead>
                          {/* Table Body */}
                          <tbody>
                            {datas.map((data, index) => (
                              <tr
                                key={index}
                                onClick={() => handleRowSelect(data)} // Add onClick handler
                                className={
                                  selectedRow === data.id ? "selected-row" : ""
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <th scope="row" className="text-center">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={selectedRow === data.id} // Check if this row is selected
                                    onChange={() => handleRowSelect(data)} // Call handler on change
                                  />
                                </th>
                                <td>{data.course}</td>
                                <td>{data.batchId}</td>
                                <td>{data.startDate}</td>
                                <td>{data.endDate}</td>
                                <td>{data.days}</td>
                                <td className="text-center">
                                  <span className="badge rounded-pill text-bg-success">
                                    {data.availableSlots}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
                <div className="row mt-2">
                  <div className="col-md-4">
                    <select
                      {...formik.getFieldProps("packageId")}
                      class={`form-select  ${
                        formik.touched.packageId && formik.errors.packageId
                          ? "is-invalid"
                          : ""
                      }`}
                      id="packageId"
                      name="packageId"
                    >
                      <option value="" disabled selected>
                        Select Package
                      </option>
                      {packageData &&
                        packageData.map((packages) => (
                          <option key={packages.id} value={packages.id}>
                            {packages.packageNames}
                          </option>
                        ))}
                    </select>
                  </div>
                  {availableDays.length > 0 && (
                    <div className="col-md-4">
                      <select className="form-select">
                        <option value="" disabled selected>
                          Select Date
                        </option>
                        {availableDays.map((day) => (
                          <option key={day.value} value={day.value}>
                            {day.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default AddcourseDetail;
