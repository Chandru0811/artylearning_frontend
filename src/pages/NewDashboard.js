import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { TbPigMoney } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/URL";

function NewDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
//   Line Chart (Revenue Over Time)
  const lineChartOptions = {
    chart: { id: "revenue-over-time" },
    xaxis: {
      categories: [
        "Mar 2023",
        "Jun 2023",
        "Sep 2023",
        "Dec 2023",
        "Mar 2024",
        "Sep 2024",
      ],
    },
    colors: ["#4bc0c0", "#ff6384"],
    stroke: { curve: "smooth", width: 2 },
  };

  const lineChartSeries = [
    { name: "Revenue", data: [12000, 15000, 10000, 20000, 25000, 30000] },
    { name: "Target", data: [10000, 14000, 11000, 18000, 23000, 25000] },
    { name: "Target", data: [1000, 16000, 12000, 15000, 19300, 25000] },
  ];

  // Radar Chart (Sales by Region)
  const radarChartOptions = {
    chart: { id: "sales-by-region", type: "radar" },
    labels: ["Asia", "Africa", "Europe", "Americas", "Pacific", "Middle East"],
    colors: ["#2ecc71"],
  };

  const radarChartSeries = [
    { name: "Sales", data: [2843, 3028, 2728, 2409, 1838, 800] },
  ];

  // Donut Chart (Sales by E-commerce Platform)
  const donutChartOptions = {
    chart: { type: "donut" },
    labels: ["Amazon", "Alibaba", "Tokopedia"],
    colors: ["#3498db", "#e74c3c", "#2ecc71"],
  };

  const donutChartSeries = [45, 35, 25];
  const gaugeChartOptions = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    series: [67],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: "#333",
          startAngle: -135,
          endAngle: 135,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "butt",
    },
    labels: ["Progress"],
  };

  const gaugeChartSeries = [67];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/smsDashBoardOverview");
        setDashboardData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <Link to={"/lead/lead"} style={{ textDecoration: "none" }}>
            <div className="card h-100">
              <div className="card-body">
                <span className="d-flex align-items-center justify-content-between">
                  <p
                    className="card-title"
                    style={{ color: "#000", fontSize: "20px" }}
                  >
                    Lead Count
                  </p>
                  <h5
                    style={{
                      backgroundColor: "#e0dcfe",
                      color: "#624bff",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <FaUsers />
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>{dashboardData?.totalLead}</strong>
                </h2>
                <h6 className="card-text text-secondary">
                  {dashboardData?.leadCountByMonth} Lead In This Month
                </h6>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 mb-3">
          <Link to={"/student"} style={{ textDecoration: "none" }}>
            <div className="card h-100">
              <div className="card-body">
                <span className="d-flex align-items-center justify-content-between">
                  <p
                    className="card-title"
                    style={{ color: "#000", fontSize: "20px" }}
                  >
                    Student
                  </p>
                  <h5
                    style={{
                      backgroundColor: "#e0dcfe",
                      color: "#624bff",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <PiStudentFill />
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>{dashboardData?.totalStudent}</strong>
                </h2>
                <h6 className="card-text text-secondary">
                  {dashboardData?.studentCountByMonth} Students In This Month
                </h6>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 mb-3">
          <Link to={"/teacher"} style={{ textDecoration: "none" }}>
            <div className="card h-100">
              <div className="card-body">
                <span className="d-flex align-items-center justify-content-between">
                  <p
                    className="card-title"
                    style={{ color: "#000", fontSize: "20px" }}
                  >
                    Teachers
                  </p>
                  <h5
                    style={{
                      backgroundColor: "#e0dcfe",
                      color: "#624bff",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <GiTeacher />
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>{dashboardData?.totalTeachers}</strong>
                </h2>
                <h6 className="card-text text-secondary">
                  {dashboardData?.totalStaffs} Staff
                </h6>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <span className="d-flex align-items-center justify-content-between">
                <p
                  className="card-title"
                  style={{ color: "#000", fontSize: "20px" }}
                >
                  Total Revenue
                </p>
                <h5
                  style={{
                    backgroundColor: "#e0dcfe",
                    color: "#624bff",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <TbPigMoney />
                </h5>
              </span>
              <h2 className="card-text">
                <strong>
                  <span style={{ color: "#624bff" }}>$</span>{" "}
                  {dashboardData?.totalRevenueOfMonth || 0}
                </strong>
              </h2>
              <h6 className="card-text text-secondary">
                Sales{" "}
                {dashboardData?.salesPercentage <= 0
                  ? ` Decrease ${dashboardData?.salesPercentage}`
                  : `Increase ${dashboardData?.salesPercentage}`}
                %{/* Sales {dashboardData?.salesPercentage || "0.0"} % */}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Revenue Over Time (Line Chart) */}
        <div className="col-md-7 mb-4">
          <div className="card shadow-sm p-3">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">Revenue Over Time</h5>
              <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
            </div>
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height={200}
            />
          </div>
        </div>

        {/* Product Sales Comparison (Horizontal Bar Chart) */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm p-3">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">Product Sales Comparison</h5>
              <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
            </div>
            <Chart
              options={{
                  chart: { type: "bar" },
                xaxis: {
                  categories: [
                    "Product A",
                    "Product B",
                    "Product C",
                    "Product D",
                  ],
                },
                  colors: ["#3498db", "#e74c3c", "#2ecc71"],
                  dataLabels: { enabled: true, style: { colors: ["#fff"] } },
                plotOptions: {
                  bar: {
                    horizontal: true,
                    distributed: true,
                    barHeight: "40%",
                    borderRadius:5
                  },
                },
                //   fill: { type: "solid" },
              }}
              series={[{ name: "Sales Q1", data: [1200, 1400, 1800, 2200] }]}
              type="bar"
              height={200}
            />
          </div>
        </div>

        {/* Sales by Region (Radar Chart) */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-1">
            <div className="d-flex justify-content-between px-2">
              <h5 className="card-title">Sales by Region</h5>
              <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
            </div>
            <Chart
              options={radarChartOptions}
              series={radarChartSeries}
              type="radar"
              height={280}
            />
          </div>
        </div>

        {/* Sales by E-commerce Platform (Donut Chart) */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-3">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">Sales by E-commerce Platform</h5>
              <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
            </div>
            <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              height={300}
              className="py-5"
            />
          </div>
        </div>

        {/* Registered Users (Gauge Chart) */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm p-3">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">Registered Users</h5>
              <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
            </div>
            <Chart
              options={gaugeChartOptions}
              series={gaugeChartSeries}
              type="radialBar"
              height={280}
              className="py-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDashboard;
