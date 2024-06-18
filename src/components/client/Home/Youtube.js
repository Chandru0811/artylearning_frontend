import React, { useEffect, useState } from "react";
import api from "../../../config/URL";
import ReactPlayer from "react-player";

function Youtube() {

  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllHomeSavePublish`);
        setData(response.data);
      } catch (error) {
        console.error("Error Fetching Data: " + error.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center m-3">
        <ReactPlayer
              url={data.childVideo || "https://www.youtube.com/embed/UKr7rjf_8lU"}
              width="100%"
              height="500px"
              controls
            />
      </div>
    </div>
  );
}

export default Youtube;
