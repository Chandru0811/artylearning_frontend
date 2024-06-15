import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import { Link, useParams } from "react-router-dom";
import business from "../../../assets/clientimage/business.png";
import gmail from "../../../assets/clientimage/gmail.png";
import telephone from "../../../assets/clientimage/telephone.png";
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
          <div className="contact">
            <div className="container">
              <div className="row pt-5">
                <div className="col-md-6 col-12 py-3">
                  <p className="mt-2">Arty Learning @ Hougang</p>
                  <span className="d-flex my-3">
                    <img
                      src={business}
                      alt="bussiness"
                      width={"30px"}
                      height={"30px"}
                    />
                    &nbsp;&nbsp;
                    <span className="mx-2" style={{ fontSize: "18px" }}>
                      806 Hougang Central, #04-146, Singapore 530806
                    </span>
                  </span>
                  <span className="d-flex mb-3">
                    <img
                      src={gmail}
                      alt="gmail"
                      width={"30px"}
                      height={"30px"}
                    />
                    &nbsp;&nbsp;
                    <span
                      className="text-danger  mx-1"
                      style={{ fontSize: "18px" }}
                    >
                      artylearning@gmail.com
                    </span>
                  </span>
                  <span className="d-flex mb-3">
                    <img
                      src={telephone}
                      alt="telephone"
                      width={"30px"}
                      height={"30px"}
                    />
                    &nbsp;&nbsp;
                    <span className="mx-1" style={{ fontSize: "18px" }}>
                      +65 8821 4153
                    </span>
                  </span>
                </div>
              </div>
              <div className="row pb-5">
                <div className="col-md-6 col-12 p-4">
                  <Iframe
                    url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6759974761326!2d103.89156087496583!3d1.3710896986159518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da171a746bd625%3A0x1c735a076971a9a5!2sArty%20Learning%20%40%20Hougang%20%7C%20Enrichment%20Classes%20for%20Kids!5e0!3m2!1sen!2sin!4v1709641787810!5m2!1sen!2sin"
                    height="450"
                    width="100%"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
