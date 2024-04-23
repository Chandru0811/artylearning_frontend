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
      attendanceIndex: true,
      attendanceRead: true,
      attendanceCreate: true,
      attendanceUpdate: true,
      attendanceDelete: true,
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
                  <option value="3">Parent</option>
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classCreate"
                          checked={formik.values.classCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classUpdate"
                          checked={formik.values.classUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="classDelete"
                          checked={formik.values.classDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelCreate"
                          checked={formik.values.levelCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelUpdate"
                          checked={formik.values.levelUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="levelDelete"
                          checked={formik.values.levelDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectCreate"
                          checked={formik.values.subjectCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectUpdate"
                          checked={formik.values.subjectUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="subjectDelete"
                          checked={formik.values.subjectDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="centerListingCreate"
                          checked={formik.values.centerListingCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="centerListingUpdate"
                          checked={formik.values.centerListingUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="centerListingDelete"
                          checked={formik.values.centerListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leadListingCreate"
                          checked={formik.values.leadListingCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leadListingUpdate"
                          checked={formik.values.leadListingUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="leadListingDelete"
                          checked={formik.values.leadListingDelete}
                          onChange={formik.handleChange}
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
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentIndex"
                          checked={formik.values.enrollmentIndex}
                          onChange={handleCheckboxChange(`enrollmentIndex`)}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentRead"
                          checked={formik.values.enrollmentRead}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentCreate"
                          checked={formik.values.enrollmentCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentUpdate"
                          checked={formik.values.enrollmentUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentDelete"
                          checked={formik.values.enrollmentDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffCreate"
                          checked={formik.values.staffCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffUpdate"
                          checked={formik.values.staffUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="staffDelete"
                          checked={formik.values.staffDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherCreate"
                          checked={formik.values.teacherCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherUpdate"
                          checked={formik.values.teacherUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherDelete"
                          checked={formik.values.teacherDelete}
                          onChange={formik.handleChange}
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
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollIdex"
                          checked={formik.values.payrollIdex}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="payrollCreate"
                          checked={formik.values.payrollCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherUpdate"
                          checked={formik.values.teacherUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherDelete"
                          checked={formik.values.teacherDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestIdex"
                          checked={formik.values.leaveRequestIdex}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="leaveRequestIdex"
                          checked={formik.values.leaveRequestIdex}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherCreate"
                          checked={formik.values.teacherCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherUpdate"
                          checked={formik.values.teacherUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="teacherDelete"
                          checked={formik.values.teacherDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingCreate"
                          checked={formik.values.studentListingCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceCreate"
                          checked={formik.values.attendanceCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceUpdate"
                          checked={formik.values.attendanceUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceDelete"
                          checked={formik.values.attendanceDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="changeClassCreate"
                          checked={formik.values.changeClassCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="transferOutCreate"
                          checked={formik.values.transferOutCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="withdrawIndex"
                          checked={formik.values.withdrawIndex}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="endClassCreate"
                          checked={formik.values.endClassCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="registerNewCreate"
                          checked={formik.values.registerNewCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="deductDepositCreate"
                          checked={formik.values.deductDepositCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingUpdate"
                          checked={formik.values.studentListingUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentListingDelete"
                          checked={formik.values.studentListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingCreate"
                          checked={formik.values.documentListingCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingUpdate"
                          checked={formik.values.documentListingUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingDelete"
                          checked={formik.values.documentListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentFileIdex"
                          checked={formik.values.documentFileIdex}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentFileIdex"
                          checked={formik.values.documentFileIdex}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentListingDelete"
                          checked={formik.values.documentListingDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceCreate"
                          checked={formik.values.invoiceCreate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceUpdate"
                          checked={formik.values.invoiceUpdate}
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceDelete"
                          checked={formik.values.invoiceDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="invoiceDelete"
                          checked={formik.values.invoiceDelete}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                    </tr>
                    {/* Time Schedule Teacher */}
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
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentReportCreate"
                          checked={formik.values.documentReportCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentReportUpdate"
                          checked={formik.values.documentReportUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="documentReportDelete"
                          checked={formik.values.documentReportDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceReportCreate"
                          checked={formik.values.attendanceReportCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceReportUpdate"
                          checked={formik.values.attendanceReportUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="attendanceReportDelete"
                          checked={formik.values.attendanceReportDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentReportCreate"
                          checked={formik.values.studentReportCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentReportUpdate"
                          checked={formik.values.studentReportUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="studentReportDelete"
                          checked={formik.values.studentReportDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="assessmentReportCreate"
                          checked={formik.values.assessmentReportCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="assessmentReportUpdate"
                          checked={formik.values.assessmentReportUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="assessmentReportDelete"
                          checked={formik.values.assessmentReportDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentReportCreate"
                          checked={formik.values.enrollmentReportCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentReportUpdate"
                          checked={formik.values.enrollmentReportUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="enrollmentReportDelete"
                          checked={formik.values.enrollmentReportDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="feeCollectionReportCreate"
                          checked={formik.values.feeCollectionReportCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="feeCollectionReportUpdate"
                          checked={formik.values.feeCollectionReportUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="feeCollectionReportDelete"
                          checked={formik.values.feeCollectionReportDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="packageBalanceReportCreate"
                          checked={formik.values.packageBalanceReportCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="packageBalanceReportUpdate"
                          checked={formik.values.packageBalanceReportUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="packageBalanceReportDelete"
                          checked={formik.values.packageBalanceReportDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="salesRevenueReportCreate"
                          checked={formik.values.salesRevenueReportCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="salesRevenueReportUpdate"
                          checked={formik.values.salesRevenueReportUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="salesRevenueReportDelete"
                          checked={formik.values.salesRevenueReportDelete}
                          onChange={formik.handleChange}
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
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="replaceClassLessonListCreate"
                          checked={formik.values.replaceClassLessonListCreate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="replaceClassLessonListUpdate"
                          checked={formik.values.replaceClassLessonListUpdate}
                          onChange={formik.handleChange}
                        /> */}
                      </td>
                      <td>
                        {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="replaceClassLessonListDelete"
                          checked={formik.values.replaceClassLessonListDelete}
                          onChange={formik.handleChange}
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
