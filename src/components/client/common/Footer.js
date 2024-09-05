import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import api from "../../../config/URL";
import { data } from "jquery";

function Footer() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getContactData = async () => {
      try {
        const response = await api.get("/getAllContactUsSavePublish");
        setDatas(response.data);
      } catch (error) {
        console.error("Error Fetching Data: ", error.message);
      }
    };
    getContactData();
  }, []);

  return (
    <section className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12 mt-3">
            {datas && datas.slice(0, 2).map((data, index) => (
              <>
                <h4 style={{ fontWeight: "400" }}>
                  <b>{data.centerName || "Arty Learning @ Hougang"}</b>
                </h4>

                {data.address || (
                  <>
                    <p>
                      806 Hougang Central, #04-146,
                      <br /> Singapore 530806
                    </p>
                  </>
                )}
              </>
            ))}
          </div>
          <div className="col-md-4 col-12 mt-3">
            {datas && datas.slice(2, 4).map((data, index) => (
              <>
                <h4 style={{ fontWeight: "400" }}>
                  <b>{data.centerName || "Arty Learning @ Hougang"}</b>
                </h4>

                {data.address || (
                  <>
                    <p>
                      806 Hougang Central, #04-146,
                      <br /> Singapore 530806
                    </p>
                  </>
                )}
              </>
            ))}
          </div>

          <div className="col-md-4 col-12 mt-3">
            <p style={{ fontSize: "20px", fontWeight: "500" }}>
              Subscribe to our newsletter
            </p>
            <p>
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>

            <div className="row">
              <div className="col-md-8 col-12">
                <input className="form-control mt-3 "></input>
              </div>
              <div className="col-md-4 col-12">
                <button className="mt-3 btn btn-danger btn-danger-button">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-12 mt-3">
            <p>© 2017 ~ 2024 ArtyLearning. All rights reserved.</p>
          </div>
          <div className="col-md-4 col-12 mt-3">
            <a
              href="https://artylearning.com/privacypolicy/index.html"
              style={{ color: "#000" }}
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-center">Privacy Policy</p>
            </a>
          </div>
          <div className="col-md-4 col-12 mt-3">
            <div className="d-flex align-items-center justify-content-between">
              <span>
                <a
                  href="https://artylearning.com/termsandconditions/index.html"
                  style={{ color: "#000" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>Terms & Condition </p>
                </a>
              </span>
              <span className="d-flex">
                <Link
                  to={"https://www.facebook.com/artylearning/reviews"}
                  className="mx-2"
                  style={{ color: "red" }}
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to={"https://www.instagram.com/artylearning/"}
                  className="mx-2"
                  style={{ color: "red" }}
                >
                  <FaInstagram />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
