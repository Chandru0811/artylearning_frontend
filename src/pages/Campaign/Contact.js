import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../styles/custom.css";
import { FaPlus } from "react-icons/fa6";
import Delete from "../../components/common/Delete";
import { Link } from "react-router-dom";

const Contact = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      student_id: "04",
      Student_name: "TaanLee",
      email: "TaanLee01gmail.com",
      parent_name: "Vannesa",
      phone_number: "90909090",
    },
    {
      id: 2,
      student_id: "02",
      Student_name: "Ong yun xin",
      email: "Kaushiq01@gmail.com",
      parent_name: "MichillaSng",
      phone_number: "98080978",
    },
    {
      id: 3,
      student_id: "01",
      Student_name: "Chew Lee",
      email: "Chew Lee01@gmail.com",
      parent_name: "AnadaSng",
      phone_number: "56785479",
    },
    {
      id: 4,
      student_id: "06",
      Student_name: "Taan Lee",
      email: "Taan Lee01@gmail.com",
      parent_name: "SisiLoshi",
      phone_number: "08909889",
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
    <div className="container my-4 center">
      <div className="mb-5 mt-3 d-flex justify-content-end">
        <Link to="/campaign/contact/add">
          <button
            type="button"
            className="btn btn-button "
            style={{ fontWeight: "600px !important" }}
          >
            Add <i className="bx bx-plus"></i>
          </button>
        </Link>
      </div>
      <div className="mb-5 mt-3 d-flex justify-content-end">
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <GiHamburgerMenu style={{ fontSize: "xx-large" }} />
          </button>
          <div
            className="dropdown-menu pt-0 pb-3"
            style={{ minWidth: "18rem", backgroundColor: "f5f5f5" }}
          >
            <p
              className="mb-0 text-end py-1 pe-2 "
              style={{ backgroundColor: "#fff7ea" }}
            >
              <FaPlus className="fs-4 mx-2 text-secondary" />
              <FaSearch className="fs-5 mx-2 text-secondary" />
            </p>
            <div>
              <span className="ms-3 ">
                <input
                  type="checkbox"
                  className="form-check-input rounded-circle checkbox mx-2"
                />
                parent Name
              </span>
              <br />
              <span className="ms-3 ">
                <input
                  type="checkbox"
                  className="form-check-input rounded-circle checkbox mx-2"
                />
                Student Name
              </span>
              <br />
              <span className="ms-3 ">
                <input
                  type="checkbox"
                  className="form-check-input rounded-circle checkbox mx-2"
                />
                Email ID
              </span>
              <br />
              <span className="ms-3 ">
                <input
                  type="checkbox"
                  className="form-check-input rounded-circle checkbox mx-2"
                />
                Parent Name
              </span>
              <br />
              <span className="ms-3 ">
                <input
                  type="checkbox"
                  className="form-check-input rounded-circle checkbox mx-2"
                />
                Class
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" d-flex gap-2 align-items-center w-25 my-5 ms-3">
        <label>Title</label>
        <input type="text " className="form-control" />
      </div>
      <table ref={tableRef} className="display mt-5">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              S No
            </th>
            <th scope="col">student ID</th>
            <th scope="col">Student Name</th>
            <th scope="col">Email ID</th>
            <th scope="col">Parent Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.student_id}</td>
              <td>{data.Student_name}</td>
              <td>{data.email}</td>
              <td>{data.parent_name}</td>
              <td>{data.phone_number}</td>
              <td>
                <div className="d-flex align-items-center justify-content-center">
                  <Link to={'/campaign/contact/edit'}>
                    <button className="btn btn-sm">
                      <FaEdit />
                    </button>
                  </Link>
                  
                  <Delete />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default Contact;
