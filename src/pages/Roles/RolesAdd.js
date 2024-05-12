import React, { useEffect, useState } from "react";
import api from "../../config/URL";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function RolesAdd() {
  const [role, setRole] = useState("1");

  const validationSchema = Yup.object().shape({});

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
      notificationIndex: true,
      notificationCreate: true,
      notificationUpdate: true,
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
      <form onSubmit={formik.handleSubmit}>
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
                      <td>
                      </td>
                      <td>
                      </td>
                      <td>
                      </td>
                      <td>
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

                    {/* Send Notification */}
                    <tr>
                      <th colspan="6">Send Notification</th>
                    </tr>
                    <tr>
                      <td>
                        <p style={{ marginLeft: "30px", marginBottom: "0px" }}>
                          Send Notification
                        </p>
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="notificationIndex"
                          checked={formik.values.notificationIndex}
                          onChange={handleCheckboxChange(`notificationIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="notificationRead"
                          checked={formik.values.notificationRead}
                          onChange={handleCheckboxChange(`notificationRead`)}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="notificationCreate"
                          checked={formik.values.notificationCreate}
                          onChange={handleCheckboxChange(`notificationCreate`)}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="notificationUpdate"
                          checked={formik.values.notificationUpdate}
                          onChange={handleCheckboxChange(`notificationUpdate`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="notificationDelete"
                          checked={formik.values.notificationDelete}
                          onChange={handleCheckboxChange(
                            `notificationDelete`
                          )}
                        /> */}
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
        </div>
      </form>
    </div>
  );
}

export default RolesAdd;
