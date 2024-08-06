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

const CourseDeposit = () => {
  const { id } = useParams();
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const [taxData, setTaxData] = useState([]);

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

  return (
    <div className="container my-4">
      {storedScreens?.levelCreate && (
        <CourseDepositAdd onSuccess={refreshData} />
      )}
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
              <th scope="col">S No</th>
              {/* <th scope="col">Centre Name</th> */}
              <th scope="col">Effective Date</th>
              <th scope="col">Tax Type</th>
              <th scope="col">Course deposit Fee</th>
              {/* <th scope="col">WeekEnd Fee</th>
                            <th scope="col">Tax Type</th> */}
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas?.map((data, index) => (
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
                <td className="d-flex">
                  {storedScreens?.courseRead && (
                    <CourseDepositView id={data.id} onSuccess={refreshData} />
                  )}
                  {storedScreens?.courseUpdate && (
                    <CourseDepositEdit id={data.id} onSuccess={refreshData} />
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
      )}
    </div>
  );
};

export default CourseDeposit;
