import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
// import { Link } from "react-router-dom";
// import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";
// import { SCREENS } from "../../../config/ScreenFilter";
import CurriculumOutletAdd from "./CurriculumOutletAdd";
import CurriculumOutletEdit from "./CurriculumOutletEdit";
import { Link, useParams } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CurriculumOutlet() {
  // console.log("Screens : ", SCREENS);
  const { id } = useParams();
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getCurriculumOutLetByCourseId/${id}`);
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
      const response = await api.get(`/getCurriculumOutLetByCourseId/${id}`);
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container my-4">
      {storedScreens?.levelCreate && (
        <CurriculumOutletAdd onSuccess={refreshData} />
      )}
      {/* <div className="my-3 d-flex justify-content-end mb-5">
                {storedScreens?.courseCreate && (
                    <Link to={{
                        pathname: "/course/coursefees/add",
                        state: { subjectData }
                    }}>
                        <button type="button" className="btn btn-button btn-sm">
                            Add <i class="bx bx-plus"></i>
                        </button>
                    </Link>
                )}
            </div> */}
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
              <th scope="col">Effective Date</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas?.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.effectiveDate}</td>
                <td>{data.name}</td>
                <td>
                  {data.status === "ACTIVE" ? (
                    <span className="badge badges-Green">Active</span>
                  ) : (
                    <span className="badge badges-Red">Inactive</span>
                  )}
                </td>
                <td className="d-flex">
                  {/* {storedScreens?.courseRead && (
                    <CurriculumOutletView
                      id={data.id}
                      onSuccess={refreshData}
                    />
                  )} */}
                  {storedScreens?.courseUpdate && (
                    <CurriculumOutletEdit
                      id={data.id}
                      courseId={id}
                      onSuccess={refreshData}
                    />
                  )}
                  {/* {storedScreens?.curriculumIndex && (
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id="tooltip-top">Curriculum</Tooltip>}
                                        >
                                            
                                        </OverlayTrigger>
                                    )} */}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">Course Curriculum</Tooltip>
                    }
                  >
                    <Link
                      to={`/curriculumoutlet/curriculum/${data.id}?courseId=${id}`}
                    >
                      <button className="btn btn-sm">
                        <FaFileInvoice />
                      </button>
                    </Link>
                  </OverlayTrigger>

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
}

export default CurriculumOutlet;
