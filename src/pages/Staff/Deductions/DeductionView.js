import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";

function DeductionView() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [centerData, setCenterData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllUserDeductionById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };
    getData();
    fetchData(); // Call fetchData here to fetch center data
  }, [id]); // Add id as a dependency

  return (
    <section>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 text-end">
            <Link to="/deduction">
              <button type="button" className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5 pb-3">
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Centre Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {centerData &&
                      centerData.map((centerId) =>
                        parseInt(data.centerId) === centerId.id
                          ? centerId.centerNames || "--"
                          : ""
                      )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Employee Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {""}
                    {data.employeeName || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Deduction Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.deductionName || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Deduction Month</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.deductionMonth || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Deduction Amount</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.deductionAmount || "--"}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Total Deduction Amount</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.totalDeductionAmount || "--"}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeductionView;
