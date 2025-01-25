import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";

function HolidayView() {
  const [data, setData] = useState([]);
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
        const response = await api.get(`/getAllUserHolidayById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    fetchData();
  }, []);

  return (
    <section>
      <div className="container-fluid">
        <ol
          className="breadcrumb my-3"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          <li>
            <Link to="/" className="custom-breadcrumb">
              Home
            </Link>
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li>
            &nbsp;Staffing
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li>
            <Link to="/holiday" className="custom-breadcrumb">
              &nbsp;Holiday
            </Link>
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            &nbsp;Holiday View
          </li>
        </ol>
        <div className="card">
          <div
            className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
            style={{ background: "#f5f7f9" }}
          >
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="dot active"></div>
              </div>
              <span className="me-2 text-muted">View Holiday</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/holiday">
                <button type="button " className="btn btn-sm btn-border   ">
                  Back
                </button>
              </Link>
            </div>
          </div>
          <div className="container-fluid px-4 mt-3">
            <div className="row pb-3">
              <div className="col-md-6 col-12">
                <div className="row mb-2">
                  <div className="col-6 ">
                    <p className="">Centre Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      :{" "}
                      {centerData &&
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
                    <p className="">Holiday Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {(data && data.holidayName) || "--"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="row mb-2">
                  <div className="col-6 ">
                    <p className="">Start Date</p>
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
                  <div className="col-6  ">
                    <p className="">End Date</p>
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
                    <p className="">Description</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break">
                      : {data.holidayDescription || "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HolidayView;
