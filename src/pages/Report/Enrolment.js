import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import api from "../../config/URL";

function Datatable2() {

  const getCurrentWeek = () => {
    const date = new Date();
    const year = date.getFullYear();
    const week = Math.ceil(((date - new Date(year, 0, 1)) / 86400000 + date.getDay() + 1) / 7);
    return `${year}-W${String(week).padStart(2, "0")}`;
  };

  const [selectedType, setSelectedType] = useState(getCurrentWeek());
  const [centerData, setCenterData] = useState(null);
  const [selectedDay, setSelectedDay] = useState("ALL");
  const [chartData, setChartData] = useState({
    dayData: [],
    labels: [],
  });

  console.log("Chart Data:",chartData);
  

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
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

  const fetchEnrollmentData = async (center, week, day) => {
    const queryParams = new URLSearchParams({
      center: 539,
      week: "2024-46",
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
      setChartData({
        dayData: response.data.dayData,
        labels: response.data.labels,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  // Trigger fetchEnrollmentData when `selectedType` or `selectedDay` changes
  useEffect(() => {
    if (centerData && centerData.length > 0) {
      fetchEnrollmentData(centerData[0].id, selectedType, selectedDay);
    }
  }, [selectedType, selectedDay, centerData]);

  const series = [
    {
      name: "Booked Slots",
      data: chartData.dayData.map((day) => day.Total.bookSlot || 0),
    },
    {
      name: "Available Slots",
      data: chartData.dayData.map((day) => day.Total.availableSlot || 0),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%",
    },
    xaxis: {
      categories: chartData.labels,
    },
    fill: {
      opacity: 1,
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
        <div className="row my-5">
          <div className="col-md-4 col-12">
            <label className="form-label">Centre</label>
            <select className="form-select" aria-label="Default select example">
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
          <div className="col-md-3 col-12">
            <label className="form-label">Day</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleDayChange}
              value={selectedDay}
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
          <div className="col-md-1 col-12">
            <button type="button" className="btn btn-border p-2 mt-4">
              Clear
            </button>
          </div>
        </div>
        <div className="card p-4 mb-4">
          <div className="row">
            <div className="col-12">
              <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datatable2;
