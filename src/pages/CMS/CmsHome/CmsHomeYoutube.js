import React, { useState } from "react";
import ReactPlayer from "react-player";
import { FaEdit, FaSave } from "react-icons/fa";

function CmsHomeYoutube() {
  const [editing, setEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=UKr7rjf_8lU"
  );

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const saveContent = () => {
    setEditing(false);
  };

  return (
    <div className="container mt-3 edit-container">
      <div className="d-flex justify-content-center align-items-center m-3">
        {editing ? (
          <div className="w-100">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="form-control"
              placeholder="Enter YouTube URL"
            />
            <button
              className="btn btn-sm btn-outline-primary border mt-2"
              onClick={saveContent}
            >
              <FaSave />
            </button>
          </div>
        ) : (
          <div className="position-relative w-100">
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="500px"
              controls
            />
            <button
              className="btn btn-sm border-transparent position-absolute top-0 end-0 m-2"
              onClick={toggleEdit}
            >
              <FaEdit className="text-warning fs-6"/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CmsHomeYoutube;
