import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import api from "../../../config/URL";
import Delete from "../../../components/common/Delete";
import IDTypeEdit from "./IDTypeEdit";
import IDTypeAdd from "./IDTypeAdd";
import { Link } from "react-router-dom";

const IDType = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get("/getAllIdTypeSetting");
      setDatas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllIdTypeSetting");
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
          Settings
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Id Type
        </li>
      </ol>
      {/* {storedScreens?.levelCreate &&  */}

      <div className="d-flex justify-content-end align-items-center">
        <span>
          <IDTypeAdd onSuccess={refreshData} />
        </span>
        {/* } */}
        {/* <p>        <button className="btn btn-light border-secondary mx-2" onClick={handleDataShow}>

          {extraData?"Hide":'Show'}
          <MdViewColumn className="fs-4 text-secondary"/>

        </button> </p> */}
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
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S No
                </th>
                <th scope="col" className="text-center">
                  ID Type
                </th>
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
                <th scope="col" className="text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="text-center">{data.idType}</td>
                  {extraData && <td>{data.createdBy}</td>}
                  {extraData && <td>{extractDate(data.createdAt)}</td>}
                  {extraData && <td>{data.updatedBy}</td>}
                  {extraData && <td>{extractDate(data.updatedAt)}</td>}
                  <td className="text-end">
                    <IDTypeEdit id={data.id} onSuccess={refreshData} />

                    <Delete
                      onSuccess={refreshData}
                      path={`/deleteIdTypeSetting/${data.id}`}
                    />
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

export default IDType;
