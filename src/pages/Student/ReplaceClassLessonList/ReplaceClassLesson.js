import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import { SCREENS } from "../../../config/ScreenFilter";

const ReplaceClassLesson = () => {
    const tableRef = useRef(null);

    const [datas, setDatas] = useState([
        {
            id: 1,
            centerName: "Center A",
            studentName: "John Doe",
            course: "Mathematics",
            classListing: "Class 1",
            status: "Pending",
        },
        {
            id: 2,
            centerName: "Center B",
            studentName: "Jane Smith",
            course: "Science",
            classListing: "Class 2",
            status: "Pending",
        },
        {
            id: 3,
            centerName: "Center C",
            studentName: "Alice Johnson",
            course: "English",
            classListing: "Class 3",
            status: "Pending",
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [extraData, setExtraData] = useState(false);

    const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

    useEffect(() => {
        if (!loading) {
            initializeDataTable();
        }
        return () => {
            destroyDataTable();
        };
    }, [loading]);

    const initializeDataTable = () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            return;
        }
        $(tableRef.current).DataTable({
            responsive: true,
            columnDefs: [{ orderable: false, targets: -1 }],
        });
    };

    const destroyDataTable = () => {
        const table = $(tableRef.current).DataTable();
        if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
            table.destroy();
        }
    };

    const refreshData = () => {
        destroyDataTable();
        setLoading(true);
        setLoading(false);
        initializeDataTable();
    };

    const handleStatusChange = (id, newStatus) => {
        setDatas((prevDatas) =>
            prevDatas.map((data) =>
                data.id === id ? { ...data, status: newStatus } : data
            )
        );
    };

    const getBadgeColor = (status) => {
        return status === "Approved" ? "badge-Green" : status === "Rejected" ? "badge-Red" : "badge-Grey";
    };

    return (
        <div>
            {loading ? (
                <div className="loader-container">
                    <div className="loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            ) : (
                <div className="container my-4">
                    <div className="mb-3 d-flex justify-content-end">
                        {/* Add button for storedScreens.studentListingCreate */}
                    </div>
                    <div className="table-responsive">
                        <table ref={tableRef} className="display">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ whiteSpace: "nowrap" }}>S No</th>
                                    <th scope="col">Centre Name</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Course</th>
                                    <th scope="col">Class Listing</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.centerName}</td>
                                        <td>{data.studentName}</td>
                                        <td>{data.course}</td>
                                        <td>{data.classListing}</td>
                                        <td>{data.status}</td>
                                        <td>
                                            <div className="d-flex">
                                                <Link to={`/replacelessonlist/edit/${data.id}`}>
                                                    <button className="btn btn-sm" title="Replace Class">
                                                        <i className="bx bx-plus"></i>
                                                    </button>
                                                </Link>
                                                {storedScreens?.studentListingUpdate && (
                                                    <Link to={`/replacelessonlist/view/${data.id}`}>
                                                        <button className="btn btn-sm">
                                                            <FaEye />
                                                        </button>
                                                    </Link>
                                                )}
                                                {/* {storedScreens?.studentListingDelete && (
                                                    <Delete
                                                        onSuccess={refreshData}
                                                        path={`/deleteStudentDetail/${data.id}`}
                                                    />
                                                )} */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReplaceClassLesson;
