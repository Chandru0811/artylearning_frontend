import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  comprehendingOfInstruction: Yup.string().required("*Select a Instruction"),
  attentionMilestone: Yup.string().required("*Select Attention Milestone"),
  verbalLanguageDevelopment: Yup.string().required("*Select Verbal Language"),
  artyRemarks: Yup.string().required("*Arty Remarks is Required"),
});

const AssessmentBeliever = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const { leadId } = useParams();
    const [assessmentAvailable, setAssessmentAvailable] = useState(false);
    const [assessmentId, setAssessmentId] = useState(false);
    const formik = useFormik({
      initialValues: {
        comprehendingOfInstruction: formData.comprehendingOfInstruction || "",
        attentionMilestone: formData.attentionMilestone || "",
        verbalLanguageDevelopment: formData.verbalLanguageDevelopment || "",
        artyRemarks: formData.artyRemarks || "",
      },
      validationSchema: validationSchema,

      onSubmit: async (data) => {
        setLoadIndicators(true);
        setFormData((prv) => ({ ...prv, ...data }));
        if (assessmentAvailable) {
          try {
            const response = await api.put(
              `/updateLeadDoAssessment/${formData.assesmentId}`,
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
        } else {
          try {
            const response = await api.post("/createLeadDoAssessment", data, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.status === 201) {
              const leadId = response.data.leadId;
              toast.success(response.data.message);
              const assesmentId = response.data.assessmentId;

              setFormData((prv) => ({
                ...prv,
                ...data,
                assesmentId,
              }));
              console.log("Lead Id: ", response.data.leadId);
              handleNext();
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            toast.error(error);
          }finally {
            setLoadIndicators(false);
          }
        }
      },
    });

    useEffect(() => {
      const getData = async () => {
        const response = await api.get(
          `/getLeadAssessmentDataByLeadId/${leadId}`
        );
        if (response?.data?.leadDoAssessmentModel?.length > 0) {
          setAssessmentAvailable(true);
          setAssessmentId(response.data.leadDoAssessmentModel[0].id);
        } else {
          const leadResponse = await api.get(
            `/getAllLeadInfoWithReferrerById/${leadId}`
          );
        }
      };
      getData();
    }, []);

    useImperativeHandle(ref, () => ({
      AssessmentBeliever: formik.handleSubmit,
    }));

    return (
      <div>
        <div className="container-fluid row">
          <h5 className="headColor mt-2">Arty Beliver & Arty Dreamers</h5>

          <div className="row">
            <div className="col-md-6 col-12 my-4">
              <p>
                Comprehension Of Instructions
                <span className="text-danger">*</span>
              </p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="Yes"
                  name="comprehendingOfInstruction"
                  type="radio"
                  checked={formik.values.comprehendingOfInstruction === "Yes"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="No"
                  name="comprehendingOfInstruction"
                  type="radio"
                  checked={formik.values.comprehendingOfInstruction === "No"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  No
                </label>
              </div>
              {formik.errors.comprehendingOfInstruction &&
                formik.touched.comprehendingOfInstruction && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {formik.errors.comprehendingOfInstruction}
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 my-4">
              <label for="floatingTextarea2">
                Remarks<span className="text-danger">*</span>
              </label>
              <div className="">
                <textarea
                  type="text"
                  name="artyRemarks"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.artyRemarks}
                ></textarea>
              </div>
              {formik.errors.artyRemarks && formik.touched.artyRemarks && (
                <div className="text-danger mt-1" style={{ fontSize: "14px" }}>
                  {formik.errors.artyRemarks}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-12 mb-4">
              <p>
                Verbal Language Development
                <span className="text-danger">*</span>
              </p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="BABBLING"
                  name="verbalLanguageDevelopment"
                  type="radio"
                  checked={
                    formik.values.verbalLanguageDevelopment === "BABBLING"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Babbling
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="SINGLE_WORD"
                  name="verbalLanguageDevelopment"
                  type="radio"
                  checked={
                    formik.values.verbalLanguageDevelopment === "SINGLE_WORD"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Single Word
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="TWO_WORD"
                  name="verbalLanguageDevelopment"
                  type="radio"
                  checked={
                    formik.values.verbalLanguageDevelopment === "TWO_WORD"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Two Word
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="TELEGRAPHIC"
                  name="verbalLanguageDevelopment"
                  type="radio"
                  checked={
                    formik.values.verbalLanguageDevelopment === "TELEGRAPHIC"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Telegraphic
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="MULTI_WORD"
                  name="verbalLanguageDevelopment"
                  type="radio"
                  checked={
                    formik.values.verbalLanguageDevelopment === "MULTI_WORD"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Multi Word
                </label>
              </div>
              {formik.errors.verbalLanguageDevelopment &&
                formik.touched.verbalLanguageDevelopment && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {formik.errors.verbalLanguageDevelopment}
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 mb-4">
              <p>
                Attention Milestone<span className="text-danger">*</span>
              </p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="FLEETING"
                  name="attentionMilestone"
                  type="radio"
                  checked={formik.values.attentionMilestone === "FLEETING"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Fleeting
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="FOCUSSING"
                  name="attentionMilestone"
                  type="radio"
                  checked={formik.values.attentionMilestone === "FOCUSSING"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Focussing
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="RIGID"
                  name="attentionMilestone"
                  type="radio"
                  checked={formik.values.attentionMilestone === "RIGID"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Rigid
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="TWO_CHALLENGED"
                  name="attentionMilestone"
                  type="radio"
                  checked={
                    formik.values.attentionMilestone === "TWO_CHALLENGED"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Two Challenged
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="SINGLE_CHALLENGED"
                  name="attentionMilestone"
                  type="radio"
                  checked={
                    formik.values.attentionMilestone === "SINGLE_CHALLENGED"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Single Challenged
                </label>
              </div>
              {formik.errors.attentionMilestone &&
                formik.touched.attentionMilestone && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {formik.errors.attentionMilestone}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default AssessmentBeliever;
