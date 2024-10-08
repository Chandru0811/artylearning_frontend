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

  return (
    <div className="container my-4">
     
       <div className="d-flex justify-content-end align-items-center">
            <span>
            <CourseDepositAdd onSuccess={refreshData} />
            </span>
            {/* } */}
           {/* <p className="mb-4">        <button className="btn btn-light border-secondary mx-2" onClick={handleDataShow}>

          {extraData?"Hide":'Show'}
          <MdViewColumn className="fs-4 text-secondary"/>

        </button> </p> */}
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
              <th scope="col">Effective Date</th>
              <th scope="col">Tax Type</th>
              <th scope="col">Course deposit Fee</th>
              {/* <th scope="col">WeekEnd Fee</th>
                            <th scope="col">Tax Type</th> */}
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
            {Array.isArray(datas) && datas?.map((data, index) => (
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
                  {/* {storedScreens?.courseRead && (
                    <CourseDepositView id={data.id} onSuccess={refreshData} />
                  )} */}
                  {storedScreens?.courseUpdate && (
                    <CourseDepositEdit id={data.id} onSuccess={refreshData} />
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
  );
};

export default CourseDeposit;
