import React, { useEffect, useState } from "react";
import EnglishBanner from "../../components/client/EnglishCourse/EnglishBanner";
import EnglishCourseListing from "../../components/client/EnglishCourse/EnglishCourseListing";
import LeadForm from "../../components/client/EnglishCourse/LeadForm";
import api from "../../config/URL";
import { toast } from "react-toastify";

function EnglishCourse() {

  const [datas, setDatas] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get(`/getEnglishCoursePublish`);
      setDatas(response.data)
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };
useEffect(() => {
  getData();
}, []);

  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
      <EnglishBanner datas={datas}/>
      <EnglishCourseListing datas={datas}/>
     <LeadForm />
    </section>
  );
}

export default EnglishCourse;
