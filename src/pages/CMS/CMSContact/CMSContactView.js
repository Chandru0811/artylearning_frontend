import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import api from "../../config/URL";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import business from "../../../assets/clientimage/business.png";
import gmail from "../../../assets/clientimage/gmail.png";
import telephone from "../../../assets/clientimage/telephone.png";
import Iframe from "react-iframe";

function CMSContactView({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    centreName: Yup.string().required("*Centre Name is required"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "*Enter a valid email address"
      )
      .required("*Email is required"),
    address: Yup.string().required("*Address is required"),
    gooleAddress: Yup.string().required("*Google Address is required"),
    mobile: Yup.string()
      .matches(
        /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
        "*Invalid Phone Number"
      )
      .required("*Mobile Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      centreName: "",
      email: "",
      address: "",
      googleAddress: "",
      mobile: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
    // onSubmit: async (values) => {
    //   setLoadIndicator(true);
    //   // console.log(values);
    //   try {
    //     const response = await api.post("/createCourseLevel", values, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     if (response.status === 201) {
    //       onSuccess();
    //       handleClose();
    //       toast.success(response.data.message);
    //     } else {
    //       toast.error(response.data.message);
    //     }
    //   } catch (error) {
    //     toast.error(error);
    //   }finally {
    //     setLoadIndicator(false);
    //   }
    // },
  });

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEye />
      </button>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">View Contact</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
          <div className="contact">
            <div className="container">
              <div className="row ">
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
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default CMSContactView;
