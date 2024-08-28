import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
import { FcAddColumn } from "react-icons/fc";
import { FaEyeSlash } from "react-icons/fa";

const Class = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHideIcon, setShowHideIcon] = useState(false);
  const [showColumns, setShowColumns] = useState({
    createdBy: false,
    updatedBy: false,
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
  }, [loading, showColumns]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
      columnDefs: [
        { orderable: false, targets: -1 },
      ],
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
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const handleToggleColumns = () => {
    setShowColumns((prevColumns) => ({
      createdBy: !prevColumns.createdBy,
      updatedBy: !prevColumns.updatedBy,
    }));
    setShowHideIcon((prevState) => !prevState);

    destroyDataTable();
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
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th scope="col">S No</th>
              <th scope="col">Class Name</th>
              <th scope="col">Class Type</th>
              {showColumns.createdBy && <th scope="col">Created By</th>}
              {showColumns.updatedBy && <th scope="col">Updated By</th>}
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.className}</td>
                <td>{data.classType}</td>
                {showColumns.createdBy && <td>{data.createdBy}</td>}
                {showColumns.updatedBy && <td>{data.updatedBy}</td>}
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
                  {/* <button
                    className="btn btn-sm"
                    onClick={handleToggleColumns}
                  >
                    {showHideIcon ? <FaEyeSlash /> : <FcAddColumn />} 
                  </button> */}
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
      )}
    </div>
  );
};

export default Class;
