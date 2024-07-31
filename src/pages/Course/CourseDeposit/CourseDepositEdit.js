import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";


function CourseFeesEdit({ id, onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);


    const handleClose = () => {
        setShow(false);

    };
    const handleShow = () => {

        setShow(true);
    };




    const validationSchema = Yup.object({
        effectiveDate: Yup.string().required("*Effective Date is required"),
        depositFees: Yup.string().required("*Deposit Fees Code is required"),
        // weekdayFee: Yup.string().required("*WeekdayFee is required"),
        // weekendFee: Yup.string().required("*WeekendFee is required"),
        taxType: Yup.string().required("*TaxType is required"),
    });

    const formik = useFormik({
        initialValues: {
            effectiveDate: "",
            depositFees: "",
            // weekdayFee: "",
            // weekendFee: "",
            taxType: "",
        },
        validationSchema: validationSchema, // Assign the validation schema
        onSubmit: async (values) => {
            // console.log(values);
            setLoadIndicator(true);

            try {
                const response = await api.put(`/updateCourseDepositFees/${id}`, values, {
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
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/getAllCourseDepositFeesById/${id}`);
                formik.setValues(response.data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };

        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            >
                <Modal.Header closeButton>
                    <Modal.Title className="headColor">Edit Course Deposit</Modal.Title>
                </Modal.Header>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <div className="container">
                            <div className="row py-4">
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Effective Date<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className={`form-control  ${formik.touched.effectiveDate && formik.errors.effectiveDate
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("effectiveDate")}
                                    />
                                    {formik.touched.effectiveDate && formik.errors.effectiveDate && (
                                        <div className="invalid-feedback">
                                            {formik.errors.effectiveDate}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Deposit Fees<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.depositFees && formik.errors.depositFees
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("depositFees")}
                                    />
                                    {formik.touched.depositFees && formik.errors.depositFees && (
                                        <div className="invalid-feedback">
                                            {formik.errors.depositFees}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Tax Type<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...formik.getFieldProps("taxType")}
                                        class={`form-select  ${formik.touched.taxType && formik.errors.taxType
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option></option>
                                        <option>Taxable</option>
                                        <option>Non-Taxable</option>
                                    </select>
                                    {formik.touched.taxType && formik.errors.taxType && (
                                        <div className="invalid-feedback">
                                            {formik.errors.taxType}
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

export default CourseFeesEdit;