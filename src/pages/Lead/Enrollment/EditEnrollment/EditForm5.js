import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../../List/CenterList";
import api from "../../../../config/URL";
import fetchAllStudentListByCenter from "../../../List/StudentListByCenter";

const validationSchema = Yup.object().shape({
  // centerId: Yup.string().required("*Centre is required!"),
  preferredDay: Yup.array()
    .min(1, "*Select at least one preferred day")
    .required("Select Preferred day"),
  preferredTimeSlot: Yup.array()
    .min(1, "*Select at least one preferred time slot")
    .required("Select preferred time slot"),
  enquiryDate: Yup.string().required("*Enquiry Date is required"),
  remark: Yup.string()
    .max(200, "*The maximum length is 200 characters")
    .notRequired(),
});

const EditForm5 = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [centerData, setCenterData] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const userName = localStorage.getItem("userName");
    const formik = useFormik({
      initialValues: {
        // centerId: formData.centerId,
        preferredDay: formData.preferredDay || [],
        enquiryDate: formData.enquiryDate || "",
        marketingSource: formData.marketingSource || "",
        studentId: formData.studentId || "",
        nameOfReferral: formData.nameOfReferral || "",
        referedStudentCenterNameId: formData.referedStudentCenterNameId || "",
        remark: formData.remark || "",
        preferredTimeSlot: formData.preferredTimeSlot || [],
        updatedBy: userName,
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        data.updatedBy = userName;
        try {
          const response = await api.put(
            `/updateLeadInfo/${formData.id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
      validateOnChange: false, // Enable validation on change
      validateOnBlur: true, // Enable validation on blur
    });

    // Function to scroll to the first error field
    const scrollToError = (errors) => {
      const errorField = Object.keys(errors)[0]; // Get the first error field
      const errorElement = document.querySelector(`[name="${errorField}"]`); // Find the DOM element
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus(); // Set focus to the error element
      }
    };

    // Watch for form submit and validation errors
    useEffect(() => {
      if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
        scrollToError(formik.errors);
      }
    }, [formik.submitCount, formik.errors]);

    const fetchData = async () => {
      try {
        const centerData = await fetchAllCentersWithIds();
        setCenterData(centerData);
      } catch (error) {
        toast.error(error);
      }
    };

    const fetchStudent = async (centerId) => {
      try {
        const student = await fetchAllStudentListByCenter(centerId);
        setStudentData(student);
      } catch (error) {
        toast.error(error);
      }
    };

    const getData = async () => {
      const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
      const enquiryDate =
        response.data.enquiryDate && response.data.enquiryDate.substring(0, 10);

      formik.setValues({
        ...response.data,
        enquiryDate: enquiryDate || response.data.createdAt.substring(0, 10),
        preferredDay: response.data.preferredDay || [],
        preferredTimeSlot: response.data.preferredTimeSlot || [],
      });
    };

    useEffect(() => {
      if (formik.values.referedStudentCenterNameId) {
        fetchStudent(formik.values.referedStudentCenterNameId);
      }
    }, [formik.values.referedStudentCenterNameId]);

    useEffect(() => {
      getData();
      fetchData();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      editform5: formik.handleSubmit,
    }));

    return (
      <section>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <div className="container-fluid">
            <div className="row px-1">
              <div className="py-3">
                <p className="headColor">Account Information</p>
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label>Refer Student Center</label>
                <div className="input-group">
                  <select
                    className="form-select"
                    name="referedStudentCenterNameId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referedStudentCenterNameId}
                  >
                    <option selected></option>
                    {centerData &&
                      centerData.map((referedStudentCenterNameId) => (
                        <option
                          key={referedStudentCenterNameId.id}
                          value={referedStudentCenterNameId.id}
                        >
                          {referedStudentCenterNameId.centerNames}
                        </option>
                      ))}
                  </select>
                </div>
                {formik.touched.referedStudentCenterNameId &&
                  formik.errors.referedStudentCenterNameId && (
                    <div className="error text-danger">
                      <small>{formik.errors.referedStudentCenterNameId}</small>
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label>Refer By(Child’s Name)</label>
                <div className="input-group ">
                  <select
                    {...formik.getFieldProps("studentId")}
                    className={`form-select ${
                      formik.touched.studentId && formik.errors.studentId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    {studentData &&
                      studentData.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.studentNames}{" "}
                        </option>
                      ))}
                  </select>
                </div>
                {formik.touched.studentId && formik.errors.studentId && (
                  <div className="error text-danger">
                    <small>{formik.errors.studentId}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Preferred Day<span className="text-danger">*</span>
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="MONDAY"
                      name="preferredDay"
                      value="MONDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("MONDAY")}
                    />
                    <label className="form-check-label">Monday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="TUESDAY"
                      name="preferredDay"
                      value="TUESDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("TUESDAY")}
                    />
                    <label className="form-check-label">Tuesday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="WEDNESDAY"
                      name="preferredDay"
                      value="WEDNESDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("WEDNESDAY")}
                    />
                    <label className="form-check-label">Wednesday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="THURSDAY"
                      name="preferredDay"
                      value="THURSDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("THURSDAY")}
                    />
                    <label className="form-check-label">Thursday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="FRIDAY"
                      name="preferredDay"
                      value="FRIDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("FRIDAY")}
                    />
                    <label className="form-check-label">Friday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="SATURDAY"
                      name="preferredDay"
                      value="SATURDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("SATURDAY")}
                    />
                    <label className="form-check-label">Saturday</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="SUNDAY"
                      name="preferredDay"
                      value="SUNDAY"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredDay.includes("SUNDAY")}
                    />
                    <label className="form-check-label">Sunday</label>
                  </div>
                  {formik.touched.preferredDay &&
                    formik.errors.preferredDay && (
                      <div className="error text-danger ">
                        <small>{formik.errors.preferredDay}</small>
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Preferred Time Slot<span className="text-danger">*</span>
                </label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="3PM - 6PM"
                      id="3PM - 6PM"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "3PM - 6PM"
                      )}
                    />
                    <label className="form-check-label">3PM - 6PM</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="6PM - 9PM"
                      id="6PM - 9PM"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "6PM - 9PM"
                      )}
                    />
                    <label className="form-check-label">6PM - 9PM</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="9AM - 12NN"
                      id="9AM - 12NN"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "9AM - 12NN"
                      )}
                    />
                    <label className="form-check-label">9AM - 12NN</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="12NN - 3PM"
                      id="12NN - 3PM"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "12NN - 3PM"
                      )}
                    />
                    <label className="form-check-label">12NN - 3PM</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="3AM - 6AM"
                      id="3AM - 6AM"
                      name="preferredTimeSlot"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.preferredTimeSlot.includes(
                        "3AM - 6AM"
                      )}
                    />
                    <label className="form-check-label">3AM - 6AM</label>
                  </div>
                  {formik.touched.preferredTimeSlot &&
                    formik.errors.preferredTimeSlot && (
                      <div className="error text-danger ">
                        <small>{formik.errors.preferredTimeSlot}</small>
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label>Marketing Source</label>
                <div className="input-group ">
                  <select
                    className="form-select"
                    name="marketingSource"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.marketingSource}
                  >
                    <option selected></option>
                    <option value="Friends or Relatives">
                      Friends or Relatives
                    </option>
                    <option value="Facebook">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {formik.touched.marketingSource &&
                  formik.errors.marketingSource && (
                    <div className="error text-danger">
                      <small>{formik.errors.marketingSource}</small>
                    </div>
                  )}
              </div>
              {/* <div className="col-md-6 col-12 mb-3">
                <label>Name of Referal</label>
                <div className="input-group ">
                  <input
                    className="form-control"
                    name="nameOfReferral"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nameOfReferral}
                  />
                </div>
                {formik.touched.nameOfReferral &&
                  formik.errors.nameOfReferral && (
                    <div className="error text-danger">
                      <small>{formik.errors.nameOfReferral}</small>
                    </div>
                  )}
              </div> */}
              <div className="col-md-6 col-12">
                <label>
                  Enquiry Date<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="date"
                    name="enquiryDate"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.enquiryDate}
                  />
                </div>
                {formik.touched.enquiryDate && formik.errors.enquiryDate && (
                  <div className="error text-danger ">
                    <small>{formik.errors.enquiryDate}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12">
                <label className="form-label">Remarks</label>
                <div className="">
                  <textarea
                    type="text"
                    className="form-control"
                    name="remark"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.remark}
                    maxLength={200}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default EditForm5;
