import React from "react";
import ApexCharts from "react-apexcharts";

function NewDashboard() {
  const lineChartOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 5,
      curve: "straight",
      dashArray: [0],
    },
    legend: {
      show: true,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
        "08 Jan",
        "09 Jan",
        "10 Jan",
        "11 Jan",
        "12 Jan",
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: (val) => `${val} (mins)`,
          },
        },
        {
          title: {
            formatter: (val) => `${val} per session`,
          },
        },
        {
          title: {
            formatter: (val) => val,
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    colors: ["#ABBDD3", "#287F71", "#EB862A"],
  };

  const lineChartSeries = [
    {
      name: "Session Duration",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      name: "Page Views",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },
    {
      name: "Total Visits",
      data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
    },
  ];

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
    stroke: {
      lineCap: "butt",
    },
    labels: ["Progress"],
  };

  const gaugeChartSeries = [67];

  const chartOptions = {
    chart: {
      type: "area",
      height: 200,
      stacked: true,
      zoom: {
        enabled: false,
      },
    },
    colors: ["#ABBDD3", "#287F71", "#EB862A"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    xaxis: {
      type: "datetime",
    },
  };

  const chartSeries = [
    {
      name: "South",
      data: [
        [1676208000000, 34],
        [1676294400000, 43],
        [1676380800000, 31],
        [1676467200000, 50],
        [1676553600000, 60],
      ],
    },
    {
      name: "North",
      data: [
        [1676208000000, 20],
        [1676294400000, 15],
        [1676380800000, 25],
        [1676467200000, 18],
        [1676553600000, 30],
      ],
    },
    {
      name: "Central",
      data: [
        [1676208000000, 12],
        [1676294400000, 10],
        [1676380800000, 14],
        [1676467200000, 16],
        [1676553600000, 22],
      ],
    },
  ];

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
            <ApexCharts
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
              <p className="text-secondary m-1" style={{ fontSize: "14px" }}>Australia</p>
              <span style={{ fontSize: "13px" }} className="fw-bold">
                634.8%
              </span>
            </div>
            <div className="progress mb-3" style={{ height: "7px" }}>
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
              <p className="text-secondary m-1" style={{ fontSize: "14px" }}>Indonesia</p>
              <span style={{ fontSize: "13px" }} className="fw-bold">
                589.8%
              </span>
            </div>
            <div className="progress mb-3" style={{ height: "7px" }}>
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
              <p className="text-secondary m-1" style={{ fontSize: "14px" }}>Germany</p>
              <span style={{ fontSize: "13px" }} className="fw-bold">
                453.8%
              </span>
            </div>
            <div className="progress mb-3" style={{ height: "7px" }}>
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
              <p className="text-secondary m-1" style={{ fontSize: "14px" }}>Thailand</p>
              <span style={{ fontSize: "13px" }} className="fw-bold">
                634.8%
              </span>
            </div>
            <div className="progress mb-3" style={{ height: "7px" }}>
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
        <div className="col-md-8 col-12 mb-4">
          <div
            className="card shadow-sm p-3 h-100 border-0"
            style={{ borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between">
              <h6 className="card-title">Revenue Growth</h6>
            </div>
            <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="area"
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
              <h6 className="card-title">Registered Users</h6>
              <i className="fas fa-ellipsis-h"></i>
            </div>
            <ApexCharts
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
