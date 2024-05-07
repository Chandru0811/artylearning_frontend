import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";

const Deduction = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  console.log(datas);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllUserDeduction");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllUserDeduction");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container my-4">
      <div className="my-3 d-flex justify-content-end mb-5">
        <Link to="/deduction/add">
          <button type="button" className="btn btn-button btn-sm">
            Add <i class="bx bx-plus"></i>
          </button>
        </Link>
      </div>
      {loading ? (
        <div className="loader-container">
          <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th scope="col">S No</th>
              <th scope="col">Centre Name</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Deduction Name</th>
              <th scope="col">Deduction Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.centerName}</td>
                <td>{data.employeeName}</td>
                <td>{data.deductionName}</td>
                <td>{data.deductionAmount}</td>
                <td>
                  <Link to={`/deduction/list/${data.id}`}>
                    <button className="btn btn-sm">
                      <FaEye />
                    </button>
                  </Link>

                  <Link to={`/deduction/edit/${data.id}`}>
                    <button className="btn btn-sm">
                      <FaEdit />
                    </button>
                  </Link>

                  <Delete
                    onSuccess={refreshData}
                    path={`/deleteUserDeduction/${data.id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Deduction;
