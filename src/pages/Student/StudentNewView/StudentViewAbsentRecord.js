import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const StudentViewAbsentRecord = () => {
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
            <p className="text-danger" style={{ fontSize: "20px" }}>Total Deposit Balance : SGD 0.00</p>
            <table ref={tableRef} className="display">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Center</th>
                        <th scope="col">Top-Up Date</th>
                        <th scope="col">Deduction Date</th>
                        <th scope="col">Date of Absent</th>
                        <th scope="col">Absent Reason</th>
                        <th scope="col">Deposit Balance</th>
                        <th scope="col">Deduction</th>
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
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default StudentViewAbsentRecord;