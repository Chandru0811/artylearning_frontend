import React, { useEffect, useState } from "react";
import business from "../../assets/clientimage/business.png";
import gmail from "../../assets/clientimage/gmail.png";
import telephone from "../../assets/clientimage/telephone.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  email: Yup.string()
    .email("*Enter valid email")
    .required("*Email is required"),
  message: Yup.string().required("*Message is required"),
});

function Contact() {
  const [datas, setDatas] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
  });
  useEffect(() => {
    const getContactData = async () => {
      try {
        const response = await api.get("/getAllContactUsSavePublish");
        setDatas(response.data);
      } catch (error) {
        toast.error("Error Fetching Data: ", error.message);
      }
    };
    getContactData();
  }, []);
  console.log(datas);
  return (
    <div className="contact">
      <div className="container">
        <div className="row pt-5 pb-3">
          <div className="col-md-6 col-12 pt-3">
            <h1 style={{ fontWeight: "bolder", fontSize: "50px" }}>
              Let's Keep in Touch
            </h1>
            {datas &&
              datas.map((data) => (
                <div>
                  <p className="mt-2">{data.centerName}</p>
                  <span className="d-flex my-3">
                    <img
                      src={business}
                      alt="bussiness"
                      width={"30px"}
                      height={"30px"}
                    />
                    &nbsp;&nbsp;
                    <span className="mx-2" style={{ fontSize: "18px" }}>
                      {/* 806 Hougang Central, #04-146, Singapore 530806 */}
                      {data.address}
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
                      {data.email}
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
                      +{data.mobileNumber}
                    </span>
                  </span>
                </div>
              ))}
            {/* <p className="mt-5">Arty Learning @ AMK</p>
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
            </span> */}
            {/* <span className="d-flex mb-3">
              <img src={gmail} alt="gmail" width={"30px"} height={"30px"} />
              &nbsp;&nbsp;
              <span className="text-danger  mx-1" style={{ fontSize: "18px" }}>
                artylearning@gmail.com
              </span>
            </span> */}
            {/* <span className="d-flex mb-3">
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
            </span> */}
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

        <div className="row">
          {datas &&
            datas.map((data) => (
              <div className="col-md-4 col-12 p-2">
                <h4 style={{ fontWeight: "bolder" }}>{data.centerName}</h4>

                <iframe
                  src={data.map}
                  width="100%"
                  height="300px"
                  style={{ border: "none" }}
                  title="Map"
                ></iframe>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default Contact;
