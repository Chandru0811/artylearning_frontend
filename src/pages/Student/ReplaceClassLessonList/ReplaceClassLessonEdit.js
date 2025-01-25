import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
// import "../../styles/custom.css";
import "../../../styles/custom.css";
import { useFormik } from "formik";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net";
import * as Yup from "yup";
import { ThemeProvider, createTheme } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCoursesWithIdsC from "../../List/CourseListByCenter";

function ReplaceClassLessonEdit() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [studentCourseDetailsId, setStudentCourseDetailsId] = useState(null);
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [courseData, setCourseData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const centerId = searchParams.get("centerId");
  const [batchData, setBatchData] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("studentId");

  const validationSchema = Yup.object().shape({
    packageId: Yup.string().required("*Package Name is required"),
    lessonName: Yup.string().required("*Lesson Name is required"),
  });

  const handleDayChange = (e) => {
    formik.setFieldValue("days", e.target.value);
    setAvailableDays([]);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        enableHiding: false,
        enableSorting: false,
        size: 50,
        header: "",
        Cell: ({ row }) => (
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <input
              type="radio"
              style={{ cursor: "pointer" }}
              className="form-check-input pointer"
              name="courseSelection"
              onClick={() => handleRowSelect(row.original)}
            />
          </div>
        ),
      },

      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: false,
        size: 40,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "availableSlots",
        enableHiding: false,
        header: "Available Slots",
        size: 50,
        Cell: ({ cell }) => (
          <div className="d-flex justify-content-center">
            {cell.getValue() ? (
              <span className="badge rounded-pill text-bg-success">
                {cell.getValue()}
              </span>
            ) : (
              <span className="badge rounded-pill text-bg-danger">0</span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "course",
        enableHiding: false,
        header: "Course",
      },
      {
        accessorKey: "batch",
        enableHiding: false,
        header: "Batch",
        size: 50,
        Cell: ({ cell }) => {
          const [hours, minutes] = cell.getValue().split(":").map(Number);
          const ampm = hours >= 12 ? "PM" : "AM";
          const formattedTime = `${hours % 12 || 12}:${String(minutes).padStart(
            2,
            "0"
          )} ${ampm}`;
          return <span>{formattedTime}</span>;
        },
      },
      {
        accessorKey: "startDate",
        enableHiding: false,
        header: "Start Date",
        size: 50,
      },
      {
        accessorKey: "endDate",
        enableHiding: false,
        header: "End Date",
        size: 50,
      },
      {
        accessorKey: "days",
        enableHiding: false,
        header: "Days",
        size: 50,
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            color: "#535454 !important",
            backgroundColor: "#e6edf7 !important",
            fontWeight: "400 !important",
            fontSize: "13px !important",
            textAlign: "center !important",
          },
        },
      },
      // Switch (Toggle button) customization
      MuiSwitch: {
        styleOverrides: {
          root: {
            "&.Mui-disabled .MuiSwitch-track": {
              backgroundColor: "#f5e1d0", // Track color when disabled
              opacity: 1, // Ensures no opacity reduction
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              color: "#eb862a", // Thumb (circle) color when disabled
            },
          },
          track: {
            backgroundColor: "#e0e0e0", // Default track color
          },
          thumb: {
            color: "#eb862a", // Default thumb color
          },
          switchBase: {
            "&.Mui-checked": {
              color: "#eb862a", // Thumb color when checked
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#eb862a", // Track color when checked
            },
          },
        },
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      packageId: "",
      lessonName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted", values);
      formik.setTouched({
        packageId: true,
        lessonName: true,
      });
    
      // Check if the form is valid
      if (!formik.isValid) {
        toast.error("Please fill all the required fields");
        return;
      }

      if (!selectedRow) {
        toast.warning("Please select a course");
        return;
      }
      setLoadIndicator(true);
      const payload = {
        ...values,
        studentId: studentId,
        centerId: selectedRowData.centerId,
        centerName: selectedRowData.centerName,
        classId: selectedRowData.classId,
        className: selectedRowData.className,
        course: selectedRowData.course,
        courseId: selectedRowData.courseId,
        batchId: selectedRowData.batchId,
        batch: selectedRowData.batch,
        days: selectedRowData.days,
        classRoom: selectedRowData.classRoom,
        startDate: selectedRowData.startDate,
        endDate: selectedRowData.endDate,
        studentCount: selectedRowData.studentCount,
        teacher: selectedRowData.teacher,
        userId: selectedRowData.userId,
        // packageId: data.packageId,
      };
      console.log("Payload Data:", payload);
      try {
        let response;

        if (studentCourseDetailsId !== null) {
          response = await api.put(
            `/updateStudentCourseDetails/${studentCourseDetailsId}`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          response = await api.post(`/createStudentCourseDetails`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        if (response.status === 200 || response.status === 201) {
          toast.success(response.data.message);
          navigate("/replaceclasslesson");
          // navigate(`/invoice/add?studentID=${studentId}`);
          formik.resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error?.response?.status === 409) {
          toast.warning(error?.response?.data?.message);
        } else if (error?.response?.status === 404) {
          toast.warning(error?.response?.data?.message);
        } else {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const scrollToError = (errors) => {
    const errorField = Object.keys(errors)[0]; // Get the first error field
    const errorElement = document.querySelector(`[name="${errorField}"]`); // Find the DOM element
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      errorElement.focus(); // Set focus to the error element
      toast.warning("Please fill all the required fields");
    }
  };

  // Watch for form submit and validation errors
  useEffect(() => {
    if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
      scrollToError(formik.errors);
    }
  }, [formik.submitCount, formik.errors]);

  const fetchCourseData = async () => {
    try {
      const courseData = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courseData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPackageData = async () => {
    // Ensure that both centerId and courseId are present in selectedRowData
    if (!selectedRowData.centerId || !selectedRowData.courseId) {
      console.log(
        "Both Center ID and Course ID are required to fetch packages"
      );
      return;
    }

    try {
      const response = await api.get(
        `/courseFeeAvailablePackages?centerId=${selectedRowData.centerId}&courseId=${selectedRowData.courseId}`
      );
      setPackageData(response.data);
      console.log("Fetched Package Data:", response.data); // For debugging
    } catch (error) {
      toast.error(error.message || "Failed to fetch packages");
    }
  };

  // Call fetchPackageData when selectedRowData changes
  useEffect(() => {
    fetchPackageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowData]);

  useEffect(() => {
    fetchCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    setLoading(true);
    let params = {};

    if (formik.values.courseId !== "") {
      params.courseId = formik.values.courseId;
    }

    if (formik.values.days !== "") {
      params.day = formik.values.days;
    }

    if (formik.values.batchs !== "") {
      params.batchs = formik.values.batchs;
    }

    try {
      const response = await api.get(
        `/getCourseClassListingTeachers/${centerId}`,
        {
          params,
        }
      );
      setDatas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.courseId, formik.values.batchs, formik.values.days]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentById/${studentId}`);
        setData(response.data);

        const studentCourseDetail = response.data.studentCourseDetailModels[0];
        setStudentCourseDetailsId(studentCourseDetail.id);
        console.log("studentCourseDetail:", studentCourseDetail);
        formik.setValues({
          // ...studentCourseDetail,
          studentCourseDetailsId: studentCourseDetail.id,
          // courseId : courseId,
          // packageId : packageId,
        });

        console.log("Student Course Detail Id:", studentCourseDetail.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRowSelect = (data) => {
    if (data.availableSlots === 0) {
      toast.warning("Class is Full");
      return; // Prevent further actions
    }

    setSelectedRow(data.id); // Save selected row ID
    setSelectedRowData(data); // Save selected row data
    console.log("Selected Row Data:", data); // Log selected row data for debugging

    // Calculate days between startDate and endDate
    if (data.startDate && data.endDate) {
      const days = calculateDays(data.startDate, data.endDate, data.days);
      setAvailableDays(days); // Update available days
    } else {
      setAvailableDays([]);
    }
  };

  const calculateDays = (startDate, endDate, selectedDay) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = [];

    // Mapping selected day string to its corresponding numeric value
    const dayMapping = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
    };

    const targetDay = dayMapping[selectedDay.toUpperCase()];

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

  const fetchBatchandTeacherData = async (day) => {
    try {
      const response = await api.get(`getTeacherWithBatchListByDay?day=${day}`);
      setBatchData(response.data.batchList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (formik.values.days) {
      fetchBatchandTeacherData(formik.values.days);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.days]);

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

  const normalizeTime = (time) => {
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }

    return formatTo12Hour(time);
  };

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

  return (
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Student Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to={`/replaceclasslesson`} className="custom-breadcrumb">
            &nbsp;Replace Class Lesson List View
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Replace Class
        </li>
      </ol>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault();
          }
        }}
      >
        <div className="card">
          <div
            className="d-flex justify-content-between align-items-center p-1 mb-4 px-4"
            style={{ background: "#f5f7f9" }}
          >
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="dot active"></div>
              </div>
              <span className="me-2 text-muted">Replace Class</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to={`/replaceclasslesson`}>
                <button type="button " className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
                type="submit"
                className="btn btn-button btn-sm"
                onClick={formik.handleSubmit}
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                <span className="fw-medium">Arrange</span>
              </button>
            </div>
          </div>
          <div className="p-2">
            <table className="table table-border-solid">
              <thead>
                <tr>
                  <th scope="col" className="fw-medium">
                    S.No
                  </th>
                  <th scope="col" className="fw-medium">
                    Course
                  </th>
                  <th scope="col" className="fw-medium">
                    Batch
                  </th>
                  <th scope="col" className="fw-medium">
                    Days
                  </th>
                  <th scope="col" className="fw-medium">
                    Package
                  </th>
                  <th scope="col" className="fw-medium">
                    Lesson Start Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.studentCourseDetailModels &&
                  data.studentCourseDetailModels.map((stdCourse, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{stdCourse.course || "--"}</td>
                      <td>
                        {stdCourse.batch
                          ? (() => {
                              const [hours, minutes] = stdCourse.batch
                                .split(":")
                                .map(Number);
                              const ampm = hours >= 12 ? "PM" : "AM";
                              const formattedTime = `${
                                hours % 12 || 12
                              }:${String(minutes).padStart(2, "0")} ${ampm}`;
                              return formattedTime;
                            })()
                          : "--"}
                      </td>
                      <td>{stdCourse.days || "--"}</td>
                      <td>{stdCourse.packageId || "--"}</td>
                      <td>{stdCourse.lessonName || "--"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="border-0 my-2 px-2">
            <div className="row mt-2">
              <div className="col-md-4">
                <select
                  {...formik.getFieldProps("courseId")}
                  className={`form-select  ${
                    formik.touched.courseId && formik.errors.courseId
                      ? "is-invalid"
                      : ""
                  }`}
                  id="courseId"
                  name="courseId"
                >
                  <option value="" disabled>
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
                  className={`form-select  ${
                    formik.touched.days && formik.errors.days
                      ? "is-invalid"
                      : ""
                  }`}
                  id="days"
                  name="days"
                  onChange={handleDayChange}
                >
                  <option value="" disabled>
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
              <div className="col-md-4 d-flex">
                <select
                  {...formik.getFieldProps("batchs")}
                  className="form-select"
                  id="batchs"
                  name="batchs"
                >
                  <option value="">Select Batch</option>
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
                <button
                  type="button"
                  className="btn btn-sm border-secondary ms-3 my-1"
                  style={{ width: "100px" }}
                  onClick={() =>
                    formik.resetForm({
                      values: {
                        lessonName: "",
                        packageId: "",
                        courseId: "",
                        days: "",
                        batchs: "",
                      },
                    })
                  }
                >
                  Clear
                </button>
              </div>
            </div>
            {/* ScheduleTeachers Table */}
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
                  <ThemeProvider theme={theme}>
                    <MaterialReactTable
                      columns={columns}
                      data={datas}
                      enableColumnActions={false}
                      enableColumnFilters={false}
                      enableDensityToggle={false}
                      enableFullScreenToggle={false}
                      initialState={{
                        columnVisibility: {
                          createdBy: false,
                          createdAt: false,
                          updatedBy: false,
                          updatedAt: false,
                        },
                      }}
                    />
                  </ThemeProvider>
                  {!selectedRow && (
                    <div className="text-danger text-center fs-6 mt-2">
                      * Please select a row.
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <select
                  {...formik.getFieldProps("packageId")}
                  className={`form-select  ${
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
                    packageData.map((pkg) => (
                      <option key={pkg.packageId} value={pkg.packageId}>
                        {pkg.packageName}
                      </option>
                    ))}
                </select>
                {formik.touched.packageId && formik.errors.packageId && (
                  <div className="invalid-feedback">
                    {formik.errors.packageId}
                  </div>
                )}
              </div>
              {availableDays.length > 0 && (
                <div className="col-md-4">
                  <select
                    className="form-select"
                    name="lessonName"
                    {...formik.getFieldProps("lessonName")}
                  >
                    <option value="" disabled selected>
                      Select Date
                    </option>
                    {availableDays.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                  {formik.touched.lessonName && formik.errors.lessonName && (
                    <div className="invalid-feedback">
                      {formik.errors.lessonName}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReplaceClassLessonEdit;
