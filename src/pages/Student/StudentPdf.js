import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import fetchAllCoursesWithIds from "../List/CourseList";
import BlockImg from "../../assets/images/Block_Img1.jpg";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function StudentPdf() {
  const table1Ref = useRef();
  const table2Ref = useRef();
  const table3Ref = useRef();

  const { id } = useParams();
  const [data, setData] = useState({});
  console.log("Student Datas:", data);
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
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentDetails/${id}`);
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
    const pdf = new jsPDF();

    // Helper function to capture table as image and add to PDF
    const addTableToPDF = async (tableRef, pageNumber) => {
      const table = tableRef.current;

      try {
        // Generate canvas from table
        const canvas = await html2canvas(table, { scale: 2 });

        // Convert canvas to PNG image data
        const imgData = canvas.toDataURL("image/png");

        // Calculate PDF dimensions based on canvas
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Add image to PDF
        if (pageNumber > 1) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };

    // Array of table references
    const tableRefs = [table1Ref, table2Ref, table3Ref];

    // Add each table to PDF
    for (let i = 0; i < tableRefs.length; i++) {
      await addTableToPDF(tableRefs[i], i + 1);
    }

    // Save PDF
    pdf.save("student-details.pdf");
  };
  return (
    <section>
      <div ref={table1Ref}>
          <div className="container ">
            <div className="row">
              <div className="col-md-6 my-2">
                <table
                  className="table table-bordered"
                  id="studentDetailsTable"
                >
                  <h3>Student Details</h3>

                  <tbody>
                    <tr>
                      <td className="col-6 fw-medium">Centre Name</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {centerData &&
                            centerData.map((center) =>
                              parseInt(data.centerId) === center.id
                                ? center.centerNames || "--"
                                : ""
                            )}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-6 fw-medium">Student Chinese Name</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.studentChineseName || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Age</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">{data.age || "--"}</p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Medical Condition</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.medicalCondition || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">School Name</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.schoolName || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Race</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.race || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">
                        Primary Language Spoken
                      </td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.primaryLanguage
                            ? data.primaryLanguage === "ENGLISH"
                              ? "English"
                              : data.primaryLanguage === "CHINESE"
                              ? "Chinese"
                              : "--"
                            : "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Refer By Student</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.referByStudent || "--"}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-6 fw-medium">Remark</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.remark || "--"}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-6 fw-medium">Profile Image</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.profileImage ? (
                            <img
                              src={data.profileImage}
                              onError={(e) => {
                                e.target.src = BlockImg;
                              }}
                              className="img-fluid ms-2 w-100 rounded"
                              alt="Profile Image"
                            />
                          ) : (
                            <img
                              src={BlockImg}
                              className="img-fluid ms-2 w-100 rounded"
                              alt="Profile Image"
                            />
                          )}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6 mt-5">
                <table
                  className="table table-bordered "
                  id="studentDetailsTable"
                >
                  <tbody>
                    <tr>
                      <td className="col-6 fw-medium">
                        Student Name / as per ID
                      </td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.studentName || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Date Of Birth</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.dateOfBirth
                            ? data.dateOfBirth.substring(0, 10)
                            : "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Gender</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.gender ? "Male" : "Female"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">School Type</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.schoolType || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Pre-Assessment Result</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.preAssessmentResult || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Nationality</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.nationality || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Refer By Parent</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.referByParent || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">Remark</td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.remark || "--"}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className="col-6 fw-medium">
                        Allow display in Facility Bulletin / Magazine / Advert
                      </td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.allowMagazine ? "Yes" : "No"}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="col-6 fw-medium">
                        Allow display on Social Media
                      </td>
                      <td className="col-6 bg-light">
                        <p className="text-muted text-sm">
                          {data.allowSocialMedia ? "Yes" : "No"}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="container ">
            <div className="row">
              <div className="col-md-6 my-2">
                <table
                  className="table table-bordered"
                  id="studentDetailsTable"
                >
                  <h3>Emergency Contact</h3>

                  <tbody>
                    <tr>
                      <td className="fw-medium">Emergency Contact Name</td>
                      <td>
                        {data.studentEmergencyContacts &&
                        data.studentEmergencyContacts.length > 0 &&
                        data.studentEmergencyContacts[0].emergencyContactName
                          ? data.studentEmergencyContacts[0]
                              .emergencyContactName
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Emergency Contact No</td>
                      <td>
                        {data.studentEmergencyContacts &&
                        data.studentEmergencyContacts.length > 0 &&
                        data.studentEmergencyContacts[0].emergencyContactNo
                          ? data.studentEmergencyContacts[0].emergencyContactNo
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Relation</td>
                      <td>
                        {data.studentEmergencyContacts &&
                        data.studentEmergencyContacts.length > 0 &&
                        data.studentEmergencyContacts[0].emergencyRelation
                          ? data.studentEmergencyContacts[0].emergencyRelation
                          : "--"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6 mt-5">
                <table
                  className="table table-bordered"
                  id="studentDetailsTable"
                >
                  <tbody>
                    <tr>
                      <th className="fw-medium">
                        Authorized Person to take Child From Home
                      </th>
                    </tr>
                    <tr>
                      <td>
                        {data.studentEmergencyContacts &&
                          data.studentEmergencyContacts.length > 0 &&
                          data.studentEmergencyContacts[0]
                            .emergencyAuthorizedContactModels &&
                          data.studentEmergencyContacts[0].emergencyAuthorizedContactModels.map(
                            (emergency, index) => (
                              <div key={index} className="mt-3">
                                <div className="fw-bold">
                                  Contact {index + 1}
                                </div>
                                <div className="row">
                                  <td className="col-6 fw-medium">Name</td>
                                  <td className="col-6">
                                    {emergency.name || "--"}
                                  </td>
                                </div>
                                <div className="row">
                                  <div className="col-6 fw-medium">
                                    Contact No
                                  </div>
                                  <div className="col-6">
                                    {emergency.contactNo || "--"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 fw-medium">
                                    Relation
                                  </div>
                                  <div className="col-6">
                                    {emergency.authorizedRelation || "--"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 fw-medium">
                                    Postal Code
                                  </div>
                                  <div className="col-6">
                                    {emergency.postalCode || "--"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 fw-medium">Address</div>
                                  <div className="col-6">
                                    {emergency.emergencyContactAddress || "--"}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 fw-medium">
                                    Person Profile
                                  </div>
                                  <div className="col-6">
                                    {emergency.personProfile ? (
                                      <img
                                        src={emergency.personProfile}
                                        onError={(e) => {
                                          e.target.src = BlockImg;
                                        }}
                                        className="img-fluid ms-2 w-100 rounded"
                                        alt="Person Profile"
                                      />
                                    ) : (
                                      <img
                                        src={BlockImg}
                                        className="img-fluid ms-2 w-100 rounded"
                                        alt="Person Profile"
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      {/* <div ref={table2Ref}>
        <div className="container ">
          <div className="row">
            <div className="col-md-6">
             <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-light fs-5 shadow-none border-dark"
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
                  id={`panelsStayOpen-collapseThree-${index}`}
                  className="accordion-collapse collapse"
                  key={index}
                >
                  <div className="accordion-body">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td className="fw-medium">
                              Parents / Guardian Name
                            </td>
                            <td>{parent.parentName || "--"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Occupation</td>
                            <td>{parent.occupation || "--"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Date of Birth</td>
                            <td>
                              {(parent.parentDateOfBirth &&
                                parent.parentDateOfBirth.substring(0, 10)) ||
                                "--"}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Email</td>
                            <td>{parent.email || "--"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Mobile No</td>
                            <td>{parent.mobileNumber || "--"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Relation</td>
                            <td>{parent.relation || "--"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Postal Code</td>
                            <td>{parent.postalCode || "--"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Profile Image</td>
                            <td>
                              {parent.profileImage ? (
                                <img
                                  src={parent.profileImage}
                                  onError={(e) => {
                                    e.target.src = BlockImg;
                                  }}
                                  className="img-fluid w-100 rounded"
                                  alt="Profile"
                                />
                              ) : (
                                <img
                                  src={BlockImg}
                                  className="img-fluid w-100 rounded"
                                  alt="Profile"
                                />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Address</td>
                            <td>{parent.address || "--"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            {(!data.studentParentsDetails ||
              data.studentParentsDetails.length === 0) && (
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
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
            <div className="col-md-6">
              <table className="table table-bordered " id="studentDetailsTable">
                <tbody>
                  <tr>
                    <td className="col-6 fw-medium">
                      Student Name / as per ID
                    </td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.studentName || "--"}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="col-6 fw-medium">Date Of Birth</td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.dateOfBirth
                          ? data.dateOfBirth.substring(0, 10)
                          : "--"}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="col-6 fw-medium">Gender</td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.gender ? "Male" : "Female"}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="col-6 fw-medium">School Type</td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.schoolType || "--"}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="col-6 fw-medium">Pre-Assessment Result</td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.preAssessmentResult || "--"}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="col-6 fw-medium">Nationality</td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.nationality || "--"}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="col-6 fw-medium">Refer By Parent</td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.referByParent || "--"}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="col-6 fw-medium">Remark</td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.remark || "--"}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td className="col-6 fw-medium">
                      Allow display in Facility Bulletin / Magazine / Advert
                    </td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.allowMagazine ? "Yes" : "No"}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="col-6 fw-medium">
                      Allow display on Social Media
                    </td>
                    <td className="col-6 bg-light">
                      <p className="text-muted text-sm">
                        {data.allowSocialMedia ? "Yes" : "No"}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
