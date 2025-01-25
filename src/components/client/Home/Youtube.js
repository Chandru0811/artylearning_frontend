import React, { useEffect, useState } from "react";
import api from "../../../config/URL";

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

  // Helper function to ensure the video URL is an embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const youtubeRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|(?:watch\?v=))([^"&?\/\s]{11}))/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url; // Return the original URL if not a YouTube link
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center m-3">
        {/* YouTube Embed or Default Fallback */}
        <iframe
          src={getEmbedUrl(data.childVideo) || "https://www.youtube.com/embed/UKr7rjf_8lU"}
          width="100%"
          height="500px"
          style={{ border: "none" }}
          title="YouTube Video"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Youtube;
