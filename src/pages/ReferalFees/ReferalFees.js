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

const ReferalFees = () => {
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
      <div className="mb-3 d-flex justify-content-end">
        <div>
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
                <th scope="col">S No</th>
                <th scope="col">Center</th>
                <th scope="col">Effective Date</th>
                <th scope="col">Referal fee</th>
                <th scope="col">Created By</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
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
                  <td className="text-break">{data.center}</td>
                  <td className="text-break">{extractDate(data.effectiveDate)}</td>
                  <td className="text-break">{data.referralFee}</td>
                  <td className="text-break">{data.createdBy}</td>
                  <td className="text-break">{extractDate(data.createdAt)}</td>
                  <td className="text-break">{extractDate(data.updatedAt)}</td>
                  <td>
                    {data.status === "ACTIVE" ? (
                      <span className="badge badges-Green">Active</span>
                    ) : (
                      <span className="badge badges-Red">Inactive</span>
                    )}
                  </td>
                  <td className="d-flex">
                    {/* {storedScreens?.levelUpdate && ( */}
                      <ReferalFeesEdit id={data.id} onSuccess={refreshData} />
                    {/* )} */}
                    {/* {storedScreens?.levelDelete && ( */}
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteReferralFees/${data.id}`}
                      />
                    {/* )} */}
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

export default ReferalFees;
