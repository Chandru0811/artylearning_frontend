import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import Delete from "../../../components/common/Delete";
import TaxAdd from "./TaxAdd";
import TaxEdit from "./TaxEdit";
// import { SCREENS } from "../../config/ScreenFilter";

const Tax = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  // const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllTaxSetting");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
      columnDefs: [
        { orderable: false, targets: -1 }
      ],
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
      const response = await api.get("/getAllTaxSetting");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container my-4">
      {/* {storedScreens?.levelCreate &&  */}
      <TaxAdd onSuccess={refreshData} />
      {/* } */}
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
              <th scope="col">Tax Type</th>
              <th scope="col">Rate</th>
              <th scope="col">Effective Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.taxType}</td>
                <td>{data.rate} %</td>
                <td>{data.effectiveDate}</td>
                <td>{data.status === "ACTIVE" ? (
                  <span className="badge badges-Green">Active</span>
                ) : (
                  <span className="badge badges-Red">Inactive</span>
                )}</td>
                <td>
                  <div className="d-flex">
                    {/* {storedScreens?.invoiceRead && ( */}
                    {/* <Link to={`/tax/view/${data.id}`}>
                      <button className="btn btn-sm">
                        <FaEye />
                      </button>
                    </Link> */}
                    {/* )}
                    {storedScreens?.invoiceUpdate && ( */}
                    <TaxEdit id={data.id} onSuccess={refreshData} />
                    {/* )}
                    {storedScreens?.invoiceDelete && ( */}
                    <Delete
                      onSuccess={refreshData}
                      path={`/deleteTaxSetting/${data.id}`}
                    />
                    {/* )} */}
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

export default Tax;
