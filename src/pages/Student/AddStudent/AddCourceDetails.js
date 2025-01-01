import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCoursesWithIdsC from "../../List/CourseListByCenter";
import fetchAllPackageListByCenter from "../../List/PackageListByCenter";
import { createTheme, ThemeProvider } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

const validationSchema = Yup.object().shape({
  packageName: Yup.string().required("*Package Name is required"),
  lessonName: Yup.string().required("*Lesson Date is required"),
});

const AddcourseDetail = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    // console.log("Student Id:", formData.student_id);
    const [courseData, setCourseData] = useState(null);
    const [packageData, setPackageData] = useState(null);
    const [availableDays, setAvailableDays] = useState([]);
    const userName = localStorage.getItem("userName");
    const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [batchData, setBatchData] = useState(null);
    const [selectedRow, setSelectedRow] = useState(formData.id);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [studentCourseDetailsId, setStudentCourseDetailsId] = useState({});
    // console.log("FormData CenterID:", formData);
    console.log("Selected Row Data:", selectedRowData);
    console.log("Selected Row ID:", selectedRow);

    const handleDayChange = (e) => {
      formik.setFieldValue("days", e.target.value); // Update Formik value
      setAvailableDays([]); // Clear available days
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
                name="selectedRow"
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
            const value = cell.getValue(); // Get the batch value from the cell
            const formattedValue = Array.isArray(value)
              ? value.map((time) => formatTo12Hour(time)).join(", ") // Handle arrays of times if necessary
              : formatTo12Hour(value); // Handle a single time value

            return (
              <div className="d-flex justify-content-center">
                <span>{formattedValue}</span>
              </div>
            );
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
        lessonName: formData?.lessonName,
        packageName: formData?.packageName,
        selectedRow: formData?.selectedRow,
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        // Check if a row is selected
        if (!selectedRow || Object.keys(selectedRowData).length === 0) {
          toast.warning("Please select a course before proceeding.");
          return;
        }
        setLoadIndicators(true);
        const payload = {
          ...data,
          studentId: String(formData.student_id),
          centerId: selectedRowData.centerId,
          centerName: selectedRowData.centerName,
          classId: selectedRowData.classId,
          className: selectedRowData.className,
          course: selectedRowData.course,
          courseId: selectedRowData.courseId,
          // batchs: selectedRowData.batchs,
          batch: selectedRowData.batch,
          days: selectedRowData.days,
          classRoom: selectedRowData.classRoom,
          // startDate: selectedRowData.startDate,
          packageName: data.packageName,
          startDate: data.lessonName,
          endDate: selectedRowData.endDate,
          studentCount: selectedRowData.studentCount,
          teacher: selectedRowData.teacher,
          userId: selectedRowData.userId,
        };
        try {
          let response;
          if (studentCourseDetailsId !== null) {
            payload.studentCourseDetailsId = studentCourseDetailsId;
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

          if (response.status === 201 || response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            handleNext();
            // setSelectedRow(null);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          if (error?.response?.status === 409) {
            toast.warning(error?.response?.message);
          } else {
            toast.error(error?.response?.data?.message);
          }
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const fetchCourseData = async () => {
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
      fetchCourseData();
      fetchPackageData();
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

      if (formik.values.batch !== "") {
        params.batchs = formik.values.batch;
      }

      try {
        const response = await api.get(
          `/getCourseClassListingTeachers/${formData.centerId}`,
          { params }
        );
        setDatas(response.data);
        setSelectedRow(null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBatchandTeacherData = async (day) => {
      try {
        const response = await api.get(
          `getTeacherWithBatchListByDay?day=${day}`
        );
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

    const ClearSelection = () => {
      formik.resetForm({
        values: {
          lessonName: "",
          packageName: "",
          courseId: "",
          days: "",
          batch: "",
        },
      });
      setSelectedRow(null);
    };

    useEffect(() => {
      formik.setFieldValue("studentId", formData.student_id);
      getData();
    }, [formik.values.courseId, formik.values.batch, formik.values.days]);

    const handleRowSelect = (data) => {
      if (data.availableSlots === 0) {
        toast.warning("Class is Full");
        return;
      }
      setSelectedRow(data.id);
      setSelectedRowData(data);
      setFormData((prev) => ({ ...prev, coursesData: data }));

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

    useEffect(() => {
      if (formData.coursesData) {
        handleRowSelect(formData.coursesData);
      }
    }, [formData.coursesData]);

    const getStudentData = async () => {
      try {
        const response = await api.get(
          `/getAllStudentById/${formData.student_id}`
        );
        const data = response.data;
        const studentCourseDetail = data.studentCourseDetailModels[0];

        setStudentCourseDetailsId(studentCourseDetail?.id || null);
        console.log("studentCourseDetail:", studentCourseDetail);
        formik.setValues((prevValues) => ({
          ...prevValues,
          centerName: studentCourseDetail.centerName || prevValues.centerName,
          centerId: studentCourseDetail.centerId || formData.centerId,
          classId: studentCourseDetail?.classId || prevValues.classId,
          className: studentCourseDetail?.className || prevValues.className,
          courseId: studentCourseDetail?.courseId || prevValues.courseId,
          course: studentCourseDetail?.course || prevValues.course,
          batch: studentCourseDetail?.batch || prevValues.batch,
          days: studentCourseDetail?.days || prevValues.days,
          startDate: studentCourseDetail?.lessonName || prevValues.lessonName,
          endDate: studentCourseDetail?.endDate || prevValues.endDate,
          teacher: studentCourseDetail?.teacher || prevValues.teacher,
          lessonName: studentCourseDetail?.lessonName || prevValues.lessonName,
          packageName:
            studentCourseDetail?.packageName || prevValues.packageName,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      getStudentData();
    }, []);

    useImperativeHandle(ref, () => ({
      CourseDetail: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid p-0">
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <div className="border-0 mb-5">
            <div className="mb-5">
              <div className="border-0 my-2">
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
                      onChange={handleDayChange}
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
                  <div className="col-md-4 d-flex">
                    <select
                      {...formik.getFieldProps("batch")}
                      className="form-select"
                      id="batch"
                      name="batch"
                    >
                      <option value="" disabled selected>
                        Select Batch
                      </option>
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
                      onClick={ClearSelection}
                    >
                      Clear
                    </button>
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
                      {/* Display validation message if no row is selected */}
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
                          <option key={packages.id} value={packages.id}>
                            {packages.packageNames}
                          </option>
                        ))}
                    </select>
                    {formik.touched.packageName &&
                      formik.errors.packageName && (
                        <div className="invalid-feedback">
                          {formik.errors.packageName}
                        </div>
                      )}
                  </div>
                  {availableDays.length > 0 && (
                    <div className="col-md-4">
                      <select
                        {...formik.getFieldProps("lessonName")}
                        id="lessonName"
                        name="lessonName"
                        className={`form-select  ${
                          formik.touched.lessonName && formik.errors.lessonName
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value="" disabled selected>
                          Select Lesson Date
                        </option>
                        {availableDays.map((day) => (
                          <option key={day.value} value={day.value}>
                            {day.label}
                          </option>
                        ))}
                      </select>
                      {formik.touched.lessonName &&
                        formik.errors.lessonName && (
                          <div className="invalid-feedback">
                            {formik.errors.lessonName}
                          </div>
                        )}
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
