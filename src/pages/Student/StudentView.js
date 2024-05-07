import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import fetchAllCoursesWithIds from "../List/CourseList";
import StudentSummary from "./StudentSummary";
function StudentView() {
  const { id } = useParams();
  const [data, setData] = useState({});
  console.log("Student Datas:", data);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const courseData = await fetchAllCoursesWithIds();
      setCenterData(centerData);
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentDetails/${id}`);
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
              <Link to={`/student/register/course/${data.id}`}>
                <button
                  className="btn btn-border btn-sm mx-2 stdViewBtn"
                  style={{ padding: "7px" }}
                >
                  Register New Course
                </button>
              </Link>
            )}
            {storedScreens?.deductDepositCreate && (
              <Link to={"/student/view/deposit"}>
                <button
                  className="btn btn-border btn-sm ms-2 stdViewBtn"
                  style={{ padding: "7px" }}
                >
                  Deduct Deposit
                </button>
              </Link>
            )}
            <StudentSummary className="ms-2" data={data} />
            <Link to={"/student"}>
              <button
                className="btn btn-border btn-sm mx-3"
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
                            {data.primaryLanguageSpokenChinese || "--"}
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
                        <div className="col-6  ">
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
                          <p className="text-muted text-sm">
                            <b className="mx-2">:</b> {data.remark || "--"}
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
                            <img
                              // src={Profile1}
                              src={data.profileImage}
                              className="img-fluid ms-2 w-100 rounded"
                              alt="234"
                            ></img>
                            {/* {data.profileImage || "--"} */}
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
                    <div className="col-md-6 col-12">
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
                    </div>

                    <div className="col-md-6 col-12 mt-5">
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
                                  <img
                                   src={emergency.personProfile}
                                   name="personProfile"
                                   className="img-fluid ms-2 w-100 rounded"
                                  />
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
                        {index === 0 && (
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
                      <div className="col-md-6 col-12">
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
                      </div>
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
                              <img
                                src={parent.profileImage || "--"}
                                className="img-fluid ms-2 w-100 rounded"
                                alt={parent.parentName || "--"}
                              ></img>
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
                            <p className="text-muted text-sm">
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

                    {/* <div className="row pb-3">
                  <div>
                    <button
                      className="btn btn-sm border-none text-primary px-3 my-3 fw-bold fs-4"
                      style={{ backgroundColor: "#b2d3df" }}
                    >
                      2
                    </button>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row  mb-2">
                      <div className="col-6  ">
                        <p className="fw-medium">Parents / Guardian Name</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          <b className="mx-2">:</b>Zheng Zhenjing
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
                          <b className="mx-2">:</b> --
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
                          <b className="mx-2">:</b>--
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row  mb-2">
                      <div className="col-6  ">
                        <p className="fw-medium">Email</p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">
                          <b className="mx-2">:</b>z-j_zheng@hotmail.com
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
                          <b className="mx-2">:</b> +91 96652675
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
                          <b className="mx-2">:</b> Father
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
                          <b className="mx-2">:</b> Grandfather
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
                          <img
                            src={Profile2}
                            className="img-fluid ms-2 w-100 rounded"
                            alt="234"
                          ></img>
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
                          22 Anchorvale Lane Rivercove Residences #15-06
                          Sinapore 544585
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
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
                                  parseInt(data.center) === center.id
                                    ? center.centerNames || "--"
                                    : ""
                                )}
                            </td>
                            <td>{std.studentRelationStudentName || "--"}</td>
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
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="fw-medium">
                          S.No
                        </th>
                        <th scope="col" className="fw-medium">
                          Course
                        </th>
                        <th scope="col" className="fw-medium">
                          Day
                        </th>
                        <th scope="col" className="fw-medium">
                          Start Date
                        </th>
                        <th scope="col" className="fw-medium">
                          End Date
                        </th>
                        <th scope="col" className="fw-medium">
                          Start Time
                        </th>
                        <th scope="col" className="fw-medium">
                          End Time
                        </th>
                        <th scope="col" className="fw-medium">
                          Signature Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.studentCourseDetailModels &&
                        data.studentCourseDetailModels.map((std, index) => (
                          <tr key={std.id}>
                            <td>{index + 1}</td>
                            <td>
                              {" "}
                              {courseData &&
                                courseData.map((course) =>
                                  parseInt(std.course) === course.id
                                    ? course.courseNames || "--"
                                    : ""
                                )}
                            </td>
                            <td>
                              {std.courseDay
                                ? std.courseDay.substring(0, 10)
                                : "--"}
                            </td>
                            <td>
                              {std.startDate
                                ? std.startDate.substring(0, 10)
                                : "--"}
                            </td>
                            <td>
                              {std.endDate
                                ? std.endDate.substring(0, 10)
                                : "--"}
                            </td>
                            <td>{std.startTime || "--"}</td>
                            <td>{std.endTime || "--"}</td>
                            <td>
                              {std.signatureDate
                                ? std.signatureDate.substring(0, 10)
                                : "--"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {data.studentCourseDetailModels &&
                  data.studentCourseDetailModels.length > 0 &&
                  data.studentCourseDetailModels.map((parent) => (
                    <div className="container-fluid col-12 p-2">
                      <h6>Parent Signature</h6>
                      <img
                        src={parent.parentSignature}
                        className="img-fluid rounded"
                        style={{ width: "20%" }}
                        alt="Parent Signature Img"
                      ></img>
                    </div>
                  ))}
                {(!data.studentCourseDetailModels ||
                  data.studentCourseDetailModels.length === 0) && (
                  <div
                    id="panelsStayOpen-collapseThree"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body">
                      <div className="text-muted">
                        Parent Signature / not available !
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudentView;
