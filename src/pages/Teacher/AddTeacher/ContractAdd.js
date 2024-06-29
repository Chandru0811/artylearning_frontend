import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  employer:Yup.string().required("*Employer is required"),
  employee: Yup.string().required("*Employee is required"),
  uen: Yup.number().typeError("*UEN Must be numbers").required("*UEN is required"),
  addressOfEmployment:Yup.string().required("*Address is required"),  
  nric: Yup.number().typeError("*NRIC Must be numbers").required("*NRIC is required"),
  userContractAddress:Yup.string().required("*Address is required"),
  jobTitle:Yup.string().required("*Job Title is required"),
  mainDuties:Yup.string().required("*Main Duties is required"),
  startDateOfEmployment:Yup.string().required("*Date is required"),
  training:Yup.string().required("*Training is required"),
  userContractStartDate:Yup.string().required("*Date is required"),
  contactPeriod:Yup.string().required("*Contact is required"),
  workingDays: Yup.array()
    .min(1, '*Working days are required')
    .required('*Working days are required'),
  userContractSalary: Yup.number()
    .typeError("*Salary Must be numbers")
    .required("*Salary is required"),
  salaryStartDate:Yup.string().required("*Start Date is required"),
  userContractEndDate:Yup.string().required("*End Date is required"),
  contractDate:Yup.string().required("*Contract Date is required"),
  terminationNotice:Yup.string().required("*Notice is required"), 
  allowance: Yup.number().typeError("*Allowance Must be numbers").notRequired(),
});

const ContractAdd = forwardRef(({ formData,setLoadIndicators, setFormData }, ref) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      employer: formData.employer || "",
      employee: formData.teacherName || "",
      uen: formData.uen || "",
      addressOfEmployment: formData.addressOfEmployment || "",
      detailsEmployee: formData.detailsEmployee || "",
      nric: formData.nric || "",
      userContractAddress: formData.address || "",
      jobTitle: formData.jobTitle || "",
      mainDuties: formData.mainDuties || "",
      startDateOfEmployment: formData.startDate || "",
      training: formData.training || "",
      allowance: formData.allowance || "",
      userContractStartDate: formData.startDate || "",
      contactPeriod: formData.contactPeriod || "",
      probation: formData.probation || "",
      workingDays: formData.workingDays || "",
      userContractSalary: formData.salary || "",
      salaryStartDate: formData.effectiveDate || "",
      userContractEndDate: formData.endDate || "",
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
              <label>Employer</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control"
                name="employer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employer}
              />
              {formik.touched.employer && formik.errors.employer && (
                <div className="error text-danger ">
                  <small>{formik.errors.employer}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>UEN</label><span className="text-danger">*</span>
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
            <label>Address of Employment</label><span className="text-danger">*</span>
            <input
              type="text"
              className="form-control"
              name="addressOfEmployment"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.addressOfEmployment}
            />
            {formik.touched.addressOfEmployment && formik.errors.addressOfEmployment && (
                <div className="error text-danger ">
                  <small>{formik.errors.addressOfEmployment}</small>
                </div>
              )}
          </div>
          <div class="row mt-3 ">
            <span className="mt-3 fw-bold ">Details of EMPLOYEE</span>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Employee</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control"
                name="employee"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employee}
              />
              {formik.touched.employee && formik.errors.employee && (
                <div className="error text-danger ">
                  <small>{formik.errors.employee}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>NRIC</label><span className="text-danger">*</span>
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
              <label>Address</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control"
                name="userContractAddress"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userContractAddress}
              />
              {formik.touched.userContractAddress && formik.errors.userContractAddress && (
                <div className="error text-danger ">
                  <small>{formik.errors.userContractAddress}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Job Title</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control"
                name="jobTitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobTitle}
              />
              {formik.touched.jobTitle && formik.errors.jobTitle && (
                <div className="error text-danger ">
                  <small>{formik.errors.jobTitle}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Main Duties</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control"
                name="mainDuties"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mainDuties}
              />
              {formik.touched.mainDuties && formik.errors.mainDuties && (
                <div className="error text-danger ">
                  <small>{formik.errors.mainDuties}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Start Date of Employment</label><span className="text-danger">*</span>
              <input
                type="date"
                className="form-control"
                name="startDateOfEmployment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDateOfEmployment}
              />
              {formik.touched.startDateOfEmployment && formik.errors.startDateOfEmployment && (
                <div className="error text-danger ">
                  <small>{formik.errors.startDateOfEmployment}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Training</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control"
                name="training"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.training}
              />
              {formik.touched.training && formik.errors.training && (
                <div className="error text-danger ">
                  <small>{formik.errors.training}</small>
                </div>
              )}
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
              <label>Contract Start Date</label><span className="text-danger">*</span>
              <input
                type="date"
                className="form-control"
                name="userContractStartDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userContractStartDate}
              />
              {formik.touched.userContractStartDate && formik.errors.userContractStartDate && (
                <div className="error text-danger ">
                  <small>{formik.errors.userContractStartDate}</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Contract Period</label><span className="text-danger">*</span>
              <input
                type="text"
                className="form-control"
                name="contactPeriod"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactPeriod}
              />
              {formik.touched.contactPeriod && formik.errors.contactPeriod && (
                <div className="error text-danger ">
                  <small>{formik.errors.contactPeriod}</small>
                </div>
              )}
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
            </div>

            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Salary</label><span className="text-danger">*</span>
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
              <label>Salary Start Date</label><span className="text-danger">*</span>
              <input
                type="date"
                className="form-control"
                name="salaryStartDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salaryStartDate}
              />
              {formik.touched.salaryStartDate &&
                formik.errors.salaryStartDate && (
                  <div className="error text-danger ">
                    <small>{formik.errors.salaryStartDate}</small>
                  </div>
                )}
            </div>
            <div class="col-md-6 col-12 mb-2 mt-3">
              <label>Contract End Date</label><span className="text-danger">*</span>
              <input
                type="date"
                className="form-control"
                name="userContractEndDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userContractEndDate}
              />
              {formik.touched.userContractEndDate &&
                formik.errors.userContractEndDate && (
                  <div className="error text-danger ">
                    <small>{formik.errors.userContractEndDate}</small>
                  </div>
                )}
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
                <label>Contract Date</label><span className="text-danger">*</span>
                <input
                  type="date"
                  className="form-control"
                  name="contractDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contractDate}
                />
                {formik.touched.contractDate &&
                formik.errors.contractDate && (
                  <div className="error text-danger ">
                    <small>{formik.errors.contractDate}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Termination Notice</label><span className="text-danger">*</span>
                <input
                  type="text"
                  className="form-control"
                  name="terminationNotice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.terminationNotice}
                />
                {formik.touched.terminationNotice &&
                formik.errors.terminationNotice && (
                  <div className="error text-danger ">
                    <small>{formik.errors.terminationNotice}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
});

export default ContractAdd;
