import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import fetchAllStudentsWithIds from "../../List/StudentList";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  assessmentDate: Yup.date().required("*Assessment Date is required"),
  levelAssessed: Yup.string().required("*Level Assessed is required"),
  year: Yup.date()
    .notRequired("*Date of Birth is required")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      "*Date of Birth must be at least 1 year ago"
    ),
  remarks: Yup.string()
    .notRequired()
    .max(200, "*The maximum length is 200 characters"),
});

const AssessmentChild = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const { leadId } = useParams();
    const [studentData, setStudentData] = useState(null);
    const [assessmentAvailable, setAssessmentAvailable] = useState(false);
    const [assessmentId, setAssessmentId] = useState(false);
    const [arrangeassesmentData, setArrangeassesmentData] = useState([]);
    console.log(assessmentId);
    const currentDate = new Date().toISOString().split("T")[0];

    const formik = useFormik({
      initialValues: {
        name: formData.name || "",
        assessmentDate: formData.assessmentDate || currentDate,
        age: formData.age || "",
        year: formData.year || "",
        pictureToken: formData.pictureToken || "",
        paymentMode: formData.paymentMode || "",
        timeSlotOffered: formData.timeSlotOffered || "",
        referredBy: formData.referredBy || "",
        tshirtSize: formData.tshirtSize || "",
        levelAssessed: formData.levelAssessed || "",
        sibling: formData.sibling || "",
        whereFrom: formData.whereFrom || "",
        remarks: formData.remarks || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        // console.log("Doassesment data", data);
        data.leadId = leadId;
        if (assessmentAvailable) {
          try {
            const response = await api.put(
              `/updateLeadDoAssessment/${assessmentId}`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              // const leadId = response.data.leadId;
              toast.success(response.data.message);
              const assesmentId = assessmentId;
              setFormData((prv) => ({
                ...prv,
                ...data,
                assesmentId,
              }));
              // console.log("Lead Id: ",response.data.leadId);
              handleNext();
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            toast.error(error);
          } finally {
            setLoadIndicators(false);
          }
        } else {
          try {
            const response = await api.post("/createLeadDoAssessment", data, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.status === 201) {
              // const leadId = response.data.leadId;
              toast.success(response.data.message);
              const assesmentId = response.data.assessmentId;

              setFormData((prv) => ({
                ...prv,
                ...data,
                assesmentId,
              }));
              // console.log("Lead Id: ",response.data.leadId);
              handleNext();
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            toast.error(error);
          } finally {
            setLoadIndicators(false);
          }
        }
      },
    });

    const getArrangeAssesmentData = async () => {
      try {
        const response = await api.get(
          `/getAllLeadInfoWithReferrerById/${leadId}`
        );
        setArrangeassesmentData(response.data);
        // console.log("Lead Do Data:",response.data.assessmentArrange[0].time);
        const timeSlotOffered = response?.data?.assessmentArrange[0]?.time;
        formik.setFieldValue("timeSlotOffered", timeSlotOffered);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };

    const fetchData = async () => {
      try {
        const studentData = await fetchAllStudentsWithIds();
        setStudentData(studentData);
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
      const getData = async () => {
        const response = await api.get(
          `/getLeadAssessmentDataByLeadId/${leadId}`
        );
        // console.log(response.data.leadDoAssessmentModel[0]);
        if (response?.data?.leadDoAssessmentModel?.length > 0) {
          setAssessmentAvailable(true);
          setAssessmentId(response.data.leadDoAssessmentModel[0].id);
          const year =
            response.data.leadDoAssessmentModel[0].year &&
            response.data.leadDoAssessmentModel[0].year.substring(0, 10);
          formik.setValues({
            ...response.data.leadDoAssessmentModel[0],
            year: year,
            assessmentDate: currentDate,
          });
          formik.setValues({
            ...response.data.leadDoAssessmentModel[0],
            year: year,
            assessmentDate: currentDate,
          });
        } else {
          const leadResponse = await api.get(
            `/getAllLeadInfoWithReferrerById/${leadId}`
          );
          console.log("leadResponse", leadResponse.data.marketingSource);

          const dob =
            leadResponse.data.dateOfBirth &&
            leadResponse.data.dateOfBirth.substring(0, 10);
          formik.setValues({
            year: dob,
            name: leadResponse.data.studentName,
            assessmentDate: currentDate,
            remarks: leadResponse.data.remark,
            referredBy: leadResponse.data.referBy,
            whereFrom: leadResponse.data.marketingSource,
            levelAssessed : "",
          });
          // if (response?.data?.assessmentArrange?.length > 0) {
          //   formik.setFieldValue('timeSlotOffered', response.data.assessmentArrange[0].time);
          // } else {
          //   // Handle the case when assessmentArrange is not available
          //   formik.setFieldValue('timeSlotOffered', ''); // or set a default value
          // }
        }
      };
      getData();
      getArrangeAssesmentData();
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calculateAge = (dob) => {
      if (!dob) return "0 years, 0 months"; // Default value if dob is not provided

      const birthDate = new Date(dob);
      const today = new Date();

      if (isNaN(birthDate.getTime())) return "0 years, 0 months"; // Handle invalid date

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();

      if (months < 0) {
        years--;
        months += 12;
      }

      return `${years} years, ${months} months`;
    };

    useEffect(() => {
      if (formik.values.year) {
        formik.setFieldValue("age", calculateAge(formik.values.year));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.year]);

    useImperativeHandle(ref, () => ({
      AssessmentChild: formik.handleSubmit,
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
          <div className="mt-3">
            <h5 className="headColor mb-4">Child Particulars</h5>
            <div className="container-fluid row">
              <div className="col-md-6 col-12 mb-4">
                <lable>
                  Name <span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  readOnly
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error text-danger ">
                    <small>{formik.errors.name}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label>
                  Assessment Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="assessmentDate"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.assessmentDate} // Use formik.values.assessmentDate
                  readOnly
                />
                {formik.touched.assessmentDate &&
                  formik.errors.assessmentDate && (
                    <div className="error text-danger ">
                      <small>
                        {formik.errors.assessmentDate &&
                          formik.errors.currentDate}
                      </small>
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Age</lable>
                <input
                  type="text"
                  name="age"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                  readOnly
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label>Date Of Birth</label>
                <br />
                <input
                  className="form-control"
                  aria-label="Default form-control example"
                  type="date"
                  name="year"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year}
                  readOnly
                />
                {formik.touched.year && formik.errors.year && (
                  <div className="error text-danger ">
                    <small>{formik.errors.year}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <p>
                  Picture Taken{" "}
                  <span className="text-sm">
                    (To Send To Prospective Parents)
                  </span>
                </p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pictureToken"
                    id="inlineRadio1"
                    value="yes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pictureToken === "yes"}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pictureToken"
                    id="inlineRadio2"
                    value="no"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pictureToken === "no"}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                  </label>
                </div>
                {formik.touched.pictureToken && formik.errors.pictureToken ? (
                  <div className="text-danger">
                    {formik.errors.pictureToken}
                  </div>
                ) : null}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <p>Payment Mode</p>
                <select
                  className="form-select"
                  name="paymentMode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.paymentMode}
                >
                  <option selected></option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Paynow">PayNow</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
                {formik.touched.paymentMode && formik.errors.paymentMode ? (
                  <div className="text-danger">{formik.errors.paymentMode}</div>
                ) : null}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Time Slot Offered</lable>
                <div className="col-12 d-flex ">
                  <input
                    type="time"
                    name="timeSlotOffered"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.timeSlotOffered}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Referred By(Student Name)</lable>
                <select
                  {...formik.getFieldProps("referredBy")}
                  className={`form-control ${
                    formik.touched.referredBy && formik.errors.referredBy
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  {studentData &&
                    studentData.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.studentNames}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-6 col-12 mb-4">
                <p>T-Shirt Size</p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tshirtSize"
                    id="tshirtSize"
                    value="Taken"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.tshirtSize === "Taken"}
                  />
                  <label className="form-check-label" htmlFor="tshirtSize">
                    Taken
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tshirtSize"
                    id="tshirtSize"
                    value="Not Taken"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.tshirtSize === "Not Taken"}
                  />
                  <label className="form-check-label" htmlFor="tshirtSize">
                    Not Taken
                  </label>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <div>
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Level Assessed<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="levelAssessed"
                      id="ARTY_BELIVER"
                      value="ARTY_BELIVER"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.levelAssessed === "ARTY_BELIVER"}
                    />
                    <label className="form-check-label" htmlFor="ARTY_BELIVER">
                      Arty Beliver
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="levelAssessed"
                      id="ARTY_DREAMER"
                      value="ARTY_DREAMER"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.levelAssessed === "ARTY_DREAMER"}
                    />
                    <label className="form-check-label" htmlFor="ARTY_DREAMER">
                      Arty Dreamer
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="levelAssessed"
                      id="ARTY_PURSUER"
                      value="ARTY_PURSUER"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.levelAssessed === "ARTY_PURSUER"}
                    />
                    <label className="form-check-label" htmlFor="ARTY_PURSUER">
                      Arty Pursuer
                    </label>
                  </div>
                  {formik.errors.levelAssessed &&
                    formik.touched.levelAssessed && (
                      <div
                        className="text-danger"
                       
                      >
                        {formik.errors.levelAssessed}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Sibling(s)</lable>
                <input
                  type="text"
                  name="sibling"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sibling}
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable>Where Did You Here From ?</lable>
                <input
                  type="text"
                  name="whereFrom"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.whereFrom}
                />
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label for="floatingTextarea2">Remark</label>
                <div className="">
                  <textarea
                    type="text"
                    name="remarks"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.remarks}
                    id="floatingTextarea2"
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

export default AssessmentChild;
