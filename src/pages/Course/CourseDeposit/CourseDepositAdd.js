import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllSubjectsWithIds from "../../List/SubjectList";

function CourseFeesAdd({ onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [subjectData, setSubjectData] = useState(null);

    const handleClose = () => {
        setShow(false);
        formik.resetForm();
        setSubjectData(null);
    };

    const handleShow = () => {
        fetchData();
        setShow(true);
    }

    useEffect(() => {
        fetchData();
    }, [show]);

    const fetchData = async () => {
        try {
            const subject = await fetchAllSubjectsWithIds();
            setSubjectData(subject);
        } catch (error) {
            toast.error(error);
        }
    };

    const validationSchema = Yup.object({
        effectiveDate: Yup.string().required("*Effective Date is required"),
        depositFees: Yup.string().required("*Deposit Fees Code is required"),
        // weekdayFee: Yup.string().required("*Weekday Fee is required"),
        // weekendFee: Yup.string().required("*Weekend Fee is required"),
        taxType: Yup.string().required("*TaxType Fee is required"),
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
            setLoadIndicator(true);

            try {
                const response = await api.post("/createCourseLevels", values, {
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
                    <Modal.Title className="headColor">Add Course Fees</Modal.Title>
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
                                        className={`form-control  ${formik.touched.levelCode && formik.errors.levelCode
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("levelCode")}
                                    />
                                    {formik.touched.levelCode && formik.errors.levelCode && (
                                        <div className="invalid-feedback">
                                            {formik.errors.levelCode}
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
                                        className={`form-control  ${formik.touched.levelCode && formik.errors.levelCode
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("levelCode")}
                                    />
                                    {formik.touched.levelCode && formik.errors.levelCode && (
                                        <div className="invalid-feedback">
                                            {formik.errors.levelCode}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Tax Type<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...formik.getFieldProps("status")}
                                        class={`form-select  ${formik.touched.status && formik.errors.status
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        aria-label="Default select example"
                                    >
                                        <option selected></option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {formik.touched.status && formik.errors.status && (
                                        <div className="invalid-feedback">
                                            {formik.errors.status}
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
