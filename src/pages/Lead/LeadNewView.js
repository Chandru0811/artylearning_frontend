import React, { useEffect, useRef, useState } from "react";
import { IoIosMail, IoIosSettings } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import fetchAllSalaryTypeWithIds from "../List/SalaryTypeList";
import PasswordModal from "../Student/StudentNewView/PasswordModal";
import fetchAllStudentsWithIds from "../List/StudentList";
import fetchAllSubjectsWithIds from "../List/SubjectList";

function LeadNewView() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [centerData, setCenterData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [doassesmentData, setDoassesmentData] = useState([]);
  const [arrangeassesmentData, setArrangeassesmentData] = useState([]);
  //   const [paymentStatus, setPaymentStatus] = useState("PENDING");
  //   const [showPaymentStatusModal, setShowPaymentStatusModal] = useState(false);
  //   const [showSummaryModal, setShowSummaryModal] = useState(false);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const studentData = await fetchAllStudentsWithIds();
      const subjectData = await fetchAllSubjectsWithIds();
      setCenterData(centerData);
      setStudentData(studentData);
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllLeadInfoWithReferrerById/${id}`);
        setData(response.data);
        // setPaymentStatus(response.data.paymentStatus);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
      // console.log("Lead  :",response);
    };

    const getAssesmentData = async () => {
      try {
        const response = await api.get(`/getLeadAssessmentDataByLeadId/${id}`);
        setDoassesmentData(response.data);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };

    const getArrangeAssesmentData = async () => {
      try {
        const response = await api.get(`/getAllLeadInfoById/${id}`);
        setArrangeassesmentData(response.data);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };

    getData();
    getAssesmentData();
    getArrangeAssesmentData();
    fetchData();
  }, [id]);
  const daysOrder = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const sortedPreferredDays = data.preferredDay
    ? data.preferredDay.sort(
        (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
      )
    : [];

  return (
    <div>
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
          Lead Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/lead/lead" className="custom-breadcrumb">
            Lead Listing
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Lead View
        </li>
      </ol>
      <div className="d-flex align-items-center justify-content-end mb-4">
        <Link to={"/lead/lead"}>
          <button
            className="btn btn-border btn-sm"
            style={{ padding: "3px 5px", fontSize: "12px" }}
          >
            Back
          </button>
        </Link>
      </div>
      <div className="container-fluid studentView">
        <div className="row mb-3">
          <div className="col-md-3 col-12 mb-3">
            <div className="card" style={{ padding: "10px" }}>
              {/* <div className="d-flex flex-column align-items-center">
                {data.photo ? (
                  <img
                    src={data.photo}
                    className="img-fluid stdImg"
                    alt={data.studentName || "--"}
                  />
                ) : (
                  <div></div>
                )}
                <p className="fw-medium mt-2 mb-1">
                  {data.teacherName || "--"}
                </p>
              </div> */}
              {storedScreens?.leadUpdate && (
                <Link
                  to={`/lead/edit/${data.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="stdSettings mb-0">
                    <IoIosSettings /> Edit
                  </p>
                </Link>
              )}
              <hr className="mt-2 mb-0" />
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                {/* <b>Lead Information</b> */}
                <b> Student Information</b>
                <li className="stdList">
                  <b>Student Name</b>
                  <span> {data.studentName || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Date of Birth</b>
                  <span>
                    {data.dateOfBirth
                      ? data.dateOfBirth.substring(0, 10)
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b>Gender</b>
                  <span> {data.gender || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Subject</b>
                  <span>
                    {" "}
                    {subjectData &&
                      subjectData.map((subject) =>
                        parseInt(data.subjectId) === subject.id
                          ? subject.subjects || "--"
                          : ""
                      )}
                  </span>
                </li>
                <li className="stdList">
                  <b> Medical Condition</b>
                  <span> {data.medicalCondition || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Ethnic Group</b>
                  <span>{data.ethnicGroup || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Status</b>
                  <span>
                    {" "}
                    {data.leadStatus
                      ? data.leadStatus
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b>School Type</b>
                  <span>{data.schoolType || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Name Of School</b>
                  <span>{data.nameOfSchool || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Centre</b>
                  <span>
                    {centerData &&
                      centerData.map((center) =>
                        parseInt(data.centerId) === center.id
                          ? center.centerNames || "--"
                          : ""
                      )}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-12 mb-3">
            <div className="card mb-3">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2">
                  {/* <FaBook size={20} /> */}
                  &nbsp;&nbsp;Child Ability
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li
                    className="stdList"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <b>Pencil Grip</b>
                    <span>{data.pencilGrip || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b>Writing</b>
                    <span>{data.writing || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b>Recognize A-Z</b>
                    <span>{data.recognizeAToZ || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Write A-Z(Uppercase)</b>
                    <span>{data.writeUpperAToZ ? "Yes" : "No"}</span>
                  </li>
                  <li className="stdList">
                    <b> Write a-z(lowercase)</b>
                    <span>{data.writeLowerAToZ ? "Yes" : "No"}</span>
                  </li>
                  <li className="stdList">
                    <b>Sounds of a-z</b>
                    <span>{data.soundOfAToZ ? "Yes" : "No"}</span>
                  </li>
                  <li className="stdList">
                    <b>Can read simple sentence</b>
                    <span>{data.canReadSimpleSentence ? "Yes" : "No"}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2"> Parent Information</p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li className="stdList">
                    <span>
                      {" "}
                      {data.primaryContactMother ? (
                        <p className="badge text-bg-primary">primary</p>
                      ) : null}
                    </span>
                  </li>
                  <li className="stdList">
                    <b> Mother's Full Name</b>
                    <span> {data.mothersFullName || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Mother's Occupation</b>
                    <span> {data.mothersOccupation || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Mother's Date Of Birth</b>
                    <span>
                      {" "}
                      {data.mothersDateOfBirth
                        ? data.mothersDateOfBirth.substring(0, 10)
                        : "--"}
                    </span>
                  </li>
                  <li className="stdList">
                    <b> Mother's Mobile Number</b>
                    <span> {data.mothersMobileNumber || ""}</span>
                  </li>
                  <li className="stdList">
                    <b> Mother's Monthly Income</b>
                    <span> {data.monthlyIncomeOfMother || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Mother's Email Address</b>
                    <span> {data.mothersEmailAddress || "--"}</span>
                  </li>
                  <li className="stdList">
                    <span>
                      {data.primaryContactFather ? (
                        <p className="badge text-bg-primary">primary</p>
                      ) : null}
                    </span>
                  </li>
                  <li className="stdList">
                    <b> Mother's Occupation</b>
                    <span> {data.mothersOccupation || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Father's Full Name</b>
                    <span> {data.fathersFullName || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Father's Occupation</b>
                    <span> {data.fathersOccupation || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Father's Date Of Birth</b>
                    <span>
                      {" "}
                      {data.fathersDateOfBirth
                        ? data.fathersDateOfBirth.substring(0, 10)
                        : "--"}
                    </span>
                  </li>
                  <li className="stdList">
                    <b> Father's Mobile Number</b>
                    <span> {data.fathersMobileNumber || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Father's Monthly Income</b>
                    <span> {data.monthlyIncomeOfFather || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Father's Email Address</b>
                    <span> {data.fathersEmailAddress || "--"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 mb-3">
            <div className="card" style={{ padding: "10px" }}>
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <p> Address Information</p>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>Address</b>
                  <span> {data.address || "--"}</span>
                </li>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>Postal Code</b>
                  <span> {data.postalCode || "--"}</span>
                </li>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>Emergency Contact Name</b>
                  <span> {data.nameOfEmergency || "--"}</span>
                </li>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>Emergency Contact NRIC</b>
                  <span> {data.emergencyNric || "--"}</span>
                </li>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>Emergency Contact Mobile</b>
                  <span> {data.emergencyContact || "--"}</span>
                </li>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>Relation To Child</b>
                  <span> {data.relationToChild || "--"}</span>
                </li>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>Name Of Authorised Person To Take child From Class</b>
                  <span> {data.nameOfAuthorised || "--"}</span>
                </li>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>
                    {" "}
                    Relation To Child Of Authorised Person To Take Child From
                    Class
                  </b>
                  <span> {data.relationToChils || data.relation || ""}</span>
                </li>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>
                    {" "}
                    NRIC/FIN No. Authorised Person To Take Child From Class
                  </b>
                  <span> {data.noAuthorisedNric || "--"}</span>
                </li>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>
                    {" "}
                    Contact Number Authorised Person To Take Child From Class
                  </b>
                  <span> {data.contactOfAuthorised || "--"}</span>
                </li>
              </ul>
            </div>
            <div className="card mb-3 mt-3">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2">
                  {/* <FaUsers size={20} /> */}
                  &nbsp;&nbsp; Account Information
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li
                    className="stdList"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <p className="m-0">
                      <b>Refer Center Name</b>
                      <span>{data.referedStudentCenterName || "--"}</span>
                    </p>
                    <p className="m-0">
                      <b>Refer By</b>
                      <span>
                        {studentData &&
                          studentData.map((std) =>
                            parseInt(data.referBy) === std.id
                              ? std.studentNames || "--"
                              : ""
                          )}
                      </span>
                    </p>
                    <p className="m-0">
                      <b>Preferred Day</b>
                      <span>
                        {sortedPreferredDays.length > 0
                          ? sortedPreferredDays.join(", ")
                          : "--"}
                      </span>
                    </p>
                  </li>
                  <li
                    className="stdList"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <b> Preferred Timeslot</b>
                    <span>
                      {" "}
                      {data.preferredTimeSlot
                        ? data.preferredTimeSlot.join(", ")
                        : "--"}
                    </span>
                  </li>
                  <li
                    className="stdList"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <b> Marketing Source</b>
                    <span> {data.marketingSource || "--"}</span>
                  </li>
                  <li
                    className="stdList"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <b> Enquiry Date</b>
                    <span>
                      {" "}
                      {data.enquiryDate?.substring(0, 10) ||
                        data.createdAt?.substring(0, 10) ||
                        ""}
                    </span>
                  </li>
                  <li
                    className="stdList"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <b> Remarks</b>
                    <span> {data.remark || "--"}</span>
                  </li>
                </ul>
              </div>
            </div>
            {data?.assessmentArrange?.length > 0 && (
              <div className="card">
                <div className="withBorder">
                  <p className="fw-medium ms-3 my-2">
                    {/* <FaUsers size={20} /> */}
                    &nbsp;&nbsp; Arranging Assessment
                  </p>
                </div>
                <div style={{ padding: "10px" }}>
                  <hr className="mt-0 mb-2" />
                  {data?.assessmentArrange?.map((arrange, index) => (
                    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                      <li className="stdList pt-0">
                        <p className="m-0">
                          <b>Centre</b>
                          <span>
                            {centerData &&
                              centerData.map((center) =>
                                parseInt(data.centerId) === center.id
                                  ? center.centerNames || "--"
                                  : ""
                              )}
                          </span>
                        </p>
                        <p className="m-0">
                          <b>Student Name</b>
                          <span> {data.studentName || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b>Assessment</b>
                          <span>{arrange.assessment || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b>Assessment Date</b>
                          <span>{arrange.assessmentDate || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b> Start Time</b>
                          <span>{arrange.time || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b>Remark</b>
                          <span>{arrange.remarks || "--"}</span>
                        </p>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="col-md-3 col-12 mb-3">
          {arrangeassesmentData.assessmentArrange &&
          arrangeassesmentData.assessmentArrange.length > 0 ? (
            <>
              <div className="col-md-3 col-12 mb-3">
                <div className="card" style={{ padding: "10px" }}>
                  <hr className="mt-2 mb-0" />
                  <p className="fw-medium ms-3 my-2">
                    {/* <FaBook size={20} /> */}
                    &nbsp;&nbsp;Arranging Assessment Information
                  </p>
                  <h5 className="headColor mt-2 mb-4">
                    Leads Assessment Booking
                  </h5>
                  <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                    <li className="stdList">
                      <b> Student Namer</b>
                      <span>
                        {" "}
                        {arrangeassesmentData &&
                        arrangeassesmentData.assessmentArrange &&
                        arrangeassesmentData.assessmentArrange.length > 0 &&
                        arrangeassesmentData.assessmentArrange[0]
                          ? arrangeassesmentData.assessmentArrange[0]
                              .studentName
                          : "--"}
                      </span>
                    </li>
                    <li className="stdList">
                      <b>Assessment</b>
                      <span>
                        {arrangeassesmentData &&
                        arrangeassesmentData.assessmentArrange &&
                        arrangeassesmentData.assessmentArrange.length > 0 &&
                        arrangeassesmentData.assessmentArrange[0] &&
                        arrangeassesmentData.assessmentArrange[0].assessmentDate
                          ? arrangeassesmentData.assessmentArrange[0].assessment
                          : "--"}
                      </span>
                    </li>
                    <li className="stdList">
                      <b>Date</b>
                      <span>
                        {" "}
                        {arrangeassesmentData &&
                        arrangeassesmentData.assessmentArrange &&
                        arrangeassesmentData.assessmentArrange.length > 0 &&
                        arrangeassesmentData.assessmentArrange[0] &&
                        arrangeassesmentData.assessmentArrange[0].assessmentDate
                          ? arrangeassesmentData.assessmentArrange[0]
                              .assessmentDate
                          : "--"}
                      </span>
                    </li>
                    <li className="stdList">
                      <b>Time</b>
                      <span>
                        {" "}
                        {arrangeassesmentData &&
                        arrangeassesmentData.assessmentArrange &&
                        arrangeassesmentData.assessmentArrange.length > 0 &&
                        arrangeassesmentData.assessmentArrange[0] &&
                        arrangeassesmentData.assessmentArrange[0].time
                          ? arrangeassesmentData.assessmentArrange[0].time
                          : "--"}
                      </span>
                    </li>
                    <li className="stdList">
                      <b>Remark</b>
                      <span>
                        {arrangeassesmentData &&
                        arrangeassesmentData.assessmentArrange &&
                        arrangeassesmentData.assessmentArrange.length > 0 &&
                        arrangeassesmentData.assessmentArrange[0] &&
                        arrangeassesmentData.assessmentArrange[0].remarks
                          ? arrangeassesmentData.assessmentArrange[0].remarks
                          : "--"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {doassesmentData.leadDoAssessmentAlphabet &&
          doassesmentData.leadDoAssessmentAlphabet.length > 0 &&
          doassesmentData.leadDoAssessmentArtyPursuers &&
          doassesmentData.leadDoAssessmentArtyPursuers.length > 0 &&
          doassesmentData.leadDoAssessmentModel &&
          doassesmentData.leadDoAssessmentModel.length > 0 ? (
            <>
                           <div className="card" style={{ padding: "10px" }}>
                 <hr className="mt-2 mb-0" />
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <li className="stdList">
                  <b> Hi parent your childern secured Grade</b>
                  <span>
                    {(doassesmentData &&
                      doassesmentData.leadDoAssessmentModel &&
                      doassesmentData.leadDoAssessmentModel.length > 0 &&
                      doassesmentData.leadDoAssessmentModel[0] &&
                      doassesmentData.leadDoAssessmentAlphabet &&
                      doassesmentData.leadDoAssessmentAlphabet[0] &&
                      doassesmentData.leadDoAssessmentAlphabet[0]
                        .gradeCategory) ||
                      "--"}{" "}
                  </span>
                </li>
                <h5 className="headColor mt-2 mb-4">Child Particulars</h5>
                <li className="stdList">
                  <b>Name</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0]
                      ? doassesmentData.leadDoAssessmentModel[0].name
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b>Assessment Date</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].assessmentDate
                      ? doassesmentData.leadDoAssessmentModel[0].assessmentDate.substring(
                          0,
                          10
                        )
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b>Age</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].age
                      ? doassesmentData.leadDoAssessmentModel[0].age
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b> Date Of Birth</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].year
                      ? doassesmentData.leadDoAssessmentModel[0].year.substring(
                          0,
                          10
                        )
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b> Picture Taken (To Send To Prospective Parents)</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].pictureToken
                      ? doassesmentData.leadDoAssessmentModel[0].pictureToken
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b> Payment Mode</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].paymentMode
                      ? doassesmentData.leadDoAssessmentModel[0].paymentMode
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b> Time Slot Offered</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].timeSlotOffered
                      ? doassesmentData.leadDoAssessmentModel[0].timeSlotOffered
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b> Referred By(Student Name)</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].referredBy
                      ? doassesmentData.leadDoAssessmentModel[0].referredBy
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b> T-Shirt Size</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].tshirtSize
                      ? doassesmentData.leadDoAssessmentModel[0].tshirtSize
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b>Level Assessed</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].levelAssessed
                      ? doassesmentData.leadDoAssessmentModel[0].levelAssessed
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b> Sibling(s)</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].sibling
                      ? doassesmentData.leadDoAssessmentModel[0].sibling
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b> Where Did You Here From ?</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].whereFrom
                      ? doassesmentData.leadDoAssessmentModel[0].whereFrom
                      : "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b> Remark</b>
                  <span>
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].remarks
                      ? doassesmentData.leadDoAssessmentModel[0].remarks
                      : "--"}
                  </span>
                </li>
              </ul>
              </div>
              <div className="card mt-3">
                <div className="withBorder">
                  <p className="fw-medium ms-3 my-2">
                    {/* <FaUsers size={20} /> */}
                    &nbsp;&nbsp; Child Pencil Grip
                  </p>
                </div>
                <div style={{ padding: "10px" }}>
                  <hr className="mt-0 mb-2" />
                  <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                    <li className="stdList pt-0">
                      <p className="m-0">
                        <b>Pencil Grip</b>
                        <span>
                          (
                          {doassesmentData &&
                          doassesmentData.leadDoAssessmentModel &&
                          doassesmentData.leadDoAssessmentModel.length > 0 &&
                          doassesmentData.leadDoAssessmentModel[0] &&
                          doassesmentData.leadDoAssessmentModel[0].pencilGrip
                            ? doassesmentData.leadDoAssessmentModel[0]
                                .pencilGrip
                            : "--"}
                          )&nbsp;
                          {doassesmentData &&
                          doassesmentData.leadDoAssessmentModel &&
                          doassesmentData.leadDoAssessmentModel.length > 0 &&
                          doassesmentData.leadDoAssessmentModel[0] &&
                          doassesmentData.leadDoAssessmentModel[0]
                            .pencilGripHandle
                            ? doassesmentData.leadDoAssessmentModel[0]
                                .pencilGripHandle
                            : "--"}
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card mt-3">
                <div className="withBorder">
                  <p className="fw-medium ms-3 my-2">
                    {/* <FaUsers size={20} /> */}
                    &nbsp;&nbsp; Arty Beliver & Arty Dreamers
                  </p>
                </div>
                <div style={{ padding: "10px" }}>
                  <hr className="mt-0 mb-2" />
                  <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                    <li className="stdList pt-0">
                      <p className="m-0">
                        <b> Comprehending Of Instructions</b>
                        <span>
                          {doassesmentData &&
                          doassesmentData.leadDoAssessmentModel &&
                          doassesmentData.leadDoAssessmentModel.length > 0 &&
                          doassesmentData.leadDoAssessmentModel[0] &&
                          doassesmentData.leadDoAssessmentModel[0]
                            .comprehendingOfInstruction
                            ? doassesmentData.leadDoAssessmentModel[0]
                                .comprehendingOfInstruction
                            : "--"}
                        </span>
                      </p>
                    </li>
                    <li className="stdList pt-0">
                      <p className="m-0">
                        <b> Remarks</b>
                        <span>
                          {doassesmentData &&
                          doassesmentData.leadDoAssessmentModel &&
                          doassesmentData.leadDoAssessmentModel.length > 0 &&
                          doassesmentData.leadDoAssessmentModel[0] &&
                          doassesmentData.leadDoAssessmentModel[0].artyRemarks
                            ? doassesmentData.leadDoAssessmentModel[0]
                                .artyRemarks
                            : "--"}
                        </span>
                      </p>
                    </li>
                    <li className="stdList pt-0">
                      <p className="m-0">
                        <b> Verbal Language Development</b>
                        <span>
                          {doassesmentData &&
                          doassesmentData.leadDoAssessmentModel &&
                          doassesmentData.leadDoAssessmentModel.length > 0 &&
                          doassesmentData.leadDoAssessmentModel[0] &&
                          doassesmentData.leadDoAssessmentModel[0]
                            .verbalLanguageDevelopment
                            ? doassesmentData.leadDoAssessmentModel[0]
                                .verbalLanguageDevelopment
                            : "--"}
                        </span>
                      </p>
                    </li>
                    <li className="stdList pt-0">
                      <p className="m-0">
                        <b> Attention Milestone</b>
                        <span>
                          {doassesmentData &&
                          doassesmentData.leadDoAssessmentModel &&
                          doassesmentData.leadDoAssessmentModel.length > 0 &&
                          doassesmentData.leadDoAssessmentModel[0] &&
                          doassesmentData.leadDoAssessmentModel[0]
                            .attentionMilestone
                            ? doassesmentData.leadDoAssessmentModel[0]
                                .attentionMilestone
                            : "--"}
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
  
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadNewView;
