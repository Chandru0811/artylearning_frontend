import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function IDTypeEdit({ id, onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validationSchema = Yup.object({
        race: Yup.string().required("*Race is required"),
    });

    const formik = useFormik({
        initialValues: {
            race: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // console.log(values);
            setLoadIndicator(true);
            try {
                const response = await api.put(`/updateIdTypeSetting/${id}`, values, {
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
                const response = await api.get(`/getAllIdTypeSettingById/${id}`);
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
                    <Modal.Title className="headColor">Race Edit</Modal.Title>
                </Modal.Header>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <div className="container">
                            <div className="row py-4">
                                
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        race<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.race && formik.errors.race
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("race")}
                                    />
                                    {formik.touched.race && formik.errors.race && (
                                        <div className="invalid-feedback">
                                            {formik.errors.race}
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

export default IDTypeEdit;
