// src/pages/Datatable.js

import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery"; // Import jQuery

const Datatable = () => {
  const tableRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = [
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    { title: "ID", data: "id" },
    { title: "Name", data: "name" },
    { title: "Age", data: "age" },
    { title: "Address", data: "address" },
    { title: "Phone", data: "phone" },
    { title: "Email", data: "email" },
    {
      title: "Actions",
      data: null,
      render: function (data, type, row) {
        return `
            <button type="button" class="btn btn-primary btn-sm" onclick="editRow(${row.id})">
                <i class='bx bxs-balloon'></i>
            </button>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteRow(${row.id})">
                <i class='bx bx-trash-alt' ></i>
            </button>
          `;
      },
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
      data: data,
      columns: columns,
    });

    return () => {
      table.destroy();
    };
  }, [data, columns]);

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
      <table
        ref={tableRef}
        className="display table-secondary"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default Datatable;
