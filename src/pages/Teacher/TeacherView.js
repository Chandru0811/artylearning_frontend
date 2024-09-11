import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";
import api from "../../config/URL";
import TeacherSummary from "./TeacherSummary";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";

function TeacherView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log("Api data:", data);
  const [centerData, setCenterData] = useState(null);
  const [shgData, setShgData] = useState([]);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllUserById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    fetchData();
  }, [id]);

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
        const response = await api.get("/getAllSHGSetting");
        setShgData(response.data);
        console.log("shgdata", shgData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
   
  }, []);
  const getFileNameFromUrl = (url) => {
    if (url) {
      const parts = url.split("/");
      return parts[parts.length - 1];
    }
    return "--";
  };

  // Safely accessing the first element of userRequireInformationModels array
  const userRequireInfo = data?.userRequireInformationModels?.[0];
  const resumeFileName = userRequireInfo
    ? getFileNameFromUrl(userRequireInfo.resume)
    : "--";
  const educationalCertificates = userRequireInfo
    ? getFileNameFromUrl(userRequireInfo.educationCertificate)
    : "--";

  // Construct the full URL to the resume and educational certificates file
  const resumeFileNameUrl = userRequireInfo ? userRequireInfo.resume : "#";
  const educationCertificateUrl = userRequireInfo
    ? userRequireInfo.educationCertificate
    : "#";

  return (
    <div class="container-fluid minHeight mb-5">
      <div class="container-fluid py-4">
        <div class="row align-items-center">
          <div class="col">
            <div class="d-flex align-items-center gap-4"></div>
          </div>
          <div class="col-auto">
            <div class="hstack gap-2 justify-content-end">
              <Link to="/teacher">
                <button type="submit" className="btn btn-border btn-sm">
                  <span>Back</span>
                </button>
              </Link>
              <TeacherSummary data={data} />
              {/* {storedScreens?.payrollIndex && (
                <Link to="/teacher/payslip">
                  <button type="submit" class="btn btn-border">
                    <span>Payroll</span>
                  </button>
                </Link>
              )}
              {storedScreens?.leaveRequestIndex && (
                <Link to="/teacher/leave">
                  <button type="submit" class="btn btn-border">
                    <span>Leave Request</span>
                  </button>
                </Link>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <p class="headColor mt-3">Personal Information</p>
      <div className="d-flex justify-content-center">
        <p className="my-2 d-flex">
          {data.photo ? (
            <img
              src={data.photo}
              style={{ borderRadius: 70 }}
              width="100"
              height="100"
              alt=""
            />
          ) : (
            <></>
          )}
        </p>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Teacher Name</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: {data.teacherName || "--"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Date of Birth</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                : {data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">ID Type</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: {data.idType || "--"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 ">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">ID NO</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: {data.idNo || "--"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Citizenship</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: {data.citizenship || "--"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex ">
              <p className="text-sm fw-medium">Gender</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: {data.gender || "--"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Email</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                : {data.email || "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 ">
              <p className="text-sm fw-medium">Short Introduction</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm text-break">
                :{" "}
                {data.shortIntroduction === "undefined"
                  ? "--"
                  : data.shortIntroduction || "--"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p class="headColor mt-5">Account Information</p>
      <div className="row mt-4">
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Start Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                data.userAccountInfo[0].startDate
                  ? data.userAccountInfo[0].startDate.substring(0, 10)
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6">
              <p className="text-sm fw-medium">Color Code</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                data.userAccountInfo[0].colorCode
                  ? data.userAccountInfo[0].colorCode
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Teacher ID</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                data.userAccountInfo[0].teacherId
                  ? data.userAccountInfo[0].teacherId
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 ">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Teacher Type</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                data.userAccountInfo[0].teacherType
                  ? data.userAccountInfo[0].teacherType
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">SHG(S) Type</p>
            </div>
            <div className="col-6">
            <p className="text-muted text-sm">
            :{" "}
            {data.userAccountInfo &&
            data.userAccountInfo.length > 0 &&
            data.userAccountInfo[0].shgTypeId
              ? (
                  shgData.find(
                    (item) => item.id == data.userAccountInfo[0].shgTypeId
                  ) || {}
                ).shgType || "--"
              : "--"}
          </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">SHGs Amount</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                data.userAccountInfo[0].shgAmount
                  ? data.userAccountInfo[0].shgAmount
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Status</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                data.userAccountInfo[0].status
                  ? data.userAccountInfo[0].status
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">End Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                data.userAccountInfo[0].endDate
                  ? data.userAccountInfo[0].endDate.substring(0, 10)
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Approval</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                typeof data.userAccountInfo[0].approvelContentRequired ===
                  "boolean"
                  ? data.userAccountInfo[0].approvelContentRequired
                    ? "Yes"
                    : "No"
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Working Days</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                data.userAccountInfo[0].workingDays
                  ? data.userAccountInfo[0].workingDays.join(", ")
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Centre Name</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userAccountInfo &&
                data.userAccountInfo.length > 0 &&
                data.userAccountInfo[0].centers
                  ? data.userAccountInfo[0].centers
                      .map((item) => item.centerName)
                      .join(", ")
                  : "--"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p class="headColor mt-5">Contact Information</p>
      <div className="row mt-4">
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Contact Number</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContactInfo &&
                data.userContactInfo.length > 0 &&
                data.userContactInfo[0].contactNumber
                  ? data.userContactInfo[0].contactNumber
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Address</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContactInfo &&
                data.userContactInfo.length > 0 &&
                data.userContactInfo[0].address
                  ? data.userContactInfo[0].address
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 ">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Postal Code</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContactInfo &&
                data.userContactInfo.length > 0 &&
                data.userContactInfo[0].postalCode
                  ? data.userContactInfo[0].postalCode
                  : "--"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p class="headColor mt-5">Required Documents</p>
      <hr></hr>
      <div className="row mt-4">
        <div className="row">
          <div className="">
            <div className="row mb-3 d-flex ">
              <div className="col-4 ">
                <p className="text-sm fw-medium">File Type</p>
              </div>
              <div className="col-4">
                <p className="text-sm fw-medium">File Name</p>
              </div>
              <div className="col-4">
                <p className="text-sm fw-medium">Action</p>
              </div>
            </div>
          </div>
        </div>
        {/* Resume/CV Section */}
        <div className="row">
          <div className="">
            <div className="row mb-3 d-flex">
              <div className="col-4 ">
                <p className="text-sm text-muted">Resume/Cv</p>
              </div>
              <div className="col-4">
                <p className="text-sm text-muted text-break">
                  {resumeFileName || "--"}
                </p>
              </div>
              <div className="col-4 ">
                {userRequireInfo && (
                  <p className="text-sm ms-3">
                    <a href={resumeFileNameUrl} download={resumeFileName}>
                      <FaCloudDownloadAlt />
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Educational Certificates Section */}
        <div className="row">
          <div className="">
            <div className="row mb-3 d-flex">
              <div className="col-4 ">
                <p className="text-sm text-muted">Educational Certificates</p>
              </div>
              <div className="col-4">
                <p className="text-sm text-muted text-break">
                  {educationalCertificates || "--"}
                </p>
              </div>
              <div className="col-4">
                {userRequireInfo && (
                  <p className="text-sm ms-3">
                    <a
                      href={educationCertificateUrl}
                      download={educationalCertificates}
                    >
                      <FaCloudDownloadAlt />
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="headColor mt-5">Salary Information</p>
      <div className="row mt-4">
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Salary</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userSalaryCreationModels &&
                data.userSalaryCreationModels.length > 0 &&
                data.userSalaryCreationModels[0].salary
                  ? data.userSalaryCreationModels[0].salary
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Effective Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userSalaryCreationModels &&
                data.userSalaryCreationModels.length > 0 &&
                data.userSalaryCreationModels[0].effectiveDate
                  ? data.userSalaryCreationModels[0].effectiveDate.substring(
                      0,
                      10
                    )
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Salary Type</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userSalaryCreationModels &&
                data.userSalaryCreationModels.length > 0 &&
                data.userSalaryCreationModels[0].salaryType
                  ? data.userSalaryCreationModels[0].salaryType
                  : "--"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p class="headColor mt-5">Leave Information</p>
      <div className="row mt-4">
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Year</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userLeaveCreationModels &&
                data.userLeaveCreationModels.length > 0 &&
                data.userLeaveCreationModels[0].year
                  ? data.userLeaveCreationModels[0].year.substring(0, 10)
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6">
              <p className="text-sm fw-medium">Annual Leave</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userLeaveCreationModels &&
                data.userLeaveCreationModels.length > 0 &&
                data.userLeaveCreationModels[0].annualLeave
                  ? data.userLeaveCreationModels[0].annualLeave
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Medical Leave</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userLeaveCreationModels &&
                data.userLeaveCreationModels.length > 0 &&
                data.userLeaveCreationModels[0].medicalLeave
                  ? data.userLeaveCreationModels[0].medicalLeave
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 ">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Other Leave</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userLeaveCreationModels &&
                data.userLeaveCreationModels.length > 0 &&
                data.userLeaveCreationModels[0].otherLeave
                  ? data.userLeaveCreationModels[0].otherLeave
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Carry Forward Leave</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userLeaveCreationModels &&
                data.userLeaveCreationModels.length > 0 &&
                data.userLeaveCreationModels[0].carryForwardLeave
                  ? data.userLeaveCreationModels[0].carryForwardLeave
                  : "--"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p class="headColor mt-5">Contract Information</p>
      <div className="row mt-4">
        <div className="row mb-4">
          <b>Details of Employer</b>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Employer</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {/* {centerData &&
                  centerData.map((centerId) =>
                    parseInt(data.userContractCreationModels[0].employer) ===
                    centerId.id
                      ? centerId.centerNames || "--"
                      : ""
                  )} */}
                {centerData &&
                  centerData.map((centerId) => {
                    if (
                      data &&
                      data.userContractCreationModels &&
                      data.userContractCreationModels.length > 0 &&
                      parseInt(data.userContractCreationModels[0].employer) ===
                        centerId.id
                    ) {
                      return centerId.centerNames || "--";
                    }
                    return null;
                  })}
              </p>
              {/* <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].employer
                  ? data.userContractCreationModels[0].employer
                  : "--"}
              </p> */}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6">
              <p className="text-sm fw-medium">UEN</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].uen
                  ? data.userContractCreationModels[0].uen
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Address of Employment</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].addressOfEmployment
                  ? data.userContractCreationModels[0].addressOfEmployment
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12"></div>
        <div className="row mb-4">
          <b>Details of Employee</b>
        </div>
        <div className="col-md-6 col-12 ">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Employee</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].employee
                  ? data.userContractCreationModels[0].employee
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">NRIC</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].nric
                  ? data.userContractCreationModels[0].nric
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Address</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].userContractAddress
                  ? data.userContractCreationModels[0].userContractAddress
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Job Title</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].jobTitle
                  ? data.userContractCreationModels[0].jobTitle
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Main Duties</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].mainDuties
                  ? data.userContractCreationModels[0].mainDuties
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Start Date Employment</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].startDateOfEmployment
                  ? data.userContractCreationModels[0].startDateOfEmployment.substring(
                      0,
                      10
                    )
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Training</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].training
                  ? data.userContractCreationModels[0].training
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Allowance</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].allowance
                  ? data.userContractCreationModels[0].allowance
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Start Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].startDateOfEmployment
                  ? data.userContractCreationModels[0].startDateOfEmployment.substring(
                      0,
                      10
                    )
                  : "--"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Contract Period</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].contactPeriod
                  ? data.userContractCreationModels[0].contactPeriod
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Probation</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].probation
                  ? data.userContractCreationModels[0].probation
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Working Days</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].workingDays
                  ? data.userContractCreationModels[0].workingDays.join(", ")
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Salary</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].userContractSalary
                  ? data.userContractCreationModels[0].userContractSalary
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">End Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].userContractEndDate
                  ? data.userContractCreationModels[0].userContractEndDate.substring(
                      0,
                      10
                    )
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <b>Bank Account Details</b>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Paynow</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].payNow
                  ? data.userContractCreationModels[0].payNow
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Internet Banking</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].internetBanking
                  ? data.userContractCreationModels[0].internetBanking
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Contract Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].contractDate
                  ? data.userContractCreationModels[0].contractDate.substring(
                      0,
                      10
                    )
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Termination Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">
                :{" "}
                {data.userContractCreationModels &&
                data.userContractCreationModels.length > 0 &&
                data.userContractCreationModels[0].terminationNotice
                  ? data.userContractCreationModels[0].terminationNotice
                  : "--"}
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherView;
