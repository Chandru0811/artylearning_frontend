import React, { useEffect } from "react";
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
import { useParams } from "react-router-dom";
import api from "../../../config/URL";

function CMSContactView({ id }) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getContactUsSaveById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error fetching data ", error);
      }
    };
    getData();
    // fetchData();
  }, [id]);

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEye />
      </button>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">View Contact</Modal.Title>
        </Modal.Header>
        <form >
          <Modal.Body>
            <div className="contact">
              <div className="container">
                <div className="row ">
                  <div className="col-md-6 col-12 py-3">
                    {data.className || ""}
                    <span className="d-flex my-3">
                      <img
                        src={business}
                        alt="bussiness"
                        width={"30px"}
                        height={"30px"}
                      />
                      &nbsp;&nbsp;
                      <span className="mx-2" style={{ fontSize: "18px" }}>
                        {data.address || ""}
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
                        {data.email || ""}
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
                        {data.mobileNo || ""}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="row pb-5">
                  <div className="col-md-6 col-12 p-4">
                    {data.map && (
                      <iframe
                        src={data.map}
                        width="100%"
                        height="500px"
                        style={{ border: 'none' }}
                        title="Map"
                      ></iframe>
                    )}
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
