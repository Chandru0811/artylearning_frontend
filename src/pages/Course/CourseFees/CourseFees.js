import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useParams } from "react-router-dom";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";

import { toast } from "react-toastify";
import CourseFeesAdd from "./CourseFeesAdd";
import CourseFeesEdit from "./CourseFeesEdit";
import fetchAllPackageList from "../../List/PackageList";
import { MdViewColumn } from "react-icons/md";

const CourseFees = () => {
  const { id } = useParams();
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageData, setPackageData] = useState(null);
  const [centerId, setCenterId] = useState([]);
  const [taxData, setTaxData] = useState([]);
  const [extraData, setExtraData] = useState(false);


  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

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
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCoursesById/${id}`);

        if (response.status === 200) {
          console.log("course id",response.data)
          setCenterId(response.data.centers);
        }
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    fetchTaxData();
    fetchPackageData();
  }, []);
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
            <CourseFeesAdd onSuccess={refreshData} centerId={centerId}/></span>
            {/* } */}
           <p>        <button className="btn btn-light border-secondary mx-2" onClick={handleDataShow}>

          {/* {extraData?"Hide":'Show'} */}
          <MdViewColumn className="fs-4 text-secondary"/>

        </button> </p>
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
              <th scope="col">S No</th>
              {/* <th scope="col">Centre Name</th> */}
              
              <th scope="col">Package</th>
              <th scope="col">Weekday Fee</th>
              <th scope="col">WeekEnd Fee</th>
              <th scope="col">Tax Type</th>
              <th scope="col">Effective Date</th>
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
                {extraData && <td>{data.createdBy}</td>}
                  {extraData && <td>{extractDate(data.createdAt)}</td>}
                  {extraData && <td>{data.updatedBy}</td>}
                  {extraData && <td>{extractDate(data.updatedAt)}</td>}
                <td>
                  {data.status === "ACTIVE" ? (
                    <span className="badge badges-Green">Active</span>
                  ) : (
                    <span className="badge badges-Red">Inactive</span>
                  )}
                </td>
                <td className="d-flex">
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
