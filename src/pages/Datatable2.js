import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";

const Datatable2 = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      name: "Chandry",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
    },
    {
      id: 1,
      name: "John Doe",
      age: 25,
      address: "Test 1 37/42 veera chetty street",
      phone: "9941286931",
      email: "mailto:chandru@gmail.com",
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
      <div className="my-3">
        <button type="button" className="btn btn-button btn-sm">
          Add <i class="bx bx-plus"></i>
        </button>
        &nbsp;&nbsp;
        <button type="button" className="btn btn-sm btn-border">
          Back
        </button>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              S No
            </th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.address}</td>
              <td>{data.email}</td>
              <td>{data.age}</td>
              <td>{data.phone}</td>
              <td>
                <Link to={`/center/${data.id}`}>
                  <button className="btn btn-sm">
                    <FaEye />
                  </button>
                </Link>
                <Link to={`/center/${data.id}`}>
                  <button className="btn btn-sm">
                    <FaEdit />
                  </button>
                </Link>
                <Link to={`/center/${data.id}`}>
                  <button className="btn btn-sm">
                    <FaTrash />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable2;
