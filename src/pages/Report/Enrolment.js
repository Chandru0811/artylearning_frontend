import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

function Datatable2() {
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
  const [selectedCenterId, setSelectedCenterId] = useState("1");
  const [selectedDay, setSelectedDay] = useState("ALL");
  const [chartData, setChartData] = useState({
    dayData: [],
    labels: [],
  });

  const hardcodedCenters = [
    { id: "1", centerNames: "Arty Learning @ AMK" },
    { id: "2", centerNames: "Arty Learning @ HG" },
    { id: "3", centerNames: "Arty Learning @ BB" },
  ];

  const calculateVariance = (booked, available) => 
    booked.map((b, i) => available[i] - b);
  
  const hardcodedData = {
    "ALL": {
      labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Total", "Target"],
      bookedSlots: [30, 20, 15, 30, 25, 18, 30],
      availableSlots: [20, 10, 20, 10, 15, 22, 60],
      variance: calculateVariance(
        [30, 20, 15, 30, 25, 18, 30],
        [20, 10, 20, 10, 15, 22, 60]
      ),
      total: [30, 20, 15, 30, 25, 18, 30].reduce((acc, value) => acc + value, 0),
      target: 500,
    },
    "FRIDAY": {
      labels: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"],
      bookedSlots: [5, 3, 7, 10, 20],
      availableSlots: [5, 7, 3, 0, 15],
      variance: calculateVariance([5, 3, 7, 10, 20], [5, 7, 3, 0, 15]),
    },
  };
  

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleCenterChange = (e) => {
    setSelectedCenterId(e.target.value);
  };

  useEffect(() => {
    const data = hardcodedData[selectedDay] || hardcodedData["ALL"];
    const totalBooked = data.total || data.bookedSlots.reduce((acc, value) => acc + value, 0);
    const remainingSlots = Math.max(0, data.target - totalBooked);
  
    setChartData({
      dayData: [
        { name: "Booked Slots", data: [...data.bookedSlots, totalBooked, 0] }, // Add booked slots, total, and 0 for target
        { name: "Available Slots", data: [...data.availableSlots, 0, remainingSlots] }, // Add available slots, 0 for total, and remaining slots
        { name: "Variance", data: [...Array(data.bookedSlots.length).fill(0), 0, remainingSlots] }, // Variance only for the target
      ],
      labels: data.labels,
    });
  }, [selectedDay, selectedType, selectedCenterId]);
  
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
    colors: ["#4286F5", "#EC5040", "#94c37d"], // Solid blue, red, and green colors
    fill: {
      type: "solid", // Change to solid fill
      opacity: 1.0, // Set opacity (values from 0.1 to 1.0)
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"], // Change text color to white
      },
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
      labels: {
        colors: "#000", // Keep legend text black
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
  };
  
  const series = chartData?.dayData.map((data, index) => {
    if (data.name === "Target") {
      const targetData = data.data[data.data.length - 1]; // Assuming the target is always the last data point
      const totalBooked = chartData?.dayData[0]?.data.reduce((acc, val, idx) => {
        if (chartData?.labels[idx] === "Total") return acc + val;
        return acc;
      }, 0);
      
      // Change target color based on comparison
      const color = totalBooked >= targetData ? "red" : "balck";
      
      return {
        name: data.name,
        data: data.data,
        color: color, // Dynamically set color for Target bar
      };
    }
    
    return data;
  });

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
              <div className="col-md-4 col-12">
                <label className="form-label">Centre</label>
                <select
                  className="form-select"
                  value={selectedCenterId}
                  onChange={handleCenterChange}
                  aria-label="Default select example"
                >
                  {hardcodedCenters.map((center) => (
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
                  {chartData.labels.length > 0 ? (
                    <ReactApexChart
                      options={options}
                      // series={chartData?.dayData}
                      series={series}
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



