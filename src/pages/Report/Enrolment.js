import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

function Datatable2() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedType, setSelectedType] = useState("WEEK");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    // Simulating an API fetch with sample data
    const sampleDashboardData = {
      Data: [
        { label: "Dataset 1", data: [70, 30, 40, 80, 60, 10, 20, 90] },
        { label: "Dataset 2", data: [15, 45, 35, 25, 55, 65, 95, 75] },
      ],
      totalLead: 100,
      totalStudent: 80,
      totalTeachers: 50,
    };
    setDashboardData(sampleDashboardData);
  }, []);

  const filteredChartData = dashboardData?.Data || [];

  useEffect(() => {
    if (dashboardData) {
      const lineChartColors = [
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 205, 86, 1)",
      ];

      const barChartColors = [
        "rgba(54, 162, 235, 0.6)", // Color for Current Total
        "rgba(255, 159, 64, 0.6)", // Color for Variance
      ];

      const lineChartData = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Total"],
        datasets: filteredChartData.map((data, index) => ({
          label: data.label,
          data: data.data,
          borderColor: lineChartColors[index % lineChartColors.length],
          borderWidth: 2,
          fill: false,
        })),
      };

      const barChartData = {
        labels: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Total",],
        datasets: [
          {
            label: "Dataset 1",
            data: [21, 35, 41, 28, 67, 56, 48, 44.4],
            backgroundColor: barChartColors[0],
            datalabels: {
              color: "rgba(54, 162, 235, 1)",
            },
          },
          {
            label: "Dataset 2",
            data: [31, 17, 11, 24, 13, 24, 20, 46],
            backgroundColor: barChartColors[1],
            datalabels: {
              color: "rgba(255, 159, 64, 1)",
            },
          },
        ],
      };

      // Destroy previous charts if they exist
      if (lineChartRef.current) lineChartRef.current.destroy();
      if (barChartRef.current) barChartRef.current.destroy();

      // Create Line Chart
      const lineChartCtx = document.getElementById("lineChart").getContext("2d");
      lineChartRef.current = new Chart(lineChartCtx, {
        type: "line",
        data: lineChartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => `${value}`,
              },
            },
          },
        },
      });

      // Create Bar Chart
      const barChartCtx = document.getElementById("barChart").getContext("2d");
      barChartRef.current = new Chart(barChartCtx, {
        type: "bar",
        data: barChartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            datalabels: {
              anchor: "end",
              align: "end",
              formatter: (value) => value.toString(),
              font: {
                weight: "bold",
              },
            },
          },
          scales: {
            x: {
              stacked: true, // Keep bars stacked
            },
            y: {
              beginAtZero: true,
              stacked: true,
              max: 100,
              ticks: {
                stepSize: 20,
                callback: (value) => `${value}%`,
              },
            },
          },
        },
        plugins: [ChartDataLabels], // Use the plugin here
      });
    }

    return () => {
      if (lineChartRef.current) lineChartRef.current.destroy();
      if (barChartRef.current) barChartRef.current.destroy();
    };
  }, [dashboardData]);


  return (
    <div className="d-flex flex-column align-items-center justify-content-center Hero">
      <div className="container">
        <div className="row my-5">
          <div className="col-md-4 col-12">
            <label className="form-label">Centre</label>
            <select className="form-select" aria-label="Default select example">
              <option value="1">One</option>
              <option value="2">Two</option>
            </select>
          </div>
          <div className="col-md-4 col-12">
            <label className="form-label">Select Type</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleTypeChange}
              value={selectedType}
            >
              <option value="WEEK">Week</option>
              <option value="DAY">Day</option>
            </select>
          </div>
          {selectedType === "WEEK" && (
            <div className="col-md-4 col-12">
              <label className="form-label">Week</label>
              <input type="week" className="form-control" />
            </div>
          )}
          {selectedType === "DAY" && (
            <div className="col-md-4 col-12">
              <label className="form-label">Day</label>
              <select className="form-select" aria-label="Default select example">
                <option value="SUNDAY">SUNDAY</option>
                <option value="MONDAY">MONDAY</option>
                <option value="TUESDAY">TUESDAY</option>
                <option value="WEDNESDAY">WEDNESDAY</option>
                <option value="THURSDAY">THURSDAY</option>
                <option value="FRIDAY">FRIDAY</option>
                <option value="SATURDAY">SATURDAY</option>
              </select>
            </div>
          )}
        </div>
        <div className="card p-4 mb-5">
          <div className="row mt-5">
            <div
              className="col-md-6 d-flex align-items-center justify-content-center"
              style={{ height: "350px" }}
            >
              <canvas id="lineChart"></canvas>
            </div>
            <div
              className="col-md-6 d-flex align-items-center justify-content-center"
              style={{ height: "350px" }}
            >
              <canvas id="barChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datatable2;
