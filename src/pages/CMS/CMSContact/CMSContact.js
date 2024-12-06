import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import CMSContactAdd from "./CMSContactAdd";
import CMSContactEdit from "./CMSContactEdit";
import CMSContactView from "./CMSContactView";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const CMSContact = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllContactUsSave");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data: ", error.message);
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
      const response = await api.get("/getAllContactUsSave");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const contactPublish = async () => {
    try {
      const response = await api.post("/publishContactUs");

      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error("Error refreshing data:", error);
    }
  };

  return (
    <div className="container center p-0">
      <div className="container cms-header shadow-sm py-2 mb-4">
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
            Content Management
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Contact Us
          </li>
        </ol>
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Contact</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end gap-2">
            {storedScreens?.contactUsCreate && (
              <CMSContactAdd onSuccess={refreshData} />
            )}
            {storedScreens?.contactUsPublish && (
              <button
                type="button"
                className="btn btn-outline-danger border"
                onClick={contactPublish}
              >
                Publish
              </button>
            )}
          </div>
        </div>
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
                <th scope="col" className="text-center">
                  S No
                </th>
                <th scope="col" className="text-center">
                  Centre Name
                </th>
                <th scope="col" className="text-center">
                  Email
                </th>
                <th scope="col" className="text-center">
                  Mobile Number
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row" className="text-center">
                    {index + 1}
                  </th>
                  <td className="text-center">{data.centerName}</td>
                  <td className="text-center">{data.email}</td>
                  <td className="text-center">{data.mobileNo}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center">
                      {storedScreens?.contactUsRead && (
                        <CMSContactView id={data.id} />
                      )}
                      {storedScreens?.contactUsUpdate && (
                        <CMSContactEdit id={data.id} onSuccess={refreshData} />
                      )}
                      {storedScreens?.contactUsDelete && (
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteContactUsSave/${data.id}`}
                        />
                      )}
                    </div>
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

export default CMSContact;
