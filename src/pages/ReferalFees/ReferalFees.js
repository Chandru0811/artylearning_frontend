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
import ReferalFeesAdd from "./ReferalFeesAdd";
import ReferalFeesEdit from "./ReferalFeesEdit";
import { IoIosAddCircle } from "react-icons/io";

const ReferalFees = () => {
  // const { id } = useParams();
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [extraData, setExtraData] = useState(false);
  const [centerName, setCenterName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllReferralFees");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    console.log({
      centerName,
    });
  }, [centerName]);

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
      columnDefs: [{ orderable: false, targets: 1 }],
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
      const response = await api.get("/getAllReferralFees");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchSubData();
  }, [loading]);

  const extractDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined date strings
    return dateString.substring(0, 10); // Extracts the date part in "YYYY-MM-DD"
  };

  const clearFilters = () => {
    setCenterName("");
    $(tableRef.current).DataTable().search("").draw();
  };

  return (
    <div className="container my-4">
      <ol
        className="breadcrumb"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Referal Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Referal Fees
        </li>
      </ol>
      {/* <div className="mb-3 d-flex justify-content-end">
        <div>
          <ReferalFeesAdd onSuccess={refreshData} />
        </div>
      </div> */}
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                Referal Fees
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Centre Name"
                value={centerName}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setCenterName(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>

            <div className="form-group mb-0 ms-2 mb-1 ">
              <button
                type="button"
                className="btn btn-sm btn-border"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="me-2">
          <ReferalFeesAdd onSuccess={refreshData} />
          </div>
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
                  <th scope="">S No</th>
                  <th scope=""></th>
                  <th scope="col">Center</th>
                  <th scope="col">Effective Date</th>
                  <th scope="col">Referal fee</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Updated At</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="dropdown">
                          <button
                            className="btn btn-button btn-sm"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <IoIosAddCircle
                              className="text-light"
                              style={{ fontSize: "16px" }}
                            />
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <ReferalFeesEdit
                                id={data.id}
                                onSuccess={refreshData}
                              />
                            </li>
                            <li>
                              <Delete
                                onSuccess={refreshData}
                                path={`/deleteReferralFees/${data.id}`}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td className="text-break">{data.center}</td>
                    <td className="text-break">
                      {extractDate(data.effectiveDate)}
                    </td>
                    <td className="text-break">{data.referralFee}</td>
                    <td className="text-break">{data.createdBy}</td>
                    <td className="text-break">
                      {extractDate(data.createdAt)}
                    </td>
                    <td className="text-break">
                      {extractDate(data.updatedAt)}
                    </td>
                    <td>
                      {data.status === "ACTIVE" ? (
                        <span className="badge badges-Green">Active</span>
                      ) : (
                        <span className="badge badges-Red">Inactive</span>
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

export default ReferalFees;
