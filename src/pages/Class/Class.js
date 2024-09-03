import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete"; // Ensure correct import
import api from "../../config/URL";
import { toast } from "react-toastify";
import { MdViewColumn } from "react-icons/md";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const ColumnToggleDropdown = ({ showColumns, onToggle }) => {
  const columns = [
    { key: 'createdBy', label: 'Created By' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'updatedBy', label: 'Updated By' },
    { key: 'updatedAt', label: 'Updated At' },
    { key: 'className', label: 'Class Name' },
    { key: 'classType', label: 'Class Type' }
  ];

  return (
    <Dropdown.Menu>
      {columns.map((column) => (
        <Dropdown.Item key={column.key}>
          <Form.Check
            type="checkbox"
            label={column.label}
            checked={showColumns[column.key]}
            onChange={() => onToggle(column.key)}
          />
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
};

const Class = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showColumns, setShowColumns] = useState({
    className: true,
    classType: true,
    createdBy: false,
    updatedBy: false,
    createdAt: false,
    updatedAt: false,
  });

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllCourseClassListings");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data");
      }
    };
    getCenterData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      refreshData();
    }
  }, [showColumns]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      const table = $(tableRef.current).DataTable();
      table.columns().every((index) => {
        const column = table.column(index);
        const header = $(column.header());
        const columnKey = header.text().replace(/\s+/g, '').toLowerCase();
        column.visible(showColumns[columnKey]);
      });
      table.draw();
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
      columnDefs: [{ orderable: false, targets: -1 }],
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
      const response = await api.get("/getAllCourseClassListings");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleColumnToggle = (column) => {
    setShowColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };

  const extractDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined date strings
    return dateString.substring(0, 10); // Extracts the date part in "YYYY-MM-DD"
  };

  return (
    <div className="container my-4">
      <div className="my-3 d-flex justify-content-end mb-5">
        {storedScreens?.classCreate && (
          <Link to={`/class/add`}>
            <button type="button" className="btn btn-button btn-sm">
              Add <i className="bx bx-plus"></i>
            </button>
          </Link>
        )}
        {/* <Dropdown>
          <Dropdown.Toggle className="btn btn-light border-secondary mx-2" id="dropdown-basic">
            <MdViewColumn className="fs-4 text-secondary" />
          </Dropdown.Toggle>
          <ColumnToggleDropdown showColumns={showColumns} onToggle={handleColumnToggle} />
        </Dropdown> */}
      </div>
      {loading ? (
        <div className="loader-container">
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col">S No</th>
                {showColumns.className && <th scope="col">Class Name</th>}
                {showColumns.classType && <th scope="col">Class Type</th>}
                {showColumns.createdBy && <th scope="col">Created By</th>}
                {showColumns.createdAt && <th scope="col">Created At</th>}
                {showColumns.updatedBy && <th scope="col">Updated By</th>}
                {showColumns.updatedAt && <th scope="col">Updated At</th>}
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  {showColumns.className && <td>{data.className}</td>}
                  {showColumns.classType && <td>{data.classType}</td>}
                  {showColumns.createdBy && <td>{data.createdBy}</td>}
                  {showColumns.createdAt && <td>{extractDate(data.createdAt)}</td>}
                  {showColumns.updatedBy && <td>{data.updatedBy}</td>}
                  {showColumns.updatedAt && <td>{extractDate(data.updatedAt)}</td>}
                  <td className="text-center">
                    {storedScreens?.classRead && (
                      <Link to={`/class/view/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.classUpdate && (
                      <Link to={`/class/edit/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEdit />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.classDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteCourseClassListing/${data.id}`}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Class;
