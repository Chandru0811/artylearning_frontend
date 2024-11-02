import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import fetchAllCoursesWithIds from "../List/CourseList";
import StudentSummary from "./StudentSummary";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../assets/images/Logo.png";
import fetchAllPackageList from "../List/PackageList";
import fetchAllStudentListByCenter from "../List/StudentListByCenter";
import fetchAllStudentsWithIds from "../List/StudentList";

function StudentView() {
  const table1Ref = useRef();
  const table2Ref = useRef();

  const { id } = useParams();
  const [data, setData] = useState({});
  const centerId = data?.studentRelationModels?.[0]?.studentRelationCenter;
  const studentRelationId =
    data?.studentRelationModels?.[0]?.studentRelationStudentName;
  console.log("datacenterid", centerId);
  console.log("studentRelationId", studentRelationId);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [centerData, setCenterData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const courseData = await fetchAllCoursesWithIds();
      const packageData = await fetchAllPackageList();
      setCenterData(centerData);
      setCourseData(courseData);
      setPackageData(packageData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchStudent = async () => {
    try {
      const student = await fetchAllStudentsWithIds();
      setStudentData(student);
      console.log("studentname", student);
    } catch (error) {
      toast.error("Error fetching student data: " + error.message);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentById/${id}`);
        // console.log("Api data:", response.data);
        setData(response.data);
        console.log("StudentDetails", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    fetchData();
  }, [id]);

  const handleGeneratePDF = async () => {
    const pdf = new jsPDF({
      orientation: "p", // 'p' for portrait, 'l' for landscape
      unit: "px",
      format: "a3", // page format
    });

    // Helper function to capture table as image and add to PDF
    const addTableToPDF = async (tableRef, pageNumber) => {
      const table = tableRef.current;

      try {
        table.style.visibility = "visible";
        table.style.display = "block";
        // Generate canvas from table
        const canvas = await html2canvas(table, { scale: 2 });

        // Convert canvas to PNG image data
        const imgData = canvas.toDataURL();

        // Calculate PDF dimensions based on canvas
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Add image to PDF
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

    // Add each table to PDF
    await addTableToPDF(table1Ref, 1); // Add first table
    await addTableToPDF(table2Ref, 2); // Add second table

    // Save PDF
    pdf.save("student-details.pdf");
  };

  return (
    <>
      <section className="p-3 mt-2">
        <div className="accordion" id="accordionPanelsStayOpenExample">
          <div className="d-flex align-items-center justify-content-end mb-5">
            {/* {storedScreens?.changeClassCreate && (
              <Link to={"/student/view/changeClass"}>
                <button
                  className="btn btn-border btn-sm mx-2 stdViewBtn"
                  style={{ padding: "7px" }}
                >
                  Change Class
                </button>
              </Link>
            )} */}
            {storedScreens?.transferOutCreate && (
              <Link to={`/student/view/transferOut/${data.id}`}>
                <button
                  className="btn btn-border btn-sm mx-2 stdViewBtn"
                  style={{ padding: "7px" }}
                >
                  Transfer Out
                </button>
              </Link>
            )}
            {/* {storedScreens?.withdrawCreate && (
              <Link to={"/student/withdraw"}>
                <button
                  className="btn btn-border btn-sm mx-2 stdViewBtn"
                  style={{ padding: "7px" }}
                >
                  Withdraw
                </button>
              </Link>
            )} */}
            {storedScreens?.endClassCreate && (
              <Link to={`/student/view/endClass/${data.id}`}>
                <button
                  className="btn btn-border btn-sm mx-2 stdViewBtn"
                  style={{ padding: "7px" }}
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
                  className="btn btn-border btn-sm mx-2 stdViewBtn"
                  style={{ padding: "7px" }}
                >
                  Register New Course
                </button>
              </Link>
            )}
            {/* {storedScreens?.deductDepositCreate && (
              <Link to={"/student/view/deposit"}>
                <button
                  className="btn btn-border btn-sm ms-2 stdViewBtn"
                  style={{ padding: "7px" }}
                >
                  Deduct Deposit
                </button>
              </Link>
            )} */}
            <StudentSummary className="ms-2" data={data} />

            <button
              onClick={handleGeneratePDF}
              className="btn btn-border btn-sm mx-3"
              style={{ padding: "7px" }}
            >
              Generate PDF
            </button>
            <Link to={"/student"}>
              <button
                className="btn btn-border btn-sm "
                style={{ padding: "7px" }}
              >
                Back
              </button>
            </Link>
          </div>

          {/* Student Details */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button  bg-light fs-5 shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Student Details & Videography / Photography
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div clasclassName="accordion-body row">
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
                            {centerData &&
                              centerData.map((center) =>
                                parseInt(data.centerId) === center.id
                                  ? center.centerNames || "--"
                                  : ""
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2 mt-3">
                        <div className="col-6  ">
                          <p className="fw-medium">Student Name / as per ID</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {data.studentName || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Student Chinese Name</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>{" "}
                            {data.studentChineseName || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Date Of Birth</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>{" "}
                            {data.dateOfBirth
                              ? data.dateOfBirth.substring(0, 10)
                              : "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Age</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {data.age || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Gender</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>{" "}
                            {data.gender ? "Male" : "Female"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Medical Condition</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>{" "}
                            {data.medicalCondition || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">School Type</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b> {data.schoolType || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">School Name</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b> {data.schoolName || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Pre-Assessment Result</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {data.preAssessmentResult || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Race</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {data.race || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Nationality</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b> {data.nationality || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Primary Language Spoken</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>{" "}
                            {data.primaryLanguage
                              ? data.primaryLanguage === "ENGLISH"
                                ? "English"
                                : data.primaryLanguage === "CHINESE"
                                ? "Chinese"
                                : "--"
                              : "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Refer By Parent</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {data.referByParent || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6">
                          <p className="fw-medium">Refer By Student</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>{" "}
                            {data.referByStudent || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Remark</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm text-break">
                            <b className="mx-2">:</b> {data.remark || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">
                            Allow display on Social Media
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>{" "}
                            {data.allowSocialMedia ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">
                            Allow display in Facility Bulletin / Magazine /
                            Advert
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>{" "}
                            {data.allowMagazine ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Profile Image</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            <p className="my-2 d-flex">
                              {data.profileImage ? (
                                <img
                                  src={data.profileImage}
                                  className="img-fluid ms-2 w-100 rounded"
                                  alt=""
                                />
                              ) : (
                                <div></div>
                              )}
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Emergency Contact */}
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed  bg-light fs-5 shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Emergency Contact & Authorized Person to Take Child from Class
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              class="accordion-collapse collapse"
            >
              <div clasclassName="accordion-body row">
                <div className="container p-3">
                  <div className="row pb-3 ">
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Emergency Contact Name</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {data.studentEmergencyContacts &&
                            data.studentEmergencyContacts.length > 0 &&
                            data.studentEmergencyContacts[0]
                              .emergencyContactName
                              ? data.studentEmergencyContacts[0]
                                  .emergencyContactName
                              : "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Emergency Contact No</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {data.studentEmergencyContacts &&
                            data.studentEmergencyContacts.length > 0 &&
                            data.studentEmergencyContacts[0].emergencyContactNo
                              ? data.studentEmergencyContacts[0]
                                  .emergencyContactNo
                              : "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-12">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium">Relation</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b>
                            {data.studentEmergencyContacts &&
                            data.studentEmergencyContacts.length > 0 &&
                            data.studentEmergencyContacts[0].emergencyRelation
                              ? data.studentEmergencyContacts[0]
                                  .emergencyRelation
                              : "--"}
                          </p>
                        </div>
                      </div>
                    </div> */}

                    <div className="col-md-6 col-12 ">
                      <div className="row  mb-2">
                        <div className="col-6  ">
                          <p className="fw-medium"></p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm"></p>
                        </div>
                      </div>
                    </div>

                    {/* Multiple Emergency Contact Data */}
                    <h5 className="my-4">
                      Authorized Person to take Child From Home
                    </h5>
                    {data?.studentEmergencyContacts?.[0]?.emergencyAuthorizedContactModels?.map(
                      (emergency, index) => (
                        <div className="row" key={index}>
                          <div className="d-flex align-items-center justify-content-between">
                            <button
                              className="btn btn-sm border-none text-primary px-3 my-3 fw-bold fs-4"
                              style={{ backgroundColor: "#b2d3df" }}
                            >
                              {index + 1}
                            </button>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row  mb-2">
                              <div className="col-6  ">
                                <p className="fw-medium">Name</p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  <b className="mx-2">:</b>
                                  {emergency.name || "--"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row  mb-2">
                              <div className="col-6  ">
                                <p className="fw-medium">Contact No</p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  <b className="mx-2">:</b>
                                  {emergency.contactNo || "--"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row  mb-2">
                              <div className="col-6  ">
                                <p className="fw-medium">Relation</p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  <b className="mx-2">:</b>
                                  {emergency.authorizedRelation || "--"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row  mb-2">
                              <div className="col-6  ">
                                <p className="fw-medium">Postal Code</p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  <b className="mx-2">:</b>
                                  {emergency.postalCode || "--"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row  mb-2">
                              <div className="col-6  ">
                                <p className="fw-medium">Address</p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  <b className="mx-2">:</b>
                                  {emergency.emergencyContactAddress || "--"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="row  mb-2">
                              <div className="col-6  ">
                                <p className="fw-medium">Person Profile</p>
                              </div>
                              <div className="col-6">
                                <p className="text-muted text-sm">
                                  <b className="mx-2">:</b>
                                  <p className="my-2 d-flex">
                                    {emergency.personProfile ? (
                                      <img
                                        src={emergency.personProfile}
                                        name="personProfile"
                                        className="img-fluid ms-2 w-100 rounded"
                                        alt=""
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </p>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    {/* {(!data.studentEmergencyContacts.emergencyAuthorizedContactModels ||
                      data.studentEmergencyContacts.emergencyAuthorizedContactModels.length === 0) && (
                      <div className="text-muted">
                        No parent/guardian information available
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Parent Details */}
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed  bg-light fs-5 shadow-none border-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
              >
                Parent / Guardian
              </button>
            </h2>
            {data.studentParentsDetails &&
              data.studentParentsDetails.length > 0 &&
              data.studentParentsDetails.map((parent, index) => (
                <div
                  id="panelsStayOpen-collapseThree"
                  class="accordion-collapse collapse"
                  key={index}
                >
                  <div class="accordion-body">
                    <div className="row pb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <button
                          className="btn btn-sm border-none text-primary px-3 my-3 fw-bold fs-4"
                          style={{ backgroundColor: "#b2d3df" }}
                        >
                          {index + 1}
                        </button>
                      </div>
                      <div className="col-10"></div>
                      <div className="col-2">
                        {parent.primaryContact && (
                          <div className="col-12 mb-2">
                            <p className="badge text-bg-primary">primary</p>
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Parents / Guardian Name</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              <b className="mx-2">:</b>
                              {parent.parentName || "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Occupation</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              <b className="mx-2">:</b>
                              {parent.occupation || "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Date of Birth</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              <b className="mx-2">:</b>
                              {(parent.parentDateOfBirth &&
                                parent.parentDateOfBirth.substring(0, 10)) ||
                                "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Email</p>
                          </div>
                          <div className="col-6" style={{ overflow: "auto" }}>
                            <p className="text-muted text-sm">
                              <b className="mx-2">:</b>
                              {parent.email || "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Mobile No</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              <b className="mx-2">:</b>
                              {parent.mobileNumber || "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Relation</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              <b className="mx-2">:</b>
                              {parent.relation || "--"}
                            </p>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Postal Code</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              <b className="mx-2">:</b>
                              {parent.postalCode || "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Profile Image</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm">
                              <b className="mx-2">:</b>
                              <p className="my-2 d-flex">
                                {parent.profileImage ? (
                                  <img
                                    src={parent.profileImage}
                                    className="img-fluid ms-2 w-100 rounded"
                                    alt=""
                                  />
                                ) : (
                                  <div></div>
                                )}
                              </p>
                              {/* {data.studentParentsDetails &&
                          data.studentParentsDetails.length > 0 &&
                          data.studentParentsDetails[0].profileImage
                            ? data.studentParentsDetails[0].profileImage
                            : "--"} */}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row  mb-2">
                          <div className="col-6  ">
                            <p className="fw-medium">Address</p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted text-sm text-break">
                              <b className="mx-2">:</b>
                              {data.studentParentsDetails &&
                              data.studentParentsDetails.length > 0 &&
                              data.studentParentsDetails[0].address
                                ? data.studentParentsDetails[0].address
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
              ))}
            {(!data.studentParentsDetails ||
              data.studentParentsDetails.length === 0) && (
              <div
                id="panelsStayOpen-collapseThree"
                class="accordion-collapse collapse"
              >
                <div class="accordion-body">
                  <div className="text-muted">
                    No parent/guardian information available
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Relation */}
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed bg-light fs-5 shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseFour"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseFour"
              >
                Student Relation
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFour"
              class="accordion-collapse collapse"
            >
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
                                  parseInt(std.studentRelationCenter) ===
                                  center.id
                                    ? center.centerNames || "--"
                                    : ""
                                )}
                            </td>
                            <td>
                              {studentData &&
                                studentData.map((student) =>
                                  parseInt(std.studentRelationStudentName) ===
                                  student.id
                                    ? student.studentNames || "--"
                                    : ""
                                )}
                            </td>
                            {/* <td>{std.studentRelationStudentName || "--"}</td> */}
                            <td>{std.studentRelation || "--"}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Course Details */}
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed  bg-light fs-5 shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseFive"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseFive"
              >
                Course Detail
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFive"
              class="accordion-collapse collapse"
            >
              <div class="accordion-body">
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
                                  <b className="mx-2">:</b>{" "}
                                  {std.className || "--"}
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
                                  <b className="mx-2">:</b>{" "}
                                  {std.startDate || "--"}
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
                                  <b className="mx-2">:</b>{" "}
                                  {std.endDate || "--"}
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
                                  <b className="mx-2">:</b>{" "}
                                  {std.lessonName || "--"}
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
            </div>
          </div>
          {/* Terms And Conditions Details */}
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed  bg-light fs-5 shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseSix"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseSix"
              >
                Terms And Conditions Details
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseSix"
              class="accordion-collapse collapse"
            >
              <div class="accordion-body">
                <div className="row">
                  <div className="col-md-6 col-12">
                    {data.studentTermsAndConditions &&
                      data.studentTermsAndConditions.length > 0 &&
                      data.studentTermsAndConditions.map((parent) => (
                        <div className="container-fluid col-12 p-2">
                          <h6 className="mt-2 mb-4">Parent Signature</h6>
                          <img
                            src={parent.parentSignature}
                            className="img-fluid rounded"
                            style={{ width: "50%" }}
                            alt="Parent Signature Img"
                          ></img>
                        </div>
                      ))}
                    {(!data.studentTermsAndConditions ||
                      data.studentTermsAndConditions.length === 0) && <></>}
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="container-fluid col-12 p-2">
                      {data.studentTermsAndConditions &&
                        data.studentTermsAndConditions.length > 0 &&
                        data.studentTermsAndConditions.map((parent) => (
                          <div className="container-fluid col-12 p-2">
                            <h6 className="mt-2 mb-4">Signature Date</h6>
                            <span>{parent.termsAndConditionSignatureDate}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
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
            <div className="mb-2 d-flex col-md-4">
              <div className=" fw-medium">Centre Name : </div>
              <div className="text-muted">
                {centerData &&
                  centerData.map((center) =>
                    parseInt(data.centerId) === center.id
                      ? center.centerNames || "--"
                      : ""
                  )}
              </div>
            </div>
            <div className="mb-2 d-flex col-md-4">
              <div className="fw-medium">Student Chinese Name :</div>
              <div className="text-muted">
                {data.studentChineseName || "--"}
              </div>
            </div>
            <div className="mb-2 d-flex col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Student Name / as per ID :</div>
                <div className="text-muted">{data.studentName || "--"}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="mb-2  d-flex">
                <div className="fw-medium">Date Of Birth :</div>
                <div className="text-muted">
                  {data.dateOfBirth ? data.dateOfBirth.substring(0, 10) : "--"}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Age :</div>
                <div className="text-muted">{data.age || "--"}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Gender :</div>
                <div className="text-muted">
                  {data.gender ? "Male" : "Female"}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="mb-2 d-flex ">
                <div className="fw-medium">Medical Condition :</div>
                <div className="text-muted">
                  {data.medicalCondition || "--"}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">School Name :</div>
                <div className="text-muted">{data.schoolName || "--"}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">School Type :</div>
                <div className="text-muted">{data.schoolType || "--"}</div>
              </div>
              <div className="mb-2 d-flex">
                <div className="fw-medium">Pre-Assessment Result :</div>
                <div className="text-muted">
                  {data.preAssessmentResult || "--"}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" mb-2 col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Race:</div>
                <div className="text-muted">{data.race || "--"}</div>
              </div>
            </div>
            <div className=" mb-2 col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Nationality:</div>
                <div className="text-muted">{data.nationality || "--"}</div>
              </div>
            </div>
            <div className=" mb-2 col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Primary Language Spoken :</div>
                <div className="text-muted">
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
          </div>
          <div className="row">
            <div className="mb-2 col-md-8">
              <div className="mb-2 d-flex">
                <div className="fw-medium">
                  Allow display in Facility Bulletin / Magazine / Advert :
                </div>
                <div className="text-muted">
                  {data.allowMagazine ? "Yes" : "No"}
                </div>
              </div>
            </div>
            <div className="mb-2 col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Allow display on Social Media :</div>
                <div className="text-muted">
                  {data.allowSocialMedia ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mb-2 col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Refer By Parent :</div>
                <div className="text-muted">{data.referByParent || "--"}</div>
              </div>
            </div>
            <div className="mb-2 col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Refer By Student :</div>
                <div className="text-muted">{data.referByStudent || "--"}</div>
              </div>
            </div>

            <div className="mb-2 col-md-4">
              <div className="mb-2 d-flex">
                <div className="fw-medium">Profile Image :</div>
                <img
                  src={data.profileImage}
                  className="img-fluid rounded w-25"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mb-2 d-flex ">
            <div className="fw-medium">Remark :</div>
            <div className="text-muted">{data.remark || "--"}</div>
          </div>
          <h3 className="mt-5 mb-5">Emergency Contact</h3>
          <div className="row ">
            <div className="mb-2 d-flex col-md-4">
              <div className="fw-medium">Emergency Contact Name:</div>
              <div className="text-muted ms-2">
                {data.studentEmergencyContacts &&
                data.studentEmergencyContacts.length > 0 &&
                data.studentEmergencyContacts[0].emergencyContactName
                  ? data.studentEmergencyContacts[0].emergencyContactName
                  : "--"}
              </div>
            </div>
            <div className="mb-2 d-flex col-md-4">
              <div className="fw-medium">Emergency Contact No:</div>
              <div className="text-muted ms-2">
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
                                parseInt(std.studentRelationCenter) ===
                                center.id
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
      </section>
    </>
  );
}

export default StudentView;
