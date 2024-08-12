import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import Logo from "../../assets/images/Logo.png";
import html2canvas from "html2canvas";

const AssesmentPdf = ({ doassesmentData }) => {
  console.log("doassesmentData",doassesmentData)
  const [loadIndicator, setLoadIndicator] = useState(false);
  const table1Ref = useRef();
  const table2Ref = useRef();

  const handleGeneratePDF = async () => {
    setLoadIndicator(true)
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
    const fileName = doassesmentData &&
    doassesmentData.leadDoAssessmentModel &&
    doassesmentData.leadDoAssessmentModel.length > 0 &&
    doassesmentData.leadDoAssessmentModel[0]
    ? doassesmentData.leadDoAssessmentModel[0].name
    : "Assessment";

  pdf.save(`${fileName}.pdf`);
    setLoadIndicator(false)
  };
  return (
    <>
      <div>
        <button
          type="button"
          class="btn btn-border btn-sm"
          onClick={handleGeneratePDF}
          disabled={loadIndicator}
        >
          {" "}
          {loadIndicator && (
            <span
              className="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>
          )}
          generatePDF
        </button>
      </div>
      <div
        ref={table1Ref}
        className="container p-3 rounded mb-5"
        style={{
          visibility: "hidden",
          position: "absolute",
          left: "-9999px",
          display: "none",
        }}
      >
        <div className="d-flex justify-content-center flex-column align-items-center mb-3">
          <img src={Logo} className="img-fluid" width={190} alt=".." />
        </div>
        {/* Child Particulars */}
        <div className="container-fluid">
          <div className="row  mx-3 my-1">
            <div className="d-flex justify-content-between">
              <h5 className="headColor mt-2 mb-4">Child Particularss</h5>
            </div>

            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium">Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0]
                      ? doassesmentData.leadDoAssessmentModel[0].name
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <p className="text-sm fw-medium">Assessment Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
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
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium">Age</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].age
                      ? doassesmentData.leadDoAssessmentModel[0].age
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">Date Of Birth</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
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
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">
                    Picture Taken (To Send To Prospective Parents)
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].pictureToken
                      ? doassesmentData.leadDoAssessmentModel[0].pictureToken
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">Payment Mode</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].paymentMode
                      ? doassesmentData.leadDoAssessmentModel[0].paymentMode
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">Time Slot Offered</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].timeSlotOffered
                      ? doassesmentData.leadDoAssessmentModel[0].timeSlotOffered
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">
                    Referred By(Student Name)
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].referredBy
                      ? doassesmentData.leadDoAssessmentModel[0].referredBy
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">T-Shirt Size</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].tshirtSize
                      ? doassesmentData.leadDoAssessmentModel[0].tshirtSize
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">Level Assessed</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].levelAssessed
                      ? doassesmentData.leadDoAssessmentModel[0].levelAssessed
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">Sibling(s)</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].sibling
                      ? doassesmentData.leadDoAssessmentModel[0].sibling
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">
                    Where Did You Here From ?
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].whereFrom
                      ? doassesmentData.leadDoAssessmentModel[0].whereFrom
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">Remark</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].remarks
                      ? doassesmentData.leadDoAssessmentModel[0].remarks
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Child Pencil Grip */}
        <div className="container-fluid">
          <div className="row  mx-3 my-1">
            <h5 className="headColor mt-2 mb-4">Child Pencil Grip</h5>
            <div className="col-12">
              <div className="row ">
                <div className="col-3 d-flex  align-items-center">
                  <p className="text-sm fw-medium">Pencil Grip</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">
                    : (
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].pencilGrip
                      ? doassesmentData.leadDoAssessmentModel[0].pencilGrip
                      : "--"}
                    )&nbsp;
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].pencilGripHandle
                      ? doassesmentData.leadDoAssessmentModel[0]
                          .pencilGripHandle
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Arty Beliver & Arty Dreamers */}
        <div className="container-fluid">
          <div className="row  mx-3 my-1">
            <h5 className="headColor mt-2 mb-4">
              Arty Beliver & Arty Dreamers
            </h5>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">
                    Comprehending Of Instructions
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0]
                      .comprehendingOfInstruction
                      ? doassesmentData.leadDoAssessmentModel[0]
                          .comprehendingOfInstruction
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">Remarks</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].artyRemarks
                      ? doassesmentData.leadDoAssessmentModel[0].artyRemarks
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row ">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">
                    Verbal Language Development
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0]
                      .verbalLanguageDevelopment
                      ? doassesmentData.leadDoAssessmentModel[0]
                          .verbalLanguageDevelopment
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row">
                <div className="col-6 d-flex  align-items-center">
                  <p className="text-sm fw-medium ">Attention Milestone</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {doassesmentData &&
                    doassesmentData.leadDoAssessmentModel &&
                    doassesmentData.leadDoAssessmentModel.length > 0 &&
                    doassesmentData.leadDoAssessmentModel[0] &&
                    doassesmentData.leadDoAssessmentModel[0].attentionMilestone
                      ? doassesmentData.leadDoAssessmentModel[0]
                          .attentionMilestone
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Alphabet */}
        {doassesmentData.leadDoAssessmentAlphabet &&
        doassesmentData.leadDoAssessmentAlphabet.length > 0 ? (
          <div className="container-fluid">
            <div className="row  mx-3 my-1">
              <h5 className="headColor mt-2 mb-4">Alphabet</h5>
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
                      <th scope="row">Uppercase</th>
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
                          .uppercaseA ? (
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
                          .uppercaseB ? (
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
                          .uppercaseC ? (
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
                          .uppercaseD ? (
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
                          .uppercaseE ? (
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
                          .uppercaseF ? (
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
                          .uppercaseG ? (
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
                          .uppercaseH ? (
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
                          .uppercaseI ? (
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
                          .uppercaseJ ? (
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
                          .uppercaseK ? (
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
                          .uppercaseL ? (
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
                          .uppercaseM ? (
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
                      <th scope="row">Written Strokes</th>
                      <td>
                        {doassesmentData &&
                        doassesmentData.leadDoAssessmentModel &&
                        doassesmentData.leadDoAssessmentModel.length > 0 &&
                        doassesmentData.leadDoAssessmentModel[0] &&
                        doassesmentData.leadDoAssessmentAlphabet &&
                        doassesmentData.leadDoAssessmentAlphabet[0] &&
                        doassesmentData.leadDoAssessmentAlphabet[0]
                          .writtenStrokesUpperA ? (
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
                          .writtenStrokesUpperB ? (
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
                          .writtenStrokesUpperC ? (
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
                          .writtenStrokesUpperD ? (
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
                          .writtenStrokesUpperE ? (
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
                          .writtenStrokesUpperF ? (
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
                          .writtenStrokesUpperG ? (
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
                          .writtenStrokesUpperH ? (
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
                          .writtenStrokesUpperI ? (
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
                          .writtenStrokesUpperJ ? (
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
                          .writtenStrokesUpperK ? (
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
                          .writtenStrokesUpperL ? (
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
                          .writtenStrokesUpperM ? (
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
                      <th scope="row">Lowercase</th>
                      <td>
                        {doassesmentData &&
                        doassesmentData.leadDoAssessmentModel &&
                        doassesmentData.leadDoAssessmentModel.length > 0 &&
                        doassesmentData.leadDoAssessmentModel[0] &&
                        doassesmentData.leadDoAssessmentAlphabet &&
                        doassesmentData.leadDoAssessmentAlphabet[0] &&
                        doassesmentData.leadDoAssessmentAlphabet[0]
                          .lowercaseA ? (
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
                          .lowercaseB ? (
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
                          .lowercaseC ? (
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
                          .lowercaseD ? (
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
                          .lowercaseE ? (
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
                          .lowercaseF ? (
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
                          .lowercaseG ? (
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
                          .lowercaseH ? (
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
                          .lowercaseI ? (
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
                          .lowercaseJ ? (
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
                          .lowercaseK ? (
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
                          .lowercaseL ? (
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
                          .lowercaseM ? (
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
                    <tr>
                      <th scope="row">Written Strokes</th>
                      <td>
                        {doassesmentData &&
                        doassesmentData.leadDoAssessmentModel &&
                        doassesmentData.leadDoAssessmentModel.length > 0 &&
                        doassesmentData.leadDoAssessmentModel[0] &&
                        doassesmentData.leadDoAssessmentAlphabet &&
                        doassesmentData.leadDoAssessmentAlphabet[0] &&
                        doassesmentData.leadDoAssessmentAlphabet[0]
                          .writtenStrokesLowerA ? (
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
                          .writtenStrokesLowerB ? (
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
                          .writtenStrokesLowerC ? (
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
                          .writtenStrokesLowerD ? (
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
                          .writtenStrokesLowerE ? (
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
                          .writtenStrokesLowerF ? (
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
                          .writtenStrokesLowerG ? (
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
                          .writtenStrokesLowerH ? (
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
                          .writtenStrokesLowerI ? (
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
                          .writtenStrokesLowerJ ? (
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
                          .writtenStrokesLowerK ? (
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
                          .writtenStrokesLowerL ? (
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
                          .writtenStrokesLowerM ? (
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
                      <th scope="row">Uppercase</th>
                      <td>
                        {doassesmentData &&
                        doassesmentData.leadDoAssessmentModel &&
                        doassesmentData.leadDoAssessmentModel.length > 0 &&
                        doassesmentData.leadDoAssessmentModel[0] &&
                        doassesmentData.leadDoAssessmentAlphabet &&
                        doassesmentData.leadDoAssessmentAlphabet[0] &&
                        doassesmentData.leadDoAssessmentAlphabet[0]
                          .uppercaseN ? (
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
                          .uppercaseO ? (
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
                          .uppercaseP ? (
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
                          .uppercaseQ ? (
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
                          .uppercaseR ? (
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
                          .uppercaseS ? (
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
                          .uppercaseT ? (
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
                          .uppercaseU ? (
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
                          .uppercaseV ? (
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
                          .uppercaseW ? (
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
                          .uppercaseX ? (
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
                          .uppercaseY ? (
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
                          .uppercaseZ ? (
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
                      <th scope="row">Written Strokes</th>
                      <td>
                        {doassesmentData &&
                        doassesmentData.leadDoAssessmentModel &&
                        doassesmentData.leadDoAssessmentModel.length > 0 &&
                        doassesmentData.leadDoAssessmentModel[0] &&
                        doassesmentData.leadDoAssessmentAlphabet &&
                        doassesmentData.leadDoAssessmentAlphabet[0] &&
                        doassesmentData.leadDoAssessmentAlphabet[0]
                          .writtenStrokesUpperN ? (
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
                          .writtenStrokesUpperO ? (
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
                          .writtenStrokesUpperP ? (
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
                          .writtenStrokesUpperQ ? (
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
                          .writtenStrokesUpperR ? (
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
                          .writtenStrokesUpperS ? (
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
                          .writtenStrokesUpperT ? (
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
                          .writtenStrokesUpperU ? (
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
                          .writtenStrokesUpperV ? (
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
                          .writtenStrokesUpperW ? (
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
                          .writtenStrokesUpperX ? (
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
                          .writtenStrokesUpperY ? (
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
                          .writtenStrokesUpperZ ? (
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
                      <th scope="row">Lowercase</th>
                      <td>
                        {doassesmentData &&
                        doassesmentData.leadDoAssessmentModel &&
                        doassesmentData.leadDoAssessmentModel.length > 0 &&
                        doassesmentData.leadDoAssessmentModel[0] &&
                        doassesmentData.leadDoAssessmentAlphabet &&
                        doassesmentData.leadDoAssessmentAlphabet[0] &&
                        doassesmentData.leadDoAssessmentAlphabet[0]
                          .lowercaseN ? (
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
                          .lowercaseO ? (
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
                          .lowercaseP ? (
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
                          .lowercaseQ ? (
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
                          .lowercaseR ? (
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
                          .lowercaseS ? (
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
                          .lowercaseT ? (
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
                          .lowercaseU ? (
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
                          .lowercaseV ? (
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
                          .lowercaseW ? (
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
                          .lowercaseX ? (
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
                          .lowercaseY ? (
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
                          .lowercaseZ ? (
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
                    <tr>
                      <th scope="row">Written Strokes</th>
                      <td>
                        {doassesmentData &&
                        doassesmentData.leadDoAssessmentModel &&
                        doassesmentData.leadDoAssessmentModel.length > 0 &&
                        doassesmentData.leadDoAssessmentModel[0] &&
                        doassesmentData.leadDoAssessmentAlphabet &&
                        doassesmentData.leadDoAssessmentAlphabet[0] &&
                        doassesmentData.leadDoAssessmentAlphabet[0]
                          .writtenStrokesLowerN ? (
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
                          .writtenStrokesLowerO ? (
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
                          .writtenStrokesLowerP ? (
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
                          .writtenStrokesLowerQ ? (
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
                          .writtenStrokesLowerR ? (
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
                          .writtenStrokesLowerS ? (
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
                          .writtenStrokesLowerT ? (
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
                          .writtenStrokesLowerU ? (
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
                          .writtenStrokesLowerV ? (
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
                          .writtenStrokesLowerW ? (
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
                          .writtenStrokesLowerX ? (
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
                          .writtenStrokesLowerY ? (
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
                          .writtenStrokesLowerZ ? (
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
                      doassesmentData.leadDoAssessmentAlphabet[0].association
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
                    <p className="text-muted text-sm">
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
      </div>
      <div
        ref={table2Ref}
        className="container p-3 rounded mb-5"
        style={{
          visibility: "hidden",
          position: "absolute",
          left: "-9999px",
          display: "none",
        }}
      >
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
                      doassesmentData.leadDoAssessmentArtyPursuers[0].sightWords
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
                    <p className="text-muted text-sm">
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                    <p className="text-muted text-sm">
                      {doassesmentData &&
                      doassesmentData.leadDoAssessmentArtyPursuers &&
                      doassesmentData.leadDoAssessmentArtyPursuers.length > 0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                        doassesmentData.leadDoAssessmentArtyPursuers.length >
                          0 &&
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
                    <p className="text-muted text-sm">
                      {doassesmentData &&
                      doassesmentData.leadDoAssessmentArtyPursuers &&
                      doassesmentData.leadDoAssessmentArtyPursuers.length > 0 &&
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
                      doassesmentData.leadDoAssessmentArtyPursuers.length > 0 &&
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
                    <p className="text-muted text-sm">
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
    </>
  );
};

export default AssesmentPdf;
