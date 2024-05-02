import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";

const Holiday = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      centreName: "Arty Learning @ Hougang",
      holidayName: "New Year",
      startDate: "01-01-2024",
    },
    {
      id: 2,
      centreName: "Arty Learning @ AKM",
      holidayName: "Pongal",
      startDate: "01-01-2024",
    },
    {
      id: 3,
      centreName: "Arty Learning @ KK",
      holidayName: "New Year",
      startDate: "01-01-2024",
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
       <div className="col-12 text-end mb-3">
            <Link to="/holiday/add">
              <button type="button" className="btn btn-sm btn-button">
                Add <i class="bx bx-plus"></i>
              </button>
            </Link>
          </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th>S No</th>
            <th>Centre Name</th>
            <th>Holiday Name</th>
            <th>Start Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.centreName}</td>
              <td>{data.holidayName}</td>
              <td>{data.startDate}</td>
              <td>
              <td>
                <div className="d-flex">
                  <Link to="/holiday/list">
                    <button className="btn btn-sm">
                      <FaEye />
                    </button>
                  </Link>
                  <Link to="/holiday/edit">
                    <button className="btn btn-sm">
                      <FaEdit/>
                    </button>
                  </Link>
                  <Delete 
                  //  onSuccess={refreshData}
                  />
                </div>
              </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Holiday;
