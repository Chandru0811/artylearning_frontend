import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";

const Package = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      centerName: "Arty Learning @AMK",
      studentName: "Tan MingKhai",
      courseName: "Arty Belivers 1",
      packageName: "AD 13",
      packageStartDate: "2024-02-18",
      packageEndDate: "2024-03-20",
      remainingLesson: "14",
    },
    {
      id: 2,
      centerName: "Arty Learning @AMK",
      studentName: "Dean Tan",
      courseName: "Arty Pursuers",
      packageName: "AB 13",
      packageStartDate: "2024-02-27",
      packageEndDate: "2024-04-20",
      remainingLesson: "5",
    },
    {
      id: 3,
      centerName: "Arty Learning @ HG",
      studentName: "Alicia Ong",
      courseName: "Arty Belivers 1",
      packageName: "AP 13",
      packageStartDate: "2024-01-10",
      packageEndDate: "2024-04-20",
      remainingLesson: "10",
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
          Package Balance Report
        </li>
      </ol>
      <div className="row my-5">
        <div className="col-md-4 col-12">
          <select className="form-select " aria-label="Default select example">
            <option selected>Arty Learning @ HG</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-md-4 col-12">
          <select className="form-select " aria-label="Default select example">
            <option selected>Select a student</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-md-4 col-12">
          <select className="form-select " aria-label="Default select example">
            <option selected>Select a course</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Center Name</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course Name</th>
            <th scope="col">Package Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Remaining Lesson</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.centerName}</td>
              <td>{data.studentName}</td>
              <td>{data.courseName}</td>
              <td>{data.packageName}</td>
              <td>{data.packageStartDate}</td>
              <td>{data.packageEndDate}</td>
              <td>{data.remainingLesson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Package;
