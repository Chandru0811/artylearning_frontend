import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../config/URL";

function CmsNewsUpdateEdit({ id, onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);
    // const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleShow = () => setShow(true);
    const currentData = new Date().toISOString().split("T")[0];

    const validationSchema = Yup.object({
        // file: yup.string().required("*Package Name is required"),  
        // heading: yup.string().required("*Heading is required"),
        // role: yup.string().required("*Role is required"),
        // date: yup.string().required("*Date is required"),
        // comment: yup.string().required("*comment is required"),
        // para: yup.string().required("*para is required"),
    });

    const formik = useFormik({
        initialValues: {
            cardImg: "",
            heading: "",
            role: "",
            date: "",
            comment: "",
            para: "",
        },
        validationSchema: validationSchema, // Assign the validation schema
        onSubmit: async (data) => {
            // console.log(data);
            const formData = new FormData()
            formData.append("file", data.file)
            formData.append("heading ", data.heading)
            formData.append("role ", "Admin")
            formData.append("date ", currentData)
            formData.append("comment ", data.comment)
            formData.append("para ", data.para)
            setLoadIndicator(true);
            try {
                const response = await api.put(`/updateNewsUpdatedSaveImages/${id}`, formData, {
                });
                if (response.status === 201) {
                    handleClose();
                    onSuccess();
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

    const handleClose = () => {
        setShow(false)
    };


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/getNewsUpdatedSavesById/${id}`);
                formik.setValues(response.data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };

        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <button className='btn' onClick={handleShow}>
                <MdEdit />
            </button>
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <p className="headColor">Edit News</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div class="col-md-6 col-12 mb-2">
                                <lable className="form-lable">
                                    Upload Image File
                                </lable>
                                <div className="input-group mb-3">
                                    <input
                                        type="file"
                                        className={`form-control   ${formik.touched.file && formik.errors.file
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        onChange={(event) => {
                                            formik.setFieldValue("file", event.currentTarget.files[0]);
                                        }}
                                    />
                                    {formik.touched.file && formik.errors.file && (
                                        <div className="invalid-feedback">
                                            {formik.errors.file}
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div class="col-md-6 col-12 mb-2">
                                <lable class="">
                                    Heading
                                </lable>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className={`form-control   ${formik.touched.heading && formik.errors.heading
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        aria-label="heading"
                                        aria-describedby="basic-addon1"
                                        {...formik.getFieldProps("heading")}
                                    />
                                    {formik.touched.heading && formik.errors.heading && (
                                        <div className="invalid-feedback">
                                            {formik.errors.heading}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* <div class="col-md-6 col-12 mb-2">
                                <lable class="">
                                    Role
                                </lable>
                                <input
                                    type="text"
                                    className={`form-control   ${formik.touched.role && formik.errors.role
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("role")}
                                />
                                {formik.touched.role && formik.errors.role && (
                                    <div className="invalid-feedback">{formik.errors.role}</div>
                                )}
                            </div> */}

                            {/* <div class="col-md-6 col-12 mb-2">
                                <lable class="">
                                    Date
                                </lable>
                                <input
                                    type="date"
                                    className={`form-control   ${formik.touched.date && formik.errors.date
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("date")}
                                />
                                {formik.touched.date && formik.errors.date && (
                                    <div className="invalid-feedback">{formik.errors.date}</div>
                                )}
                            </div> */}

                            <div class="col-md-6 col-12 mb-2">
                                <lable class="">
                                    Comment
                                </lable>
                                <input
                                    type="text"
                                    className={`form-control   ${formik.touched.comment && formik.errors.comment
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("comment")}
                                />
                                {formik.touched.comment && formik.errors.comment && (
                                    <div className="invalid-feedback">{formik.errors.comment}</div>
                                )}
                            </div>

                            <div class="col-md-6 col-12 mb-2">
                                <lable class="">
                                    Paragraph
                                </lable>
                                <textarea
                                    type="text"
                                    className={`form-control   ${formik.touched.para && formik.errors.para
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    {...formik.getFieldProps("para")}
                                />
                                {formik.touched.para && formik.errors.para && (
                                    <div className="invalid-feedback">{formik.errors.para}</div>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="mt-5">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
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
                            Submit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default CmsNewsUpdateEdit