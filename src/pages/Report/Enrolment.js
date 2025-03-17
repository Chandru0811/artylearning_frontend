import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import api from "../../config/URL";
import { Link } from "react-router-dom";

function Datatable2({ selectedCenter }) {
  const getCurrentWeek = () => {
    const date = new Date();
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((date - yearStart) / 86400000 + yearStart.getDay() + 1) / 7
    );
    const isoYear = date.getFullYear();
    return `${isoYear}-W${String(weekNumber).padStart(2, "0")}`;
  };
  const [selectedType, setSelectedType] = useState(getCurrentWeek());
  const [centerData, setCenterData] = useState(null);
  const [selectedCenterId, setSelectedCenterId] = useState(selectedCenter);
  const [selectedDay, setSelectedDay] = useState("ALL");
  const centerLocalId = localStorage.getItem("selectedCenterId");
  const [chartData, setChartData] = useState({
    dayData: [],
    labels: [],
  });

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
      // if (centerData && centerData.length > 0 && !selectedCenterId) {
      //   if (centerLocalId !== null && centerLocalId !== "undefined") {
      //     setSelectedCenterId(centerLocalId);
      //   } else if (centerData !== null && centerData.length > 0) {
      //     setSelectedCenterId(centerData[0].id);
      //   }
      // }
      setSelectedCenterId(selectedCenter)
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCenter]);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleCenterChange = (e) => {
    setSelectedCenterId(e.target.value);
  };

  const fetchEnrollmentData = async (centerId, week, day) => {
    const queryParams = new URLSearchParams({
      center: centerId === "0" ? "" : centerId,
      week: week,
      day: day,
    });

    try {
      const response = await api.get(
        `/getEnrollmentReportData?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (day === "ALL") {
        // Map for "ALL" days structure
        const dayData = data.dayData || {};
        const labels = data.labels || [];

        const bookedSlots = labels.map(
          (label) => dayData[label]?.bookSlot || 0
        );
        const availableSlots = labels.map(
          (label) => dayData[label]?.availableSlot || 0
        );

        setChartData({
          dayData: [
            { name: "Booked Slots", data: bookedSlots },
            { name: "Available Slots", data: availableSlots },
          ],
          labels: labels,
        });
      } else {
        const timeData = data.dayData[0] || {};
        const labels = Object.keys(timeData);

        const bookedSlots = labels.map(
          (label) => timeData[label]?.bookSlot || 0
        );
        const availableSlots = labels.map(
          (label) => timeData[label]?.availableSlot || 0
        );

        setChartData({
          dayData: [
            { name: "Booked Slots", data: bookedSlots },
            { name: "Available Slots", data: availableSlots },
          ],
          labels: Object.keys(timeData).map((key) => {
            if (key.toLowerCase() === "total") return key;
            const [hours, minutes] = key.split(":").map(Number);
            const period = hours >= 12 ? "PM" : "AM";
            const formattedHours = hours % 12 || 12;
            return `${formattedHours}:${String(minutes).padStart(
              2,
              "0"
            )} ${period}`;
          }),
        });
      }
    } catch (error) {
      if (selectedCenterId === "0") {
        return <></>;
      } else {
        toast.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    if (selectedCenterId) {
      fetchEnrollmentData(selectedCenterId, selectedType, selectedDay);
    }
  }, [selectedType, selectedDay, selectedCenterId]);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%",
    },
    xaxis: {
      categories: chartData?.labels,
    },
    fill: {
      type: "gradient", // Set the fill type to gradient
      gradient: {
        type: "vertical",
        gradientToColors: ["#4286F5", "#EC5040"], // Two colors
        stops: [50, 50],
      },
    },
    colors: ["#4286F5", "#EC5040"], // Two colors for series
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
    },
    annotations: {
      yaxis: [],
    },
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center Hero">
      <div className="container">
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
            Enrollment Report
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
              <span className="me-2 text-muted">Enrollment Report</span>
            </div>
          </div>
          <div className="container">
            <div className="row my-5">
              <div className="col-md-4 col-12 d-none">
                <label className="form-label">Centre</label>
                <select
                  className="form-select"
                  value={selectedCenterId}
                  onChange={handleCenterChange}
                >
                  <option value="0">Selected Centre</option>
                  {centerData &&
                    centerData.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.centerNames}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-4 col-12">
                <label className="form-label">Week</label>
                <input
                  type="week"
                  className="form-control"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                />
              </div>
              <div className="col-md-4 col-12">
                <label className="form-label">Day</label>
                <select
                  className="form-select"
                  onChange={handleDayChange}
                  value={selectedDay}
                  aria-label="Default select example"
                >
                  <option value="ALL">ALL</option>
                  <option value="SUNDAY">SUNDAY</option>
                  <option value="MONDAY">MONDAY</option>
                  <option value="TUESDAY">TUESDAY</option>
                  <option value="WEDNESDAY">WEDNESDAY</option>
                  <option value="THURSDAY">THURSDAY</option>
                  <option value="FRIDAY">FRIDAY</option>
                  <option value="SATURDAY">SATURDAY</option>
                </select>
              </div>
            </div>
            <div className="card p-4 mb-4">
              <div className="row">
                <div className="col-12">
                  {/* Render chart only if labels have loaded */}
                  {chartData.labels.length > 0 ? (
                    <ReactApexChart
                      options={options}
                      series={chartData?.dayData}
                      type="bar"
                      height={350}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datatable2;
