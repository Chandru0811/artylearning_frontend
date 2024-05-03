import React, { forwardRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  contactNo: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
  studentEmergencyContactPostalCode: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
});

const AddEmergencyContact = forwardRef(({ id, getData }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log("Id:", id);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      authorizedRelation: "",
      contactNo: "",
      studentEmergencyContactPostalCode: "",
      studentEmergencyContactAddress: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      console.log("Api Data:", data);
      try {
        const response = await api.put(
          `/updateStudentEmergencyContact/${id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          handleClose();
          getData();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const response = await api.get(
          `/getAllStudentEmergencyContactsById/${id}`
        );
        formik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEmergencyData();
  }, []);

  return (
    <div className="container-fluid">
      <button className="btn" type="button">
        <FaEdit onClick={handleShow} />
      </button>
      <div className="row">
        <Modal
          show={show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={handleClose}
        >
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                <p className="headColor">
                  Authorized Person to Take Child from Class
                </p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">Name</lable>
                  <div className="input-group mb-3">
                    <input
                      className="form-control "
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">Contact No</lable>
                  <input
                    className="form-control "
                    type="text"
                    name="contactNo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contactNo}
                  />
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label>Relation</label>
                  <br />
                  <select
                    name="authorizedRelation"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.authorizedRelation}
                    className="form-select"
                  >
                    <option value=""></option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                  </select>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">Postal Code</lable>
                  <input
                    className="form-control "
                    type="text"
                    name="studentEmergencyContactPostalCode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.studentEmergencyContactPostalCode}
                  />
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">
                    Address<span className="text-danger">*</span>
                  </lable>
                  <textarea
                    className="form-control "
                    type="text"
                    name="studentEmergencyContactAddress"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.studentEmergencyContactAddress}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="mt-3">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="danger"
                onSubmit={formik.handleSubmit}
              >
                Update
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
});

export default AddEmergencyContact;
