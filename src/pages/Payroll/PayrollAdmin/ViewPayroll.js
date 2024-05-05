import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllCentersWithIds from "../../List/CenterList";
import fetchAllTeacherListByCenter from "../../List/TeacherListByCenter";

function Viewpayroll() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [centerData, setCenterData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const teacherData = await fetchAllTeacherListByCenter();
      setCenterData(centerData);
      setTeacherData(teacherData);
    } catch (error) {
      toast.error(error);
    }
  };

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
    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 text-end">
          <Link to="/payrolladmin">
            <button type="button" className="btn btn-sm btn-border">
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Centre Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.centerName || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Employee Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.employeeName || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Gross Pay</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.grossPay || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Bonus</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.bonus || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Deduction</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.deductionAmount || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Net Pay</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.netPay || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6">
                <p className="fw-medium">Status</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.status || "--"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewpayroll;
