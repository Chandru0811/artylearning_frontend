import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { FaPlus } from "react-icons/fa";

const StudentViewInvoice = () => {
    const tableRef = useRef(null);

    useEffect(() => {
        const table = $(tableRef.current).DataTable({
            responsive: true,
        });

        return () => {
            table.destroy();
        };
    }, []);

    return (
        <div className="container my-3">
            <div className="d-flex justify-content-between">
                <p className="text-danger" style={{ fontSize: "20px" }}>Outstanding Invoice Amount : SGD</p>
                <div>
                    <button className="btn btn-success btn-sm" type="button" style={{ fontSize: "12px" }}>Create New Invoice <FaPlus /></button>
                </div>
            </div>
            <table ref={tableRef} className="display">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Invoice Date</th>
                        <th scope="col">Invoice No.</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Number of Lesson</th>
                        <th scope="col">From Date</th>
                        <th scope="col">To Date</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Receipt Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default StudentViewInvoice;