import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ReactApexChart from "react-apexcharts";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import api from "../../config/URL";
import { Link } from "react-router-dom";
import fetchAllCoursesWithIds from "../List/CourseList";
import Select from "react-select";

const RevenueReport = ({ selectedCenter }) => {
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedType, setSelectedType] = useState("WEEKLY");
  const [selectedCenterId, setSelectedCenterId] = useState(selectedCenter);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("All");
  const [selectedSubjectId, setSelectedSubjectId] = useState("All");
  const lineChartCanvasRef = useRef(null);
  const lineChartRef = useRef(null);
  const centerLocalId = localStorage.getItem("selectedCenterId");

  const [chartData, setChartData] = useState({
    series: [{ name: "Sales Rate", data: [] }],
    options: {
      chart: { type: "bar", height: 350 },
      dataLabels: { enabled: true, style: { colors: ["#ffffff"] } },
      xaxis: { categories: [] },
      yaxis: { title: { text: "Sales Rate ($)" } },
      legend: { position: "top" },
    },
  });

  const setDefaultWeekAndMonth = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const pastDaysOfYear = (today - new Date(currentYear, 0, 1)) / 86400000;
    const currentWeek = `${currentYear}-W${String(
      Math.ceil((pastDaysOfYear + new Date(currentYear, 0, 1).getDay() + 1) / 7)
    ).padStart(2, "0")}`;
    setSelectedWeek(currentWeek);
    setSelectedMonth(today.toISOString().substring(0, 7));
  };

  const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleCenterChange = (e) => setSelectedCenterId(e.target.value);
  const handleCourseChange = (selectedOption) => {
    setSelectedCourseId(selectedOption ? selectedOption.value : null);
  };
  const handleSubjectChange = (e) => setSelectedSubjectId(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const centers = await fetchAllCentersWithIds();
        setCenterData(centers);
        const subjects = await fetchAllSubjectsWithIds();
        setSubjectData(subjects);
        // if (centers && centers.length > 0 && !selectedCenterId) {
        //   if (centerLocalId !== null && centerLocalId !== "undefined") {
        //     setSelectedCenterId(centerLocalId);
        //   } else if (centerData !== null && centerData.length > 0) {
        //     setSelectedCenterId(centers[0].id);
        //   }
        // }
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };
    fetchData();
    setDefaultWeekAndMonth();
    setSelectedCenterId(selectedCenter);
  }, [selectedCenter]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let courses = [];
        const numericCenterId = Number(selectedCenter);
        if (numericCenterId === 0) {
          courses = await fetchAllCoursesWithIds();
        } else {
          courses = await fetchAllCoursesWithIdsC(numericCenterId);
        }
        if (!Array.isArray(courses)) {
          throw new Error("API did not return an array");
        }
        const formattedCourses = courses.map((course) => ({
          value: course.id,
          label: course.courseNames,
        }));
        setCourseData(formattedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error(error.message || "Failed to fetch courses");
      }
    };
    fetchCourses();
  }, [selectedCenter]);

  const fetchRevenueData = async () => {
    const params = {
      center: selectedCenterId,
      courseId: selectedCourseId || "All",
      subjectId: selectedSubjectId,
    };

    if (selectedType === "WEEKLY") {
      params.week = selectedWeek;
    } else {
      params.month = selectedMonth;
    }

    try {
      const response = await api.get("/getRevenueReportData", { params });
      const data = response.data;

      // Update line chart data
      setDashboardData(data.graphData);

      // Update bar chart data
      setChartData((prevChartData) => ({
        ...prevChartData,
        series: [{ name: "Sales Rate", data: data.sales.data }],
        options: {
          ...prevChartData.options,
          xaxis: { categories: data.labels },
        },
      }));
    } catch (error) {
      toast.error(error.message || "Failed to fetch revenue data");
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, [
    selectedCenterId,
    selectedWeek,
    selectedMonth,
    selectedType,
    selectedCourseId,
    selectedSubjectId,
  ]);

  useEffect(() => {
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

    if (dashboardData) {
      lineChartRef.current = new Chart(lineChartCanvasRef.current, {
        type: "line",
        data: {
          labels: chartData.options.xaxis.categories,
          datasets: dashboardData.map((item) => ({
            label: item.label,
            data: item.data,
            borderColor: item.label === "Registration" ? "#287F71" : "#EB862A",
            backgroundColor:
              item.label === "Registration" ? "#287F71" : "#EB862A",
            fill: false,
          })),
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    return () => {
      if (lineChartRef.current) lineChartRef.current.destroy();
    };
  }, [dashboardData, chartData]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center Hero">
      <div className="container-fluid">
        <ol
          className="breadcrumb my-3"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          <li>
            <Link to="/" className="custom-breadcrumb">
              Home
            </Link>
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li>
            Report Management
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Revenue Report
          </li>
        </ol>
        <div className="card">
          <div
            className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
            style={{ background: "#f5f7f9" }}
          >
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="dot active"></div>
              </div>
              <span className="me-2 text-muted">Revenue Report</span>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row my-5">
              <div className="col-md-4 col-12 d-none">
                <label className="form-label">Centre</label>
                <select
                  className="form-select"
                  value={selectedCenterId}
                  onChange={handleCenterChange}
                >
                  <option value="0">Selected Centre</option>
                  {centerData?.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.centerNames}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-12">
                <label className="form-label">Select Type</label>
                <select
                  className="form-select"
                  value={selectedType}
                  onChange={handleTypeChange}
                >
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>
              <div className="col-md-4 col-12">
                {selectedType === "WEEKLY" ? (
                  <>
                    <label className="form-label">Select Week</label>
                    <input
                      type="week"
                      className="form-control"
                      value={selectedWeek}
                      onChange={(e) => setSelectedWeek(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <label className="form-label">Select Month</label>
                    <input
                      type="month"
                      className="form-control"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="card p-4 mb-5">
              <div className="row mt-5">
                {/* <div className="col-md-6">
              <div className="p-1">
                <label className="form-label">Course</label>
                <select className="form-select" value={selectedCourseId} onChange={handleCourseChange}>
                  <option value="All">ALL</option>
                  {courseData?.map((data) => (
                    <option key={data.id} value={data.id}>{data.courseNames}</option>
                  ))}
                </select>
              </div>
              <div className="p-1">
                <label className="form-label">Subject</label>
                <select className="form-select" value={selectedSubjectId} onChange={handleSubjectChange}>
                  <option value="All">ALL</option>
                  {subjectData?.map((data) => (
                    <option key={data.id} value={data.id}>{data.subjects}</option>
                  ))}
                </select>
              </div>
            </div> */}
                <div
                  className="col-md-6 d-flex align-items-center justify-content-center"
                  style={{ height: "450px" }}
                >
                  <canvas id="lineChart" ref={lineChartCanvasRef}></canvas>
                </div>
                <div className="col-md-6" style={{ minHeight: "450px" }}>
                  <div className="row">
                    <div className="col-6 p-1 mt-2">
                      <label>
                        Course<span className="text-danger">*</span>
                      </label>
                      <Select
                        options={courseData}
                        name="courseId"
                        value={
                          courseData?.find(
                            (option) => option.value === selectedCourseId
                          ) || null
                        }
                        onChange={handleCourseChange}
                        placeholder="Select Course"
                        isSearchable
                        isClearable
                      />
                    </div>

                    <div className="col-6 p-1">
                      <label className="form-label">Subject</label>
                      <select
                        className="form-select"
                        value={selectedSubjectId}
                        onChange={handleSubjectChange}
                      >
                        <option value="All">ALL</option>
                        {subjectData?.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.subjects}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                    key={selectedType}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;
