import React from "react";
import { Link } from "react-router-dom";

function ViewPayslip() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center  align-item-center">
        <h5 className="mt-5">Arty Learning</h5>
        <p>Payslip For The Month Of March 2024</p>
      </div>
      <div className="row mt-5 pb-3">
        <div className="col-md-6 col-12">
          <div className="row mt-3  mb-2">
            <div className="col-6 ">
              <p className="fw-medium">Employee Name</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Chandru R</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mt-3  mb-2">
            <div className="col-6 ">
              <p className="fw-medium">Date Of Joining</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 01/12/2024</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row  mb-2 mt-3">
            <div className="col-6  ">
              <p className="fw-medium">Date Of Leaving</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mt-3  mb-2">
            <div className="col-6 ">
              <p className="fw-medium">Designation</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Junior Developer</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row  mb-2 mt-3">
            <div className="col-6  ">
              <p className="fw-medium">Paid Days</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 31 </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row  mb-2 mt-3">
            <div className="col-6  ">
              <p className="fw-medium">LOP</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 0 </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="col" className="fw-medium">
                  Earning
                </th>
                <th scope="col" className="fw-medium">
                  Hours
                </th>
                <th scope="col" className="fw-medium">
                  Amount
                </th>
                <th scope="col" className="fw-medium">
                  Deduction
                </th>
                <th scope="col" className="fw-medium">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-muted text-sm">Basic Salary</td>
                <td className="text-muted text-sm">224</td>
                <td className="text-muted text-sm">$4480.00</td>
                <td className="text-muted text-sm">Health</td>
                <td className="text-muted text-sm">$100.00</td>
              </tr>
              <tr>
                <td className="text-muted text-sm">Over Time</td>
                <td className="text-muted text-sm">5</td>
                <td className="text-muted text-sm">$100.00</td>
                <td className="text-muted text-sm">Loss Of Pay</td>
                <td className="text-muted text-sm">$160.00</td>
              </tr>
              <tr>
                <td className="text-muted text-sm">Gross Pay</td>
                <td className="text-muted text-sm">265</td>
                <td className="text-muted text-sm">$5850.00</td>
                <td className="text-muted text-sm">Deduction Total</td>
                <td className="text-muted text-sm">$260</td>
              </tr>
            </tbody>
          </table>

          <table className="table table-border-solid">
            <tbody>
              <tr>
                <td>Net Pay</td>
                <td className="text-muted text-sm">: $4320.00</td>
              </tr>
              <tr>
                <td>In Words</td>
                <td className="text-muted text-sm">
                  : Four Hundred Three Hundrad Twenty Dollars Only
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end align-item-end mt-4">
          <Link to="">
            <button type="button" className="btn btn-sm btn-border m-2">
              Back
            </button>
          </Link>
          <Link to="">
            <button type="button" className="btn btn-sm btn-success m-2">
              Download
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewPayslip;
