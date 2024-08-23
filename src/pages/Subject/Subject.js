import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import SubjectAdd from "./SubjectAdd";
import SubjectEdit from "./SubjectEdit";
import api from "../../config/URL";
import { SCREENS } from "../../config/ScreenFilter";
import { toast } from "react-toastify";

const Subject = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  console.log("Screens : ", SCREENS);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllCourseSubjects");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
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
      const response = await api.get("/getAllCourseSubjects");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container my-4">
      {storedScreens?.subjectCreate && (
        <div className="">
          <SubjectAdd onSuccess={refreshData} />
        </div>
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
              <th scope="col" style={{ whiteSpace: "nowrap" }}>
                S No
              </th>
              <th scope="col">Subject</th>
              <th scope="col">Subject Code</th>
              <th scope="col">Status</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.subject}</td>
                <td className="text-break">{data.code}</td>
                <td>
                  {" "}
                  {data.status === "Active" ? (
                    <span className="badge badges-Green">Active</span>
                  ) : (
                    <span className="badge badges-Red">Inactive</span>
                  )}
                </td>
                <td>
                  <div className="d-flex">
                    {/* {storedScreens?.subjectRead && (
                      <Link to={`/subject/view/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )} */}

                    {storedScreens?.subjectUpdate && (
                      <SubjectEdit id={data.id} onSuccess={refreshData} />
                    )}

                    {storedScreens?.subjectDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteCourseSubject/${data.id}`}
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

export default Subject;
