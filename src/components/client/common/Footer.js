import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import api from "../../../config/URL";
import { BsWhatsapp } from "react-icons/bs";
function Footer() {
  const [datas, setDatas] = useState([]);
  const [footerDatas, setFooterDatas] = useState([]);

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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllHeaderSavePublish`);
        setFooterDatas(response.data.copyRight);
      } catch (error) {
        console.error("Error Fetching Data: " + error.message);
      }
    };
    getData();
  }, []);

  return (
    <section className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12 mt-3">
            {datas &&
              datas.slice(0, 2).map((data, index) => (
                <>
                <div className="mb-3">
                <h4 style={{ fontWeight: "400" }}>
                    <b>{data.centerName || "Arty Learning @ Hougang"}</b>
                  </h4>
                  {/* {data.socialLike || (
                    <>
                      <BsWhatsapp className="fs-5 text-success"/>
                       &nbsp;
                       &nbsp;
                      <a
                        href="https://api.whatsapp.com/send/?text=https%3A%2F%2Fsgitjobs.com%2Fdealslah%2Fdeal%2F138&type=custom_url&app_absent=0"
                        target="_blank"
                        className="decoration-none text-dark" 
                      >
                        Whatsapp
                      </a>
                    </>
                  )} */}
                  {data.address || (
                    <>
                      <p>
                        806 Hougang Central, #04-146,
                        <br /> Singapore 530806
                      </p>
                    </>
                  )}

                </div>
                  
                </>
              ))}
          </div>
          <div className="col-md-4 col-12 mt-3">
            {datas &&
              datas.slice(2, 4).map((data, index) => (
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
                  {/* <Iframe
                  // url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.673307615837!2d103.8430989749658!3d1.3727030986143165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da17835aa20b21%3A0x41c3c93369410510!2sArty%20Learning%20%40%20Ang%20Mo%20Kio%20%7C%20Enrichment%20Classes%20for%20Kids!5e0!3m2!1sen!2sin!4v1709642424960!5m2!1sen!2sin"
                  src={data.map}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                /> */}
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
        <div className="row mt-3">
          <div className="col-md-4 col-12">
            <p>{footerDatas}</p>
          </div>
          <div className="col-md-4 col-12">
            <Link
              to="/privacypolicy"
              style={{ color: "#000" }}
              rel="noreferrer"
            >
              <p className="text-center">Privacy Policy</p>
            </Link>
          </div>
          <div className="col-md-2 col-12">
            <span>
              <Link
                to="/terms&conditions"
                style={{ color: "#000" }}
                rel="noreferrer"
              >
                <p className="text-center">Terms & Condition </p>
              </Link>
            </span>
          </div>
          <div className="col-md-2 col-12">
            <span className="d-flex justify-content-end">
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
    </section>
  );
}

export default Footer;
