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
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";

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
    <div className="container-fluid ">
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
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <div className="withBorder">
                  <p className="fw-medium ms-3 my-2 headColor">
                    {" "}
                    Student Information
                  </p>
                </div>
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
            <div className="card">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2 headColor">
                  {" "}
                  Parent Information
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <span className="d-flex justify-content-end p-0">
                    {" "}
                    {data.primaryContactMother ? (
                      <p className="badge text-bg-primary">primary</p>
                    ) : null}
                  </span>
                  <li className="stdList pt-0">
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
                    <span>
                      {" "}
                      {data.monthlyIncomeOfMother
                        ? data.monthlyIncomeOfMother.split("_").join("-")
                        : "--"}
                    </span>
                  </li>

                  <li className="stdList">
                    <b> Mother's Email Address</b>
                    <span> {data.mothersEmailAddress || "--"}</span>
                  </li>
                  <span className="d-flex justify-content-end pt-1">
                    {data.primaryContactFather ? (
                      <p className="badge text-bg-primary">primary</p>
                    ) : null}
                  </span>
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
                    <span>
                      {" "}
                      {data.monthlyIncomeOfFather
                        ? data.monthlyIncomeOfFather.split("_").join("-")
                        : "--"}
                    </span>
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
            <div className="card mb-3">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2 headColor">Child Ability</p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li className="stdList pt-0">
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
            <div className="card mb-3 ">
              <div className="withBorder">
                <p className="fw-medium ms-3 headColor">
                  {/* <FaUsers size={20} /> */}
                  &nbsp;&nbsp; Account Information
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li className="stdList">
                    <p className="m-0">
                      <b>Refer Center Name</b>
                      <span>{data.referedStudentCenterName || "--"}</span>
                    </p>
                  </li>
                  <li className="stdList">
                    <p className="m-0">
                      <b>Refer By</b>
                      <span>
                        {arrangeassesmentData.referByStudentName || "--"}
                      </span>
                    </p>
                  </li>
                  <li className="stdList">
                    <p className="m-0">
                      <b>Preferred Day</b>
                      <span>
                        {sortedPreferredDays.length > 0
                          ? sortedPreferredDays.join(", ")
                          : "--"}
                      </span>
                    </p>
                  </li>
                  <li className="stdList">
                    <b> Preferred Timeslot</b>
                    <span>
                      {" "}
                      {data.preferredTimeSlot
                        ? data.preferredTimeSlot.join(", ")
                        : "--"}
                    </span>
                  </li>

                  <li className="stdList">
                    <b> Marketing Source</b>
                    <span> {data.marketingSource || "--"}</span>
                  </li>
                  <li className="stdList">
                    <b> Enquiry Date</b>
                    <span>
                      {" "}
                      {data.enquiryDate?.substring(0, 10) ||
                        data.createdAt?.substring(0, 10) ||
                        ""}
                    </span>
                  </li>
                  <li className="stdList">
                    <b>Remarks</b>
                    <span className="text-break"> {data.remark || "--"}</span>
                  </li>
                </ul>
              </div>
            </div>
            {data?.assessmentArrange?.length > 0 && (
              <div className="card">
                <div className="withBorder">
                  <p className="fw-medium ms-3 my-2 headColor">
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
                        <p className="m-0 d-flex gap-5">
                          <b>Assessment</b>
                          <span
                            className="text-wrap"
                            style={{
                              fontSize: "12px",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                            }}
                          >
                            {arrange.assessment || "--"}
                          </span>
                        </p>

                        <p className="m-0 ">
                          <b>Assessment Date</b>
                          <span>{arrange.assessmentDate || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b> Start Time</b>
                          <span>
                            {" "}
                            {arrange.time
                              ? new Date(
                                `1970-01-01T${arrange.time}`
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              : "--"}
                          </span>
                        </p>
                        <p className="m-0">
                          <b>Remark</b>
                          <span className="text-break">{arrange.remarks || "--"}</span>
                        </p>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="col-md-3 col-12 mb-3">
            <div className="card" style={{ padding: "10px" }}>
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <div className="withBorder">
                  <p className="fw-medium ms-3 my-2 headColor">
                    Address Information
                  </p>
                </div>
                <li className="stdList">
                  <b>Address</b>
                  <span> {data.address || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Postal Code</b>
                  <span> {data.postalCode || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Emergency Contact Name</b>
                  <span> {data.nameOfEmergency || "--"}</span>
                </li>
                <li className="stdList me-2">
                  <b>Emergency Contact NRIC</b>
                  <span> {data.emergencyNric || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Emergency Contact Mobile</b>
                  <span> {data.emergencyContact || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Relation To Child</b>
                  <span> {data.relationToChild || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Name Of Authorised Person To Take child From Class</b>
                  <span> {data.nameOfAuthorised || "--"}</span>
                </li>
                <li className="stdList">
                  <b>
                    {" "}
                    Relation To Child Of Authorised Person To Take Child From
                    Class
                  </b>
                  <span> {data.relationToChils || data.relation || ""}</span>
                </li>
                <li className="stdList">
                  <b>
                    {" "}
                    NRIC/FIN No. Authorised Person To Take Child From Class
                  </b>
                  <span> {data.noAuthorisedNric || "--"}</span>
                </li>
                <li className="stdList">
                  <b>
                    {" "}
                    Contact Number Authorised Person To Take Child From Class
                  </b>
                  <span> {data.contactOfAuthorised || "--"}</span>
                </li>
              </ul>
            </div>
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
                            arrangeassesmentData.assessmentArrange[0]
                              .assessmentDate
                            ? arrangeassesmentData.assessmentArrange[0]
                              .assessment
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
                            arrangeassesmentData.assessmentArrange[0]
                              .assessmentDate
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
                        <span className="text-break">
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
                      <b> Hi parent, your children secured Grade </b>
                      <span>
                        {doassesmentData &&
                          doassesmentData.leadDoAssessmentModel &&
                          doassesmentData.leadDoAssessmentModel.length > 0 &&
                          doassesmentData.leadDoAssessmentModel[0] &&
                          doassesmentData.leadDoAssessmentAlphabet &&
                          doassesmentData.leadDoAssessmentAlphabet[0] &&
                          doassesmentData.leadDoAssessmentAlphabet[0]
                            .gradeCategory ? (
                          <span className="badge badges-Green text-dark">
                            {
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .gradeCategory
                            }
                          </span>
                        ) : (
                          "--"
                        )}
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
                          ? doassesmentData.leadDoAssessmentModel[0]
                            .pictureToken
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
                          ? doassesmentData.leadDoAssessmentModel[0]
                            .timeSlotOffered
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
                          ? doassesmentData.leadDoAssessmentModel[0]
                            .levelAssessed
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
                      <b>Remark</b>
                      <span className="text-break">
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
                    <p className="fw-medium ms-3 my-2 headColor">
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
                    <p className="fw-medium ms-3 my-2 headColor">
                      {/* <FaUsers size={20} /> */}
                      &nbsp;&nbsp; Arty Beliver & Arty Dreamers
                    </p>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <hr className="mt-0 mb-2" />
                    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                      <li className="stdList pt-0">
                        <p className="m-0">
                          <b> Comprehension Of Instructions</b>
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
                          <span className="text-break">
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
              <></>
            )}
          </div>
        </div>

        <div className="withBorder m-0"></div>
        {doassesmentData.leadDoAssessmentAlphabet &&
          doassesmentData.leadDoAssessmentAlphabet.length > 0 &&
          doassesmentData.leadDoAssessmentArtyPursuers &&
          doassesmentData.leadDoAssessmentArtyPursuers.length > 0 &&
          doassesmentData.leadDoAssessmentModel &&
          doassesmentData.leadDoAssessmentModel.length > 0 ? (
          <div className="card mt-3">
            {/* Alphabet */}
            {doassesmentData.leadDoAssessmentAlphabet &&
              doassesmentData.leadDoAssessmentAlphabet.length > 0 ? (
              <div className="container-fluid">
                <div className="row  m-3">
                  <h5 className="headColor mt-5 mb-4">Alphabet</h5>
                  <div className="table-responsive">
                    <table class="table">
                      <thead className="table-warning">
                        <tr>
                          <th scope="col">Alphabets</th>
                          <th scope="col">A</th>
                          <th scope="col">B</th>
                          <th scope="col">C</th>
                          <th scope="col">D</th>
                          <th scope="col">E</th>
                          <th scope="col">F</th>
                          <th scope="col">G</th>
                          <th scope="col">H</th>
                          <th scope="col">I</th>
                          <th scope="col">J</th>
                          <th scope="col">K</th>
                          <th scope="col">L</th>
                          <th scope="col">M</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Recognition of sounds</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundA ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundB ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundC ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundD ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundE ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundF ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundG ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundH ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundI ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundJ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundK ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundL ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundM ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Recognition of letters</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterA ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterB ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterC ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterD ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterE ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterF ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterG ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterH ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterI ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterJ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterK ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterL ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterM ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Writing</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterA ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterB ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterC ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterD ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterE ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterF ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterG ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterH ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterI ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterJ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterK ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterL ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterM ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Beginning Sound</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundA ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundA ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundC ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundD ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundE ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundF ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundG ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundH ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundI ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundJ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundK ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundL ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundM ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        {/* <tr>
                                    <th scope="row">Written Strokes</th>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterA ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterB ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterC ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterD ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterE ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterF ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterG ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterH ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterI ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterJ ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterK ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterL ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterM ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                  </tr> */}
                      </tbody>
                    </table>
                  </div>
                  <div className="table-responsive">
                    <table class="table">
                      <thead className="table-warning">
                        <tr>
                          <th scope="col">Alphabets</th>
                          <th scope="col">N</th>
                          <th scope="col">O</th>
                          <th scope="col">P</th>
                          <th scope="col">Q</th>
                          <th scope="col">R</th>
                          <th scope="col">S</th>
                          <th scope="col">T</th>
                          <th scope="col">U</th>
                          <th scope="col">V</th>
                          <th scope="col">W</th>
                          <th scope="col">X</th>
                          <th scope="col">Y</th>
                          <th scope="col">Z</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Recognition of sounds</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundN ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundO ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundP ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundQ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundR ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundS ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundT ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundU ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundV ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundW ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundX ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundY ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfSoundZ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Recognition of letters</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterN ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterO ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterP ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterQ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterR ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterS ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterT ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterU ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterV ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterW ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterX ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterY ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .recognitionOfLetterZ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Writing</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterN ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterO ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterP ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterQ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterR ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterS ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterT ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterU ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterV ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterW ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterX ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterY ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .writingLetterZ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Beginning Sound</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundN ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundO ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundP ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundQ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundR ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundS ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundT ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundU ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundV ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundW ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundX ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundY ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentAlphabet[0]
                                .beginningSoundZ ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        {/* <tr>
                                    <th scope="row">Written Strokes</th>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterN ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterO ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterP ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterQ ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterR ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterS ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterT ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterU ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterV ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterW ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterX ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterY ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                    <td>
                                      {doassesmentData &&
                                      doassesmentData.leadDoAssessmentModel &&
                                      doassesmentData.leadDoAssessmentModel
                                        .length > 0 &&
                                      doassesmentData
                                        .leadDoAssessmentModel[0] &&
                                      doassesmentData.leadDoAssessmentAlphabet &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0] &&
                                      doassesmentData
                                        .leadDoAssessmentAlphabet[0]
                                        .writingLetterZ ? (
                                        <TiTick
                                          style={{
                                            color: "green",
                                            fontSize: "25px",
                                          }}
                                        />
                                      ) : (
                                        <ImCross style={{ color: "red" }} />
                                      )}
                                    </td>
                                  </tr> */}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Association</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          :
                          {doassesmentData &&
                            doassesmentData.leadDoAssessmentModel &&
                            doassesmentData.leadDoAssessmentModel.length > 0 &&
                            doassesmentData.leadDoAssessmentModel[0] &&
                            doassesmentData.leadDoAssessmentAlphabet &&
                            doassesmentData.leadDoAssessmentAlphabet[0] &&
                            doassesmentData.leadDoAssessmentAlphabet[0]
                              .association
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row mb-2">
                      <div className="col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Remarks</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm text-break">
                          :{" "}
                          {doassesmentData &&
                            doassesmentData.leadDoAssessmentModel &&
                            doassesmentData.leadDoAssessmentModel.length > 0 &&
                            doassesmentData.leadDoAssessmentModel[0] &&
                            doassesmentData.leadDoAssessmentAlphabet &&
                            doassesmentData.leadDoAssessmentAlphabet[0] &&
                            doassesmentData.leadDoAssessmentAlphabet[0]
                              .alphabetRemarks
                            ? doassesmentData.leadDoAssessmentAlphabet[0]
                              .alphabetRemarks
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p>Alphabet Information not available </p>
              </div>
            )}

            {/* Arty Pursuers */}
            {doassesmentData.leadDoAssessmentArtyPursuers &&
              doassesmentData.leadDoAssessmentArtyPursuers.length > 0 ? (
              <div className="container-fluid">
                <div className="row m-3">
                  <h5 className="headColor mt-5  mb-4">Arty Pursuers</h5>
                  <div className="col-12">
                    <div className="row mb-2">
                      <div className="col-md-3 col-6 d-flex  align-items-center">
                        <p className="text-sm fw-medium ">Sight Words</p>
                      </div>
                      <div className="col-md-9 col-6">
                        <p className="text-muted text-sm">
                          :{" "}
                          {doassesmentData &&
                            doassesmentData.leadDoAssessmentModel &&
                            doassesmentData.leadDoAssessmentModel.length > 0 &&
                            doassesmentData.leadDoAssessmentModel[0] &&
                            doassesmentData.leadDoAssessmentAlphabet &&
                            doassesmentData.leadDoAssessmentAlphabet[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .sightWords
                            ? doassesmentData.leadDoAssessmentArtyPursuers[0].sightWords.join(
                              " , "
                            )
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="table-responsive">
                    <table class="table">
                      <thead className="table-warning">
                        <tr>
                          <th scope="col">CVC</th>
                          <th scope="col">A</th>
                          <th scope="col">E</th>
                          <th scope="col">I</th>
                          <th scope="col">O</th>
                          <th scope="col">U</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Real</th>
                          <td>
                            Hag{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realHag ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Keg{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realKeg ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Dip{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realDip ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Lot{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realLot ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Bud{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realBud ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Spelling</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realHagSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realHagSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realKegSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realKegSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realDipSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realDipSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realLotSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realLotSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realBudSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .realBudSpelling
                              : "--"}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Non sense</th>
                          <td>
                            Zam{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseZam ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Den{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseDen ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Wip{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseWip ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Sot{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseSot ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Yub{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseYub ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Spelling</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseZamSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseZamSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseDenSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseDenSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseWipSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseWipSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseSotSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseSotSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentAlphabet &&
                              doassesmentData.leadDoAssessmentAlphabet[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseYubSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .nonSenseYubSpelling
                              : "--"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12">
                    <div className="row mb-2">
                      <div className="col-md-3 col-6 d-flex">
                        <p className="text-sm fw-medium ">Remarks</p>
                      </div>
                      <div className="col-md-9 col-6">
                        <p className="text-muted text-sm text-break">
                          {doassesmentData &&
                            doassesmentData.leadDoAssessmentModel &&
                            doassesmentData.leadDoAssessmentModel.length > 0 &&
                            doassesmentData.leadDoAssessmentModel[0] &&
                            doassesmentData.leadDoAssessmentAlphabet &&
                            doassesmentData.leadDoAssessmentAlphabet[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .realRemarks
                            ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .realRemarks
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="table-responsive">
                    <table class="table">
                      <thead className="table-warning">
                        <tr>
                          <th scope="col">CVC</th>
                          <th scope="col">A</th>
                          <th scope="col">E</th>
                          <th scope="col">I</th>
                          <th scope="col">O</th>
                          <th scope="col">U</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">L Blend</th>
                          <td>
                            Claf{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendClaf ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Fled{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendFled ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Silm{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendSilm ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Glob{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendGlob ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Blum{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendBlum ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Spelling</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendClafSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendClafSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendFledSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendFledSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendSilmSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendSilmSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendGlobSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendGlobSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendBlumSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendBlumSpelling
                              : "--"}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">R Blend</th>
                          <td>
                            Drap{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendDrap ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Curd{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendCued ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Brim{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendBrim ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Trop{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendTrop ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Crum{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendCrum ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Spelling</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendDrapSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendDrapSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendCuedSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendCuedSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendBrimSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendBrimSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendTropSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendTropSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendCrumSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .rblendCrumSpelling
                              : "--"}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">S Blend</th>
                          <td>
                            Snap{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSnap ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Smeg{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSmeg ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Spit{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSpit ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Stomp{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendStomp ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Swum{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSwum ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Spelling</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSnapSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSnapSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSmegSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSmegSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSpitSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSpitSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendStompSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendStompSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSwumSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .sblendSwumSpelling
                              : "--"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12">
                    <div className="row mb-2">
                      <div className="col-md-3 col-6 d-flex">
                        <p className="text-sm fw-medium ">Remarks</p>
                      </div>
                      <div className="col-md-9 col-6">
                        <p className="text-muted text-sm text-break">
                          {doassesmentData &&
                            doassesmentData.leadDoAssessmentArtyPursuers &&
                            doassesmentData.leadDoAssessmentArtyPursuers.length >
                            0 &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .blendRemarks
                            ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .blendRemarks
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="table-responsive">
                    <table class="table">
                      <thead className="table-warning">
                        <tr>
                          <th scope="col">H Brothers</th>
                          <th scope="col">SH</th>
                          <th scope="col">CH</th>
                          <th scope="col">WH</th>
                          <th scope="col">TH</th>
                          <th scope="col">PH</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">L Blend</th>
                          <td>
                            Shamrock{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendShamrock ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Choose{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendChoose ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Whack{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendWhack ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Thrust{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendThrust ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            Phobics{" "}
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendPhobics ? (
                              <TiTick
                                style={{
                                  color: "green",
                                  fontSize: "25px",
                                }}
                              />
                            ) : (
                              <ImCross style={{ color: "red" }} />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Spelling</th>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendShamrockSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendShamrockSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendChooseSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendChooseSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendWhackSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendWhackSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentModel &&
                              doassesmentData.leadDoAssessmentModel.length > 0 &&
                              doassesmentData.leadDoAssessmentModel[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendThrustSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendThrustSpelling
                              : "--"}
                          </td>
                          <td>
                            {doassesmentData &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers
                                .length > 0 &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                              doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendPhobicsSpelling
                              ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                                .lblendPhobicsSpelling
                              : "--"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12">
                    <div className="row mb-2">
                      <div className="col-md-3 col-6 d-flex">
                        <p className="text-sm fw-medium ">Remarks</p>
                      </div>
                      <div className="col-md-9 col-6">
                        <p className="text-muted text-sm text-break">
                          {doassesmentData &&
                            doassesmentData.leadDoAssessmentArtyPursuers &&
                            doassesmentData.leadDoAssessmentArtyPursuers.length >
                            0 &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .hbrothersRemarks
                            ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .hbrothersRemarks
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="col-12">
                    <div className="row mb-2">
                      <div className="col-md-3 col-6 d-flex">
                        <p className="text-sm fw-medium ">Sight Words</p>
                      </div>
                      <div className="col-md-9 col-6">
                        <p className="text-muted text-sm">
                          {doassesmentData &&
                            doassesmentData.leadDoAssessmentArtyPursuers &&
                            doassesmentData.leadDoAssessmentArtyPursuers.length >
                            0 &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .hbrothersSightWords
                            ? doassesmentData.leadDoAssessmentArtyPursuers[0].hbrothersSightWords.join(
                              ", "
                            )
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row mb-2">
                      <div className="col-md-3 col-6 d-flex">
                        <p className="text-sm fw-medium ">Remarks</p>
                      </div>
                      <div className="col-md-9 col-6">
                        <p className="text-muted text-sm text-break">
                          {doassesmentData &&
                            doassesmentData.leadDoAssessmentModel &&
                            doassesmentData.leadDoAssessmentModel.length > 0 &&
                            doassesmentData.leadDoAssessmentModel[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0] &&
                            doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .sightWordsRemarks
                            ? doassesmentData.leadDoAssessmentArtyPursuers[0]
                              .sightWordsRemarks
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p>Arty Pursuers Information not available </p>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default LeadNewView;
