import React, { useEffect, useState } from "react";
import api from "../../config/URL";

function Footer() {

  const [data, setData] = useState({});
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllHeaderSavePublish`);
        setData(response.data);
      } catch (error) {
        console.error("Error Fetching Data: " + error.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="text-muted" style={{ fontSize: "12px" }}>{data.copyRight || "Copyright@ArtyLearning2024"}</div>
    </div>
  );
}

export default Footer;
