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
    chart: {
      id: "revenue-over-time",
      height: 350,
      type: "line", // You can still use 'line' to keep the chart structure
      zoom: {
        enabled: false,
      },
    },
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
    colors: ["transparent", "transparent", "transparent"], // Make the lines invisible
    stroke: {
      width: [0, 0, 0], // Hide the lines by setting the stroke width to 0
      curve: "smooth", // Optional
      dashArray: [0, 0, 0], // No dashes to maintain a clean look
    },
    title: {
      text: "Revenue Statistics",
      align: "left",
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      },
    },
    markers: {
      size: 0, // Hide the markers
    },
    tooltip: {
      enabled: false, // Disable tooltips if you don't want them
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };
  
  const lineChartSeries = [
    { name: "Revenue", data: [12000, 15000, 10000, 20000, 25000, 30000] },
    { name: "Target", data: [10000, 14000, 11000, 18000, 23000, 25000] },
    { name: "Additional Revenue", data: [1000, 16000, 12000, 15000, 19300, 25000] },
  ];

  

  // Radar Chart (Sales by Region)
  const radarChartOptions = {
    chart: { id: "sales-by-region", type: "radar" },
    labels: ["Asia", "Africa", "Europe", "Americas", "Pacific", "Middle East"],
    colors: ["#287F71"],
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
    colors: ["#287F71"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: "#ABBDD3",
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
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     // shade: "dark",
    //     type: "horizontal",
    //     gradientToColors: ["#ABBDD3"],
    //     stops: [0, 100],
    //   },
    // },
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
          <div
            className="card shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="card-body">
              <h6 className="card-title text-secondary">Lead Count</h6>
              <h5 className="card-text fw-bold text-dark">$32,499.93</h5>
              <span className="d-flex align-items-center justify-content-between">
                <span
                  className="text-success fw-bold me-2"
                  style={{
                    backgroundColor: "#e6f8eb",
                    padding: "2px 5px",
                    borderRadius: "5px",
                    fontSize: "13px",
                  }}
                >
                  ↑ 12.95%
                </span>
                <small className="text-secondary" style={{ fontSize: "10px" }}>
                  Compared to last month
                </small>
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div
            className="card shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="card-body">
              <h6 className="card-title text-secondary">Student</h6>
              <h5 className="card-text fw-bold text-dark">$10,499.93</h5>
              <span className="d-flex align-items-center">
                <span
                  className="text-danger fw-bold me-2"
                  style={{
                    backgroundColor: "#fdeaea",
                    padding: "2px 5px",
                    borderRadius: "5px",
                    fontSize: "13px",
                  }}
                >
                  ↓ 0.33%
                </span>
                <small className="text-secondary" style={{ fontSize: "10px" }}>
                  Compared to last month
                </small>
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div
            className="card shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="card-body">
              <h6 className="card-title text-secondary">Teacher</h6>
              <h5 className="card-text fw-bold text-dark">$32,499.93</h5>
              <span className="d-flex align-items-center">
                <span
                  className="text-success fw-bold me-2"
                  style={{
                    backgroundColor: "#e6f8eb",
                    padding: "2px 5px",
                    borderRadius: "5px",
                    fontSize: "13px",
                  }}
                >
                  ↑ 12.95%
                </span>
                <small className="text-secondary" style={{ fontSize: "10px" }}>
                  Compared to last month
                </small>
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div
            className="card shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="card-body">
              <h6 className="card-title text-secondary">Total Revenue</h6>
              <h5 className="card-text fw-bold text-dark">$10,499.93</h5>
              <span className="d-flex align-items-center">
                <span
                  className="text-danger fw-bold me-2"
                  style={{
                    backgroundColor: "#fdeaea",
                    padding: "2px 5px",
                    borderRadius: "5px",
                    fontSize: "13px",
                  }}
                >
                  ↓ 0.33%
                </span>
                <small className="text-secondary" style={{ fontSize: "10px" }}>
                  Compared to last month
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 mb-4">
          <div
            className="card shadow-sm p-3 h-100 shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between">
              <h6 className="card-title">Revenue Over Time</h6>
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

        <div className="col-md-4 mb-4">
          <div
            className="card shadow-sm p-3 h-100 shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between">
              <h6 className="card-title">Product Sales Comparison</h6>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary m-1">Australia</p>
              <span style={{fontSize:"13px"}} className="fw-bold">634.8%</span>
            </div>
            <div className="progress mb-3" style={{ height: "10px" }}>
              {" "}
              {/* Adjust height */}
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "25%", backgroundColor: "#287F71" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary m-1">Indonesia</p>
              <span style={{fontSize:"13px"}} className="fw-bold">589.8%</span>
            </div>
            <div className="progress mb-3" style={{ height: "10px" }}>
              {" "}
              {/* Adjust height */}
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "50%", backgroundColor: "#287F71" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary m-1">Germany</p>
              <span style={{fontSize:"13px"}} className="fw-bold">453.8%</span>
            </div>
            <div className="progress mb-3" style={{ height: "10px" }}>
              {" "}
              {/* Adjust height */}
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "75%", backgroundColor: "#287F71" }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary m-1">Thailand</p>
              <span style={{fontSize:"13px"}} className="fw-bold">634.8%</span>
            </div>
            <div className="progress mb-3" style={{ height: "10px" }}>
              {" "}
              {/* Adjust height */}
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "90%", backgroundColor: "#287F71" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        {/* Sales by Region (Radar Chart) */}
        <div className="col-md-4 mb-4">
          <div
            className="card shadow-sm p-1 shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between px-2">
              <h6 className="card-title">Sales by Region</h6>
              <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
            </div>
            <Chart
              options={radarChartOptions}
              series={radarChartSeries}
              type="radar"
              height={300}
            />
          </div>
        </div>

        {/* Sales by E-commerce Platform (Donut Chart) */}
        <div className="col-md-4 mb-4">
          <div
            className="card shadow-sm p-3 h-100 shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between">
              <h6 className="card-title">Sales by E-commerce Platform</h6>
              <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
            </div>
            <Chart
              options={{
                chart: {
                  type: "donut",
                },
                labels: ["Amazon", "Alibaba", "Tokopedia"],
                legend: {
                  position: "bottom", // Moves the legend below the chart
                  horizontalAlign: "center", // Centers the legend horizontally
                },
                dataLabels: {
                  enabled: true,
                },
                colors: ["#ABBDD3", "#287F71", "#EB862A"], // Custom colors for slices
              }}
              series={[45, 35, 25]} // Data for chart
              type="donut"
              height={220}
              className="mt-4"
            />
          </div>
        </div>

        {/* Registered Users (Gauge Chart) */}
        <div className="col-md-4 mb-4">
          <div
            className="card shadow-sm p-3 h-100 shadow-sm border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between">
              <h6 className="card-title">Registered Users</h6>
              <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
            </div>
            <Chart
              options={gaugeChartOptions}
              series={gaugeChartSeries}
              type="radialBar"
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDashboard;
