import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import $ from "jquery";
import fetchAllCoursesWithIdsC from "../../List/CourseListByCenter";
import fetchAllPackageListByCenter from "../../List/PackageListByCenter";

const AddcourseDetail = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [courseData, setCourseData] = useState(null);
    const [packageData, setPackageData] = useState(null);
    const [availableDays, setAvailableDays] = useState([]); // State for available days in select

    const tableRef = useRef(null);
    const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedRow, setSelectedRow] = useState(null); // Add state for selected row
    const [selectedRowData, setSelectedRowData] = useState({}); // State for selected row data

    const formik = useFormik({
      initialValues: {
        courseId: formData.courseId || "",
        batchId: formData.batchId || "",
        days: formData.days || "",
        packageName: formData.packageName || "",
        startDate: formData.startDate || "",
        endDate: formData.endDate || "",
        lessonName:formData.lessonName || "",
        studentId: formData.student_id || "",
      },
      // validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        const payload = {
          ...data,
          ...selectedRowData, // Merge selected row data with form data
        };
        console.log("Payload Data:", payload);
        try {
          const response = await api.post(
            `/createStudentCourseDetails`,
            payload
          );

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

      if (formik.values.batchId !== "") {
        params.batchId = formik.values.batchId;
      }

      try {
        const response = await api.get("/getAllScheduleTeachers", { params });
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
    }, [formik.values.courseId, formik.values.batchId, formik.values.days]);

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

    const handleRowSelect = (data) => {
      if (data.availableSlots === 0) {
        toast.error("Class is Full");
        return; // Prevent further actions
      }
      setSelectedRow(data.id);
      setSelectedRowData(data);
      console.log("Selected Row Data:", data);
      console.log("Selected Row Data Valuess are:", selectedRowData);
      setFormData((prev) => ({ ...prev, ...data })); // Store selected row data in formData
      // Calculate days between startDate and endDate
      if (data.startDate && data.endDate) {
        const days = calculateDays(data.startDate, data.endDate, data.days);
        setAvailableDays(days);
      } else {
        setAvailableDays([]);
      }
    };

    const calculateDays = (startDate, endDate, selectedDay) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = [];

      // Get the numeric representation of the selected day (0 for Sunday, 1 for Monday, etc.)
      const targetDay = new Date(
        `${selectedDay}, ${start.toDateString()}`
      ).getDay();

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
                    <select
                      {...formik.getFieldProps("batchId")}
                      className="form-select"
                      id="batchId"
                      name="batchId"
                    >
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
                                <td>{data.batch}</td>
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
                      {...formik.getFieldProps("packageName")}
                      class={`form-select  ${
                        formik.touched.packageName && formik.errors.packageName
                          ? "is-invalid"
                          : ""
                      }`}
                      id="packageName"
                      name="packageName"
                    >
                      <option value="" disabled selected>
                        Select Package
                      </option>
                      {packageData &&
                        packageData.map((packages) => (
                          <option key={packages.id} value={packages.packageNamesas}>
                            {packages.packageNames}
                          </option>
                        ))}
                    </select>
                  </div>
                  {availableDays.length > 0 && (
                    <div className="col-md-4">
                      <select className="form-select" name="lessonName" {...formik.getFieldProps("lessonName")}>
                        <option value=""  disabled selected>
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
