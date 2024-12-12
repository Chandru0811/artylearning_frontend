import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useParams } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";
import { SCREENS } from "../../../config/ScreenFilter";
import { toast } from "react-toastify";
import CourseDepositAdd from "./CourseDepositAdd";
import CourseDepositEdit from "./CourseDepositEdit";
import CourseDepositView from "./CourseDepositView";
import { MdViewColumn } from "react-icons/md";

const CourseDeposit = () => {
  const { id } = useParams();
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [taxData, setTaxData] = useState([]);
  const [extraData, setExtraData] = useState(false);

  const fetchTaxData = async () => {
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getCourseDepositByCourseId/${id}`);
        if (response.status === 200) {
          setDatas(response.data);
        }
      } catch (error) {
        console.error("Error fetching data ", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    fetchTaxData();
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
      const response = await api.get(`/getCourseDepositByCourseId/${id}`);
      setDatas(response.data);
      initializeDataTable();
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
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/course" className="custom-breadcrumb">
            Course
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Deposit
        </li>
      </ol>
      <div className="card">
        <div
          style={{ background: "#f5f7f9" }}
          className="d-flex justify-content-between align-items-center px-2"
        >
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                Course Deposit
              </span>
            </span>
          </div>
          <span>
            <CourseDepositAdd onSuccess={refreshData} />
          </span>
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
          <div className="table-responsive py-2">
            <table style={{ width: "100%" }} ref={tableRef} className="display">
              <thead>
                <tr className="text-center" style={{ background: "#f5f7f9" }}>
                  <th scope="col">S No</th>
                  <th scope="col">Effective Date</th>
                  <th scope="col">Tax Type</th>
                  <th scope="col">Course deposit Fee</th>
                  <th scope="col">Status</th>
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(datas) &&
                  datas?.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      {/* <td>{data.centerName}</td> */}
                      <td>{data.effectiveDate}</td>
                      <td>
                        {taxData &&
                          taxData.map((tax) =>
                            parseInt(data.taxType) === tax.id
                              ? tax.taxType || "--"
                              : ""
                          )}
                      </td>
                      <td>{data.depositFees}</td>
                      <td>
                        {data.status === "ACTIVE" ? (
                          <span className="badge badges-Green">Active</span>
                        ) : (
                          <span className="badge badges-Red">Inactive</span>
                        )}
                      </td>
                      {extraData && <td>{data.createdBy}</td>}
                      {extraData && <td>{extractDate(data.createdAt)}</td>}
                      {extraData && <td>{data.updatedBy}</td>}
                      {extraData && <td>{extractDate(data.updatedAt)}</td>}
                      <td className="d-flex">
                        {storedScreens?.courseUpdate && (
                          <CourseDepositEdit
                            id={data.id}
                            onSuccess={refreshData}
                          />
                        )}

                        {storedScreens?.courseDelete && (
                          <Delete
                            onSuccess={refreshData}
                            path={`/deleteCourseDepositFees/${data.id}`}
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
    </div>
  );
};

export default CourseDeposit;
