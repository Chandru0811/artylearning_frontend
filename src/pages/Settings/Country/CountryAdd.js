import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function CountryAdd({ onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);

    const handleClose = () => {
        setShow(false);
        formik.resetForm();
    };

    const handleShow = () => setShow(true);

    const validationSchema = Yup.object({
        country: Yup.string().required("*Country is required"),
        nationality: Yup.string().required("*Nationality is required"),
        citizenship: Yup.string().required("*Citizenship is required"),
    });

    const formik = useFormik({
        initialValues: {
            country: "",
            nationality: "",
            citizenship:""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoadIndicator(true);
            // console.log(values);
            try {
                const response = await api.post("/createCountrySetting", values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 201) {
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
    });

    return (
        <>
            <div className="mb-5 mt-3 d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-button btn-sm"
                    onClick={handleShow}
                >
                    Add <i class="bx bx-plus"></i>
                </button>
            </div>
            <Modal show={show} size="lg" onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="headColor">Add Country & Nationality</Modal.Title>
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
                            <Button type="button" variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="btn btn-button btn-sm"
                                disabled={loadIndicator}
                            >
                                {loadIndicator && (
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        aria-hidden="true"
                                    ></span>
                                )}
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
}

export default CountryAdd;
