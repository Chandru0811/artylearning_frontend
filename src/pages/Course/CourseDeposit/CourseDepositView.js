import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../config/URL";
import fetchAllSubjectsWithIds from "../../List/SubjectList";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';

export default function CourseFeesView() {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [subjectData, setSubjectData] = useState(null);

    const fetchData = async () => {
        try {
            const subjectData = await fetchAllSubjectsWithIds();
            setSubjectData(subjectData);
        } catch (error) {
            toast.error(error);
        }
    };

    const handleShow = () => {
        fetchData();
        setShow(true);
    };

    const handleClose = () => setShow(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get(`/getAllCourseLevels/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };
        getData();
        fetchData();
    }, [id]);

    return (
        <div>
            <button className="btn btn-sm" onClick={handleShow}>
                <FaEye />
            </button>

            <Modal show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title className="headColor">Course Fees View</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row mt-2 pb-3">
                            <div className="col-md-6 col-12">
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p className="fw-medium">Effective Date</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-muted text-sm">
                                            :{" "}
                                            {subjectData &&
                                                subjectData.map((subjectId) =>
                                                    parseInt(data.subjectId) === subjectId.id
                                                        ? subjectId.subjects || "--"
                                                        : ""
                                                )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p className="fw-medium">Deposit Fees</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-muted text-sm">: {data.level}</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-6 col-12">
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p className="fw-medium">WeekdayFee</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-muted text-sm">: {data.levelCode}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p className="fw-medium">WeekendFee</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-muted text-sm">: {data.status}</p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-md-6 col-12">
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p className="fw-medium">TaxType</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-muted text-sm">: {data.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
