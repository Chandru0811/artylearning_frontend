import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";

function HolidayView() {
  const [data, setData] = useState([]);
  const { id } = useParams();

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
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 text-end">
            <Link to="/holiday">
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
                  <p className="fw-medium">Center Name</p>
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
                <div className="col-6 ">
                  <p className="fw-medium">Holiday Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data && data.holidayName || "--"}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Start Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.startDate || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">End Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.endDate || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6">
                  <p className="fw-medium">Description</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.holidayDescription || "--"}</p>
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
