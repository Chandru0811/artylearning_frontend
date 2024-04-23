import React, { useState, useEffect } from "react";
import axios from "axios";

function DisplayMedia() {
  const [mediaData, setMediaData] = useState([]);

  useEffect(() => {
    // Fetch media data from the API
    fetchMediaData();
  }, []);

  // Function to fetch media data from the API
  async function fetchMediaData() {
    try {
      const response = await axios.get(
        "http://13.213.208.92:7080/ecssms/api/downloadStudentImageContent/33?studentId=2"
      );
      const data = response.data.contents;
      setMediaData(data);
    } catch (error) {
      console.error("Error fetching media data:", error);
    }
  }

  // Function to render media based on type
  function renderMedia(item, index) {
    if (item.type === "image") {
      return (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          key={index}
          src={convertToBase64(item.data)}
          alt={`Image ${index + 1}`}
        />
      );
    } else if (item.type === "video") {
      return (
        <video
          key={index}
          controls
          width="400"
          height="300"
          autoplay
          loop
          muted
        >
          <source src={convertToBase64(item.data)} type="video/mp4" />
        </video>
      );
    }
    return null;
  }

  // Function to convert byte data to Base64 URL
  function convertToBase64(data) {
    const base64String = btoa(
      new Uint8Array(data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:image/png;base64,${base64String}`;
  }

  return <div>{mediaData.map((item, index) => renderMedia(item, index))}</div>;
}

export default DisplayMedia;
