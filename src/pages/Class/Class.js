import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
// import { SCREENS } from "../../config/ScreenFilter";

const Class = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const uniqueKey = "ClassPageNumber";

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

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
    }

    $(tableRef.current).DataTable({
      responsive: true,
      pageLength: 10, // default page length
      displayStart: localStorage.getItem(uniqueKey)
        ? parseInt(localStorage.getItem(uniqueKey)) * 10
        : 0,
      drawCallback: function () {
        var table = $(tableRef.current).DataTable();
        var pageInfo = table.page.info();
        localStorage.setItem(uniqueKey, pageInfo.page);
      },
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

  useEffect(() => {
    return () => {
      localStorage.removeItem(uniqueKey); // Clear the storage when component unmounts
    };
  }, []);

  return (
    <div className="container my-4">
      <div className="my-3 d-flex justify-content-end mb-5">
        {storedScreens?.classCreate && (
          <Link to={`/class/add`}>
            <button type="button" className="btn btn-button btn-sm">
              Add <i class="bx bx-plus"></i>
            </button>
          </Link>
        )}
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
              <th scope="col">Class Name</th>
              <th scope="col">Class Type </th>
              {/* <th scope="col">Remark </th> */}

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.className}</td>
                <td>{data.classType}</td>
                {/* <td>{data.remark}</td> */}
                <td>
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
      )}
    </div>
  );
};

export default Class;
