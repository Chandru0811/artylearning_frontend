import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
    country: Yup.string().required("*Country is required"),
    nationality: Yup.string().required("*Nationality is required"),
    citizenship: Yup.string().required("*Citizenship is required"),
});

function CountryEdit({ id, onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);
    const userName = localStorage.getItem("userName"); 
    const [isModified, setIsModified] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => { 
        setShow(true);
        setIsModified(false); 
      };
    const formik = useFormik({
        initialValues: {
            country: "",
            nationality: "",
            citizenship:"",
            updatedBy: userName,

        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // console.log(values);
            setLoadIndicator(true);
            try {
                const response = await api.put(`/updateCountrySetting/${id}`, values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    onSuccess();
                    handleClose();
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error);
            } finally {
                setLoadIndicator(false);
            }

        },
        enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (
        Object.values(values).some(value => typeof value === 'string' && value.trim() !== "")
      ) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    }
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/getAllCountrySettingById/${id}`);
                formik.setValues(response.data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };

        getData();
    }, []);

    return (
        <>
            <button className="btn btn-sm" onClick={handleShow}>
                <FaEdit />
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop={isModified ? "static" : true} 
                keyboard={isModified ? false : true} 
            >
                <Modal.Header closeButton>
                    <Modal.Title className="headColor">Country & Nationality Edit</Modal.Title>
                </Modal.Header>
                 <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
                    <Modal.Body>
                        <div className="container">
                            <div className="row py-4">

                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Country<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.country && formik.errors.country
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("country")}
                                    />
                                    {formik.touched.country && formik.errors.country && (
                                        <div className="invalid-feedback">
                                            {formik.errors.country}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Nationality<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.nationality && formik.errors.nationality
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("nationality")}
                                    />
                                    {formik.touched.nationality && formik.errors.nationality && (
                                        <div className="invalid-feedback">
                                            {formik.errors.nationality}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Citizenship<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.citizenship && formik.errors.citizenship
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("citizenship")}
                                    />
                                    {formik.touched.citizenship && formik.errors.citizenship && (
                                        <div className="invalid-feedback">
                                            {formik.errors.citizenship}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <button
                                type="submit"
                                onSubmit={formik.handleSubmit}
                                className="btn btn-button btn-sm"
                                disabled={loadIndicator}
                            >
                                {loadIndicator && (
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        aria-hidden="true"
                                    ></span>
                                )}
                                Update
                            </button>
                        </Modal.Footer>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
}

export default CountryEdit;
