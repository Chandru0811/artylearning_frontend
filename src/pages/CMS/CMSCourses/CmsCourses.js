import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { toast } from "react-toastify";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";
import CmsCourseEdit from "./CmsCourseEdit";
import CmsCourseAdd from "./CmsCourseAdd";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const CmsCourses = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllCourses = async () => {
    try {
      const response = await api.get("/getAllCoursesSave");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
    }
  };

  useEffect(() => {
    getAllCourses();
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
      const response = await api.get("/getAllCoursesSave");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const coursesPublish = async () => {
    try {
      const response = await api.post(`/publishCourses`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        getAllCourses();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  return (
    <div className="container center p-0">
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
          Courses
        </li>
      </ol>
      <div className="container cms-header shadow-sm py-2 mb-4">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Courses</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {storedScreens?.testimonialCreate && (
              <Link to={"/cms/CmsCourses/add"}>
                <button type="button" className="btn btn-button btn-sm">
                  Add <i class="bx bx-plus"></i>
                </button>
              </Link>
            )}
            {storedScreens?.testimonialIndex && (
              <button
                onClick={coursesPublish}
                className="btn btn-sm btn-outline-danger border ms-2"
                style={{ whiteSpace: "nowrap" }}
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
                <th
                  scope="col"
                  className="text-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  S No
                </th>
                <th scope="col" className="text-center">
                  Menu Logo
                </th>
                <th scope="col" className="text-center">
                  Menu Title
                </th>
                <th scope="col" className="text-center">
                  Heading
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    <img
                      src={data.menuLogo}
                      className="img-fluid"
                      alt="image"
                      width={50}
                    />
                  </td>
                  <td className="text-center">{data.menuTitle}</td>
                  <td className="text-center"> {data.heading}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center">
                      {storedScreens?.testimonialUpdate && (
                        <Link to={`/cms/CmsCourses/edit/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEdit />
                          </button>
                        </Link>
                      )}

                      {storedScreens?.testimonialDelete && (
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteCoursesSave/${data.id}`}
                          style={{ display: "inline-block" }}
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

export default CmsCourses;
