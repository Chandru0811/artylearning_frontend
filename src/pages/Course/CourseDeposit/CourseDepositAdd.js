import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllSubjectsWithIds from "../../List/SubjectList";
import { useParams } from "react-router-dom";

function CourseFeesAdd({ onSuccess }) {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);


    const handleClose = () => {
        setShow(false);
        formik.resetForm();

    };

    const handleShow = () => {

        setShow(true);
    }



    const validationSchema = Yup.object({
        effectiveDate: Yup.string().required("*Effective Date is required"),
        depositFees: Yup.string().required("*Deposit Fees Code is required"),
        taxType: Yup.string().required("*TaxType is required"),
    });

    const formik = useFormik({
        initialValues: {
            effectiveDate: "",
            depositFees: "",
            taxType: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoadIndicator(true);

            try {
                const response = await api.post(`/createCourseDepositFees/${id}`, values, {
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
                    <Modal.Title className="headColor">Add Course Deposit</Modal.Title>
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
                                {/* <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Package<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...formik.getFieldProps("subjectId")}
                                        class={`form-select  ${formik.touched.subjectId && formik.errors.subjectId
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    >
                                        <option></option>
                                        {subjectData &&
                                            subjectData.map((subject) => (
                                                <option key={subject.id} value={subject.id}>
                                                    {subject.subjects}
                                                </option>
                                            ))}
                                    </select>
                                    {formik.touched.subjectId && formik.errors.subjectId && (
                                        <div className="invalid-feedback">
                                            {formik.errors.subjectId}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Weekday Fee<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.level && formik.errors.level
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("level")}
                                    />
                                    {formik.touched.level && formik.errors.level && (
                                        <div className="invalid-feedback">
                                            {formik.errors.level}
                                        </div>
                                    )}
                                </div> */}
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
                            {/* <Button variant="danger" type="submit">
                Submit
              </Button> */}
                        </Modal.Footer>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
}

export default CourseFeesAdd;