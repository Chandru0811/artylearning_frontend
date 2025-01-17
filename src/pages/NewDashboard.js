import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import api from "../config/URL";
import { toast } from "react-toastify";

function NewDashboard() {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get("getOverAllSmsRevenueReport");
      setData(response.data);
    } catch (e) {
      toast.error("Error Fetching Dashboard Data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const fontFamily =
    "'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

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
      categories: datas?.revenueOverTimeReport?.lineChartData?.categories,
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

  const lineChartSeries = datas?.revenueOverTimeReport?.lineChartData?.series;

  const gaugeChartOptions = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    series: [datas?.registeredUsersReport?.gaugeChartData?.value],
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

  const gaugeChartSeries = [
    datas?.registeredUsersReport?.gaugeChartData?.value,
  ];

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
      categories: datas?.revenueGrowthByDay?.categories,
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

  const lineChartSeries1 = datas?.revenueGrowthByDay?.series;

  return (
    <>
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
        <div className="container mt-4">
          <div className="row mt-3">
            {datas?.revenueGrowthByMonth &&
              datas?.revenueGrowthByMonth.map((data, index) => (
                <div className="col-md-3 mb-3">
                  <div
                    className="card shadow-sm border-0"
                    style={{ borderRadius: "10px" }}
                  >
                    <div className="card-body">
                      <h6 className="card-title text-secondary">
                        {data.title}
                      </h6>
                      <h5 className="card-text fw-bold text-dark">
                        {index === datas.revenueGrowthByMonth.length - 1
                          ? `$ ${data.current}`
                          : data.current}
                      </h5>
                      <span className="d-flex align-items-center justify-content-between">
                        {data.percentageChange >= 0 ? (
                          <span
                            className="text-success fw-bold me-2"
                            style={{
                              backgroundColor: "#e6f8eb",
                              padding: "2px 5px",
                              borderRadius: "5px",
                              fontSize: "13px",
                            }}
                          >
                            ↑ {data.percentageChange}%
                          </span>
                        ) : (
                          <span
                            className="text-danger fw-bold me-2"
                            style={{
                              backgroundColor: "#fdeaea",
                              padding: "2px 5px",
                              borderRadius: "5px",
                              fontSize: "13px",
                            }}
                          >
                            ↓ {Math.abs(data.percentageChange)}%
                          </span>
                        )}
                        <small
                          className="text-secondary"
                          style={{ fontSize: "10px" }}
                        >
                          {data.comparison}
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="row">
            <div className="col-md-8 mb-4">
              <div
                className="card shadow-sm p-3 h-100 shadow-sm border-0"
                style={{ borderRadius: "10px" }}
              >
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">Leads Trend</h6>
                  <i className="fas fa-ellipsis-h"></i> {/* Triple dot icon */}
                </div>
                {!loading && lineChartSeries && lineChartSeries.length > 0 && (
                  <ApexCharts
                    options={lineChartOptions}
                    series={lineChartSeries}
                    type="line"
                    height={200}
                  />
                )}
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div
                className="card shadow-sm p-3 h-100 shadow-sm border-0"
                style={{
                  borderRadius: "10px",
                  maxHeight: "270px",
                  overflowY: "auto",
                }}
              >
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">Capacity Status</h6>
                </div>
                {datas?.productionSalesComparisonReport?.progressValues &&
                  datas?.productionSalesComparisonReport?.progressValues.map(
                    (center, index) => (
                      <div key={index}>
                        <div className="d-flex justify-content-between">
                          <p
                            className="text-secondary m-1"
                            style={{ fontSize: "14px" }}
                          >
                            {center.centerName}
                          </p>
                          <span
                            style={{ fontSize: "13px" }}
                            className="fw-bold"
                          >
                            {center.value}%
                          </span>
                        </div>
                        <div
                          className="progress mb-3"
                          style={{ height: "7px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${center.value}%`,
                              backgroundColor:
                                center.value === 0 ? "#f8d7da" : "#287F71", // Change color for 0% values
                            }}
                            aria-valuenow={center.value}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="col-md-8 col-12 mb-4">
              <div
                className="card shadow-sm p-3 h-100 border-0"
                style={{ borderRadius: "10px" }}
              >
                <div className="d-flex justify-content-between">
                  <h6 className="card-title">Revenue Report</h6>
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
                  <h6 className="card-title">Total Capacity</h6>
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
      )}
    </>
  );
}

export default NewDashboard;
