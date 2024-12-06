import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const StudentViewCreditNotes = () => {
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
            <p className="text-danger" style={{ fontSize: "20px" }}>Outstanding Credit : SGD 0</p>
            <table ref={tableRef} className="display">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Action</th>
                        <th scope="col">Credit Notes Date</th>
                        <th scope="col">Credit Notes Reference No</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Description</th>
                        <th scope="col">Credit Amount</th>
                        <th scope="col">Used Amount</th>
                        <th scope="col">Outstanding Amount</th>
                        <th scope="col">Receipt No.</th>
                        <th scope="col">Created By</th>
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
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default StudentViewCreditNotes;