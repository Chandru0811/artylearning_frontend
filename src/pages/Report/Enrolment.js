import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import api from "../../config/URL";
import { Link } from "react-router-dom";

function Datatable2() {
  const getCurrentWeek = () => {
    const date = new Date();
    // Set to nearest Thursday: current date + 4 - current day number makes Thursday day number 4
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    // ISO year and week calculation
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((date - yearStart) / 86400000 + yearStart.getDay() + 1) / 7
    );
    const isoYear = date.getFullYear();
    return `${isoYear}-W${String(weekNumber).padStart(2, "0")}`;
  };
  const [selectedType, setSelectedType] = useState(getCurrentWeek());
  const [centerData, setCenterData] = useState(null);
  const [selectedCenterId, setSelectedCenterId] = useState(null);
  const [selectedDay, setSelectedDay] = useState("ALL");
  const [chartData, setChartData] = useState({
    dayData: [],
    labels: [],
  });

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
      setSelectedCenterId(centerData[0]?.id || null);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleCenterChange = (e) => {
    setSelectedCenterId(e.target.value);
  };

  // const fetchEnrollmentData = async (centerId, week, day) => {
  //   const queryParams = new URLSearchParams({
  //     center: centerId,
  //     week: week,
  //     day: day,
  //   });

  //   try {
  //     const response = await api.get(
  //       `/getEnrollmentReportData?${queryParams}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const data = response.data;
  //     if (day === "ALL") {
  //       // Map for "ALL" days structure
  //       const dayData = data.dayData || {};
  //       const labels = data.labels || [];
  //       const bookedSlots = labels.map(label => dayData[label]?.bookSlot || 0);
  //       const availableSlots = labels.map(label => dayData[label]?.availableSlot || 0);

  //       setChartData({
  //         dayData: [
  //           { name: "Booked Slots", data: bookedSlots },
  //           { name: "Available Slots", data: availableSlots }
  //         ],
  //         labels: labels
  //       });

  //     } else {
  //       // Map for specific day structure (like "FRIDAY")
  //       const timeData = data.dayData[0] || {};
  //       const labels = data.labels[0] || [];

  //       const bookedSlots = labels.map(label => timeData[label]?.bookSlot || 0);
  //       const availableSlots = labels.map(label => timeData[label]?.availableSlot || 0);

  //       setChartData({
  //         dayData: [
  //           { name: "Booked Slots", data: bookedSlots },
  //           { name: "Available Slots", data: availableSlots }
  //         ],
  //         labels: labels
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Error fetching data:", error);
  //   }
  // };

  const fetchEnrollmentData = async (centerId, week, day) => {
    const queryParams = new URLSearchParams({
      center: centerId,
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
        // Map for specific day structure (like "FRIDAY")
        const timeData = data.dayData[0] || {};
        const labels = Object.keys(timeData); // Extract time labels directly from keys

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
          labels: labels,
        });
      }
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedCenterId) {
      fetchEnrollmentData(selectedCenterId, selectedType, selectedDay);
    }
  }, [selectedType, selectedDay, selectedCenterId]);

  // const options = {
  //   chart: {
  //     type: "bar",
  //     height: 350,
  //     stacked: true,
  //     stackType: "100%",
  //   },
  //   xaxis: {
  //     categories: chartData?.labels,
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  //   legend: {
  //     position: "right",
  //     offsetX: 0,
  //     offsetY: 50,
  //   },
  // };

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
        gradientToColors: ["#4286F5", "#EC5040"],
        stops: [50, 50],
      },
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
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
            <div class="d-flex align-items-center">
              <div class="d-flex">
                <div class="dot active"></div>
              </div>
              <span class="me-2 text-muted">Enrollment Report</span>
            </div>
          </div>
          <div className="container">
            <div className="row my-5">
              <div className="col-md-4 col-12">
                <label className="form-label">Centre</label>
                <select
                  className="form-select"
                  value={selectedCenterId || ""}
                  onChange={handleCenterChange}
                  aria-label="Default select example"
                >
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
