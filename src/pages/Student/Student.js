import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { SCREENS } from "../../config/ScreenFilter";
import Lead from "../Lead/Lead";
import { MdViewColumn } from "react-icons/md";

const Student = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  console.log("Student All datas:", datas);

  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  console.log("Screens : ", SCREENS);

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllStudentDetails");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
      // DataTable already initialized, no need to initialize again
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
      const response = await api.get("/getAllStudentDetails");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  const handleDataShow = () => {
    if (!loading) {
      setExtraData(!extraData);
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  };
  const extractDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined date strings
    return dateString.substring(0, 10); // Extracts the date part in "YYYY-MM-DD"
  };

  return (
    <div>
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
        <div className="container my-4">
          <ol
            className="breadcrumb my-3 px-1"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            <li>
              <Link to="/" className="custom-breadcrumb">
                Home
              </Link>
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li>
              Student Management
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Student Listing
            </li>
          </ol>
          <div className="mb-3 d-flex justify-content-end">
            {storedScreens?.studentListingCreate && (
              <Link to="/student/add">
                <button type="button" className="btn btn-button btn-sm">
                  Add <i class="bx bx-plus"></i>
                </button>
              </Link>
            )}
            {/* <button className="btn btn-light border-secondary mx-2" onClick={handleDataShow}>
          {extraData?"Hide":'Show'}
          <MdViewColumn className="fs-4 text-secondary"/>
        </button> */}
          </div>
          <div className="table-responsive">
            <table ref={tableRef} className="display">
              <thead>
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S No
                  </th>
                  <th scope="col">Student ID</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Nationality</th>
                  <th scope="col">Allow Magazine</th>
                  <th scope="col">Allow Social Media</th>
                  {extraData && (
                    <th
                      scope="col"
                      class="sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="CreatedBy: activate to sort column ascending: activate to sort column ascending"
                      style={{ width: "92px" }}
                    >
                      CreatedBy
                    </th>
                  )}
                  {extraData && (
                    <th
                      scope="col"
                      class="sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="CreatedAt: activate to sort column ascending: activate to sort column ascending"
                      style={{ width: "92px" }}
                    >
                      CreatedAt
                    </th>
                  )}
                  {extraData && (
                    <th
                      scope="col"
                      class="sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="UpdatedBy: activate to sort column ascending: activate to sort column ascending"
                      style={{ width: "92px" }}
                    >
                      UpdatedBy
                    </th>
                  )}
                  {extraData && (
                    <th
                      scope="col"
                      class="sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="UpdatedAt: activate to sort column ascending: activate to sort column ascending"
                      style={{ width: "92px" }}
                    >
                      UpdatedAt
                    </th>
                  )}
                  {/* <th scope="col">Join Class Date</th>
                <th scope="col">Status</th> */}
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1} </th>
                    <td>
                      {data.studentUniqueId}{" "}
                      {/* {data?.formStatus === "INCOMPLETE" ? (
                        <span className="fs-3 fw-bolder text-danger">.</span>
                      ) : (
                        <></>
                      )} */}
                    </td>
                    <td>{data.studentName}</td>
                    <td>{data.age}</td>
                    <td>{data.gender}</td>
                    <td>{data.nationality}</td>
                    <td>{data.allowMagazine === true ? "Yes" : "No"}</td>
                    <td>{data.allowSocialMedia === true ? "Yes" : "No"}</td>
                    {extraData && <td>{data.createdBy}</td>}
                    {extraData && <td>{data.createdAt}</td>}
                    {extraData && <td>{data.updatedBy}</td>}
                    {extraData && <td>{data.updatedAt}</td>}
                    {/* <td>{data.joinClassDate}</td>
                  <td>{data.status}</td> */}
                    <td>
                      <div className="d-flex">
                        {storedScreens?.studentListingRead && (
                          <Link to={`/student/view/${data.id}`}>
                            <button className="btn btn-sm">
                              <FaEye />
                            </button>
                          </Link>
                        )}
                        {storedScreens?.studentListingUpdate && (
                          <Link to={`/student/edit/${data.id}`}>
                            <button className="btn btn-sm">
                              <FaEdit />
                            </button>
                          </Link>
                        )}
                        {storedScreens?.studentListingDelete && (
                          <Delete
                            onSuccess={refreshData}
                            path={`/deleteStudentDetail/${data.id}`}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
