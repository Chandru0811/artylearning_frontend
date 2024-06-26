import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import api from "../config/URL";
import { toast } from "react-toastify";

function Dashboard() {
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/smsDashBoardOverview");
        setDashboardData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();
  }, []);

  console.log("data",dashboardData)

  const filteredChartData = dashboardData?.Data?.filter(
    (item) => item
  );
  console.log("data1",filteredChartData)
  useEffect(() => {
 if(dashboardData){

    const lineChartColors = [
      "rgba(75, 192, 192, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(255, 205, 86, 1)",
    ];

    const barChartColors = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(255, 205, 86, 0.6)",
    ];

    const lineChartData = {
      labels: dashboardData.month,
      datasets: filteredChartData.map((data,index) => ({
        label: data.label,
        data: data.data,
        borderColor: lineChartColors[index % lineChartColors.length],
        borderWidth: 2,
        fill: false,
      })),

      // [
      //   {
      //     label: "Leads",
      //     data: [12, 19, 3, 5, 2],
      //     borderColor: "rgba(75, 192, 192, 1)",
      //     borderWidth: 2,
      //     fill: false,
      //   },
      //   {
      //     label: "Students",
      //     data: [8, 12, 6, 9, 4],
      //     borderColor: "rgba(255, 99, 132, 1)",
      //     borderWidth: 2,
      //     fill: false,
      //   },
      //   {
      //     label: "Teacher",
      //     data: [5, 10, 15, 8, 3],
      //     borderColor: "rgba(255, 205, 86, 1)",
      //     borderWidth: 2,
      //     fill: false,
      //   },
      // ],
    };

    const pieChartData = {
      labels: ["Leads", "Students", "Teacher"],
      datasets: [
        {
          data: [dashboardData.totalLead
            ,dashboardData.totalStudent, dashboardData.totalTeachers
          ],
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
      type: "pie", 
      data: pieChartData,
    });
  
  }
    return () => {
      if (lineChartRef.current) lineChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
    };
  }, [dashboardData]);

  const previousMonthRevenue = dashboardData?.totalRevenueOfPreviousMonth;
  const currentMonthRevenue = dashboardData?.totalRevenueOfMonth;
 
  let salesIncreasePercentage;
  if (previousMonthRevenue === 0) {
    // Handle division by zero case
    salesIncreasePercentage = 100;
  } else {
    salesIncreasePercentage =
      ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) *
      100;
  }
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
                    <FaUsers />
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>{dashboardData?.totalLead}</strong>
                </h2>
                <h6 className="card-text text-secondary">{dashboardData?.leadCountByMonth} Lead In This Month</h6>
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
                    <PiStudentFill />
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>{dashboardData?.totalStudent}</strong>
                </h2>
                <h6 className="card-text text-secondary">{dashboardData?.studentCountByMonth} Students In This Month</h6>
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
                    <GiTeacher />
                  </h5>
                </span>
                <h2 className="card-text">
                  <strong>{dashboardData?.totalTeachers}</strong>
                </h2>
                <h6 className="card-text text-secondary">{dashboardData?.totalStaffs} Staff</h6>
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
                    <span style={{ color: "#624bff" }}>$</span> {dashboardData?.totalRevenueOfMonth}
                  </strong>
                </h2>
                <h6 className="card-text text-secondary">Sales {salesIncreasePercentage <= 0 ? "Decrease" : "Increase"} {salesIncreasePercentage?.toString().split(".")[0]}%</h6>
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
