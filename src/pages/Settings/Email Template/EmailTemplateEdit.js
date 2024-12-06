import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { FaEdit } from "react-icons/fa";

function EmailTemplateEdit() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        formik.resetForm();
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const validationSchema = yup.object().shape({
        reason: yup.string().required("*Absent Reason is required"),
    });

    const formik = useFormik({
        initialValues: {
            reason: "",
            remarks: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Absent Reason Datas:", values);
        },
    });

    return (
        <>
            <button type="button" className="btn btn-sm" onClick={handleShow}>
                <FaEdit />
            </button>
            <Modal
                show={show}
                centered
                onHide={handleClose}
            >
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <p className="headColor">Edit Absent Reason</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label>
                                    Absent Reason<span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.reason && formik.errors.reason ? "is-invalid" : ""}`}
                                    {...formik.getFieldProps("reason")}
                                />
                                {formik.touched.reason && formik.errors.reason && (
                                    <div className="invalid-feedback">
                                        {formik.errors.reason}
                                    </div>
                                )}
                            </div>
                            <div className="col-12 mb-3">
                                <label>
                                    Remarks
                                </label>
                                <textarea rows={5}
                                    className={`form-control`}
                                    {...formik.getFieldProps("remarks")}
                                ></textarea>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="mt-3">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="btn btn-button btn-sm"
                        >
                            Update
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default EmailTemplateEdit;