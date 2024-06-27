import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  workingDays: Yup.string().required("*Working Days is required"),
  // workingDays: Yup.array()
  //   .of(Yup.string().required("*Working Days is required!"))
  //   .min(1, "*Working Days is required!"),
  userContractSalary: Yup.number()
    .typeError("*Salary Must be numbers")
    .notRequired(),
  uen: Yup.number().typeError("*UEN Must be numbers").notRequired(),
  nric: Yup.number().typeError("*NRIC Must be numbers").notRequired(),
  allowance: Yup.number().typeError("*Allowance Must be numbers").notRequired(),
});

const ContractAdd = forwardRef(({ formData,setLoadIndicators, setFormData }, ref) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      employer: formData.employer || "",
      employee: formData.employee || "",
      uen: formData.uen || "",
      addressOfEmployment: formData.addressOfEmployment || "",
      detailsEmployee: formData.detailsEmployee || "",
      nric: formData.nric || "",
      userContractAddress: formData.userContractAddress || "",
      jobTitle: formData.jobTitle || "",
      mainDuties: formData.mainDuties || "",
      startDateOfEmployment: formData.startDateOfEmployment || "",
      training: formData.training || "",
      allowance: formData.allowance || "",
      userContractStartDate: formData.userContractStartDate || "",
      contactPeriod: formData.contactPeriod || "",
      probation: formData.probation || "",
      workingDays: formData.workingDays || [],
      userContractSalary: formData.userContractSalary || "",
      salaryStartDate: formData.salaryStartDate || "",
      userContractEndDate: formData.userContractEndDate || "",
      payNow: formData.payNow || "",
      internetBanking: formData.internetBanking || "",
      contractDate: formData.contractDate || "",
      terminationNotice: formData.terminationNotice || "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoadIndicators(true);
      try {
        const response = await api.post(
          `/createUserContractCreation/${formData.user_id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          setFormData((prv) => ({ ...prv, ...values }));
          navigate("/teacher");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }finally {
        setLoadIndicators(false);
      }
    },
  });

  useImperativeHandle(ref, () => ({
    contractAdd: formik.handleSubmit,
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
        <p className="headColor my-4">Contract Information</p>
        <div className="container mt-5" style={{ minHeight: "95vh" }}>
          <span className="mt-3 fw-bold">Details of EMPLOYER</span>
          <div class="row mt-4">
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Employer</label>
              <input
                type="text"
                className="form-control"
                name="employer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employer}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>UEN</label>
              <input
                type="text"
                className="form-control"
                name="uen"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.uen}
              />
              {formik.touched.uen && formik.errors.uen && (
                <div className="error text-danger ">
                  <small>{formik.errors.uen}</small>
                </div>
              )}
            </div>
          </div>
          <div class="col-md-6 col-12 mb-2 mt-3">
            <label>Address of Employment</label>
            <input
              type="text"
              className="form-control"
              name="addressOfEmployment"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.addressOfEmployment}
            />
          </div>
          <div class="row mt-3 ">
            <span className="mt-3 fw-bold ">Details of EMPLOYEE</span>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Employee</label>
              <input
                type="text"
                className="form-control"
                name="employee"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employee}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>NRIC</label>
              <input
                type="text"
                className="form-control"
                name="nric"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nric}
              />
              {formik.touched.nric && formik.errors.nric && (
                <div className="error text-danger ">
                  <small>{formik.errors.nric}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="userContractAddress"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userContractAddress}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Job Title</label>
              <input
                type="text"
                className="form-control"
                name="jobTitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobTitle}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Main Duties</label>
              <input
                type="text"
                className="form-control"
                name="mainDuties"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mainDuties}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Start Date of Employment</label>
              <input
                type="date"
                className="form-control"
                name="startDateOfEmployment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDateOfEmployment}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Training</label>
              <input
                type="text"
                className="form-control"
                name="training"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.training}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Allowance</label>
              <input
                type="text"
                className="form-control"
                name="allowance"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.allowance}
              />
              {formik.touched.allowance && formik.errors.allowance && (
                <div className="error text-danger ">
                  <small>{formik.errors.allowance}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Start Date</label>
              <input
                type="date"
                className="form-control"
                name="userContractStartDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userContractStartDate}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Contract Period</label>
              <input
                type="text"
                className="form-control"
                name="contactPeriod"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactPeriod}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Porbation</label>
              <input
                type="text"
                className="form-control"
                name="probation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.probation}
              />
            </div>
           
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>
                Working Days<span className="text-danger">*</span>
              </label>
              <select
                className={`form-select  ${
                  formik.touched.workingDays && formik.errors.workingDays
                    ? "is-invalid"
                    : ""
                }`}
                name="workingDays"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.workingDays}
              >
                <option value=""></option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              {formik.touched.workingDays && formik.errors.workingDays && (
                <div className="invalid-feedback">
                  {formik.errors.workingDays}
                </div>
              )}
            </div>

             {/* <div class="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Working Days<span class="text-danger">*</span>
                </label>
                <div class="mt-2 d-flex justify-content-between mt-3">
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox1"
                      value="MONDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("MONDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox1" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox1" className="mx-1">
                      Mon
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox2"
                      value="TUESDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("TUESDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox2" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox2" className="mx-1">
                      Tue
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox3"
                      value="WEDNESDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("WEDNESDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox3" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox3" className="mx-1">
                      Wed
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox4"
                      value="THURSDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("THURSDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox4" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox4" className="mx-1">
                      Thu
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox5"
                      value="FRIDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("FRIDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox5" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox5" className="mx-1">
                      Fri
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox6"
                      value="SATURDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("SATURDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox6" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox6" className="mx-1">
                      Sat
                    </label>
                  </div>
                  <div class="checkbox-container">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="myCheckbox7"
                      value="SUNDAY"
                      name="workingDays"
                      checked={
                        formik.values.workingDays &&
                        formik.values.workingDays.includes("SUNDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox7" class="custom-checkbox">
                      <div class="inner-square"></div>
                    </label>
                    <label for="myCheckbox7" className="mx-1">
                      Sun
                    </label>
                  </div>
                </div>
                {formik.touched.workingDays && formik.errors.workingDays && (
                  <div className="error text-danger ">
                    <small>{formik.errors.workingDays}</small>
                  </div>
                )}
              </div> */}
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Salary</label>
              <input
                type="text"
                className="form-control"
                name="userContractSalary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userContractSalary}
              />
              {formik.touched.userContractSalary &&
                formik.errors.userContractSalary && (
                  <div className="error text-danger ">
                    <small>{formik.errors.userContractSalary}</small>
                  </div>
                )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Salary Start Date</label>
              <input
                type="date"
                className="form-control"
                name="salaryStartDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salaryStartDate}
              />
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>End Date</label>
              <input
                type="date"
                className="form-control"
                name="userContractEndDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userContractEndDate}
              />
            </div>
            <div class="row mt-3">
              <span className="mt-3 fw-bold">Bank Account Details</span>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Pay Now</label>
                <input
                  type="text"
                  className="form-control"
                  name="payNow"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payNow}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Internet Banking</label>
                <input
                  type="text"
                  className="form-control"
                  name="internetBanking"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.internetBanking}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Contract Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="contractDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contractDate}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Termination Notice</label>
                <input
                  type="text"
                  className="form-control"
                  name="terminationNotice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.terminationNotice}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
});

export default ContractAdd;
