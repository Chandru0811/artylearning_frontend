import React from "react";
import business from "../../assets/clientimage/business.png";
import gmail from "../../assets/clientimage/gmail.png";
import telephone from "../../assets/clientimage/telephone.png";
import Iframe from "react-iframe";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  email: Yup.string()
    .email("*Enter valid email")
    .required("*Email is required"),
  message: Yup.string().required("*Message is required"),
});

function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
  });
  return (
    <div className="contact">
      <div className="container">
        <div className="row py-5">
          <div className="col-md-6 col-12 py-3">
            <h1 style={{ fontWeight: "bolder", fontSize: "50px" }}>
              Let's Keep in Touch
            </h1>
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
              <img src={gmail} alt="gmail" width={"30px"} height={"30px"} />
              &nbsp;&nbsp;
              <span className="text-danger  mx-1" style={{ fontSize: "18px" }}>
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
            <p className="mt-5">Arty Learning @ AMK</p>
            <span className="d-flex my-3">
              <img
                src={business}
                alt="bussiness"
                width={"30px"}
                height={"30px"}
              />
              &nbsp;&nbsp;
              <span className="mx-2" style={{ fontSize: "18px" }}>
                728 Ang Mo Kio Ave 6, #01-4216, Singapore 560728
              </span>
            </span>
            {/* <span className="d-flex mb-3">
              <img src={gmail} alt="gmail" width={"30px"} height={"30px"} />
              &nbsp;&nbsp;
              <span className="text-danger  mx-1" style={{ fontSize: "18px" }}>
                artylearning@gmail.com
              </span>
            </span> */}
            <span className="d-flex mb-3">
              <img
                src={telephone}
                alt="telephone"
                width={"30px"}
                height={"30px"}
              />
              &nbsp;&nbsp;
              <span className="mx-1" style={{ fontSize: "18px" }}>
                +65 9227 6868
              </span>
            </span>
          </div>
          <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
            
              <div className="card p-3" style={{ width: "100%" }}>
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="mb-2 form-group">
                      <label className="form-label">
                        <b>
                          Name<span className="text-danger">*</span>
                        </b>
                      </label>
                      <input
                        type="text"
                        style={{ height: "50px" }}
                        className={`form-control  ${
                          formik.touched.name && formik.errors.name
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="invalid-feedback">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                    <div className="mb-2 form-group">
                      <label className="form-label">
                        <b>
                          Email<span className="text-danger">*</span>
                        </b>
                      </label>
                      <input
                        type="email"
                        style={{ height: "50px" }}
                        className={`form-control  ${
                          formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                    <div className="mb-4 form-group">
                      <label className="form-label">
                        <b>
                          Message<span className="text-danger">*</span>
                        </b>
                      </label>
                      <input
                        type="text"
                        style={{ height: "50px" }}
                        className={`form-control  ${
                          formik.touched.message && formik.errors.message
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("message")}
                      />
                      {formik.touched.message && formik.errors.message && (
                        <div className="invalid-feedback">
                          {formik.errors.message}
                        </div>
                      )}
                    </div>
                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
           
          </div>
        </div>
        <div className="row py-5">
          <div className="col-md-6 col-12 p-4">
            <h4 style={{ fontWeight: "bolder" }}>Arty Learning @ Hougang</h4>
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
          <div className="col-md-6 col-12 p-4">
            <h4 style={{ fontWeight: "bolder" }}>Arty Learning @ AMK</h4>
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.673307615837!2d103.8430989749658!3d1.3727030986143165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da17835aa20b21%3A0x41c3c93369410510!2sArty%20Learning%20%40%20Ang%20Mo%20Kio%20%7C%20Enrichment%20Classes%20for%20Kids!5e0!3m2!1sen!2sin!4v1709642424960!5m2!1sen!2sin"
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
  );
}
export default Contact;
