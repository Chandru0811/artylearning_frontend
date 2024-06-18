import React, { useEffect, useState } from "react";
import ChineseBanner from "../../components/client/Chinese/ChineseBanner";
import ChineseCourseListing from "../../components/client/Chinese/ChineseCourseListing";
import LeadForm from "../../components/client/EnglishCourse/LeadForm";
import api from "../../config/URL";
import { toast } from "react-toastify";

function ChineshCourse() {

  const [datas, setDatas] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get(`/getChineseCoursePublish`);
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
      <ChineseBanner datas={datas}/>
      <ChineseCourseListing datas={datas}/>
      <LeadForm />
    </section>
  );
}

export default ChineshCourse;
