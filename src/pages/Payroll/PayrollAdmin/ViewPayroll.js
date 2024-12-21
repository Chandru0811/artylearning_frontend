import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/URL";

function Viewpayroll() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  // console.log("View Data", data);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`getAllUserPayrollById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/payrolladmin" className="custom-breadcrumb">
            Payroll
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Payroll View
        </li>
      </ol>

      <div className="card">
        <div
          className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
          style={{ background: "#f5f7f9" }}
        >
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">View Payroll</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/payrolladmin">
              <button type="button " className="btn btn-sm btn-border   ">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="container-fluid">
          {data.userRole === "SMS_FREELANCER" ? (
            <>
              <div className="row mt-5">
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Centre Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.centerName || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6  ">
                      <p className="fw-medium">Employee Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.employeeName || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6">
                      <p className="fw-medium">Start Date</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.startDate || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6">
                      <p className="fw-medium">End Date</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.endDate || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6">
                      <p className="fw-medium">Payroll Type</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.payrollType || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6">
                      <p className="fw-medium">{data.payrollType} Count</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.freelanceCount || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6  ">
                      <p className="fw-medium">Net Pay</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.netPay || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6">
                      <p className="fw-medium">Status</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.status || "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row mt-5">
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Centre Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.centerName || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6  ">
                      <p className="fw-medium">Employee Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.employeeName || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6  ">
                      <p className="fw-medium">Payroll Month</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.payrollMonth || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6  ">
                      <p className="fw-medium">Basic Pay</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.grossPay || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Bonus</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.bonus || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">Deduction</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.deductionAmount || "0"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">SHG</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.shgContribution || "0"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6 ">
                      <p className="fw-medium">CPF</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.cpfContributions || "0"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6  ">
                      <p className="fw-medium">Net Pay</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.netPay || "--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-2">
                    <div className="col-6">
                      <p className="fw-medium">Status</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data.status || "--"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Viewpayroll;
