import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";

export default function LevelView() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllTaxSettingById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, [id]);

  return (
    <div>
      <div className="container">
        <div className="row mt-2 pb-3">
          <div className="my-3 d-flex justify-content-end mb-5">
            <Link to={"/tax"}>
              <button type="button" className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
          </div>
          <div className="col-md-6 col-12">
            <div className="row   mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Tax</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.taxType}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2 ">
              <div className="col-6  ">
                <p className="fw-medium">Rate</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.rate}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2 ">
              <div className="col-6  ">
                <p className="fw-medium">Effective Date</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.effectiveDate}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Status</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
