import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import CurriculumAdd from "./CurriculumAdd";
import CurriculumEdit from "./CurriculumEdit";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { useParams, useSearchParams } from "react-router-dom";
import fetchAllCoursesWithIds from "../List/CourseList";
import { toast } from "react-toastify";

const Curriculum = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const fetchData = async () => {
    try {
      const courseData = await fetchAllCoursesWithIds();
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(
          `/getCourseCurriculumCodeCurriculumOutLetId/${id}`
        );
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
    fetchData();
  }, [id]);

  useEffect(() => {
    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
  }, [loading]);

 
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
      const response = await api.get(
        `/getCourseCurriculumCodeCurriculumOutLetId/${id}`
      );
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };


  return (
    <div className="container my-4">
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
        <>
          {storedScreens?.curriculumCreate && (
            <CurriculumAdd
              onSuccess={refreshData}
              curriculumOutletId={id}
              courseId={courseId}
            />
          )}
          <div className="table-responsive">
            <table ref={tableRef} className="display">
              <thead>
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S No
                  </th>
                  {/* <th scope="col">Course</th> */}
                  <th scope="col">Lesson No.</th>
                  <th scope="col">Curriculum Code</th>
                  <th scope="col">Curriculum Number</th>
                  {/* <th scope="col">Description</th> */}
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    {/* <td>
                    {courseData &&
                      courseData.map((course) =>
                        parseInt(data.courseId) === course.id
                          ? course.courseNames || "--"
                          : ""
                      )}
                  </td> */}
                    <td>{data.lessonNo}</td>
                    <td>{data.curriculumCode}</td>
                    <td>{data.curriculumNo}</td>
                    {/* <td>{data.description}</td> */}
                    <td>
                      <td>
                        {data.status === "ACTIVE" ? (
                          <span className="badge badges-Green">Active</span>
                        ) : (
                          <span className="badge badges-Red">Inactive</span>
                        )}
                      </td>
                    </td>
                    <td>
                      {storedScreens?.curriculumUpdate && (
                        <CurriculumEdit
                          id={data.id}
                          curriculumOutletId={id}
                          onSuccess={refreshData}
                        />
                      )}
                      {storedScreens?.curriculumDelete && (
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteCourseCurriculumCode/${data.id}`}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Curriculum;
