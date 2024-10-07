import React, { useEffect, useState } from "react";
import LeadForm from "../../components/client/EnglishCourse/LeadForm";
import api from "../../config/URL";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import CoursesBanner from "../../components/client/EnglishCourse/EnglishBanner";
import CoursesListing from "../../components/client/EnglishCourse/EnglishCourseListing";

function ParticulerCourse() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);

  const getData = async () => {
    // setLoading(true);
    try {
      const response = await api.get(`/getCoursesSaveById/${id}`);
      setDatas(response.data);
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
      <>
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
          <>
            <CoursesBanner datas={datas} getData={getData} />
            <CoursesListing datas={datas} getData={getData} />
            <LeadForm />
          </>
        )}
      </>
    </section>
  );
}

export default ParticulerCourse;
