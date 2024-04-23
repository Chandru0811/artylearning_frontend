import React, { useState, useEffect } from "react";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const API_KEY = "9lWOBelBJ2VVDyumARDRk8y9GOECuexmxHhTeuYHW4zU2NGHhXh6DMRT";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://api.pexels.com/videos/search?query=nature&per_page=10",
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVideos();
  }, []);

  // Function to trigger download
  const handleDownload = (videoUrl, fileName) => {
    fetch(videoUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  return (
    <div className="container">
      <h1 className="mt-4">Nature Videos</h1>
      <div className="row">
        {videos.map((video) => (
          <div key={video.id} className="col-md-6 mb-4">
            <video className="w-100" controls height="300">
              <source
                src={video.video_files[0].link}
                type={video.video_files[0].file_type}
              />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() =>
                handleDownload(
                  video.video_files[0].link,
                  `nature_video_${video.id}.${video.video_files[0].file_type.split('/')[1]}`
                )
              }
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
