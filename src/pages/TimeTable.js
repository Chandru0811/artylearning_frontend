import React, { useEffect, useState } from "react";
import api from "../config/URL";
import fetchAllCentersWithIds from "./List/CenterList";
import { toast } from "react-toastify";
import fetchAllCoursesWithIdsC from "./List/CourseListByCenter";
import fetchAllTeacherListByCenter from "./List/TeacherListByCenter";

function TimeTable() {
  const [data, setData] = useState([]);
  const [day, setDay] = useState(null);
  const [centerData, setCenterData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("DATA ::", data);

  const [filters, setFilters] = useState({
    centerId: localStorage.getItem("selectedCenterId") || "",
    courseId: "",
    teacherId: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });

  const fetchData = async () => {
    try {
      // Fetch center data
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);

      // Set default center ID if not available
      if (!filters.centerId && centers.length > 0) {
        setFilters((prev) => ({ ...prev, centerId: centers[0].id }));
      }

      // Fetch course and teacher data for default center
      if (filters.centerId) {
        fetchCourseAndTeacherData(filters.centerId);
      }
    } catch (error) {
      toast.error("Error fetching center data");
      console.error(error);
    }
  };

  const fetchCourseAndTeacherData = async (centerId) => {
    try {
      const courses = await fetchAllCoursesWithIdsC(centerId);
      const teachers = await fetchAllTeacherListByCenter(centerId);
      setCourseData(courses);
      setTeacherData(teachers);
    } catch (error) {
      toast.error("Error fetching course or teacher data");
      console.error(error);
    }
  };

  const fetchScheduleData = async () => {
    try {
      setLoading(true);

      // Construct query params
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, value]) => value)
      );

      const response = await api.get(`/getScheduleOverView?${queryParams}`);
      setData(response.data.data.scheduleData);
      setDay(response.data.data.day);
    } catch (error) {
      toast.error("Error fetching schedule data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    // If the center changes, fetch new course and teacher data
    if (name === "centerId") {
      fetchCourseAndTeacherData(value);
    }
  };

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filters.centerId) {
      fetchScheduleData();
    }
  }, [filters]);

  return (
    <div className="container-fluid my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex align-items-center">
     
            <div className="dot bg-success rounded-circle me-2"></div>
            <span className="fw-bold text-muted">TimeTable</span>
         
        </div>
        <div className="d-flex justify-content-between align-items-center py-3 px-2">
          <div className="form-group mb-0 ms-2 mb-1">
            <select
              className="form-select form-select-sm center_list"
              name="centerId"
              style={{ width: "100%" }}
              onChange={handleFilterChange}
              value={filters.centerId}
            >
              <option value="">Select a Centre</option>
              {centerData?.map((center) => (
                <option key={center.id} value={center.id} selected>
                  {center.centerNames}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-0 ms-2 mb-1">
            <input
              type="date"
              className="form-control form-control-sm center_list"
              style={{ width: "140px" }}
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              placeholder="Date"
            />
          </div>

          <div className="form-group mb-0 ms-2 mb-1">
            <select
              className="form-select form-select-sm center_list"
              style={{ width: "100%" }}
              name="courseId"
              onChange={handleFilterChange}
              value={filters.courseId}
            >
              <option selected>Select a Course</option>
              {courseData &&
                courseData.map((courseId) => (
                  <option key={courseId.id} value={courseId.id}>
                    {courseId.courseNames}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group mb-0 ms-2 mb-1">
            <select
              className="form-select form-select-sm center_list"
              name="teacherId"
              style={{ width: "100%" }}
              value={filters.teacherId}
              onChange={handleFilterChange}
            >
              <option selected>Select a Teacher</option>
              {teacherData &&
                teacherData.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.teacherNames}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="card-body">
          <h5 className="text-center text-white p-2" style={{background:"#287f71"}}>
            {day || "No Available Days"}
          </h5>

          {Array.isArray(data) && data.length > 0 ? (
            data.map((classData, classIndex) => (
              <div className="table-responsive my-3" key={classIndex}>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th className="text-center fw-medium">Class</th>
                      <th className="text-center fw-medium">Teacher</th>
                      <th
                        colSpan={classData.maxClassSizeofDay}
                        className="text-center fw-medium"
                      >
                        {classData.teacherName}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classData.batches.map((batch, batchIndex) => (
                      <tr key={batchIndex}>
                        <td className="text-center fw-medium">
                          {batch.className}
                        </td>
                        <td className="text-center fw-medium">
                          {convertTo12HourFormat(batch.startTime)} -{" "}
                          {convertTo12HourFormat(batch.endTime)}
                        </td>
                        {Array.from({
                          length: classData.maxClassSizeofDay,
                        }).map((_, studentIndex) => {
                          const studentName =
                            batch.students[studentIndex]?.studentName || "";
                          return (
                            <td
                              key={studentIndex}
                              className="text-center fw-medium"
                              style={{
                                backgroundColor: studentIndex > batch.batchMaxSize ? "#eb862a" : "inherit",
                              }}
                            >
                              {studentName || ""}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-center text-danger">
              No data available for the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimeTable;
