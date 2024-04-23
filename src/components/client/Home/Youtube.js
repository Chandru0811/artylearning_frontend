import React from "react";

function Youtube() {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center m-3">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/UKr7rjf_8lU"
          title="230902 ARTY Learning AMK Opening"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Youtube;
