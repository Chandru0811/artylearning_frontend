import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllStudentsWithIds from "../List/StudentList";
import DocumentEdit from "./DocumentEdit";
// import { SCREENS } from "../../config/ScreenFilter";

const Document = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const uniqueKey = "DocumentPageNumber";
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  const fetchData = async () => {
    try {
      const studentData = await fetchAllStudentsWithIds();
      setStudentData(studentData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/getAllDocumentFolder");
      setDatas(response.data);
      setLoading(false);
    };
    getData();
    fetchData();
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
      const response = await api.get("/getAllDocumentFolder");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
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
      <div className="mb-5 mt-3 d-flex justify-content-end">
        {storedScreens?.documentListingCreate && (
          <Link to="/document/add">
            <button type="button" className="btn btn-button btn-sm">
              Add <i className="bx bx-plus"></i>
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
              <th scope="col">Folder Name</th>
              <th scope="col">Student Name</th>
              <th scope="col">Course</th>
              <th scope="col">Class</th>
              <th scope="col">Batch</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.folderName}</td>
                <td>
                  {studentData &&
                    studentData.map((student) =>
                      parseInt(data.studentId) === student.id
                        ? student.studentNames || "--"
                        : ""
                    )}
                </td>
                <td>{data.course}</td>
                <td>{data.classListing}</td>
                <td>{data.batchTime}</td>
                <td>
                  {data.approveStatus === true ? (
                    <span className="badge badges-Yellow">Pending</span>
                  ) : (
                    <span className="badge badges-Green">Approval</span>
                  )}
                </td>
                <td>
                  <div className="d-flex">
                    {storedScreens?.documentListingRead && (
                      <Link to={`/document/view/${data.id}?approveStatus=${data.approveStatus}`}>
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                    <DocumentEdit onSuccess={refreshData} id={data.id} />
                    {/* <Delete
                      onSuccess={refreshData}
                      path={`/deleteCourseClassListing/${data.id}`}
                    /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Document;
