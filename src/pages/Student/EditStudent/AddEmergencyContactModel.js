import React, { forwardRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const validationSchema = Yup.object().shape({
  contactNo: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
  postalCode: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
});

const AddEmergencyContactModel = forwardRef(
  ({ id, emergencyId, formValue, getData, formData }) => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true);
      // console.log("Id:", id);
      // console.log("Emergency Id:", formValue);
    };

    const formik = useFormik({
      initialValues: {
        name: "",
        emergencyRelation: "",
        contactNo: "",
        postalCode: "",
        emergencyContactAddress: "",
        files: null || "",
      },
      // validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Api Data:", data);
        try {
          let record = [{}];
          const formDatas = new FormData();
          formDatas.append(
            "emergencyContactName",
            formValue.emergencyContactName
          );
          formDatas.append("emergencyContactNo", formValue.emergencyContactNo);
          formDatas.append("emergencyRelation", formValue.emergencyRelation);
          formDatas.append("deleteEmergencyAuthorizedContactIds ", 1);
          record.forEach((contact) => {
            formDatas.append("emergencyAuthorizedContactIds", id);
            formDatas.append("name", data.name);
            formDatas.append("contactNo", data.contactNo);
            formDatas.append("authorizedRelation", data.authorizedRelation);
            formDatas.append("postalCode", data.postalCode);
            formDatas.append("emergencyContactAddress",data.emergencyContactAddress
            );
            formDatas.append("files", data.files);
            formDatas.append("deleteEmergencyAuthorizedContactIds ", 1);
          });
          const response = await api.put(
            `/updateEmergencyContactWithEmergencyAuthorizedContact/${emergencyId}`,
            formDatas,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Specify the Content-Type header
              },
            }
          );
          // const response = await api.post(
          //   `/createEmergencyContactWithEmergencyAuthorizedContact/${formData.id}`,
          //   formDatas,
          //   {
          //     headers: {
          //       "Content-Type": "multipart/form-data", // Specify the Content-Type header
          //     },
          //   }
          // );
          if (response.status === 200) {
            toast.success(response.data.message);
            handleClose();
            getData();
            fetchEmergencyData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }
      },
    });

    const fetchEmergencyData = async () => {
      try {
        const response = await api.get(
          `/getAllStudentEmergencyContactsById/${emergencyId}`
        );
        let EmergencyData = response.data.emergencyAuthorizedContactModels;
        console.log(response.data);
        EmergencyData.forEach((emergency) => {
          if (parseInt(id) === emergency.id) {
            console.log("emergency", emergency);
            formik.setValues(emergency || "");
            setData(emergency);
          }
        });
        // formik.setValues(response.data || "");
        // console.log("getAllStudentEmergencyContactsById",EmergencyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchEmergencyData();
    }, []);

    return (
      <div className="container-fluid">
        <button
          onClick={handleShow}
          type="button"
          className="btn btn-border btn-sm"
        >
          <i className="bx bx-plus"></i> Add
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
                      name="postalCode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.postalCode}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <lable className="">
                      Address<span className="text-danger">*</span>
                    </lable>
                    <textarea
                      className="form-control "
                      type="text"
                      name="emergencyContactAddress"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.emergencyContactAddress}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Person Profile</small>&nbsp;
                    </label>
                    <br />
                    <input
                      className="form-control"
                      type="file"
                      name="files"
                      onChange={(event) => {
                        formik.setFieldValue("files", event.target.files[0]);
                      }}
                      onBlur={formik.handleBlur}
                      accept=".jpg, .jpeg, .png"
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
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
);

export default AddEmergencyContactModel;
