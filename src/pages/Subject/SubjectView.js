import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";

function SubjectView() {
  const { id } = useParams();
  // console.log(id)
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCourseSubjectsById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="container ">
      <div className="d-flex justify-content-end align-item-end mt-4">
        <Link to="/subject">
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
      </div>

      <div>
        <div className="container">
          <div className="row mt-5 pb-3">
            <div className="col-md-6 col-12">
              <div className="row mt-3  mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Subject</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.subject}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2 mt-3">
                <div className="col-6  ">
                  <p className="fw-medium">Code</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.code}</p>
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
    </div>
  );
}

export default SubjectView;
