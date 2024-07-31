import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useParams } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";
import { SCREENS } from "../../../config/ScreenFilter";
import fetchAllSubjectsWithIds from "../../List/SubjectList";
import { toast } from "react-toastify";
import CourseFeesAdd from "./CourseFeesAdd";
import CourseFeesEdit from "./CourseFeesEdit";
import CourseFeesView from "./CourseFeesView";
import fetchAllPackageList from "../../List/PackageList";

const CourseFees = () => {
  console.log("Screens : ", SCREENS);
  const { id } = useParams();
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageData, setPackageData] = useState(null);
  const [taxData, setTaxData] = useState([]);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const fetchPackageData = async () => {
    try {
      const packageData = await fetchAllPackageList();
      setPackageData(packageData);
    } catch (error) {
      toast.error(error);
    }
  };

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
        const response = await api.get(`/getCourseFeesByCourseId/${id}`);
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
      const response = await api.get(`/getCourseFeesByCourseId/${id}`);
      if (response.status === 200) {
        setDatas(response.data);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTaxData();
    fetchPackageData();
  }, []);

  return (
    <div className="container my-4">
      {storedScreens?.levelCreate && <CourseFeesAdd onSuccess={refreshData} />}

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
              
              <th scope="col">Package</th>
              <th scope="col">Weekday Fee</th>
              <th scope="col">WeekEnd Fee</th>
              <th scope="col">Tax Type</th>
              <th scope="col">Effective Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas?.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                {/* <td>{data.centerName}</td> */}
                <td>
                  {packageData &&
                    packageData.map((packageId) =>
                      parseInt(data.packageId) === packageId.id
                        ? packageId.packageNames || "--"
                        : ""
                    )}
                </td>
                <td>{data.weekdayFee}</td>
                <td>{data.weekendFee}</td>
                <td>{taxData &&
                    taxData.map((tax) =>
                      parseInt(data.taxType) === tax.id
                        ? tax.taxType || "--"
                        : ""
                    )}</td>
                <td>{data.effectiveDate}</td>
                <td>
                  {data.status === "Active" ? (
                    <span className="badge badges-Green">Active</span>
                  ) : (
                    <span className="badge badges-Red">Inactive</span>
                  )}
                </td>
                <td className="d-flex">
                  {/* {storedScreens?.courseRead && (
                    <CourseFeesView id={data.id} onSuccess={refreshData} />
                  )} */}
                  {storedScreens?.courseUpdate && (
                    <CourseFeesEdit id={data.id} onSuccess={refreshData} />
                  )}

                  {storedScreens?.courseDelete && (
                    <Delete
                      onSuccess={refreshData}
                      path={`/deleteCourseFees/${data.id}`}
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

export default CourseFees;
