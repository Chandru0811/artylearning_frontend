import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentreManager from "../List/CentreMangerList";

const Center = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const uniqueKey = "CenterPageNumber";

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerManagerData, setCenterManagerData] = useState(null);

  const fetchData = async () => {
    try {
      const centerManagerData = await fetchAllCentreManager();
      setCenterManagerData(centerManagerData);
    } catch (error) {
      toast.error(error);
    }
  };

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
      columnDefs: [
        { orderable: false, targets: -1 }
      ],
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
      const response = await api.get("/getAllCenter");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllCenter");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
      }
    };
    getCenterData();
    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem(uniqueKey); // Clear the storage when component unmounts
    };
  }, []);

  return (
    <div className="container my-4 center">
      <div className="mb-5 mt-3 d-flex justify-content-end">
        {storedScreens?.centerListingCreate && (
          <Link to="/center/add">
            <button
              type="button"
              className="btn btn-button "
              style={{ fontWeight: "600px !important" }}
            >
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
              <th scope="col" style={{ whiteSpace: "nowrap" }}>
                S No
              </th>
              <th scope="col">Centre Name</th>
              <th scope="col">Centre Manager</th>
              <th scope="col">Code</th>
              <th scope="col">UEN Number</th>
              <th scope="col">Mobile</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.centerName}</td>
                <td>
                  {centerManagerData &&
                    centerManagerData.map((Cmanager) =>
                      parseInt(data.centerManager) === Cmanager.id
                        ? Cmanager.userNames || "--"
                        : ""
                    )}
                </td>
                <td>{data.code}</td>
                <td>{data.uenNumber}</td>
                <td>{data.mobile}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center ">
                    {storedScreens?.centerListingCreate && (
                      <div class="dropdown" style={{ display: "inline-block" }}>
                        <button
                          class="btn dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <IoMdAdd />
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <AddRegister id={data.id} onSuccess={refreshData} />
                          </li>
                          <li style={{ width: "100%" }}>
                            <AddBreak id={data.id} onSuccess={refreshData} />
                          </li>
                          <li style={{ width: "100%" }}>
                            <AddClass id={data.id} onSuccess={refreshData} />
                          </li>
                          <li style={{ width: "100%" }}>
                            <AddPackage id={data.id} onSuccess={refreshData} />
                          </li>
                        </ul>
                      </div>
                    )}
                    {storedScreens?.centerListingRead && (
                      <Link
                        to={`/center/view/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.centerListingUpdate && (
                      <Link
                        to={`/center/edit/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEdit />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.centerListingDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteCenter/${data.id}`}
                        style={{ display: "inline-block" }}
                      />
                    )}
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

export default Center;
