import React, { useEffect, useRef, useState } from "react";
import { IoIosSettings, IoIosMail } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import StudentViewCourse from "../../pages/Student/StudentNewView/StudentViewCourse";
import StudentViewInvoice from "../../pages/Student/StudentNewView/StudentViewInvoice";
import StudentViewPayment from "../../pages/Student/StudentNewView/StudentViewPayment";
import StudentViewCreditNotes from "../../pages/Student/StudentNewView/StudentViewCreditNotes";
import StudentViewAbsentRecord from "../../pages/Student/StudentNewView/StudentViewAbsentRecord";
import ReferralList from "../../pages/Student/StudentNewView/ReferralList";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllPackageList from "../List/PackageList";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../assets/images/Logo.png";
import PasswordModal from "./StudentNewView/PasswordModal";
import TransferOutModal from "../StudentMovement/TransferOut/TransferOutModal";
import NoImage from "../../assets/images/no-photo.png";
import { Modal, Button } from "react-bootstrap";

function StudentNewView() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [subActiveTab, setSubActiveTab] = useState("tabA");
  const { id } = useParams();
  const [data, setData] = useState({});
  const [centerData, setCenterData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [password, setPassword] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const centerId = data.centerId;
  const table1Ref = useRef();
  const table2Ref = useRef();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setProfileImage(file);
    }
  };

  const handleUploadImage = async () => {
    if (!profileImage) {
      alert("Please select an image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", profileImage);

    try {
      const imageResponse = await api.put(`/updateImageOnly/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (imageResponse.data.success) {
        setResponseMessage(imageResponse.data.message);
        setProfileImage(null);
        handleCloseModal();
        getData();
      }
      toast.success(
        imageResponse.data.message || "Image Updated successfully!"
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setResponseMessage("Failed to update profile image.");
    }
  };

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const packageData = await fetchAllPackageList();
      setCenterData(centerData);
      setPackageData(packageData);
    } catch (error) {
      toast.error(error);
    }
  };
  const getData = async () => {
    try {
      const response = await api.get(`/getAllStudentById/${id}`);
      setData(response.data);
      console.log("responseData", response.data);
      const primaryParent = response.data.studentParentsDetails.find(
        (parent) => parent.primaryContact === true
      );
      const email = primaryParent ? primaryParent.email : null;

      setPassword(email);
      console.log("StudentDetails", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
    fetchData();
  }, [id]);

  const handleMainTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "tab1") {
      setSubActiveTab("tabA");
    } else if (tab === "tab2") {
      setSubActiveTab("tabB");
    }
  };

  const handleGeneratePDF = async () => {
    const pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a3",
    });

    const addTableToPDF = async (tableRef, pageNumber) => {
      const table = tableRef.current;

      try {
        table.style.visibility = "visible";
        table.style.display = "block";
        const canvas = await html2canvas(table, { scale: 2 });

        const imgData = canvas.toDataURL();

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        if (pageNumber > 1) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
        table.style.visibility = "hidden";
        table.style.display = "none";
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };

    await addTableToPDF(table1Ref, 1);
    await addTableToPDF(table2Ref, 2);

    pdf.save(`${data.studentName}-details.pdf`);
  };

  const handleClick = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post(`/resendWelcomeMail`, null, {
        params: { studentId: id },
      });

      toast.success(
        response.data.message || "Welcome mail resent successfully!"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend the welcome mail."
      );
    } finally {
      setLoadIndicator(false);
    }
  };

  const studentData = [];

  if (data.studentCourseDetailModels) {
    data.studentCourseDetailModels.map((std) => {
      studentData.push({
        status: std.status,
        centerName: std.centerName,
        course: std.course,
        classId: std.classId,
        teacher: std.teacher,
        startTime: std.startTime,
        endTime: std.endTime,
        startDate: std.startDate,
        endDate: std.endDate,
      });
    });
  }

  console.log("studentData:", studentData);

  return (
    <section className="p-3">
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
          Student Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/student" className="custom-breadcrumb">
            Student Listing
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Student Listing View
        </li>
      </ol>
      <div className="d-flex align-items-center justify-content-end mb-4">
        <button
          className="btn btn-border btn-sm me-2 stdViewBtn text-center"
          style={{ padding: "3px 5px", fontSize: "12px" }}
          onClick={handleClick}
          disabled={loadIndicator}
        >
          {loadIndicator && (
            <span
              className="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>
          )}
          <IoIosMail size={18} />
          &nbsp;Resend Welcome Mail
        </button>
        <Link to={"/student"}>
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
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-around align-items-end ms-3">
                  <img
                    src={data.profileImage || NoImage}
                    className="img-fluid stdImg"
                    alt=""
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = NoImage;
                    }}
                  />
                  <p onClick={handleOpenModal} style={{ cursor: "pointer" }}>
                    <MdModeEdit />
                  </p>
                </div>
                <p className="fw-medium mt-2 mb-1">
                  {data.studentName || "--"}
                </p>
              </div>
              {storedScreens?.studentListingUpdate && (
                <Link
                  to={`/student/edit/${data.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="stdSettings mb-0">
                    <IoIosSettings /> Edit
                  </p>
                </Link>
              )}
              <p className="stdSettings mt-1 mb-0" onClick={handleGeneratePDF}>
                <IoIosSettings /> Student Detail PDF
              </p>
              <hr className="mt-2 mb-0" />
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <li className="stdList">
                  <b>Student ID</b>
                  <span>{data.studentUniqueId || "--"}</span>
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
                <li className="stdList">
                  <b>Gender</b>
                  <span>{data.gender ? "Male" : "Female"}</span>
                </li>
                <li className="stdList">
                  <b>Nationality</b>
                  <span>{data.nationality || "--"}</span>
                </li>
                <li className="stdList">
                  <b>School</b>
                  <span>
                    {data.schoolType || "--"} / {data.schoolName || "--"}
                  </span>
                </li>
                <li className="stdList">
                  <b>D.O.B</b>
                  <span>
                    {data.dateOfBirth
                      ? data.dateOfBirth.substring(0, 10)
                      : "--"}
                    ({data.age || "--"})
                  </span>
                </li>
                <li className="stdList">
                  <b>Date Enrolled</b>
                  <span>-</span>
                </li>
                <li className="stdList">
                  <b>Status</b>
                  <span>-</span>
                </li>
                <li className="stdList">
                  <b>Refer By Parent</b>
                  <span>{data.referByParent || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Refer By Student</b>
                  <span>{data.referByStudent || "--"}</span>
                </li>
                <li className="stdList">
                  <b>Signature</b>
                  {data.studentTermsAndConditions &&
                    data.studentTermsAndConditions.length > 0 &&
                    data.studentTermsAndConditions.map((parent) => (
                      <span>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ marginBottom: "4px" }}>
                            <img
                              src={parent.parentSignature}
                              alt="Signature"
                              className="img-fluid"
                              style={{
                                width: "100px",
                                height: "50px",
                                border: "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        {parent.termsAndConditionSignatureDate}
                      </span>
                    ))}
                </li>
                <li className="stdList">
                  <b>T&C Signature</b>
                  {data.studentTermsAndConditions &&
                    data.studentTermsAndConditions.length > 0 &&
                    data.studentTermsAndConditions.map((parent) => (
                      <span>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ marginBottom: "4px" }}>
                            <img
                              src={parent.parentSignature}
                              alt="Signature"
                              className="img-fluid"
                              style={{
                                width: "100px",
                                height: "50px",
                                border: "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        {parent.termsAndConditionSignatureDate}
                      </span>
                    ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-12 mb-3">
            {/* <div className="card mb-3">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2">
                  <FaBook size={20} />
                  &nbsp;&nbsp;Course
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                {data.studentCourseDetailModels &&
                  data.studentCourseDetailModels.map((std) => (
                    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                      <li
                        className="stdList"
                        style={{ borderTop: "1px solid #ddd" }}
                      >
                        <b>Current Course</b>
                        <span>{std.course || "--"}</span>
                      </li>
                      <li className="stdList">
                        <b>Teacher</b>
                        <span>{std.teacher || "--"}</span>
                      </li>
                      <li className="stdList">
                        <b>Start Date</b>
                        <span>{std.startDate || "--"}</span>
                      </li>
                      <li className="stdList">
                        <b>Last Lesson Attendance</b>
                        <span>-</span>
                      </li>
                      <li className="stdList">
                        <b>Last Payment Made</b>
                        <span>-</span>
                      </li>
                      <li className="stdList">
                        <b>Last Paid Lesson Date</b>
                        <span>-</span>
                      </li>
                      <li className="stdList">
                        <b>Pre-Assessment Result</b>
                        <span>{data.preAssessmentResult || "--"}</span>
                      </li>
                    </ul>
                  ))}
              </div>
            </div> */}
            {/* <div className="card mb-3">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2">
                  Account Activate/Deactivate
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li
                    className="stdList1"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <div class="dropdown">
                      <button
                        class="btn btn-primary btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Activate
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            Deactivate
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="stdList">
                    <b>Hikvision Status</b>
                    <span>-</span>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="card mb-3">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2">Allow Photos</p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  {/* <li
                    className="stdList1"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <div class="dropdown">
                      <button
                        class="btn btn-primary btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Activate
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            Deactivate
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                  <li className="stdList">
                    <b>Allow Magazine</b>
                    <span>{data.allowMagazine ? "Yes" : "No"}</span>
                  </li>
                  <li className="stdList">
                    <b>Allow Social Media</b>
                    <span>{data.allowSocialMedia ? "Yes" : "No"}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card mb-3">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2">
                  <FaUsers size={20} />
                  &nbsp;&nbsp;Emergency Contact
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li
                    className="stdList"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <p className="m-0">
                      <b>Name</b>
                      <span>
                        {data.studentEmergencyContacts &&
                        data.studentEmergencyContacts.length > 0 &&
                        data.studentEmergencyContacts[0].emergencyContactName
                          ? data.studentEmergencyContacts[0]
                              .emergencyContactName
                          : "--"}
                      </span>
                    </p>
                    <p className="m-0">
                      <b>Mobile No</b>
                      <span>
                        {data.studentEmergencyContacts &&
                        data.studentEmergencyContacts.length > 0 &&
                        data.studentEmergencyContacts[0].emergencyContactNo
                          ? data.studentEmergencyContacts[0].emergencyContactNo
                          : "--"}
                      </span>
                    </p>
                    <p className="m-0">
                      <b>Relation</b>
                      <span>
                        {data.studentEmergencyContacts &&
                        data.studentEmergencyContacts.length > 0 &&
                        data.studentEmergencyContacts[0].emergencyRelation
                          ? data.studentEmergencyContacts[0].emergencyRelation
                          : "--"}
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 mb-3">
            <div
              className="card mb-3 overflow-auto"
              style={{ height: "190px" }}
            >
              <div
                className="withBorder"
                style={{
                  position: "sticky",
                  top: "0px",
                  zIndex: "99",
                  background: "#fff",
                }}
              >
                <p className="fw-medium ms-3 my-2">
                  <FaUsers size={20} />
                  &nbsp;&nbsp;Family
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                <hr className="mt-0 mb-2" />
                {data.studentParentsDetails &&
                  data.studentParentsDetails.length > 0 &&
                  data.studentParentsDetails.map((parent) => (
                    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                      <p className="m-0 " style={{ color: "#287f71" }}>
                        {parent.primaryContact === true
                          ? "Primary Contact"
                          : ""}
                      </p>
                      <li className="stdList">
                        <p className="m-0">
                          <b>Name</b>
                          <span>{parent.parentName || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b>Mobile No</b>
                          <span>{parent.mobileNumber || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b>Email</b>
                          <span>{parent.email || "--"}</span>
                        </p>
                      </li>
                    </ul>
                  ))}
              </div>
            </div>

            <div className="card overflow-auto" style={{ height: "200px" }}>
              <div
                className="withBorder"
                style={{
                  position: "sticky",
                  top: "0px",
                  zIndex: "99",
                  background: "#fff",
                }}
              >
                <p className="fw-medium ms-3 my-2">
                  <FaUsers size={20} />
                  &nbsp;&nbsp; Authorized Person
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                <hr className="mt-0 mb-2" />
                {data?.studentEmergencyContacts?.[0]?.emergencyAuthorizedContactModels?.map(
                  (emergency) => (
                    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                      <li className="stdList pt-0">
                        <p className="m-0">
                          <b>Name</b>
                          <span>{emergency.name || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b>Mobile No</b>
                          <span>{emergency.contactNo || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b>Relation</b>
                          <span>{emergency.authorizedRelation || "--"}</span>
                        </p>
                        <p className="m-0">
                          <b>Address</b>
                          <span>
                            {emergency.emergencyContactAddress || "--"}
                          </span>
                        </p>
                        <p className="m-0">
                          <b>Postal Code</b>
                          <span>{emergency.postalCode || "--"}</span>
                        </p>
                      </li>
                    </ul>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 mb-3">
            <div className="card mb-3">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2">
                  <IoNotificationsOutline size={20} />
                  &nbsp;&nbsp;Outstanding
                </p>
                <PasswordModal password={password} />
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li
                    className="stdList"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    <b>Outstanding</b>
                    <span className="text-danger">0.00</span>
                  </li>
                  <li className="stdList">
                    <b>Deposit Amount (Imported)</b>
                    <span style={{ color: "#fa994af5" }}>0.00</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="card mb-3">
              <div className="withBorder">
                <p className="fw-medium ms-3 my-2">
                  <BiSolidMessageRounded size={20} />
                  &nbsp;&nbsp;Remark
                </p>
                <p className="text-end me-2">
                  <AddTaskNoteModal />
                </p>
              </div>
              <div style={{ padding: "10px" }}>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li
                    className="stdList"
                    style={{ borderTop: "1px solid #ddd" }}
                  >
                    {data.remark || "--"}
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div className="card" style={{ padding: "10px" }}>
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <li className="stdList" style={{ borderTop: "1px solid #ddd" }}>
                  <b>Upload Assessment Form</b>
                  <input
                    type="file"
                    className="form-control form-control-sm mt-1"
                  />
                </li>
                <li className="stdList">
                  <b>Upload Enrollment Form</b>
                  <input
                    type="file"
                    className="form-control form-control-sm mt-1"
                  />
                </li>
                <button className="btn btn-danger btn-sm mt-2" type="button">
                  Save
                </button>
              </ul>
            </div> */}
            <div className="card" style={{ padding: "10px" }}>
              <p className="fw-medium ms-3 my-2">Other Details</p>
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <li className="stdList">
                  <b>Age</b>
                  <span className="">{data.age}</span>
                </li>
                <li className="stdList">
                  <b>Medical Condition</b>
                  <span className="">{data.medicalCondition}</span>
                </li>
                <li className="stdList">
                  <b>PreAssessment Result</b>
                  <span className="">{data.preAssessmentResult}</span>
                </li>
                <li className="stdList">
                  <b>Primary Language</b>
                  <span className="">{data.primaryLanguage}</span>
                </li>
                <li className="stdList">
                  <b>Created At </b>
                  <span className="">{data?.createdAt?.substring(0, 10)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card" style={{ borderRadius: "3px" }}>
          <div className="d-flex gap-2" style={{ padding: "10px" }}>
            {/* <button
              className="btn btn-success btn-sm"
              type="button"
              style={{ fontSize: "12px" }}
            >
              Change Class
            </button> */}
            {centerId && <TransferOutModal id={data.id} centerId={centerId} />}
            {/* <button
              className="btn btn-success btn-sm"
              type="button"
              style={{ fontSize: "12px" }}
            >
              Withdraw
            </button> */}
            {storedScreens?.endClassCreate && (
              <Link
                to={`/student/view/endClass/${data.id}?centerId=${centerId}`}
              >
                <button
                  className="btn btn-success btn-sm"
                  type="button"
                  style={{ fontSize: "12px" }}
                >
                  End Class
                </button>
              </Link>
            )}
            {storedScreens?.registerNewCreate && (
              <Link
                to={`/student/register/course/${data.id}?centerId=${centerId}`}
              >
                <button
                  className="btn btn-success btn-sm"
                  type="button"
                  style={{ fontSize: "12px" }}
                >
                  Register New Course
                </button>
              </Link>
            )}
          </div>
          <ul
            className="nav nav-tabs stdNavTabs"
            style={{ justifyContent: "start" }}
          >
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => handleMainTabClick("tab1")}
                style={{
                  borderTop:
                    activeTab === "tab1" ? "3px solid #fa994af5" : "none",
                  borderRadius: "0px",
                }}
              >
                Course/Lessons
              </button>
            </li>
            <li className="nav-item">
              {/* <button
                className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => handleMainTabClick("tab2")}
                style={{
                  borderTop:
                    activeTab === "tab2" ? "3px solid #fa994af5" : "none",
                  borderRadius: "0px",
                }}
              >
                Account Summary
              </button> */}
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
                onClick={() => setActiveTab("tab3")}
                style={{
                  borderTop:
                    activeTab === "tab3" ? "3px solid #fa994af5" : "none",
                  borderRadius: "0px",
                }}
              >
                Referral List
              </button>
            </li>
          </ul>
          <div className="tab-content mt-2">
            {/* Tabs for tab1 */}
            {activeTab === "tab1" && (
              <>
                <ul
                  className="nav nav-tabs stdNavTabs"
                  style={{ justifyContent: "start" }}
                >
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        subActiveTab === "tabA" ? "active" : ""
                      }`}
                      onClick={() => setSubActiveTab("tabA")}
                      style={{
                        borderTop:
                          subActiveTab === "tabA"
                            ? "3px solid #fa994af5"
                            : "none",
                        borderRadius: "0px",
                      }}
                    >
                      Course
                    </button>
                  </li>
                </ul>
                {/* Table for TabA */}
                {subActiveTab === "tabA" && (
                  <StudentViewCourse data={studentData} />
                )}
              </>
            )}

            {/* Tabs for tab2 */}
            {activeTab === "tab2" && (
              <>
                <ul
                  className="nav nav-tabs stdNavTabs"
                  style={{ justifyContent: "start" }}
                >
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        subActiveTab === "tabB" ? "active" : ""
                      }`}
                      onClick={() => setSubActiveTab("tabB")}
                      style={{
                        borderTop:
                          subActiveTab === "tabB"
                            ? "3px solid #fa994af5"
                            : "none",
                        borderRadius: "0px",
                      }}
                    >
                      Invoice
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        subActiveTab === "tabC" ? "active" : ""
                      }`}
                      onClick={() => setSubActiveTab("tabC")}
                      style={{
                        borderTop:
                          subActiveTab === "tabC"
                            ? "3px solid #fa994af5"
                            : "none",
                        borderRadius: "0px",
                      }}
                    >
                      Payment
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        subActiveTab === "tabD" ? "active" : ""
                      }`}
                      onClick={() => setSubActiveTab("tabD")}
                      style={{
                        borderTop:
                          subActiveTab === "tabD"
                            ? "3px solid #fa994af5"
                            : "none",
                        borderRadius: "0px",
                      }}
                    >
                      Credit Notes
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        subActiveTab === "tabE" ? "active" : ""
                      }`}
                      onClick={() => setSubActiveTab("tabE")}
                      style={{
                        borderTop:
                          subActiveTab === "tabE"
                            ? "3px solid #fa994af5"
                            : "none",
                        borderRadius: "0px",
                      }}
                    >
                      Absent Record With Deposit Balance
                    </button>
                  </li>
                </ul>
                {/* Table for TabB */}
                {subActiveTab === "tabB" && <StudentViewInvoice />}
                {/* Table for TabC */}
                {subActiveTab === "tabC" && <StudentViewPayment />}
                {/* Table for TabD */}
                {subActiveTab === "tabD" && <StudentViewCreditNotes />}
                {/* Table for TabE */}
                {subActiveTab === "tabE" && <StudentViewAbsentRecord />}
              </>
            )}
            {/* Tabs for tab3 */}
            {activeTab === "tab3" && (
              <ReferralList data={data.referralHistoryModels} />
            )}
          </div>
        </div>
      </div>
      <div
        ref={table1Ref}
        className="container p-5 rounded mb-5"
        style={{
          visibility: "hidden",
          position: "absolute",
          left: "-9999px",
          display: "none",
        }}
      >
        <div className="col-lg-6 col-md-6 col-12 p-3">
          <div className="d-flex justify-content-center flex-column align-items-start">
            <img src={Logo} className="img-fluid" width={190} alt=".." />
          </div>
        </div>
        <hr />
        <h3>Student Details</h3>
        <div className="row mt-3">
          <div className="d-flex col-md-4">
            <div className=" fw-medium">Centre Name&nbsp;</div>
            <div className="text-muted">
              :{" "}
              {centerData &&
                centerData.map((center) =>
                  parseInt(data.centerId) === center.id
                    ? center.centerNames || "--"
                    : ""
                )}
            </div>
          </div>
          <div className="d-flex col-md-4">
            <div className="fw-medium">Student Chinese Name&nbsp;</div>
            <div className="text-muted">
              : {data.studentChineseName || "--"}
            </div>
          </div>
          <div className="d-flex col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Student Name / as per ID&nbsp;</div>
              <div className="text-muted"> : {data.studentName || "--"}</div>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Date Of Birth&nbsp;</div>
              <div className="text-muted">
                : {data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : "--"}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Age&nbsp;</div>
              <div className="text-muted"> : {data.age || "--"}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Gender&nbsp;</div>
              <div className="text-muted">
                : {data.gender ? "Male" : "Female"}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4">
            <div className="mb-2 d-flex ">
              <div className="fw-medium">Medical Condition&nbsp;</div>
              <div className="text-muted">
                {" "}
                : {data.medicalCondition || "--"}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">School Name&nbsp;</div>
              <div className="text-muted"> : {data.schoolName || "--"}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">School Type&nbsp;</div>
              <div className="text-muted"> : {data.schoolType || "--"}</div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className=" mb-2 col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Pre-Assessment Result&nbsp;</div>
              <div className="text-muted">
                {" "}
                : {data.preAssessmentResult || "--"}
              </div>
            </div>
          </div>
          <div className=" mb-2 col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Race&nbsp;</div>
              <div className="text-muted"> : {data.race || "--"}</div>
            </div>
          </div>
          <div className=" mb-2 col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Nationality&nbsp;</div>
              <div className="text-muted"> : {data.nationality || "--"}</div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className=" mb-2 col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Primary Language Spoken&nbsp;</div>
              <div className="text-muted">
                :{" "}
                {data.primaryLanguage
                  ? data.primaryLanguage === "ENGLISH"
                    ? "English"
                    : data.primaryLanguage === "CHINESE"
                    ? "Chinese"
                    : "--"
                  : "--"}
              </div>
            </div>
          </div>
          <div className="mb-2 col-md-8">
            <div className="mb-2 d-flex">
              <div className="fw-medium">
                Allow display in Facility Bulletin / Magazine / Advert&nbsp;
              </div>
              <div className="text-muted">
                : {data.allowMagazine ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="mb-2 col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">
                Allow display on Social Media&nbsp;
              </div>
              <div className="text-muted">
                : {data.allowSocialMedia ? "Yes" : "No"}
              </div>
            </div>
          </div>
          <div className="mb-2 col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Refer By Parent&nbsp;</div>
              <div className="text-muted"> : {data.referByParent || "--"}</div>
            </div>
          </div>
          <div className="mb-2 col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Refer By Student&nbsp;</div>
              <div className="text-muted"> : {data.referByStudent || "--"}</div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="mb-2 col-md-4">
            <div className="mb-2 d-flex">
              <div className="fw-medium">Profile Image&nbsp;</div>
              <img
                src={data.profileImage}
                className="img-fluid rounded w-25"
                alt=""
              />
            </div>
          </div>
          <div className="mb-2 col-md-4">
            <div className="mb-2 d-flex ">
              <div className="fw-medium">Remark&nbsp;</div>
              <div className="text-muted"> : {data.remark || "--"}</div>
            </div>
          </div>
        </div>

        <h3 className="mt-5 mb-5">Emergency Contact</h3>
        <div className="row ">
          <div className="mb-2 d-flex col-md-4">
            <div className="fw-medium">Emergency Contact Name&nbsp;</div>
            <div className="text-muted ms-2">
              :{" "}
              {data.studentEmergencyContacts &&
              data.studentEmergencyContacts.length > 0 &&
              data.studentEmergencyContacts[0].emergencyContactName
                ? data.studentEmergencyContacts[0].emergencyContactName
                : "--"}
            </div>
          </div>
          <div className="mb-2 d-flex col-md-4">
            <div className="fw-medium">Emergency Contact No&nbsp;</div>
            <div className="text-muted ms-2">
              :{" "}
              {data.studentEmergencyContacts &&
              data.studentEmergencyContacts.length > 0 &&
              data.studentEmergencyContacts[0].emergencyContactNo
                ? data.studentEmergencyContacts[0].emergencyContactNo
                : "--"}
            </div>
          </div>
          {/* <div className="mb-2 d-flex col-md-4">
              <div className="fw-medium">Relation:</div>
              <div className="text-muted ms-2">
                {data.studentEmergencyContacts &&
                data.studentEmergencyContacts.length > 0 &&
                data.studentEmergencyContacts[0].emergencyRelation
                  ? data.studentEmergencyContacts[0].emergencyRelation
                  : "--"}
              </div>
            </div> */}
        </div>
        <h5 className="mt-3">Authorized Person to take Child From Home</h5>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th className="fw-medium">S.No</th>
                <th className="fw-medium">Person Profile</th>
                <th className="fw-medium">Name</th>
                <th className="fw-medium">Contact No</th>
                <th className="fw-medium">Relation</th>
                <th className="fw-medium">Postal Code</th>
                <th className="fw-medium">Address</th>
              </tr>
            </thead>
            <tbody>
              {data.studentEmergencyContacts &&
                data.studentEmergencyContacts.length > 0 &&
                data.studentEmergencyContacts[0].emergencyAuthorizedContactModels.map(
                  (emergency, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={emergency.personProfile || ""}
                          alt=""
                          style={{ width: "50px", height: "auto" }}
                          className="rounded"
                        />
                      </td>
                      <td>{emergency.name || "--"}</td>
                      <td>{emergency.contactNo || "--"}</td>
                      <td>{emergency.authorizedRelation || "--"}</td>
                      <td>{emergency.postalCode || "--"}</td>
                      <td>{emergency.emergencyContactAddress || "--"}</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>

        <h3 className="mt-5 mb-3">Parent /Guardian</h3>

        <div className="row">
          <div className="col-md-12">
            {data.studentParentsDetails &&
            data.studentParentsDetails.length > 0 ? (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="fw-medium">S.No</th>
                      <th className="fw-medium">Profile Image</th>
                      <th className="fw-medium">Name</th>
                      <th className="fw-medium">Occupation</th>
                      <th className="fw-medium">DOB</th>
                      <th className="fw-medium">Email</th>
                      <th className="fw-medium">Mobile</th>
                      <th className="fw-medium">Relation</th>
                      <th className="fw-medium">Postal Code</th>
                      <th className="fw-medium">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.studentParentsDetails.map((parent, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {parent.profileImage ? (
                            <img
                              src={parent.profileImage}
                              className="img-fluid rounded-5"
                              alt=""
                              style={{ width: "10px" }}
                            />
                          ) : (
                            <></>
                          )}
                        </td>
                        <td>{parent.parentName || "--"}</td>
                        <td>{parent.occupation || "--"}</td>
                        <td>
                          {(parent.parentDateOfBirth &&
                            parent.parentDateOfBirth.substring(0, 10)) ||
                            "--"}
                        </td>
                        <td>{parent.email || "--"}</td>
                        <td>{parent.mobileNumber || "--"}</td>
                        <td>{parent.relation || "--"}</td>
                        <td>{parent.postalCode || "--"}</td>
                        <td>{parent.address || "--"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse"
              >
                <div className="accordion-body">
                  <div className="text-muted">
                    No parent/guardian information available
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <h3 className="mt-5 mb-2">Student Relation</h3>
        <div id="panelsStayOpen-collapseFour">
          <div class="accordion-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="fw-medium">
                      S.No
                    </th>
                    <th scope="col" className="fw-medium">
                      Centre
                    </th>
                    <th scope="col" className="fw-medium">
                      Student Name
                    </th>
                    <th scope="col" className="fw-medium">
                      Relation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.studentRelationModels &&
                    data.studentRelationModels.map((std, index) => (
                      <tr key={std.id}>
                        <td>{index + 1}</td>
                        <td>
                          {centerData &&
                            centerData.map((center) =>
                              parseInt(std.studentRelationCenter) === center.id
                                ? center.centerNames || "--"
                                : ""
                            )}
                        </td>
                        <td>
                          {/* {(studentData &&
                              studentData.find(
                                (student) =>
                                  student.id ===
                                    std.studentRelationStudentName &&
                                  student.centerId === centerId
                              )?.studentNames) || */}
                          {/* "--"} */}
                          {std.studentRelationStudentName || "--"}
                        </td>
                        <td>{std.studentRelation || "--"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={table2Ref}
        className="container rounded mb-5 p-5"
        style={{
          visibility: "hidden",
          position: "absolute",
          left: "-9999px",
          display: "none",
        }}
      >
        <h3 className="mt-5 mb-2">Course Details</h3>
        <div id="panelsStayOpen-collapseFive">
          <div className="">
            {data.studentCourseDetailModels &&
              data.studentCourseDetailModels.map((std) => (
                <div className="container p-3">
                  <div className="row pb-3">
                    <div className="col-md-6 col-12">
                      <div className="row mt-3  mb-2">
                        <div className="col-6 ">
                          <p className="fw-medium">Centre Name</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {std.centerName || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2 mt-3">
                        <div className="col-6  ">
                          <p className="fw-medium">Course</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {std.course || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Class</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b> {std.className || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Class Room</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {std.classRoom || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Batch</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {std.batch || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Day</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b> {std.days || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Start Date</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b> {std.startDate || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">End Date</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b> {std.endDate || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Lesson Start Date</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b> {std.lessonName || "--"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Teacher</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {std.teacher || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Package Name</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {/* {std.packageName || "--"} */}
                            {packageData &&
                              packageData.map((packages) =>
                                parseInt(std.packageName) === packages.id
                                  ? packages.packageNames || "--"
                                  : ""
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <h3 className="mt-5 mb-3">Terms&Condition</h3>
        <div id="panelsStayOpen-collapseSix">
          <div className="row">
            <div className="col-md-6 col-12">
              {data.studentTermsAndConditions &&
                data.studentTermsAndConditions.length > 0 &&
                data.studentTermsAndConditions.map((parent, index) => (
                  <div key={index} className="col-12 p-2">
                    <h6 className="mt-2 mb-4">Parent Signature</h6>
                    <img
                      src={parent.parentSignature}
                      className="img-fluid rounded"
                      style={{ width: "50%" }}
                      alt=""
                    />
                  </div>
                ))}
              {(!data.studentTermsAndConditions ||
                data.studentTermsAndConditions.length === 0) && <></>}
            </div>
            <div className="col-md-6 col-12">
              <div className="container-fluid col-12 p-2">
                {data.studentTermsAndConditions &&
                  data.studentTermsAndConditions.length > 0 &&
                  data.studentTermsAndConditions.map((parent, index) => (
                    <div key={index} className="container-fluid col-12 p-2">
                      <h6 className="mt-2 mb-4">Signature Date</h6>
                      <span>{parent.termsAndConditionSignatureDate}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="fw-light" style={{ color: "#198754" }}>
              Update Profile Image
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="profileImage" className="form-label">
              Select a new profile image:
            </label>
            <input
              type="file"
              className="form-control"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-border bg-light text-dark"
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button className="btn btn-button btn-sm" onClick={handleUploadImage}>
            Update Image
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default StudentNewView;
