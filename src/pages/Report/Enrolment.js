import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";

function Datatable2() {
  const [selectedType, setSelectedType] = useState("WEEK");
  const [centerData, setCenterData] = useState(null);
  const [selectedDay, setSelectedDay] = useState("ALL");

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

  const dayData = {
    Mon: { taken: 250, bookSlot: 200, availableSlot: 50 },
    Tue: { taken: 25, bookSlot: 22, availableSlot: 3 },
    Wed: { taken: 25, bookSlot: 10, availableSlot: 20 },
    Thu: { taken: 25, bookSlot: 13, availableSlot: 12 },
    Fri: { taken: 25, bookSlot: 5, availableSlot: 20 },
    Sat: { taken: 35, bookSlot: 21, availableSlot: 14 },
    Sun: { taken: 35, bookSlot: 14, availableSlot: 21 },
  };

  // Calculate total slots
  const calculateTotals = () => {
    return Object.values(dayData).reduce(
      (totals, day) => {
        totals.taken += day.taken;
        totals.bookSlot += day.bookSlot;
        totals.availableSlot += day.availableSlot;
        return totals;
      },
      { taken: 0, bookSlot: 0, availableSlot: 0 }
    );
  };

  // Add total values to dayData
  const totalSlots = calculateTotals();
  dayData.Total = totalSlots;

  const dayMapping = {
    SUNDAY: "Sun",
    MONDAY: "Mon",
    TUESDAY: "Tue",
    WEDNESDAY: "Wed",
    THURSDAY: "Thu",
    FRIDAY: "Fri",
    SATURDAY: "Sat",
    ALL: "Total",
  };

  const selectedDayAbbr = selectedDay === "ALL" ? [...Object.keys(dayData)] : [dayMapping[selectedDay]];

  const series = [
    {
      name: "Booked Slots",
      data: selectedDayAbbr.map((day) => dayData[day]?.bookSlot || 0),
    },
    {
      name: "Available Slots",
      data: selectedDayAbbr.map((day) => dayData[day]?.availableSlot || 0),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories: selectedDayAbbr,
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
            <input type="week" className="form-control" />
          </div>
          <div className="col-md-4 col-12">
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
