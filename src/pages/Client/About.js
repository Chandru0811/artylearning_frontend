import React, { useEffect, useState } from "react";
import AboutUs from "../../components/client/About/AboutUs";
import Support from "../../components/client/About/Support";
import AboutAmanda from "../../components/client/About/AboutAmanda";
import Personalized from "../../components/client/About/Personalized";
import AboutJoinUs from "../../components/client/About/AboutJoinUs";
import api from "../../config/URL";
import { toast } from "react-toastify";

function About() {
  const [datas, setDatas] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllAboutUsSavePublish`);
      setDatas(response.data);
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="about_us">
      <AboutUs datas={datas}/>
      <Support datas={datas}/>
      <AboutAmanda datas={datas}/>
      <Personalized datas={datas}/>
      <AboutJoinUs />
    </section>
  );
}

export default About;
