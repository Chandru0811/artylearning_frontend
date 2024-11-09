import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ReactApexChart from "react-apexcharts";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIds from "../List/CourseList";
import { toast } from "react-toastify";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";

const RevenueReport = () => {
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const lineChartCanvasRef = useRef(null);
  const lineChartRef = useRef(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedType, setSelectedType] = useState("WEEKLY");
  // New state for selected center
  const [selectedCenterId, setSelectedCenterId] = useState("");

  const [chartData, setChartData] = useState({
    series: [{ name: "Sales Rate", data: [] }],
    options: {
      chart: { type: "bar", height: 350 },
      dataLabels: {
        enabled: true,
        style: { colors: ["#ffffff"] },
      },
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
      yaxis: { title: { text: "Sales Rate ($)" } },
      legend: { position: "top" },
    },
  });

  // State for week and month inputs
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Function to set current week and month as default values
  const setDefaultWeekAndMonth = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentWeek = `${currentYear}-W${String(
      Math.ceil((today.getDate() - today.getDay() + 10) / 7)
    ).padStart(2, "0")}`;
    const currentMonth = today.toISOString().substring(0, 7);

    setSelectedWeek(currentWeek);
    setSelectedMonth(currentMonth);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleCenterChange = (e) => {
    const centerId = e.target.value;
    setSelectedCenterId(centerId);
  };

  // const fetchData = async () => {
  //   try {
  //     const centers = await fetchAllCentersWithIds();
  //     const courses = await fetchAllCoursesWithIdsC(cenerId);
  //     const subject = await fetchAllSubjectsWithIds();
  //     setCenterData(centers);
  //     setCourseData(courses);
  //     setSubjectData(subject);
  //   } catch (error) {
  //     toast.error(error.message || "Failed to fetch data");
  //   }
  // };
  const fetchData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);
      const subject = await fetchAllSubjectsWithIds();
      setSubjectData(subject);
    } catch (error) {
      toast.error(error.message || "Failed to fetch data");
    }
  };
  const fetchCourseData = async () => {
    if (selectedCenterId) {
      try {
        const courses = await fetchAllCoursesWithIdsC(selectedCenterId);
        setCourseData(courses);
      } catch (error) {
        toast.error(
          error.message || "Failed to fetch courses for selected center"
        );
      }
    } else {
      setCourseData(null);
    }
  };

  // useEffect(() => {
  //   fetchData();
  //   setDefaultWeekAndMonth();
  // }, []);

  useEffect(() => {
    fetchData();
    setDefaultWeekAndMonth();
  }, []);

  useEffect(() => {
    fetchCourseData();
  }, [selectedCenterId]);

  // Update categories and chart data based on `selectedType`
  useEffect(() => {
    const categories =
      selectedType === "WEEKLY"
        ? ["Week 1", "Week 2", "Week 3", "Week 4"]
        : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const data =
      selectedType === "WEEKLY"
        ? [150, 200, 170, 220, 180, 210, 230]
        : [600, 800, 700, 900];

    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [{ name: "Sales Rate", data }],
      options: {
        ...prevChartData.options,
        xaxis: { categories },
      },
    }));
  }, [selectedType]);

  // Sample data for line chart - updating based on `dashboardData`
  useEffect(() => {
    const sampleDashboardData = {
      Data: [
        { label: "Registration", data: [70, 30, 40, 80, 60, 10, 20, 90] },
        { label: "Deposit", data: [15, 45, 35, 25, 55, 65, 95, 75] },
      ],
      totalLead: 100,
      totalStudent: 80,
      totalTeachers: 50,
    };
    setDashboardData(sampleDashboardData);
  }, []);

  useEffect(() => {
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

    if (dashboardData) {
      lineChartRef.current = new Chart(lineChartCanvasRef.current, {
        type: "line",
        data: {
          labels: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Total"],
          datasets: dashboardData.Data.map((item) => ({
            label: item.label,
            data: item.data,
            borderColor: item.label === "Registration" ? "blue" : "green",
            fill: false,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      if (lineChartRef.current) lineChartRef.current.destroy();
    };
  }, [dashboardData]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center Hero">
      <div className="container">
        <div className="row my-5">
          {/* Dropdowns */}
          <div className="col-md-4 col-12">
            <label className="form-label">Centre</label>
            <select
              className="form-select"
              value={selectedCenterId}
              onChange={handleCenterChange}
            >
              <option value="ALL">ALL</option>
              {centerData?.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.centerNames}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2 col-12">
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
          <div className="col-md-2 col-12">
            <button type="submit" className="btn btn-button p-2 mt-4">
              Submit
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="card p-4 mb-5">
          <div className="row mt-5">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="d-flex">
                <div className="p-1">
                  <label className="form-label">Course</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="ALL">ALL</option>
                    {courseData?.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.courseNames}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-1">
                  <label className="form-label">Subject</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="ALL">ALL</option>
                    {subjectData?.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.subjects}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 d-flex align-items-center justify-content-center"
              style={{ height: "350px" }}
            >
              <canvas id="lineChart" ref={lineChartCanvasRef}></canvas>
            </div>
            <div className="col-md-6" style={{ height: "350px" }}>
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
  );
};

export default RevenueReport;
