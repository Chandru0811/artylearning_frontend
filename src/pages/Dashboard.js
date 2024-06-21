import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

function Dashboard() {
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const lineChartData = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Leads",
          data: [12, 19, 3, 5, 2],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Deals",
          data: [8, 12, 6, 9, 4],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Products",
          data: [5, 10, 15, 8, 3],
          borderColor: "rgba(255, 205, 86, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    // Sample data for pie chart
    const pieChartData = {
      labels: ["Leads", "Deals", "Products"],
      datasets: [
        {
          data: [30, 35, 60],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 205, 86, 0.6)",
          ],
        },
      ],
    };

    const lineChartCtx = document.getElementById("lineChart").getContext("2d");
    lineChartRef.current = new Chart(lineChartCtx, {
      type: "line",
      data: lineChartData,
    });

    const pieChartCtx = document.getElementById("pieChart").getContext("2d");
    pieChartRef.current = new Chart(pieChartCtx, {
      type: "pie", // Change the type to 'pie'
      data: pieChartData,
    });

    return () => {
      if (lineChartRef.current) lineChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
    };
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center Hero">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <span className="d-flex align-items-center justify-content-between">
                  <p
                    className="card-title"
                    style={{ color: "#000", fontSize: "20px" }}
                  >
                    Lead Count
                  </p>
                  <h5
                    style={{
                      backgroundColor: "#e0dcfe",
                      color: "#624bff",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                  <Link to={`/lead/lead`}>
                    <FaUsers />
                    </Link>
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>100</strong>
                </h2>
                <h6 className="card-text text-secondary">50 converted</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <span className="d-flex align-items-center justify-content-between">
                  <p
                    className="card-title"
                    style={{ color: "#000", fontSize: "20px" }}
                  >
                    Student
                  </p>
                  <h5
                    style={{
                      backgroundColor: "#e0dcfe",
                      color: "#624bff",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                   <Link to={`/student`}> <PiStudentFill /> </Link>
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>50</strong>
                </h2>
                <h6 className="card-text text-secondary">Revenue Generated</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <span className="d-flex align-items-center justify-content-between">
                  <p
                    className="card-title"
                    style={{ color: "#000", fontSize: "20px" }}
                  >
                    Teachers
                  </p>
                  <h5
                    style={{
                      backgroundColor: "#e0dcfe",
                      color: "#624bff",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <Link to={`/teacher`}>
                    <GiTeacher /></Link>
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>75</strong>
                </h2>
                <h6 className="card-text text-secondary">25 Newly Added</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <span className="d-flex align-items-center justify-content-between">
                  <p
                    className="card-title"
                    style={{ color: "#000", fontSize: "20px" }}
                  >
                    Total Revenue
                  </p>
                  <h5
                    style={{
                      backgroundColor: "#e0dcfe",
                      color: "#624bff",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <TbPigMoney />
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>
                    <span style={{ color: "#624bff" }}>$</span> 25,300
                  </strong>
                </h2>
                <h6 className="card-text text-secondary">Sales Increse 6%</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="card p-4 mb-5">
          <div className="row  mt-5">
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
              <canvas id="pieChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
