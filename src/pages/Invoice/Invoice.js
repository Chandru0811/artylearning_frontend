import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllStudentsWithIds from "../List/StudentList";
import { toast } from "react-toastify";
// import { SCREENS } from "../../config/ScreenFilter";

const Invoice = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [packageData, setPackageData] = useState(null);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const courseData = await fetchAllCoursesWithIds();
      const studentData = await fetchAllStudentsWithIds();
      const packageData = await api.get("getAllCentersPackageWithIds");
      setPackageData(packageData.data);
      setCenterData(centerData);
      setCourseData(courseData);
      setStudentData(studentData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllGenerateInvoices");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    fetchData();
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
      const response = await api.get("/getAllGenerateInvoices");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container my-4">
      <div className="my-3 d-flex justify-content-end mb-5">
        {storedScreens?.invoiceCreate && (
          <Link to="/invoice/add">
            <button type="button" className="btn btn-button btn-sm">
              Add <i class="bx bx-plus"></i>
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
              <th scope="col">Course</th>
              <th scope="col">Centre</th>
              <th scope="col">Student</th>
              <th scope="col">Package</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {courseData &&
                    courseData.map((course) =>
                      parseInt(data.courseId) === course.id
                        ? course.courseNames || "--"
                        : ""
                    )}
                </td>
                <td>
                  {centerData &&
                    centerData.map((center) =>
                      parseInt(data.centerId) === center.id
                        ? center.centerNames || "--"
                        : ""
                    )}
                </td>
                <td>
                  {studentData &&
                    studentData.map((student) =>
                      parseInt(data.studentId) === student.id
                        ? student.studentNames || "--"
                        : ""
                    )}
                </td>
                <td>
                  {packageData &&
                    packageData.map((packages) =>
                      parseInt(data.packageId) === packages.id
                        ? packages.packageNames || "--"
                        : ""
                    )}
                </td>
                <td>
                  {data.invoiceStatus === "PAID" ? (
                      <span className="badge badges-Green">Paid</span>
                    ) : data.invoiceStatus === "CANCELLED" ? (
                      <span className="badge badges-Red">Cancelled</span>
                    ) : (
                      <span className="badge badges-Yellow">Pending</span>
                    )}
                </td>
                <td>
                  <div className="d-flex">
                    {storedScreens?.invoiceRead && (
                      <Link to={`/invoice/view/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.invoiceUpdate && (
                      <Link to={`/invoice/edit/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEdit />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.invoiceDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteGenerateInvoice/${data.id}`}
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

export default Invoice;
