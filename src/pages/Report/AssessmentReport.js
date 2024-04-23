import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const AssessmentReport = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      center: "Arty Learning @HG",
      student_name: "Tan LeAnne",
      assessment: "English Assessment",
      assessment_date: "2021-11-01",
      start_time: "15:00:00",
      Duration: "",
      course_name: "Arty Believers",
      result: "TUE330PM",
      status: "enrolled",
    },
    {
      id: 2,
      center: "Arty Learning @HG",
      student_name: "Lovelie tay",
      assessment: "English Assessment",
      assessment_date: "2021-12-03",
      start_time: "00:05:30",
      Duration: "",
      course_name: "",
      result: "",
      status: "assessment_arranged",
    },
    {
      id: 3,
      center: "Arty Learning @HG",
      student_name: "Tan la",
      assessment: "English Assessment",
      assessment_date: "2021-12-15",
      start_time: "09:00:00",
      Duration: "",
      course_name: "Arty Believers",
      result: "TUE330PM",
      status: "enrolled",
    },
    {
      id: 4,
      center: "Arty Learning @HG",
      student_name: "Mehnaz",
      assessment: "English Assessment",
      assessment_date: "2021-12-30",
      start_time: "09:00:00",
      Duration: "",
      course_name: "",
      result: "",
      status: "cancelled",
    },
    {
      id: 5,
      center: "Arty Learning @HG",
      student_name: "jeneive Lin",
      assessment: "English Assessment",
      assessment_date: "2021-12-03",
      start_time: "00:00:01",
      Duration: "",
      course_name: "Arty Believers",
      result: "WED630PM",
      status: "drop",
    },
    {
      id: 6,
      center: "Arty Learning @HG",
      student_name: "Thea Chen Zhiyi",
      assessment: "English Assessment",
      assessment_date: "2022-01-22",
      start_time: "09:00:00",
      Duration: "",
      course_name: "",
      result: "",
      status: "assessment_done",
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="container my-4">
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Centre</th>
            <th scope="col">Student</th>
            <th scope="col">Assessment</th>
            <th scope="col">Date</th>
            <th scope="col">Start Time</th>
            <th scope="col">Duration</th>
            <th scope="col">Course Name</th>
            <th scope="col">Result</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.center}</td>
              <td>{data.student_name}</td>
              <td>{data.assessment}</td>
              <td>{data.assessment_date}</td>
              <td>{data.start_time}</td>
              <td>{data.Duration}</td>
              <td>{data.course_name}</td>
              <td>{data.result}</td>
              <td>
                {data.status === "enrolled" ? (
                  <span className="badge badges-Green">Enrolled</span>
                ) : data.status === "assessment_arranged" ? (
                  <span className="badge badges-Yellow">
                    Assessment Arranged
                  </span>
                ) : data.status === "cancelled" ? (
                  <span className="badge badges-Red">Cancelled</span>
                ) : data.status === "drop" ? (
                  <span className="badge badges-Brown">Drop</span>
                ) : (
                  <span className="badge badges-LightGreen">Assessment Done</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentReport;
