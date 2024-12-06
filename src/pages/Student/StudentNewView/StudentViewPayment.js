import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const StudentViewPayment = () => {
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
            <table ref={tableRef} className="display">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Invoice No.</th>
                        <th scope="col">Receipt No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Customer Code</th>
                        <th scope="col">Receipt Date</th>
                        <th scope="col">Payment Type</th>
                        <th scope="col">Cheque Date</th>
                        <th scope="col">Payment Ref#</th>
                        <th scope="col">Processing Fee</th>
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

export default StudentViewPayment;