import React, { useState, useEffect } from "react";
import axios from "axios";
import DayTableAdd from "./ScheduleTeacher/DayTableAdd";

function BatchTable() {
  const [teacherSchedules, setTeacherSchedules] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.213.208.92:7080/ecssms/api/getTeacherSchedulesByTeacherId/3")
      .then((response) => {
        setTeacherSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teacher schedules:", error);
      });
  }, []);

  const batchTimes = ["4:30 pm", "3:30 pm", "5:30 pm", "10:30 pm"];

  return (
    <div className="container">
      <div className="row my-3">
        <div className="offset-md-2 col-md-8 col-12">
          {/* Your select options for Days and Class here */}
        </div>
      </div>
      <div className="row">
        <div className="offset-md-2 col-md-8 col-12">
          {teacherSchedules.map((data, index) => {
            // Default to showing four batch columns and four student columns
            const maxStudents = 4;

            return (
              <div key={index} className="text-center">
                <p className="fw-bold fs-5">{data.className}</p>
                <div className="table-responsive">
                  <caption className="d-flex justify-content-center p-3 bg-danger text-white">
                    {data.day}-{data.teacher}
                  </caption>
                  <table className="table bg-light caption-top table-bordered">
                    <thead className="bg-light">
                      <tr className="table-warning">
                        {batchTimes.map((time, timeIndex) => (
                          <th key={timeIndex} className="p-4">
                            {time}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(maxStudents)].map((_, rowIndex) => (
                        <tr key={rowIndex}>
                          {batchTimes.map((time, timeIndex) => {
                            const matchingBatch = data.timetable.find(
                              (batch) => batch.time === time
                            );
                            const student =
                              matchingBatch?.students.length > rowIndex
                                ? matchingBatch.students[rowIndex]
                                : null;
                            let backgroundColor = "transparent";
                            let content = null;

                            if (student && student.name) {
                              content = student.name;
                              if (student.blocked) {
                                backgroundColor = "lightgrey";
                                content = null; // Clear the content if blocked
                              } else if (student.status === "pending") {
                                backgroundColor = "#FAC898";
                              }
                            } else if (student && student.blocked) {
                              backgroundColor = "lightgrey";
                            } else {
                              content = <DayTableAdd />;
                            }

                            return (
                              <td
                                key={timeIndex}
                                style={{
                                  backgroundColor,
                                  verticalAlign: "middle",
                                }}
                                className="p-2"
                              >
                                {content}
                                <br />
                                {/* <button className="btn btn-info">Status</button> */}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BatchTable;
