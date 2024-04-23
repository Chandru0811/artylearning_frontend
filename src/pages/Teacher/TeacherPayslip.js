import React from "react";
import { Link } from "react-router-dom";

function TeacherPayslip() {
  return (
    <div className="container-fluid minHeight">
      <div className="container-fluid">
        <div className="row mt-3 d-flex justify-content-end">
          <div class="col-auto mb-4">
            <Link to={`/teacher`}>
              <button type="submit" class="btn btn-sm btn-border">
                <span>Back</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="row mb-5">
          <div className="offset-lg-1 col-5 d-flex">
            <label style={{ whiteSpace: "nowrap" }} className="mt-2">
              Date :
            </label>
            <input type="date" className="form-control mx-2" />
          </div>
          <div className="offset-lg-2 col-4">
            <button className="btn btn-light btn-border btn-sm">Search</button>
          </div>
        </div>
      </div>
      <div class="mb-2 mt-4 card">
        <div class=" p-5">
          <div className="container">
            <div className="row">
              <div className="col-12 text-start">
                <h5>ARTY LEARNING</h5>
                <p className="">
                  806 HOUGANG CENTRAL ,#04-146,SINGAPORE 530806
                </p>
              </div>
              <hr style={{ color: "#ecab73", opacity: "1" }} />
              <div className="col-12">
                <div className=" text-start">
                  <h6>Payslip For 01 Jan 2024 To 31 Jan 2024</h6>
                  <p className="" style={{ color: "#ecab73" }}>
                    Employee Pay Summary{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 mt-3">
                <div className="row mb-3">
                  <div className="col-6   ">
                    <p className="text-sm">
                      <b>Name Of Employer</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : ARTY LEARNING PTE.LTD
                    </p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6   ">
                    <p className="text-sm">
                      <b>Payment Month</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: 31-01-2024</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6   ">
                    <p className="text-sm">
                      <b>Name Of Employee</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Teacher Admin</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6   ">
                    <p className="text-sm">
                      <b>Mode Of Payment</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Online</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 d-flex mb-2 mt-2 justify-content-center align-items-end">
                <div className=" mb-2 ">
                  <p>Employee Net Pay</p>
                  <h4> $ 0.00</h4>
                  <p>Paid Days :28|LOP Days :3</p>
                </div>
              </div>
              <hr
                style={{ marginTop: "2rem", color: "#ecab73", opacity: "1" }}
              />
              <div className="col-lg-12 col-md-12 col-12">
                <div className="table-responsive">
                  <table
                    className="table table-borderless"
                    style={{ overflow: "auto" }}
                  >
                    <thead
                      className="text-start  border-bottom border-danger"
                      style={{ borderBottom: "2px" }}
                    >
                      <tr>
                        <th scope="col"></th>
                        <th
                          scope="col"
                          style={{ width: "21%", color: "#ecab73" }}
                        >
                          ITEM
                        </th>
                        <th scope="col" style={{ width: "31%" }}></th>
                        <th
                          scope="col"
                          style={{ color: "#ecab73" }}
                          className=""
                        >
                          Amount(SGD)
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-start">
                      <tr className="">
                        <th scope="row"></th>
                        <td>Basic Pay </td>
                        <td>(A)</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td>
                          Total Allowances <br />
                          <span className="fw-light">
                            (Breakdown Show Below)
                          </span>
                        </td>
                        <td>(B)</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td>
                          {" "}
                          Total Deduction <br />
                          <span className="fw-light">
                            (Breakdown Show Below)
                          </span>
                        </td>
                        <td>(C)</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td> Total Overtime Pay </td>
                        <td>(D)</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td>
                          Other Additionl Payments
                          <br />
                          <span className="fw-light">
                            (Breakdown Show Below)
                          </span>{" "}
                        </td>
                        <td>(E)</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td>Overtime Hours Worked </td>
                        <td></td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td>Employee's CPF Deduction </td>
                        <td></td>
                        <td>0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr style={{ color: "#ecab73", opacity: "1" }} />
              <div className="col-lg-12 col-md-12 col-12">
                <div className="table-responsive">
                  <table
                    className="table table-borderless"
                    style={{ overflow: "auto" }}
                  >
                    <thead
                      className="text-start  border-bottom border-danger"
                      style={{ borderBottom: "2px" }}
                    >
                      <tr>
                        <th scope="col"></th>
                        <th scope="col" style={{ width: "21%" }}>
                          Netpay
                        </th>
                        <th scope="col" style={{ width: "31%" }}></th>
                        <th scope="col " className="">
                          Amount(SGD)
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-start">
                      <tr className="">
                        <th scope="row"></th>
                        <td> Pay (A+B+C+D+E) </td>
                        <td></td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td>Employer's CPF Contribution </td>
                        <td></td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td>Employer's SDL Contribution</td>
                        <td></td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td> CDAC /ECF /MBMF /SINIDA </td>
                        <td></td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td>Total CPF Contribution </td>
                        <td></td>
                        <td>0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-12">
                <h2 className=" text-center">Total Net Payable $0.00 </h2>
              </div>
              <hr style={{ color: "#ecab73", opacity: "1" }} />
              <div className="col-12 text-center">
                <p className="">
                  this is computer generated payslip. no singature is required
                </p>
                <p className=" mt-5">Copyrights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherPayslip;
