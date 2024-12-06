import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";

const StudentReport = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      center_name: "Arty learning@ HG",
      student_id: "S000391",
      student_name: "Ong Yun Xin",
      lesson_date: "2023-12-13",
      course: "Arty Believers",
      class: "AB/WED_05072023_700PM/wed/2",
      start_date: "2023-12-20",
      // center_remark: "Move to AD",
    },
    {
      id: 2,
      center_name: "Arty learning@ HG",
      student_id: "S000410",
      student_name: "Benaiah Gue Jun Yang",
      lesson_date: "2023-12-13",
      course: "Arty Believers(1.5hr)",
      class: "AB/WED_05072023_700PM/wed/3",
      start_date: "2023-12-20",
      // center_remark: "change to HG same timing as bliss koh",
    },
    {
      id: 3,
      center_name: "Arty learning@ HG",
      student_id: "S000390",
      student_name: "Then Yu Hang",
      lesson_date: "2023-12-13",
      course: "Arty Believers",
      class: "AB/WED_05072023_700PM/wed/2",
      start_date: "2023-12-20",
      // center_remark: "Moved to AMK, from 4 January 2024",
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
    <div className="container my-2">
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
          Student Report
        </li>
      </ol>
      <div className="row my-5">
        <div className="col-md-4 col-12">
          <label className="form-lable">Status</label>
          <select className="form-select " aria-label="Default select example">
            <option selected>Select a Centre name</option>
            <option value="1">Class Assigned</option>
            <option value="2">Class Cancelled</option>
            <option value="3">Change Class Request</option>
            <option value="3">Withdraw Class</option>
            <option value="3">Transfer Out</option>
            <option value="3">Transfer In</option>
          </select>
        </div>
        <div className="col-md-4 col-12 d-flex align-items-end">
          <button className="btn btn-light btn-border btn-sm mt-3">
            Search
          </button>
        </div>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Centre name</th>
            <th scope="col">Student ID</th>
            <th scope="col">Student Name</th>
            <th scope="col">Last Lesson</th>
            <th scope="col">Current Course</th>
            <th scope="col">Current Class</th>
            <th scope="col">Start Date</th>
            {/* <th scope="col">Centre Remark</th> */}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.center_name}</td>
              <td>{data.student_id}</td>
              <td>{data.student_name}</td>
              <td>{data.lesson_date}</td>
              <td>{data.course}</td>
              <td>{data.class}</td>
              <td>{data.start_date}</td>
              {/* <td>{data.center_remark}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentReport;
