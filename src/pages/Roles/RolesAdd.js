import React, { useEffect, useState } from "react";
import api from "../../config/URL";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({});

function RolesAdd() {
  const [role, setRole] = useState("1");
  const formik = useFormik({
    initialValues: {
      courseIndex: true,
      courseRead: true,
      courseCreate: true,
      courseUpdate: true,
      courseDelete: true,
      classIndex: true,
      classRead: true,
      classCreate: true,
      classUpdate: true,
      classDelete: true,
      levelIndex: true,
      levelRead: true,
      levelCreate: true,
      levelUpdate: true,
      levelDelete: true,
      subjectIndex: true,
      subjectRead: true,
      subjectCreate: true,
      subjectUpdate: true,
      subjectDelete: true,
      curriculumIndex: true,
      curriculumRead: true,
      curriculumCreate: true,
      curriculumUpdate: true,
      curriculumDelete: true,
      courseFeesIndex: true,
      courseFeesRead: true,
      courseFeesCreate: true,
      courseFeesUpdate: true,
      courseFeesDelete: true,
      courseDepositFeesIndex: true,
      courseDepositFeesRead: true,
      courseDepositFeesCreate: true,
      courseDepositFeesUpdate: true,
      courseDepositFeesDelete: true,
      curriculumOutlineIndex: true,
      curriculumOutlineRead: true,
      curriculumOutlineCreate: true,
      curriculumOutlineUpdate: true,
      curriculumOutlineDelete: true,
      centerListingIndex: true,
      centerListingRead: true,
      centerListingCreate: true,
      centerListingUpdate: true,
      centerListingDelete: true,
      leadListingIndex: true,
      leadListingRead: true,
      leadListingCreate: true,
      leadListingUpdate: true,
      leadListingDelete: true,
      enrollmentIndex: true,
      enrollmentRead: true,
      enrollmentCreate: true,
      enrollmentUpdate: true,
      enrollmentDelete: true,
      staffIndex: true,
      staffRead: true,
      staffCreate: true,
      staffUpdate: true,
      staffDelete: true,
      teacherIndex: true,
      teacherRead: true,
      teacherCreate: true,
      teacherUpdate: true,
      teacherDelete: true,
      attendanceIndex: true,
      attendanceRead: true,
      attendanceCreate: true,
      attendanceUpdate: true,
      attendanceDelete: true,
      staffAttendanceCreate: true,
      staffAttendanceIndex: true,
      staffAttendanceRead: true,
      staffAttendanceUpdate: true,
      staffAttendanceDelete: true,
      leaveAdminIndex: true,
      leaveAdminRead: true,
      leaveAdminUpdate: true,
      leaveIndex: true,
      leaveCreate: true,
      holidayIndex: true,
      holidayRead: true,
      holidayCreate: true,
      holidayUpdate: true,
      holidayDelete: true,
      deductionIndex: true,
      deductionCreate: true,
      deductionRead: true,
      deductionUpdate: true,
      deductionDelete: true,

      payrollIndex: true,
      payrollRead: true,
      payrollCreate: true,
      payrollUpdate: true,
      payrollDelete: true,

      payrollIndex: true,
      payrollRead: true,
      payrollCreate: true,
      payrollUpdate: true,
      payrollDelete: true,

      payslipIndex: true,
      payslipRead: true,

      freeLancerIndex:true,
      freeLancerRead: true,
      freeLancerCreate: true,
      freeLancerUpdate: true,
      freeLancerDelete: true,

      leaveRequestIndex: true,
      leaveRequestRead: true,
      leaveRequestCreate: true,
      leaveRequestUpdate: true,
      leaveRequestDelete: true,
      rolesMatrixIndex: true,
      rolesMatrixRead: true,
      rolesMatrixCreate: true,
      rolesMatrixUpdate: true,
      rolesMatrixDelete: true,
      studentListingIndex: true,
      studentListingRead: true,
      studentListingCreate: true,
      studentListingUpdate: true,
      studentListingDelete: true,
      changeClassIndex: true,
      changeClassRead: true,
      changeClassCreate: true,
      changeClassUpdate: true,
      changeClassDelete: true,
      transferOutIndex: true,
      transferOutRead: true,
      transferOutCreate: true,
      transferOutUpdate: true,
      transferOutDelete: true,
      withdrawIndex: true,
      withdrawRead: true,
      withdrawCreate: true,
      withdrawUpdate: true,
      withdrawDelete: true,
      endClassIndex: true,
      endClassRead: true,
      endClassCreate: true,
      endClassUpdate: true,
      endClassDelete: true,
      registerNewIndex: true,
      registerNewRead: true,
      registerNewCreate: true,
      registerNewUpdate: true,
      registerNewDelete: true,
      deductDepositIndex: true,
      deductDepositRead: true,
      deductDepositCreate: true,
      deductDepositUpdate: true,
      deductDepositDelete: true,
      documentListingIndex: true,
      documentListingRead: true,
      documentListingCreate: true,
      documentListingUpdate: true,
      documentListingDelete: true,
      documentFileIndex: true,
      documentFileRead: true,
      documentFileCreate: true,
      documentFileUpdate: true,
      documentFileDelete: true,
      invoiceIndex: true,
      invoiceRead: true,
      invoiceCreate: true,
      invoiceUpdate: true,
      invoiceDelete: true,
      paymentIndex: true,
      paymentRead: true,
      paymentCreate: true,
      paymentUpdate: true,
      paymentDelete: true,
      scheduleTeacherIndex: true,
      scheduleTeacherRead: true,
      scheduleTeacherCreate: true,
      scheduleTeacherUpdate: true,
      scheduleTeacherDelete: true,
      documentReportIndex: true,
      documentReportRead: true,
      documentReportCreate: true,
      documentReportUpdate: true,
      documentReportDelete: true,
      attendanceReportIndex: true,
      attendanceReportRead: true,
      attendanceReportCreate: true,
      attendanceReportUpdate: true,
      attendanceReportDelete: true,
      studentReportIndex: true,
      studentReportRead: true,
      studentReportCreate: true,
      studentReportUpdate: true,
      studentReportDelete: true,
      assessmentReportIndex: true,
      assessmentReportRead: true,
      assessmentReportCreate: true,
      assessmentReportUpdate: true,
      assessmentReportDelete: true,
      enrollmentReportIndex: true,
      enrollmentReportRead: true,
      enrollmentReportCreate: true,
      enrollmentReportUpdate: true,
      enrollmentReportDelete: true,
      feeCollectionReportIndex: true,
      feeCollectionReportRead: true,
      feeCollectionReportCreate: true,
      feeCollectionReportUpdate: true,
      feeCollectionReportDelete: true,
      packageBalanceReportIndex: true,
      packageBalanceReportRead: true,
      packageBalanceReportCreate: true,
      packageBalanceReportUpdate: true,
      packageBalanceReportDelete: true,
      salesRevenueReportIndex: true,
      salesRevenueReportRead: true,
      salesRevenueReportCreate: true,
      salesRevenueReportUpdate: true,
      salesRevenueReportDelete: true,
      replaceClassLessonListIndex: true,
      replaceClassLessonListRead: true,
      replaceClassLessonListCreate: true,
      replaceClassLessonListUpdate: true,
      replaceClassLessonListDelete: true,
      timeScheduleIndex: true,
      timeScheduleDelete: true,
      timeScheduleBlock: true,
      timeScheduleUnBlock: true,
      timeScheduleAdd: true,
      timeScheduleApproved: true,
      sendNotificationIndex: true,
      sendNotificationCreate: true,
      sendNotificationUpdate: true,
      smsMessageIndex: true,
      smsMessageRead: true,
      smsMessageCreate: true,
      account_read: true,
      headerIndex: true,
      headerRead: true,
      headerCreate: true,
      headerUpdate: true,
      headerDelete: true,
      headerPublish: true,
      homeIndex: true,
      homeRead: true,
      homeCreate: true,
      homeUpdate: true,
      homeDelete: true,
      homePublish: true,
      testimonialIndex: true,
      testimonialRead: true,
      testimonialCreate: true,
      testimonialUpdate: true,
      testimonialDelete: true,
      testimonialPublish: true,
      aboutIndex: true,
      aboutRead: true,
      aboutCreate: true,
      aboutUpdate: true,
      aboutDelete: true,
      aboutPublish: true,
      englishCourseIndex: true,
      englishCourseRead: true,
      englishCourseCreate: true,
      englishCourseUpdate: true,
      englishCourseDelete: true,
      englishCoursePublish: true,
      chineseCourseIndex: true,
      chineseCourseRead: true,
      chineseCourseCreate: true,
      chineseCourseUpdate: true,
      chineseCourseDelete: true,
      chineseCoursePublish: true,
      teacherSaveCreate: true,
      teacherSaveIndex: true,
      teacherSaveUpdate: true,
      teacherSaveDelete: true,
      teacherSavePublish: true,
      teacherSaveRead: true,

      productSaveCreate: true,
      productSaveUpdate: true,
      productSaveRead: true,
      productSaveIndex: true,
      productSaveDelete: true,
      productSavePublish: true,
      productImageSaveCreate: true,
      productImageSaveUpdate: true,
      productImageSaveRead: true,
      productImageSaveIndex: true,
      productImageSaveDelete: true,
      productImageSavePublish: true,

      newsUpdatesIndex: true,
      newsUpdatesRead: true,
      newsUpdatesCreate: true,
      newsUpdatesUpdate: true,
      newsUpdatesDelete: true,
      newsUpdatesPublish: true,

      contactUsIndex: true,
      contactUsRead: true,
      contactUsCreate: true,
      contactUsUpdate: true,
      contactUsDelete: true,
      contactUsPublish: true,

      taxSettingIndex: true,
      taxSettingRead: true,
      taxSettingCreate: true,
      taxSettingUpdate: true,
      taxSettingDelete: true,

      raceSettingIndex: true,
      raceSettingRead: true,
      raceSettingCreate: true,
      raceSettingUpdate: true,
      raceSettingDelete: true,

      countrySettingIndex: true,
      countrySettingRead: true,
      countrySettingCreate: true,
      countrySettingUpdate: true,
      countrySettingDelete: true,

      shgSettingIndex: true,
      shgSettingRead: true,
      shgSettingCreate: true,
      shgSettingUpdate: true,
      shgSettingDelete: true,

      leaveSettingIndex: true,
      leaveSettingRead: true,
      leaveSettingCreate: true,
      leaveSettingUpdate: true,
      leaveSettingDelete: true,

      idTypeSettingIndex: true,
      idTypeSettingRead: true,
      idTypeSettingCreate: true,
      idTypeSettingUpdate: true,
      idTypeSettingDelete: true,

      salarySettingIndex: true,
      salarySettingRead: true,
      salarySettingCreate: true,
      salarySettingUpdate: true,
      salarySettingDelete: true,

      blogIndex: true,
      blogRead: true,
      blogCreate: true,
      blogUpdate: true,
      blogDelete: true,
      blogPublish: true,

      contactUsSettingIndex: true,
      contactUsSettingRead: true,
      contactUsSettingCreate: true,
      contactUsSettingUpdate: true,
      contactUsSettingDelete: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Api Data:", values);
      try {
        const response = await api.put(`/updateRoleInfo/${role}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  useEffect(() => {
    getRoleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const handleCheckboxChange = (fieldName) => {
    return (event) => {
      formik.setFieldValue(fieldName, event.target.checked);
    };
  };

  const getRoleData = async () => {
    try {
      const response = await api.get(`/getAllRoleInfoById/${role}`);
      formik.setValues(response.data);
      // console.log(response.data, "getroleData");
    } catch (error) {
      console.error("Error fetching role data:", error);
    }
  };

  return (
    <div className="container-fluid">
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
          <button type="submit" className="btn btn-button btn-sm ">
            Save
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div class="col-md-6 col-12 mb-2">
              <lable className="form-lable">
                User Role <span class="text-danger">*</span>
              </lable>
              <div class="input-group mb-3">
                <select
                  class="form-select iconInput "
                  aria-label="Default select example"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="1">Admin</option>
                  <option value="2">Branch Admin</option>
                  <option value="4">Staff</option>
                  <option value="5">Staff Admin</option>
                  <option value="6">Teacher</option>
                  <option value="8">Freelancer</option>
                  <option value="11">Centre Manager</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="clo-12">
              <div className="table-responsive">
                <table class="table table-light table-striped table-hover">
                  <thead className="table-warning">
                    <tr>
                      <th scope="col">Module Permission</th>
                      <th scope="col">Index</th>
                      <th scope="col">Read</th>
                      <th scope="col">Create</th>
                      <th scope="col">Update</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Course  */}
                    <tr>
                      <th colspan="6">Course Management</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Course
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseIndex"
                          checked={formik.values.courseIndex}
                          onChange={handleCheckboxChange(`courseIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseRead"
                          checked={formik.values.courseRead}
                          onChange={handleCheckboxChange(`courseRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseCreate"
                          checked={formik.values.courseCreate}
                          onChange={handleCheckboxChange(`courseCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseUpdate"
                          checked={formik.values.courseUpdate}
                          onChange={handleCheckboxChange(`courseUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseDelete"
                          checked={formik.values.courseDelete}
                          onChange={handleCheckboxChange(`courseDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Class
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classIndex"
                          checked={formik.values.classIndex}
                          onChange={handleCheckboxChange(`classIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classRead"
                          checked={formik.values.classRead}
                          onChange={handleCheckboxChange(`classRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classCreate"
                          checked={formik.values.classCreate}
                          onChange={handleCheckboxChange(`classCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classUpdate"
                          checked={formik.values.classUpdate}
                          onChange={handleCheckboxChange(`classUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classDelete"
                          checked={formik.values.classDelete}
                          onChange={handleCheckboxChange(`classDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Level
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelIndex"
                          checked={formik.values.levelIndex}
                          onChange={handleCheckboxChange(`levelIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelRead"
                          checked={formik.values.levelRead}
                          onChange={handleCheckboxChange(`levelRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelCreate"
                          checked={formik.values.levelCreate}
                          onChange={handleCheckboxChange(`levelCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelUpdate"
                          checked={formik.values.levelUpdate}
                          onChange={handleCheckboxChange(`levelUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelDelete"
                          checked={formik.values.levelDelete}
                          onChange={handleCheckboxChange(`levelDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Subject
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectIndex"
                          checked={formik.values.subjectIndex}
                          onChange={handleCheckboxChange(`subjectIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectRead"
                          checked={formik.values.subjectRead}
                          onChange={handleCheckboxChange(`subjectRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={handleCheckboxChange(`subjectCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={handleCheckboxChange(`subjectUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={handleCheckboxChange(`subjectDelete`)}
                        />
                      </td>
                    </tr>
                    {/* Curriculum */}
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Curriculum
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumIndex"
                          checked={formik.values.curriculumIndex}
                          onChange={handleCheckboxChange(`curriculumIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumRead"
                          checked={formik.values.curriculumRead}
                          onChange={handleCheckboxChange(`curriculumRead`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumCreate"
                          checked={formik.values.curriculumCreate}
                          onChange={handleCheckboxChange(`curriculumCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumUpdate"
                          checked={formik.values.curriculumUpdate}
                          onChange={handleCheckboxChange(`curriculumUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumDelete"
                          checked={formik.values.curriculumDelete}
                          onChange={handleCheckboxChange(`curriculumDelete`)}
                        />
                      </td>
                    </tr>
                    {/* {Course fees} */}
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Course Fees
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseFeesIndex"
                          checked={formik.values.courseFeesIndex}
                          onChange={handleCheckboxChange(`courseFeesIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseFeesRead"
                          checked={formik.values.courseFeesRead}
                          onChange={handleCheckboxChange(`courseFeesRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseFeesCreate"
                          checked={formik.values.courseFeesCreate}
                          onChange={handleCheckboxChange(`courseFeesCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseFeesUpdate"
                          checked={formik.values.courseFeesUpdate}
                          onChange={handleCheckboxChange(`courseFeesUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseFeesDelete"
                          checked={formik.values.courseFeesDelete}
                          onChange={handleCheckboxChange(`courseFeesDelete`)}
                        />
                      </td>
                    </tr>
                    {/* {Course Deposit Fees} */}
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Course Deposit Fees
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseDepositFeesIndex"
                          checked={formik.values.courseDepositFeesIndex}
                          onChange={handleCheckboxChange(
                            `courseDepositFeesIndex`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseDepositFeesRead"
                          checked={formik.values.courseDepositFeesRead}
                          onChange={handleCheckboxChange(
                            `courseDepositFeesRead`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseDepositFeesCreate"
                          checked={formik.values.courseDepositFeesCreate}
                          onChange={handleCheckboxChange(
                            `courseDepositFeesCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseDepositFeesUpdate"
                          checked={formik.values.courseDepositFeesUpdate}
                          onChange={handleCheckboxChange(
                            `courseDepositFeesUpdate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="courseDepositFeesDelete"
                          checked={formik.values.courseFeesDelete}
                          onChange={handleCheckboxChange(
                            `courseDepositFeesDelete`
                          )}
                        />
                      </td>
                    </tr>
                    {/* {Curriculum Outline} */}
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Curriculum Outline{" "}
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumOutlineIndex"
                          checked={formik.values.curriculumOutlineIndex}
                          onChange={handleCheckboxChange(
                            `curriculumOutlineIndex`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumOutlineRead"
                          checked={formik.values.curriculumOutlineRead}
                          onChange={handleCheckboxChange(
                            `curriculumOutlineRead`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumOutlineCreate"
                          checked={formik.values.curriculumOutlineCreate}
                          onChange={handleCheckboxChange(
                            `curriculumOutlineCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumOutlineUpdate"
                          checked={formik.values.curriculumOutlineUpdate}
                          onChange={handleCheckboxChange(
                            `curriculumOutlineUpdate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="curriculumOutlineDelete"
                          checked={formik.values.courseFeesDelete}
                          onChange={handleCheckboxChange(
                            `curriculumOutlineDelete`
                          )}
                        />
                      </td>
                    </tr>
                    {/* Center  */}
                    <tr>
                      <th colspan="6">Center Management</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Center Listing
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="centerListingIndex"
                          checked={formik.values.centerListingIndex}
                          onChange={handleCheckboxChange(`centerListingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="centerListingRead"
                          checked={formik.values.centerListingRead}
                          onChange={handleCheckboxChange(`centerListingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="centerListingCreate"
                          checked={formik.values.centerListingCreate}
                          onChange={handleCheckboxChange(`centerListingCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="centerListingUpdate"
                          checked={formik.values.centerListingUpdate}
                          onChange={handleCheckboxChange(`centerListingUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="centerListingDelete"
                          checked={formik.values.centerListingDelete}
                          onChange={handleCheckboxChange(`centerListingDelete`)}
                        />
                      </td>
                    </tr>
                    {/* Lead Management  */}
                    <tr>
                      <th colspan="6">Lead Management</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Lead Listing
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leadListingIndex"
                          checked={formik.values.leadListingIndex}
                          onChange={handleCheckboxChange(`leadListingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leadListingRead"
                          checked={formik.values.leadListingRead}
                          onChange={handleCheckboxChange(`leadListingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leadListingCreate"
                          checked={formik.values.leadListingCreate}
                          onChange={handleCheckboxChange(`leadListingCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leadListingUpdate"
                          checked={formik.values.leadListingUpdate}
                          onChange={handleCheckboxChange(`leadListingUpsate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leadListingDelete"
                          checked={formik.values.leadListingDelete}
                          onChange={handleCheckboxChange(`leadListingDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Enrollment
                        </p>
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentIndex"
                          checked={formik.values.enrollmentIndex}
                          onChange={handleCheckboxChange(`enrollmentIndex`)}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentRead"
                          checked={formik.values.enrollmentRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentCreate"
                          checked={formik.values.enrollmentCreate}
                          onChange={handleCheckboxChange(`enrollmentCreate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentUpdate"
                          checked={formik.values.enrollmentUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentDelete"
                          checked={formik.values.enrollmentDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    {/* User Management  */}
                    <tr>
                      <th colspan="6">User Management</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Staff
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffIndex"
                          checked={formik.values.staffIndex}
                          onChange={handleCheckboxChange(`staffIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffRead"
                          checked={formik.values.staffRead}
                          onChange={handleCheckboxChange(`staffRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffCreate"
                          checked={formik.values.staffCreate}
                          onChange={handleCheckboxChange(`staffCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffUpdate"
                          checked={formik.values.staffUpdate}
                          onChange={handleCheckboxChange(`staffUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffDelete"
                          checked={formik.values.staffDelete}
                          onChange={handleCheckboxChange(`staffDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Teacher
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherIndex"
                          checked={formik.values.teacherIndex}
                          onChange={handleCheckboxChange(`teacherIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherRead"
                          checked={formik.values.teacherRead}
                          onChange={handleCheckboxChange(`teacherRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherCreate"
                          checked={formik.values.teacherCreate}
                          onChange={handleCheckboxChange(`teacherCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherUpdate"
                          checked={formik.values.teacherUpdate}
                          onChange={handleCheckboxChange(`teacherUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherDelete"
                          checked={formik.values.teacherDelete}
                          onChange={handleCheckboxChange(`teacherDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Staffing Attendance
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffAttendanceIndex"
                          checked={formik.values.staffAttendanceIndex}
                          onChange={handleCheckboxChange(
                            `staffAttendanceIndex`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffAttendanceRead"
                          checked={formik.values.staffAttendanceRead}
                          onChange={handleCheckboxChange(`staffAttendanceRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffAttendanceCreate"
                          checked={formik.values.staffAttendanceCreate}
                          onChange={handleCheckboxChange(
                            `staffAttendanceCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffAttendanceUpdate"
                          checked={formik.values.staffAttendanceUpdate}
                          onChange={handleCheckboxChange(
                            `staffAttendanceUpdate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffAttendanceDelete"
                          checked={formik.values.staffAttendanceDelete}
                          onChange={handleCheckboxChange(
                            `staffAttendanceDelete`
                          )}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Leave
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveAdminIndex"
                          checked={formik.values.leaveAdminIndex}
                          onChange={handleCheckboxChange(`leaveAdminIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveAdminceRead"
                          checked={formik.values.leaveAdminRead}
                          onChange={handleCheckboxChange(`leaveAdminRead`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveAdminceCreate"
                          checked={formik.values.leaveAdminCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveAdminUpdate"
                          checked={formik.values.leaveAdminUpdate}
                          onChange={handleCheckboxChange(`leaveAdminUpdate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveAdminDelete"
                          checked={formik.values.leaveAdminDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Leave Request
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveIndex"
                          checked={formik.values.leaveIndex}
                          onChange={handleCheckboxChange(`leaveIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRead"
                          checked={formik.values.leaveRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="leaveCreate"
                          checked={formik.values.leaveCreate}
                          onChange={handleCheckboxChange(`leaveCreate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveUpdate"
                          checked={formik.values.leaveUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveDelete"
                          checked={formik.values.leaveDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Holiday
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayIndex"
                          checked={formik.values.holidayIndex}
                          onChange={handleCheckboxChange(`holidayIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayRead"
                          checked={formik.values.holidayRead}
                          onChange={handleCheckboxChange(`holidayRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayCreate"
                          checked={formik.values.holidayCreate}
                          onChange={handleCheckboxChange(`holidayCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayUpdate"
                          checked={formik.values.holidayUpdate}
                          onChange={handleCheckboxChange(`holidayUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="holidayDelete"
                          checked={formik.values.holidayDelete}
                          onChange={handleCheckboxChange(`holidayDelete`)}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Deduction
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionIndex"
                          checked={formik.values.deductionIndex}
                          onChange={handleCheckboxChange(`deductionIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionRead"
                          checked={formik.values.deductionRead}
                          onChange={handleCheckboxChange(`deductionRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionCreate"
                          checked={formik.values.deductionCreate}
                          onChange={handleCheckboxChange(`deductionCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionUpdate"
                          checked={formik.values.deductionUpdate}
                          onChange={handleCheckboxChange(`deductionUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductionDelete"
                          checked={formik.values.deductionDelete}
                          onChange={handleCheckboxChange(`deductionDelete`)}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Payroll
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollIndex"
                          checked={formik.values.payrollIndex}
                          onChange={handleCheckboxChange(`payrollIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollRead"
                          checked={formik.values.payrollRead}
                          onChange={handleCheckboxChange(`payrollRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollCreate"
                          checked={formik.values.payrollCreate}
                          onChange={handleCheckboxChange(`payrollCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollUpdate"
                          checked={formik.values.payrollUpdate}
                          onChange={handleCheckboxChange(`payrollUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollDelete"
                          checked={formik.values.payrollDelete}
                          onChange={handleCheckboxChange(`payrollDelete`)}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Payslip
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="payslipIndex"
                          checked={formik.values.payslipIndex}
                          onChange={handleCheckboxChange(`payslipIndex`)}
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Freelancer Invoice
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="freeLancerIndex"
                          checked={formik.values.freeLancerIndex}
                          onChange={handleCheckboxChange(`freeLancerIndex`)}
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Leave Request
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestIndex"
                          checked={formik.values.leaveRequestIndex}
                          onChange={handleCheckboxChange(`leaveRequestIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestRead"
                          checked={formik.values.leaveRequestRead}
                          onChange={handleCheckboxChange(`leaveRequestRead`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestIdex"
                          checked={formik.values.leaveRequestIdex}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestIdex"
                          checked={formik.values.leaveRequestIdex}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestIdex"
                          checked={formik.values.leaveRequestIdex}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Roles & Matrix
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="rolesMatrixIndex"
                          checked={formik.values.rolesMatrixIndex}
                          onChange={handleCheckboxChange(`rolesMatrixIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherRead"
                          checked={formik.values.teacherRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherCreate"
                          checked={formik.values.teacherCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherUpdate"
                          checked={formik.values.teacherUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherDelete"
                          checked={formik.values.teacherDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    {/* Student Management  */}
                    <tr>
                      <th colspan="6">Student Management</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Student Listing
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingIndex"
                          checked={formik.values.studentListingIndex}
                          onChange={handleCheckboxChange(`studentListingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingRead"
                          checked={formik.values.studentListingRead}
                          onChange={handleCheckboxChange(`studentListingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingCreate"
                          checked={formik.values.studentListingCreate}
                          onChange={handleCheckboxChange(
                            `studentListingCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={handleCheckboxChange(
                            `studentListingUpdate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={handleCheckboxChange(
                            `studentListingDelete`
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Attendance
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceIndex"
                          checked={formik.values.attendanceIndex}
                          onChange={handleCheckboxChange(`attendanceIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceRead"
                          checked={formik.values.attendanceRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceCreate"
                          checked={formik.values.attendanceCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceUpdate"
                          checked={formik.values.attendanceUpdate}
                          onChange={handleCheckboxChange(`attendanceUpdate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceDelete"
                          checked={formik.values.attendanceDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Change Class
                        </p>
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingIdex"
                          checked={formik.values.studentListingIdex}
                          onChange={handleCheckboxChange(`studentListingIdex`)}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingRead"
                          checked={formik.values.studentListingRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="changeClassCreate"
                          checked={formik.values.changeClassCreate}
                          onChange={handleCheckboxChange(`changeClassCreate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Transfer Out
                        </p>
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingIdex"
                          checked={formik.values.studentListingIdex}
                          onChange={handleCheckboxChange(`studentListingIdex`)}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingRead"
                          checked={formik.values.studentListingRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="transferOutCreate"
                          checked={formik.values.transferOutCreate}
                          onChange={handleCheckboxChange(`transferOutCreate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Withdraw
                        </p>
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingIdex"
                          checked={formik.values.studentListingIdex}
                          onChange={handleCheckboxChange(`studentListingIdex`)}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingRead"
                          checked={formik.values.studentListingRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="withdrawIndex"
                          checked={formik.values.withdrawIndex}
                          onChange={handleCheckboxChange(`withdrawIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          End Class
                        </p>
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingIdex"
                          checked={formik.values.studentListingIdex}
                          onChange={handleCheckboxChange(`studentListingIdex`)}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingRead"
                          checked={formik.values.studentListingRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="endClassCreate"
                          checked={formik.values.endClassCreate}
                          onChange={handleCheckboxChange(`endClassCreate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Register New Course
                        </p>
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingIdex"
                          checked={formik.values.studentListingIdex}
                          onChange={handleCheckboxChange(`studentListingIdex`)}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingRead"
                          checked={formik.values.studentListingRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="registerNewCreate"
                          checked={formik.values.registerNewCreate}
                          onChange={handleCheckboxChange(`registerNewCreate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Deduct Deposit
                        </p>
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingIdex"
                          checked={formik.values.studentListingIdex}
                          onChange={handleCheckboxChange(`studentListingIdex`)}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingRead"
                          checked={formik.values.studentListingRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductDepositCreate"
                          checked={formik.values.deductDepositCreate}
                          onChange={handleCheckboxChange(`deductDepositCreate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    {/* Document Management  */}
                    <tr>
                      <th colspan="6">Document Management</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Document Listing
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingIndex"
                          checked={formik.values.documentListingIndex}
                          onChange={handleCheckboxChange(
                            `documentListingIndex`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingRead"
                          checked={formik.values.documentListingRead}
                          onChange={handleCheckboxChange(`documentListingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingCreate"
                          checked={formik.values.documentListingCreate}
                          onChange={handleCheckboxChange(
                            `documentListingCreate`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingUpdate"
                          checked={formik.values.documentListingUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingDelete"
                          checked={formik.values.documentListingDelete}
                          onChange={handleCheckboxChange(
                            `documentListingDelete`
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Document File
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentFileIndex"
                          checked={formik.values.documentFileIndex}
                          onChange={handleCheckboxChange(`documentFileIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentFileIdex"
                          checked={formik.values.documentFileIdex}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentFileIdex"
                          checked={formik.values.documentFileIdex}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentFileIdex"
                          checked={formik.values.documentFileIdex}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingDelete"
                          checked={formik.values.documentListingDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    {/* Invoice Management  */}
                    <tr>
                      <th colspan="6">Invoice and Payment</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Invoice
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceIndex"
                          checked={formik.values.invoiceIndex}
                          onChange={handleCheckboxChange(`invoiceIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceRead"
                          checked={formik.values.invoiceRead}
                          onChange={handleCheckboxChange(`invoiceRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceCreate"
                          checked={formik.values.invoiceCreate}
                          onChange={handleCheckboxChange(`invoiceCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceUpdate"
                          checked={formik.values.invoiceUpdate}
                          onChange={handleCheckboxChange(`invoiceUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceDelete"
                          checked={formik.values.invoiceDelete}
                          onChange={handleCheckboxChange(`invoiceDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Payment
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="paymentIndex"
                          checked={formik.values.paymentIndex}
                          onChange={handleCheckboxChange(`paymentIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceRead"
                          checked={formik.values.invoiceRead}
                          onChange={handleCheckboxChange(`paymentIndex`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="paymentCreate"
                          checked={formik.values.paymentCreate}
                          onChange={handleCheckboxChange(`paymentCreate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceUpdate"
                          checked={formik.values.invoiceUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceDelete"
                          checked={formik.values.invoiceDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    {/* Time Schedule attendance */}
                    <tr>
                      <th colspan="6">Time Schedule Teacher</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Schedule Teacher
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="scheduleTeacherIndex"
                          checked={formik.values.scheduleTeacherIndex}
                          onChange={handleCheckboxChange(
                            `scheduleTeacherIndex`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="scheduleTeacherRead"
                          checked={formik.values.scheduleTeacherRead}
                          onChange={handleCheckboxChange(`scheduleTeacherRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="scheduleTeacherCreate"
                          checked={formik.values.scheduleTeacherCreate}
                          onChange={handleCheckboxChange(
                            `scheduleTeacherCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="scheduleTeacherUpdate"
                          checked={formik.values.scheduleTeacherUpdate}
                          onChange={handleCheckboxChange(
                            `scheduleTeacherUpdate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="scheduleTeacherDelete"
                          checked={formik.values.scheduleTeacherDelete}
                          onChange={handleCheckboxChange(
                            `scheduleTeacherDelete`
                          )}
                        />
                      </td>
                    </tr>

                    {/* Report Management  */}
                    <tr>
                      <th colspan="6">Report Management</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Document Report
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentReportIndex"
                          checked={formik.values.documentReportIndex}
                          onChange={handleCheckboxChange(`documentReportIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentReportRead"
                          checked={formik.values.documentReportRead}
                          onChange={handleCheckboxChange(`documentRepostRead`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentReportCreate"
                          checked={formik.values.documentReportCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentReportUpdate"
                          checked={formik.values.documentReportUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentReportDelete"
                          checked={formik.values.documentReportDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Attendance Report
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceReportIndex"
                          checked={formik.values.attendanceReportIndex}
                          onChange={handleCheckboxChange(
                            `attendanceReportIndex`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceReportRead"
                          checked={formik.values.attendanceReportRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceReportCreate"
                          checked={formik.values.attendanceReportCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceReportUpdate"
                          checked={formik.values.attendanceReportUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceReportDelete"
                          checked={formik.values.attendanceReportDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Student Report
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentReportIndex"
                          checked={formik.values.studentReportIndex}
                          onChange={handleCheckboxChange(`studentReportIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentReportRead"
                          checked={formik.values.studentReportRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentReportCreate"
                          checked={formik.values.studentReportCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentReportUpdate"
                          checked={formik.values.studentReportUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentReportDelete"
                          checked={formik.values.studentReportDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Assessment Report
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="assessmentReportIndex"
                          checked={formik.values.assessmentReportIndex}
                          onChange={handleCheckboxChange(
                            `assessmentReportIndex`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="assessmentReportRead"
                          checked={formik.values.assessmentReportRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="assessmentReportCreate"
                          checked={formik.values.assessmentReportCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="assessmentReportUpdate"
                          checked={formik.values.assessmentReportUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="assessmentReportDelete"
                          checked={formik.values.assessmentReportDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Enrollment Report
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentReportIndex"
                          checked={formik.values.enrollmentReportIndex}
                          onChange={handleCheckboxChange(
                            `enrollmentReportIndex`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentReportRead"
                          checked={formik.values.enrollmentReportRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentReportCreate"
                          checked={formik.values.enrollmentReportCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentReportUpdate"
                          checked={formik.values.enrollmentReportUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentReportDelete"
                          checked={formik.values.enrollmentReportDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Fee Collection Report
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="feeCollectionReportIndex"
                          checked={formik.values.feeCollectionReportIndex}
                          onChange={handleCheckboxChange(
                            `feeCollectionReportIndex`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="feeCollectionReportRead"
                          checked={formik.values.feeCollectionReportRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="feeCollectionReportCreate"
                          checked={formik.values.feeCollectionReportCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="feeCollectionReportUpdate"
                          checked={formik.values.feeCollectionReportUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="feeCollectionReportDelete"
                          checked={formik.values.feeCollectionReportDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Package Balance Report
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="packageBalanceReportIndex"
                          checked={formik.values.packageBalanceReportIndex}
                          onChange={handleCheckboxChange(
                            `packageBalanceReportIndex`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="packageBalanceReportRead"
                          checked={formik.values.packageBalanceReportRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="packageBalanceReportCreate"
                          checked={formik.values.packageBalanceReportCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="packageBalanceReportUpdate"
                          checked={formik.values.packageBalanceReportUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="packageBalanceReportDelete"
                          checked={formik.values.packageBalanceReportDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Sales Revenue Report
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="salesRevenueReportIndex"
                          checked={formik.values.salesRevenueReportIndex}
                          onChange={handleCheckboxChange(
                            `salesRevenueReportIndex`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="salesRevenueReportRead"
                          checked={formik.values.salesRevenueReportRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="salesRevenueReportCreate"
                          checked={formik.values.salesRevenueReportCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="salesRevenueReportUpdate"
                          checked={formik.values.salesRevenueReportUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="salesRevenueReportDelete"
                          checked={formik.values.salesRevenueReportDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Replace Class Lesson List
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="replaceClassLessonListIndex"
                          checked={formik.values.replaceClassLessonListIndex}
                          onChange={handleCheckboxChange(
                            `replaceClassLessonListIndex`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="replaceClassLessonListRead"
                          checked={formik.values.replaceClassLessonListRead}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="replaceClassLessonListCreate"
                          checked={formik.values.replaceClassLessonListCreate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="replaceClassLessonListUpdate"
                          checked={formik.values.replaceClassLessonListUpdate}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="replaceClassLessonListDelete"
                          checked={formik.values.replaceClassLessonListDelete}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                    </tr>

                    {/* Send Notification */}
                    <tr>
                      <th colspan="6">Messaging</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          School Announcement
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="sendNotificationIndex"
                          checked={formik.values.sendNotificationIndex}
                          onChange={handleCheckboxChange(
                            `sendNotificationIndex`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="sendNotificationRead"
                          checked={formik.values.sendNotificationRead}
                          onChange={handleCheckboxChange(`sendNotificationRead`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="sendNotificationCreate"
                          checked={formik.values.sendNotificationCreate}
                          onChange={handleCheckboxChange(
                            `sendNotificationCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="sendNotificationUpdate"
                          checked={formik.values.sendNotificationUpdate}
                          onChange={handleCheckboxChange(
                            `sendNotificationUpdate`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="sendNotificationDelete"
                          checked={formik.values.sendNotificationDelete}
                          onChange={handleCheckboxChange(
                            `sendNotificationDelete`
                          )}
                        /> */}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          My Messaging
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageIndex"
                          checked={formik.values.smsMessageIndex}
                          onChange={handleCheckboxChange(`smsMessageIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageRead"
                          checked={formik.values.smsMessageRead}
                          onChange={handleCheckboxChange(`smsMessageRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageCreate"
                          checked={formik.values.smsMessageCreate}
                          onChange={handleCheckboxChange(`smsMessageCreate`)}
                        />
                      </td>

                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageUpdate"
                          checked={formik.values.smsMessageUpdate}
                          onChange={handleCheckboxChange(
                            `smsMessageUpdate`
                          )}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageDelete"
                          checked={formik.values.smsMessageDelete}
                          onChange={handleCheckboxChange(
                            `smsMessageDelete`
                          )}
                        /> */}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Other Messages
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageIndex"
                          checked={formik.values.smsMessageIndex}
                          onChange={handleCheckboxChange(`smsMessageIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageRead"
                          checked={formik.values.smsMessageRead}
                          onChange={handleCheckboxChange(`smsMessageRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageCreate"
                          checked={formik.values.smsMessageCreate}
                          onChange={handleCheckboxChange(`smsMessageCreate`)}
                        />
                      </td>

                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageUpdate"
                          checked={formik.values.smsMessageUpdate}
                          onChange={handleCheckboxChange(
                            `smsMessageUpdate`
                          )}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="smsMessageDelete"
                          checked={formik.values.smsMessageDelete}
                          onChange={handleCheckboxChange(
                            `smsMessageDelete`
                          )}
                        /> */}
                      </td>
                    </tr>

                    {/* Settings */}
                    <tr>
                      <th colspan="6">Settings</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Tax
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="taxSettingIndex"
                          checked={formik.values.taxSettingIndex}
                          onChange={handleCheckboxChange(`taxSettingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="taxSettingRead"
                          checked={formik.values.taxSettingRead}
                          onChange={handleCheckboxChange(`taxSettingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="taxSettingCreate"
                          checked={formik.values.taxSettingCreate}
                          onChange={handleCheckboxChange(`taxSettingCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="taxSettingUpdate"
                          checked={formik.values.taxSettingUpdate}
                          onChange={handleCheckboxChange(`taxSettingUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="taxSettingDelete"
                          checked={formik.values.taxSettingDelete}
                          onChange={handleCheckboxChange(`taxSettingDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Race
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="raceSettingIndex"
                          checked={formik.values.raceSettingIndex}
                          onChange={handleCheckboxChange(`raceSettingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="raceSettingRead"
                          checked={formik.values.raceSettingRead}
                          onChange={handleCheckboxChange(`raceSettingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="raceSettingCreate"
                          checked={formik.values.raceSettingCreate}
                          onChange={handleCheckboxChange(`raceSettingCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="raceSettingUpdate"
                          checked={formik.values.raceSettingUpdate}
                          onChange={handleCheckboxChange(`raceSettingUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="raceSettingDelete"
                          checked={formik.values.raceSettingDelete}
                          onChange={handleCheckboxChange(`raceSettingDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Country & Nationality
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="countrySettingIndex"
                          checked={formik.values.countrySettingIndex}
                          onChange={handleCheckboxChange(`countrySettingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="countrySettingRead"
                          checked={formik.values.countrySettingRead}
                          onChange={handleCheckboxChange(`countrySettingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="countrySettingCreate"
                          checked={formik.values.countrySettingCreate}
                          onChange={handleCheckboxChange(
                            `countrySettingCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="countrySettingUpdate"
                          checked={formik.values.countrySettingUpdate}
                          onChange={handleCheckboxChange(
                            `countrySettingUpdate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="countrySettingDelete"
                          checked={formik.values.countrySettingDelete}
                          onChange={handleCheckboxChange(
                            `countrySettingDelete`
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          SHG
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="shgSettingIndex"
                          checked={formik.values.shgSettingIndex}
                          onChange={handleCheckboxChange(`shgSettingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="shgSettingRead"
                          checked={formik.values.shgSettingRead}
                          onChange={handleCheckboxChange(`shgSettingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="shgSettingCreate"
                          checked={formik.values.shgSettingCreate}
                          onChange={handleCheckboxChange(`shgSettingCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="shgSettingUpdate"
                          checked={formik.values.shgSettingUpdate}
                          onChange={handleCheckboxChange(`shgSettingUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="shgSettingDelete"
                          checked={formik.values.shgSettingDelete}
                          onChange={handleCheckboxChange(`shgSettingDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Leave Type
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveSettingIndex"
                          checked={formik.values.leaveSettingIndex}
                          onChange={handleCheckboxChange(`leaveSettingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveSettingRead"
                          checked={formik.values.leaveSettingRead}
                          onChange={handleCheckboxChange(`leaveSettingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveSettingCreate"
                          checked={formik.values.leaveSettingCreate}
                          onChange={handleCheckboxChange(`leaveSettingCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveSettingUpdate"
                          checked={formik.values.leaveSettingUpdate}
                          onChange={handleCheckboxChange(`leaveSettingUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveSettingDelete"
                          checked={formik.values.leaveSettingDelete}
                          onChange={handleCheckboxChange(`leaveSettingDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          ID Type
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="idTypeSettingIndex"
                          checked={formik.values.idTypeSettingIndex}
                          onChange={handleCheckboxChange(`idTypeSettingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="idTypeSettingRead"
                          checked={formik.values.idTypeSettingRead}
                          onChange={handleCheckboxChange(`idTypeSettingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="idTypeSettingCreate"
                          checked={formik.values.idTypeSettingCreate}
                          onChange={handleCheckboxChange(`idTypeSettingCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="idTypeSettingUpdate"
                          checked={formik.values.idTypeSettingUpdate}
                          onChange={handleCheckboxChange(`idTypeSettingUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="idTypeSettingDelete"
                          checked={formik.values.idTypeSettingDelete}
                          onChange={handleCheckboxChange(`idTypeSettingDelete`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Salary Type
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="salarySettingIndex"
                          checked={formik.values.salarySettingIndex}
                          onChange={handleCheckboxChange(`salarySettingIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="salarySettingRead"
                          checked={formik.values.salarySettingRead}
                          onChange={handleCheckboxChange(`salarySettingRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="salarySettingCreate"
                          checked={formik.values.salarySettingCreate}
                          onChange={handleCheckboxChange(`salarySettingCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="salarySettingUpdate"
                          checked={formik.values.salarySettingUpdate}
                          onChange={handleCheckboxChange(`salarySettingUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="salarySettingDelete"
                          checked={formik.values.salarySettingDelete}
                          onChange={handleCheckboxChange(`salarySettingDelete`)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="clo-12">
              <div className="table-responsive">
                <table class="table table-light table-striped table-hover">
                  <thead className="table-warning">
                    <tr>
                      <th scope="col">Schedule</th>
                      <th scope="col">Index</th>
                      <th scope="col">Block</th>
                      <th scope="col">Unblock</th>
                      <th scope="col">Add</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Approved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Time Schedule */}
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Time Schedule
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleIndex"
                          checked={formik.values.timeScheduleIndex}
                          onChange={handleCheckboxChange(`timeScheduleIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleBlock"
                          checked={formik.values.timeScheduleBlock}
                          onChange={handleCheckboxChange(`timeScheduleBlock`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleUnBlock"
                          checked={formik.values.timeScheduleUnBlock}
                          onChange={handleCheckboxChange(`timeScheduleUnBlock`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleAdd"
                          checked={formik.values.timeScheduleAdd}
                          onChange={handleCheckboxChange(`timeScheduleAdd`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleDelete"
                          checked={formik.values.timeScheduleDelete}
                          onChange={handleCheckboxChange(`timeScheduleDelete`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleApproved"
                          checked={formik.values.timeScheduleApproved}
                          onChange={handleCheckboxChange(
                            `timeScheduleApproved`
                          )}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="clo-12">
              <div className="table-responsive">
                <table class="table table-light table-striped table-hover">
                  <thead className="table-warning">
                    <tr>
                      <th scope="col">Content Management</th>
                      <th scope="col">Index</th>
                      <th scope="col">Create</th>
                      <th scope="col">Update</th>
                      <th scope="col">View</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Publish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Time Schedule */}
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Header
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="headerIndex"
                          checked={formik.values.headerIndex}
                          onChange={handleCheckboxChange(`headerIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleBlock"
                          checked={formik.values.timeScheduleBlock}
                          onChange={handleCheckboxChange(`timeScheduleBlock`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="headerUpdate"
                          checked={formik.values.headerUpdate}
                          onChange={handleCheckboxChange(`headerUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="headerRead"
                          checked={formik.values.headerRead}
                          onChange={handleCheckboxChange(`headerRead`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="headerPublish"
                          checked={formik.values.headerPublish}
                          onChange={handleCheckboxChange(`headerPublish`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="headerPublish"
                          checked={formik.values.headerPublish}
                          onChange={handleCheckboxChange(`headerPublish`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Home
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="homeIndex"
                          checked={formik.values.homeIndex}
                          onChange={handleCheckboxChange(`homeIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleBlock"
                          checked={formik.values.timeScheduleBlock}
                          onChange={handleCheckboxChange(`timeScheduleBlock`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="homeUpdate"
                          checked={formik.values.homeUpdate}
                          onChange={handleCheckboxChange(`homeUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="homeRead"
                          checked={formik.values.homeRead}
                          onChange={handleCheckboxChange(`homeRead`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="homeRead"
                          checked={formik.values.homeRead}
                          onChange={handleCheckboxChange(`homeRead`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="homePublish"
                          checked={formik.values.homePublish}
                          onChange={handleCheckboxChange(`homePublish`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Testimonial
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="testimonialIndex"
                          checked={formik.values.testimonialIndex}
                          onChange={handleCheckboxChange(`testimonialIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="testimonialCreate"
                          checked={formik.values.testimonialCreate}
                          onChange={handleCheckboxChange(`testimonialCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="testimonialUpdate"
                          checked={formik.values.testimonialUpdate}
                          onChange={handleCheckboxChange(`testimonialUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="testimonialRead"
                          checked={formik.values.testimonialRead}
                          onChange={handleCheckboxChange(`testimonialRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="testimonialDelete"
                          checked={formik.values.testimonialDelete}
                          onChange={handleCheckboxChange(`testimonialDelete`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="testimonialPublish"
                          checked={formik.values.testimonialPublish}
                          onChange={handleCheckboxChange(`testimonialPublish`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          About
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="aboutIndex"
                          checked={formik.values.aboutIndex}
                          onChange={handleCheckboxChange(`aboutIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="aboutRead"
                          checked={formik.values.aboutRead}
                          onChange={handleCheckboxChange(`aboutRead`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="aboutUpdate"
                          checked={formik.values.aboutUpdate}
                          onChange={handleCheckboxChange(`aboutUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="aboutRead"
                          checked={formik.values.aboutRead}
                          onChange={handleCheckboxChange(`aboutRead`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleDelete"
                          checked={formik.values.timeScheduleDelete}
                          onChange={handleCheckboxChange(`timeScheduleDelete`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="aboutPublish"
                          checked={formik.values.aboutPublish}
                          onChange={handleCheckboxChange(`aboutPublish`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Courses
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="englishCourseIndex"
                          checked={formik.values.englishCourseIndex}
                          onChange={handleCheckboxChange(`englishCourseIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="englishCourseRead"
                          checked={formik.values.englishCourseRead}
                          onChange={handleCheckboxChange(`englishCourseRead`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="englishCourseUpdate"
                          checked={formik.values.englishCourseUpdate}
                          onChange={handleCheckboxChange(`englishCourseUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="englishCourseRead"
                          checked={formik.values.englishCourseRead}
                          onChange={handleCheckboxChange(`englishCourseRead`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleDelete"
                          checked={formik.values.timeScheduleDelete}
                          onChange={handleCheckboxChange(`timeScheduleDelete`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="englishCoursePublish"
                          checked={formik.values.englishCoursePublish}
                          onChange={handleCheckboxChange(
                            `englishCoursePublish`
                          )}
                        />
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Chinese Course
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="chineseCourseIndex"
                          checked={formik.values.chineseCourseIndex}
                          onChange={handleCheckboxChange(`chineseCourseIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="chineseCourseRead"
                          checked={formik.values.chineseCourseRead}
                          onChange={handleCheckboxChange(`chineseCourseRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="chineseCourseUpdate"
                          checked={formik.values.chineseCourseUpdate}
                          onChange={handleCheckboxChange(`chineseCourseUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="chineseCourseRead"
                          checked={formik.values.chineseCourseRead}
                          onChange={handleCheckboxChange(
                            `chineseCourseRead`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleDelete"
                          checked={formik.values.timeScheduleDelete}
                          onChange={handleCheckboxChange(`timeScheduleDelete`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="chineseCoursePublish"
                          checked={formik.values.chineseCoursePublish}
                          onChange={handleCheckboxChange(
                            `chineseCoursePublish`
                          )}
                        />
                      </td>
                    </tr> */}
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Teachers
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherSaveIndex"
                          checked={formik.values.teacherSaveIndex}
                          onChange={handleCheckboxChange(`teacherSaveIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherSaveCreate"
                          checked={formik.values.teacherSaveCreate}
                          onChange={handleCheckboxChange(`teacherSaveCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherSaveUpdate"
                          checked={formik.values.teacherSaveUpdate}
                          onChange={handleCheckboxChange(`teacherSaveUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherSaveRead"
                          checked={formik.values.teacherSaveRead}
                          onChange={handleCheckboxChange(`teacherSaveRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherSaveDelete"
                          checked={formik.values.teacherSaveDelete}
                          onChange={handleCheckboxChange(`teacherSaveDelete`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherSavePublish"
                          checked={formik.values.teacherSavePublish}
                          onChange={handleCheckboxChange(`teacherSavePublish`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Products
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productSaveIndex"
                          checked={formik.values.productSaveIndex}
                          onChange={handleCheckboxChange(`productSaveIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="productSaveRead"
                          checked={formik.values.productSaveRead}
                          onChange={handleCheckboxChange(`productSaveRead`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productSaveUpdate"
                          checked={formik.values.productSaveUpdate}
                          onChange={handleCheckboxChange(`productSaveUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productSaveRead"
                          checked={formik.values.productSaveRead}
                          onChange={handleCheckboxChange(`productSaveRead`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="timeScheduleDelete"
                          checked={formik.values.timeScheduleDelete}
                          onChange={handleCheckboxChange(`timeScheduleDelete`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productSavePublish"
                          checked={formik.values.productSavePublish}
                          onChange={handleCheckboxChange(`productSavePublish`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Products items
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productImageSaveIndex"
                          checked={formik.values.productImageSaveIndex}
                          onChange={handleCheckboxChange(
                            `productImageSaveIndex`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productImageSaveCreate"
                          checked={formik.values.productImageSaveCreate}
                          onChange={handleCheckboxChange(
                            `productImageSaveCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productImageSaveUpdate"
                          checked={formik.values.productImageSaveUpdate}
                          onChange={handleCheckboxChange(
                            `productImageSaveUpdate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productImageSaveRead"
                          checked={formik.values.productImageSaveRead}
                          onChange={handleCheckboxChange(
                            `productImageSaveRead`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productImageSaveDelete"
                          checked={formik.values.productImageSaveDelete}
                          onChange={handleCheckboxChange(
                            `productImageSaveDelete`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="productImageSavePublish"
                          checked={formik.values.productImageSavePublish}
                          onChange={handleCheckboxChange(
                            `productImageSavePublish`
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          News & Update
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="newsUpdatesIndex"
                          checked={formik.values.newsUpdatesIndex}
                          onChange={handleCheckboxChange(`newsUpdatesIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="newsUpdatesCreate"
                          checked={formik.values.newsUpdatesCreate}
                          onChange={handleCheckboxChange(`newsUpdatesCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="newsUpdatesUpdate"
                          checked={formik.values.newsUpdatesUpdate}
                          onChange={handleCheckboxChange(`newsUpdatesUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="newsUpdatesRead"
                          checked={formik.values.newsUpdatesRead}
                          onChange={handleCheckboxChange(`newsUpdatesRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="newsUpdatesDelete"
                          checked={formik.values.newsUpdatesDelete}
                          onChange={handleCheckboxChange(`newsUpdatesDelete`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="newsUpdatesDelete"
                          checked={formik.values.newsUpdatesPublish}
                          onChange={handleCheckboxChange(`newsUpdatesPublish`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Contact Us
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsIndex"
                          checked={formik.values.contactUsIndex}
                          onChange={handleCheckboxChange(`contactUsIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsCreate"
                          checked={formik.values.contactUsCreate}
                          onChange={handleCheckboxChange(`contactUsCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsUpdate"
                          checked={formik.values.contactUsUpdate}
                          onChange={handleCheckboxChange(`contactUsUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsRead"
                          checked={formik.values.contactUsRead}
                          onChange={handleCheckboxChange(`contactUsRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsDelete"
                          checked={formik.values.contactUsDelete}
                          onChange={handleCheckboxChange(`contactUsDelete`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsPublish"
                          checked={formik.values.contactUsPublish}
                          onChange={handleCheckboxChange(`contactUsPublish`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Blob
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="blogIndex"
                          checked={formik.values.blogIndex}
                          onChange={handleCheckboxChange(`blogIndex`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="blogCreate"
                          checked={formik.values.blogCreate}
                          onChange={handleCheckboxChange(`blogCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="blogUpdate"
                          checked={formik.values.blogUpdate}
                          onChange={handleCheckboxChange(`blogUpdate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="blogRead"
                          checked={formik.values.blogRead}
                          onChange={handleCheckboxChange(`blogRead`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="blogDelete"
                          checked={formik.values.blogDelete}
                          onChange={handleCheckboxChange(`blogDelete`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="blogPublish"
                          checked={formik.values.blogPublish}
                          onChange={handleCheckboxChange(`blogPublish`)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Contacted
                        </p>
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsSettingIndex"
                          checked={formik.values.contactUsSettingIndex}
                          onChange={handleCheckboxChange(`contactUsSettingIndex`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsSettingCreate"
                          checked={formik.values.contactUsSettingCreate}
                          onChange={handleCheckboxChange(
                            `contactUsSettingCreate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsSettingUpdate"
                          checked={formik.values.contactUsSettingUpdate}
                          onChange={handleCheckboxChange(
                            `contactUsSettingUpdate`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsSettingRead"
                          checked={formik.values.contactUsSettingRead}
                          onChange={handleCheckboxChange(
                            `contactUsSettingRead`
                          )}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="contactUsSettingDelete"
                          checked={formik.values.contactUsSettingDelete}
                          onChange={handleCheckboxChange(
                            `contactUsSettingDelete`
                          )}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="blogPublish"
                          checked={formik.values.blogPublish}
                          onChange={handleCheckboxChange(`blogPublish`)}
                        /> */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RolesAdd;
