import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { FaFileInvoice } from "react-icons/fa";
import {
  OverlayTrigger,
  Tooltip,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { SCREENS } from "../../config/ScreenFilter";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";
import { MdViewColumn } from "react-icons/md";

const Course = () => {
  // const { id } = useParams();
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [extraData, setExtraData] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllCourses");
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

  const fetchSubData = async () => {
    try {
      const subjectData = await fetchAllSubjectsWithIds();
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllCourses");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchSubData();
  }, [loading]);

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
    <div className="container my-4">
      <ol
        className="breadcrumb"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }}>Course Management</Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Course
        </li>
      </ol>
      <div className="mb-3 d-flex justify-content-end">
        {storedScreens?.courseCreate && (
          <Link
            to={{
              pathname: "/course/add",
              state: { subjectData },
            }}
          >
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
        <div className="table-responsive">
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col">S No</th>
                {/* <th scope="col">Centre Name</th> */}
                <th scope="col">Course Name</th>
                <th scope="col">Course Code</th>
                <th scope="col">Course Type</th>
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
                <th scope="col">Status</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  {/* <td>{data.centerName}</td> */}
                  <td>{data.courseName}</td>
                  <td>{data.courseCode}</td>
                  <td>{data.courseType}</td>
                  {extraData && <td>{data.createdBy}</td>}
                  {extraData && <td>{extractDate(data.createdAt)}</td>}
                  {extraData && <td>{data.updatedBy}</td>}
                  {extraData && <td>{extractDate(data.updatedAt)}</td>}
                  <td>
                    {data.status === "Active" ? (
                      <span className="badge badges-Green">Active</span>
                    ) : (
                      <span className="badge badges-Red">Inactive</span>
                    )}
                  </td>
                  <td className="d-flex">
                    {storedScreens?.courseRead && (
                      <Link to={`/course/view/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.courseUpdate && (
                      <Link to={`/course/edit/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEdit />
                        </button>
                      </Link>
                    )}

                    {storedScreens?.curriculumIndex && (
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-top">Curriculum</Tooltip>}
                      >
                        <DropdownButton
                          title={<FaFileInvoice />}
                          variant="white"
                          size="sm"
                          id="dropdown-basic-button"
                        >
                          <Dropdown.Item
                            as={Link}
                            to={`/course/coursefees/${data.id}`}
                          >
                            Course Fees
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to={`/course/coursedeposit/${data.id}`}
                          >
                            Course Deposit Fees
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to={`/course/curriculumoutlet/${data.id}`}
                          >
                            Curriculum Outlet
                          </Dropdown.Item>
                        </DropdownButton>
                      </OverlayTrigger>
                    )}

                    {storedScreens?.courseDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteCourse/${data.id}`}
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

export default Course;
