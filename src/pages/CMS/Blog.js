import React from "react";
import img1 from "../../assets/clientimage/andy-ng.jpg";
import img2 from "../../assets/clientimage/Hero_Img.jpg";
import img3 from "../../assets/clientimage/IMG_195.png";
import img4 from "../../assets/clientimage/parent-img.jpeg";

const Blog = () => {
  return (
    <div>
      <div className="row m-0">
        <div className="col-md-7 col-12 p-3">
            <div className="row">
            <div className="col-md-12 col-12 p-3">
          <h2>Popular Articles</h2>
          <img src={img4} className="img-fluid py-1 rounded " />
          <h3>
            Guardians of the Pride: The Urgency of Loin Conservation Efforts{" "}
          </h3>
          <button className="btn btn-outline-dark btn-sm rounded-5">
            Species
          </button>
          </div>
            <div className="col-md-12 col-12 p-3">
          <h2>Popular Articles</h2>
          <img src={img4} className="img-fluid py-1 rounded " />
          <h3>
            Guardians of the Pride: The Urgency of Loin Conservation Efforts{" "}
          </h3>
          <button className="btn btn-outline-dark btn-sm rounded-5">
            Species
          </button>
          </div>
          </div>
        </div>
        <div className="col-md-5 col-12 p-3 my-5">
          <form>
            <div className="position-fixed w-100">
              <label>Name</label>
              <input type="text" className="form-control mb-4" />
              <label>Email</label>
              <input type="email" className="form-control mb-4" />
              <label>Mobile</label>
              <input type="text" className="form-control mb-4" />
              <label>Discription</label>
              <textarea type="text" className="form-control mb-4" rows={5} />
            </div>
          </form>
          {/* <div className="row">
            <div className="col-md-5 col-6 p-1">
              <div className="">
                <img src={img2} className="img-fluid  rounded" />
              </div>
            </div>
            <div className="col-md-7 col-6 p-1">
              <h5>Unveiling the Enigmatic world of Giant pandas </h5>
              <p>Unveiling the Enigmatic world of Giant pandas</p>
              <button className="btn btn-outline-dark btn-sm rounded-5">
                Species
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-6 p-1">
              <div className="">
                <img src={img3} className="img-fluid  rounded" />
              </div>
            </div>
            <div className="col-md-7 col-6 p-1">
              <h5>Unveiling the Enigmatic world of Giant pandas </h5>
              <p>Unveiling the Enigmatic world of Giant pandas</p>
              <button className="btn btn-outline-dark btn-sm rounded-5">
                Species
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-6 p-1">
              <div className="">
                <img src={img4} className="img-fluid  rounded" />
              </div>
            </div>
            <div className="col-md-7 col-6 p-1">
              <h5>Unveiling the Enigmatic world of Giant pandas </h5>
              <p>Unveiling the Enigmatic world of Giant pandas</p>
              <button className="btn btn-outline-dark btn-sm rounded-5">
                Species
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Blog;
