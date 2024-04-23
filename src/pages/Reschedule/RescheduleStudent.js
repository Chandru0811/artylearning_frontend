import React, { useState } from "react";
import AssignMakeUpClass from "./AssignMakeUpClass";
import DontMakeUpClass from "./DontMakeUpClass";
import { Link } from "react-router-dom";

function RescheduleStudent() {
  const [selectedId, setSelectedId] = useState(null);
  const datas = [
    {
      id: 1,
      studentId: "ARTY_03",
      studentName: "Hazel Tiang Ya Wen",
      course: "Arty Belivers",
      class: "English",
      timeSlot: "03:30 PM to 04:30 PM",
      action: "Make Up Class",
    },

    {
      id: 2,
      studentId: "ARTY_24",
      studentName: "Astraea Chua",
      course: "Arty Learning",
      class: "Chinesh",
      timeSlot: "07:30 PM to 08:30 PM",
      action: "Don't Make Up Class",
    },
    {
      id: 3,
      studentId: "ARTY_11",
      studentName: "Janyuh",
      course: "Arty Learning",
      class: "Chinesh",
      timeSlot: "03:30 PM to 04:30 PM",
      action: "Make Up Class",
    },
    {
      id: 4,
      studentId: "ARTY_24",
      studentName: "Elizabeth",
      course: "Arty Learning",
      class: "Chinesh",
      timeSlot: "04:00 PM to 05:00 PM",
      action: "Don't Make Up Class",
    },
    {
      id: 5,
      studentId: "ARTY_90",
      studentName: "Evelyn Chai Si Ting",
      course: "Arty Belivers",
      class: "Chinesh",
      timeSlot: "07:30 PM to 08:30 PM",
      action: "Don't Make Up Class",
    },
    {
      id: 6,
      studentId: "ARTY_31",
      studentName: "Natalie",
      course: "Arty Learning",
      class: "English",
      timeSlot: "07:30 PM to 08:30 PM",
      action: "Make Up Class",
    },
  ];

  const handleBadgeClick = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="container ">
      <div className="d-flex justify-content-end my-4">
        <Link to="/reschedule">
          <button className="btn btn-border">Back</button>
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-light table-striped">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Student ID</th>
              <th scope="col">Student Name</th>
              <th scope="col">Course</th>
              <th scope="col">Class</th>
              <th scope="col">Time Slot</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map(
              (
                {
                  id,
                  studentId,
                  studentName,
                  course,
                  class: className,
                  timeSlot,
                  action,
                },
                index
              ) => (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{studentId}</td>
                  <td>{studentName}</td>
                  <td>{course}</td>
                  <td>{className}</td>
                  <td>{timeSlot}</td>
                  <td>
                    {selectedId === id ? (
                      <div class="dropdown">
                        <button
                          class="btn btn-border dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {action}
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <AssignMakeUpClass />
                          </li>
                          <li style={{ width: "100%" }}>
                            <DontMakeUpClass />
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <span
                        className={`badge badges-${
                          action === "Make Up Class" ? "Green" : "Red"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleBadgeClick(id)}
                      >
                        {action}
                      </span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RescheduleStudent;
