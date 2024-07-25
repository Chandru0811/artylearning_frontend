import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllSubjectsWithIds from "../../List/SubjectList";

function CourseFeesEdit({ id, onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [subjectData, setSubjectData] = useState(null);

    const handleClose = () => {
        setShow(false);
        setSubjectData(null);
    };
    const handleShow = () => {
        fetchData();
        setShow(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                const response = await api.put(`/updateCourseLevel/${id}`, values, {
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
                const response = await api.get(`/getAllCourseLevels/${id}`);
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
                    <Modal.Title className="headColor">Edit Course Fees</Modal.Title>
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
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Deposit Fees<span className="text-danger">*</span>
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

                                {/* <div className="col-md-6 col-12 mb-2">
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
                                </div>
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        WeekEnd Fee<span className="text-danger">*</span>
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
                                </div> */}
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
