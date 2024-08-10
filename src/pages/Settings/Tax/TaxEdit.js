import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function TaxEdit({ id, onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validationSchema = Yup.object({
        taxType: Yup.string().required("*Tax Type is required"),
        rate: Yup.number()
            .required("*Rate is required")
            .min(0, "Rate must be at least 0")
            .max(100, "Rate must be at most 100"),
        effectiveDate: Yup.string().required("*effectiveDate is required"),
        status: Yup.string().required("*Status is required"),
    });

    const formik = useFormik({
        initialValues: {
            taxType: "",
            rate: "",
            effectiveDate: "",
            status: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // console.log(values);
            setLoadIndicator(true);
            try {
                const response = await api.put(`/updateTaxSetting/${id}`, values, {
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
                const response = await api.get(`/getAllTaxSettingById/${id}`);
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
                    <Modal.Title className="headColor">Tax Edit</Modal.Title>
                </Modal.Header>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <div className="container">
                            <div className="row py-4">
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Tax Type<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.taxType && formik.errors.taxType
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("taxType")}
                                    />
                                    {formik.touched.taxType && formik.errors.taxType && (
                                        <div className="invalid-feedback">
                                            {formik.errors.taxType}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Rat (%)<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        className={`form-control  ${formik.touched.rate && formik.errors.rate
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("rate")}
                                    />
                                    {formik.touched.rate && formik.errors.rate && (
                                        <div className="invalid-feedback">
                                            {formik.errors.rate}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Effective Date<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        onFocus={(e) => e.target.showPicker()}
                                        placeholder=""
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
                                        Status<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...formik.getFieldProps("status")}
                                        class={`form-select  ${formik.touched.status && formik.errors.status
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        aria-label="Default select example"
                                    >
                                        <option
                                        // defaultValue={data.status === "Active"}
                                        >
                                        </option>
                                        <option
                                            value="ACTIVE"
                                        // defaultValue={data.status === "Active"}
                                        >
                                            Active
                                        </option>
                                        <option
                                            value="INACTIVE"
                                        // defaultValue={data.status === "Inactive"}
                                        >
                                            Inactive
                                        </option>
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

export default TaxEdit;
