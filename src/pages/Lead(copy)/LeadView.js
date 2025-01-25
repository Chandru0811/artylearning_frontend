import React, { useEffect, useState } from "react";
// import { FaCloudDownloadAlt } from "react-icons/fa";
// import Profile from "../../assets/images/profile.png";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";

function Leadview() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log(data)

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/getAllLeadInfoById/${id}`);
      setData(response.data);
    };
    getData();
  }, [id]);
  
  return (
    <div className="mb-5">
      <div className="container-fluid minHeight">
        <div className=" products">
          <div className="container-fluid py-4">
            <div className="row d-flex  justify-content-end">
              <div className="col-auto ">
                <div className="hstack  gap-2 ">
                  <Link to="/lead/lead">
                    <button type="button" className="btn btn-border btn-sm">
                      <span>Back</span>
                    </button>
                  </Link>
                  <Link to="/lead/lead/assessment">
                    <button type="submit" className="btn btn-border btn-sm">
                      <span>Do Assessment</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row  m-3">
          <h5 className="headColor mt-5 mb-4">Student Information</h5>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium">Student Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.studentName || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Date Of Birth</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium">Gender</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.gender || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Subject</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.subject || "--"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row  m-3">
          <h5 className="headColor mt-5 mb-4">Child Ability</h5>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium">Pencil Grip</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.pencilGrip || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Writing</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.writing || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium">Recognize A-Z</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.recognizeAToZ || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Write A-Z(Uppercase)</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.writeUpperAToZ ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Write a-z(lowercase)</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.writeLowerAToZ ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Sounds of a-z</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.soundOfAToZ ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Can read simple sentence</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.canReadSimpleSentence ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row  m-3">
          <h5 className="headColor mt-5 mb-4">Parent Information</h5>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Parent Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.parentName || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Parent Email</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.parentEmail || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Parent Mobile Number</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.parentMobileNumber || ""}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Relation</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.relation || "--"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row m-3">
          <h5 className="headColor mt-5  mb-4">Account Information</h5>

          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Centre</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.center || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex">
                <p className="text-sm fw-medium ">Preferred Day</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.preferredDay ? data.preferredDay.join(', ') : "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex">
                <p className="text-sm fw-medium ">Preferred Timeslot</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.preferredTimeSlot ? data.preferredTimeSlot.join(', ') : "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Marketing Source</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.marketingSource || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Refer By</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.referBy || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-medium ">Enquiry Date</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.enquiryDate ? data.enquiryDate.substring(0, 10) : "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex">
                <p className="text-sm fw-medium ">Remarks</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.remark || "--"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leadview