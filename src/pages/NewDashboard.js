import React from "react";
import ApexCharts from "react-apexcharts";

function NewDashboard() {
  const progressValue1 = 25;
  const progressValue2 = 50;
  const progressValue3 = 70;
  const fontFamily = "'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

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
      labels: {
        useSeriesColors: false,
        fontSize: "14px",
        fontFamily: fontFamily,
      },
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
      labels: {
        style: {
          fontFamily: fontFamily,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: fontFamily,
        },
      },
    },
    tooltip: {
      style: {
        fontFamily: fontFamily,
      },
      y: [
        {
          title: {
            formatter: (val) => `${val}`,
          },
        },
        {
          title: {
            formatter: (val) => `${val}`,
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
      name: "Total Enrolment",
      data: [45, 52, 38, 24, 33, 26, 21],
    },
    {
      name: "Total Package",
      data: [35, 41, 62, 42, 13, 18, 29],
    },
    {
      name: "Total Revenue",
      data: [87, 57, 74, 99, 75, 38, 62],
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
            fontFamily: fontFamily,
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
  

  const lineChartOptions1 = {
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
      categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], // Days of the week
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: (val) => `${val}`,
          },
        },
        {
          title: {
            formatter: (val) => `${val}`,
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
  
  const lineChartSeries1 = [
    {
      name: "Total Enrolment",
      data: [45, 52, 38, 24, 33, 26, 21], // Data for Monday to Sunday
    },
    {
      name: "Total Package",
      data: [35, 41, 62, 42, 13, 18, 29], // Data for Monday to Sunday
    },
    {
      name: "Total Revenue",
      data: [87, 57, 74, 99, 75, 38, 62], // Data for Monday to Sunday
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
              <h5 className="card-text fw-bold text-dark">132</h5>
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
              <h5 className="card-text fw-bold text-dark">103</h5>
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
              <h5 className="card-text fw-bold text-dark">54</h5>
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
              <p className="text-secondary m-1" style={{ fontSize: "14px" }}>
                Arty Learning @ HG
              </p>
              <span style={{ fontSize: "13px" }} className="fw-bold">
              {progressValue1}%
              </span>
            </div>
            <div className="progress mb-3" style={{ height: "7px" }}>
              {" "}
              {/* Adjust height */}
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressValue1}%`, backgroundColor: "#287F71" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary m-1" style={{ fontSize: "14px" }}>
                Arty Learning @ AMK
              </p>
              <span style={{ fontSize: "13px" }} className="fw-bold">
              {progressValue2}%
              </span>
            </div>
            <div className="progress mb-3" style={{ height: "7px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressValue2}%`, backgroundColor: "#287F71" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary m-1" style={{ fontSize: "14px" }}>
                Arty Learning @ BB
              </p>
              <span style={{ fontSize: "13px" }} className="fw-bold">
              {progressValue3}%
              </span>
            </div>
            <div className="progress mb-3" style={{ height: "7px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressValue3}%`, backgroundColor: "#287F71" }}
                aria-valuenow="70"
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
              options={lineChartOptions1}
              series={lineChartSeries1}
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
