import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import api from "../../config/URL";

export default function LevelView() {
  // const { id } = useParams();
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`/getAllCourseLevels/${id}`);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data ", error);
  //     }
  //   };
  //   getData();
  // }, [id]);

  return (
    <div>
      <div className="container">
        <div className="row mt-2 pb-3">
          <div className="my-3 d-flex justify-content-end mb-5">
            <Link to={"/cms/contact"}>
              <button type="button" className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
          </div>
          <div className="col-md-6 col-12">
            <div className="row   mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Centre Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Arty Learning @ Hougang</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2 ">
              <div className="col-6  ">
                <p className="fw-medium">Email</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 
                artylearning@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Mobile</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 
                +65 8821 4153</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Address</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 806 Hougang Central, #04-146, Singapore 530806</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Google Address</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
