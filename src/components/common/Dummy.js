import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { SCREENS } from "../../config/ScreenFilter";
import { MdViewColumn } from "react-icons/md";

const Teacher = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);
  const roles = localStorage.getItem("userName");

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  console.log("Screens : ", SCREENS);

  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");

  const clearFilters = () => {
    setTeacherName("");
    setEmail("");

    $(tableRef.current).DataTable().search("").draw();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let response;

        // Check role and call the appropriate API
        if (roles === "SMS_ADMIN") {
          response = await api.get("/getAllTeachersAndFreelancers");
        } else if (roles === "SMS_TEACHER") {
          response = await api.get("/getAllUsersByRole/teacher");
        } else if (roles === "SMS_FREELANCER") {
          response = await api.get("/getAllFreelance");
        }

        // If a response was received, set the data
        if (response) {
          setDatas(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [roles]); // Add "role" as a dependency

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

  // const refreshData = async () => {
  //   destroyDataTable();
  //   setLoading(true);
  //   try {
  //     const response = await api.get("/getAllTeachersAndFreelancers");
  //     setDatas(response.data);
  //     initializeDataTable(); // Reinitialize DataTable after successful data update
  //   } catch (error) {
  //     console.error("Error refreshing data:", error);
  //   }
  //   setLoading(false);
  // };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      let response;

      // Check role and call the appropriate API
      if (roles === "SMS_ADMIN") {
        response = await api.get("/getAllTeachersAndFreelancers");
      } else if (roles === "SMS_TEACHER") {
        response = await api.get("/getAllUsersByRole/teacher");
      } else if (roles === "SMS_FREELANCER") {
        response = await api.get("/getAllFreelance");
      }

      // If a response was received, set the data and initialize the DataTable
      if (response) {
        setDatas(response.data);
        initializeDataTable(); // Reinitialize DataTable after successful data update
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
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

  const handleRowClick = (id) => {
    navigate(`/teacher/view/${id}`); // Navigate to the index page when a row is clicked
  };

  useEffect(() => {
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll("tr.odd");
      rows.forEach((row) => {
        row.classList.remove("odd");
      });
      const thElements = tableRef.current.querySelectorAll("tr th.sorting_1");
      thElements.forEach((th) => th.classList.remove("sorting_1"));
    }
  }, [datas]);

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
        <div className="container-fluid my-4">
          <ol
            className="breadcrumb my-3"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            <li>
              <Link to="/" className="custom-breadcrumb">
                Home
              </Link>
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li>
              Staffing
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Teacher
            </li>
          </ol>
          <div className="d-flex justify-content-between mb-3">
            <div className="individual_fliters d-flex">
              <div className="form-group mb-0 ms-2">
                <input
                  type="text"
                  className="form-control center_list"
                  style={{ width: "160px" }}
                  placeholder="Teacher Name"
                  value={teacherName}
                  onChange={(e) => {
                    const searchValue = e.target.value.toLowerCase();
                    setTeacherName(e.target.value);
                    $(tableRef.current).DataTable().search(searchValue).draw();
                  }}
                />
              </div>
              <div className="form-group mb-0 ms-2">
                <input
                  type="text"
                  className="form-control center_list"
                  style={{ width: "160px" }}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    const searchValue = e.target.value.toLowerCase();
                    setEmail(e.target.value);
                    $(tableRef.current).DataTable().search(searchValue).draw();
                  }}
                />
              </div>

              <div className="form-group mb-0 ms-2 ">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={clearFilters}
                >
                  Clear
                </button>
              </div>
            </div>
            {storedScreens?.teacherCreate && (
              <Link to="/teacher/add">
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
                  <th scope="col">Teacher Id</th>
                  <th scope="col">Teacher Name</th>
                  <th scope="col">Email</th>
                  {roles === "SMS_ADMIN" ? <th scope="col">Role</th> : <></>}
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
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.userUniqueId}</td>
                    <td>{data.teacherName}</td>
                    <td>{data.email}</td>
                    {roles === "SMS_ADMIN" ? (
                      <td>
                        {data.role === "teacher" ? (
                          <span className="badge badges-Green">Teacher</span>
                        ) : (
                          <span className="badge badges-Red">Freelancer</span>
                        )}
                      </td>
                    ) : (
                      <></>
                    )}
                    {extraData && <td>{data.createdBy}</td>}
                    {extraData && <td>{extractDate(data.createdAt)}</td>}
                    {extraData && <td>{data.updatedBy}</td>}
                    {extraData && <td>{extractDate(data.updatedAt)}</td>}

                    <td className="text-center">
                      <div>
                        {storedScreens?.teacherRead && (
                          <Link to={`/teacher/view/${data.id}`}>
                            <button className="btn btn-sm">
                              <FaEye />
                            </button>
                          </Link>
                        )}
                        {storedScreens?.teacherUpdate && (
                          <Link
                            to={`/teacher/edit/${data.id}?role=${data.role}`}
                          >
                            <button className="btn btn-sm">
                              <FaEdit />
                            </button>
                          </Link>
                        )}
                        {storedScreens?.teacherDelete && (
                          <Delete
                            onSuccess={refreshData}
                            path={`/deleteUser/${data.id}`}
                            teachermsg="Teacher deleted successfully"
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

export default Teacher;
