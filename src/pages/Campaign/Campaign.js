import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaClone } from "react-icons/fa";
import Delete from "../../components/common/Delete";

const Campaign = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      name: "Production Support Training",
      date: "17-02-2024",
      status: "Draft",
    },
    {
      id: 2,
      name: "Production Support Training",
      date: "17-02-2024",
      status: "Sent",
    },
    {
      id: 3,
      name: "Production Support Training",
      date: "17-02-2024",
      status: "Draft",
    },
    {
      id: 4,
      name: "Production Support Training",
      date: "17-02-2024",
      status: "Sent",
    },
    {
      id: 5,
      name: "Production Support Training",
      date: "17-02-2024",
      status: "Draft",
    },
    {
      id: 6,
      name: "Production Support Training",
      date: "17-02-2024",
      status: "Sent",
    },
    {
      id: 7,
      name: "Production Support Training",
      date: "17-02-2024",
      status: "Draft",
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
      <div className="my-3 d-flex justify-content-end mb-5">
        <Link to="/campaign/add">
          <button type="button" className="btn btn-button btn-sm">
            Add <i className="bx bx-plus"></i>
          </button>
        </Link>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.date}</td>
              <td>
                {data.status === "Sent" ? (
                  <span className="badge badges-Green">Sent</span>
                ) : (
                  <span className="badge badges-Yellow">Draft</span>
                )}
              </td>
              <td>
                <Link to="">
                  <button className="btn btn-sm">
                    <FaClone />
                  </button>
                </Link>
                <Link to="/campaign/view">
                  <button className="btn btn-sm">
                    <FaEye />
                  </button>
                </Link>
                <Link to="/campaign/edit">
                  <button className="btn btn-sm">
                    <FaEdit />
                  </button>
                </Link>
                <Delete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Campaign;
