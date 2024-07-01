import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function ShgAdd({ onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);
    const handleClose = () => {
        setShow(false);
        formik.resetForm();
    };
    const handleShow = () => setShow(true);
    const validationSchema = Yup.object({
        shgType: Yup.string().required("*Shg Type is required"),
        shgAmount: Yup.string().required("*Shg Amount is required"),
    });

    const formik = useFormik({
        initialValues: {
            shgType: "",
            shgAmount: "",
        },
        validationSchema: validationSchema, 
        onSubmit: async (values) => {
            setLoadIndicator(true);
            // console.log(values);
            try {
                const response = await api.post("/createSHGSetting", values, {
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
                    <Modal.Title className="headColor">Add Shg</Modal.Title>
                </Modal.Header>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <div className="container">
                            <div className="row py-4">
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        shg Type<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.shgType && formik.errors.shgType
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("shgType")}
                                    />
                                    {formik.touched.shgType && formik.errors.shgType && (
                                        <div className="invalid-feedback">
                                            {formik.errors.shgType}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        shg Amount<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.shgAmount && formik.errors.shgAmount
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("shgAmount")}
                                    />
                                    {formik.touched.shgAmount && formik.errors.shgAmount && (
                                        <div className="invalid-feedback">
                                            {formik.errors.shgAmount}
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

export default ShgAdd;
