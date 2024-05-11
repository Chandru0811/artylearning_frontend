import Fisted from "../../../assets/images/Fisted.png";
import Fore from "../../../assets/images/Fore.png";
import Plamer from "../../../assets/images/Plamer.png";
import Tripod from "../../../assets/images/Tripod.png";
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
  pencilGrip: Yup.string().required("*Select a Pencil Grip"),
  pencilGripHandle: Yup.string().required("*Select a Pencil Grip Options"),
});

const AssessmentChildPencil = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const { leadId } = useParams();
    const [assessmentAvailable, setAssessmentAvailable] = useState(false);
    const [assessmentId, setAssessmentId] = useState(false);
    // console.log(assessmentId);
    const formik = useFormik({
      initialValues: {
        pencilGrip: formData.pencilGrip || "",
        pencilGripHandle: formData.pencilGripHandle || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log("Bank Datas:", data);
        setLoadIndicators(true);
        setFormData((prv) => ({ ...prv, ...data }));
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
              const leadId = response.data.leadId;
              toast.success(response.data.message);
              const assesmentId = assessmentId;
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
          } finally {
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
          formik.setValues({
            ...response.data.leadDoAssessmentModel[0],
          });
        } else {
          const leadResponse = await api.get(
            `/getAllLeadInfoWithReferrerById/${leadId}`
          );
        }
      };
      getData();
    }, []);

    useImperativeHandle(ref, () => ({
      AssessmentChildPencil: formik.handleSubmit,
    }));

    return (
      <section>
        <form onSubmit={formik.handleSubmit}>
          <div className="py-3">
            <h5 className="headColor">Child Pencil Grip</h5>
            <div className="container">
              <div class="plans">
                <div class="plan h-100">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="pencilGrip"
                    id="FISTED"
                    value="FISTED"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pencilGrip === "FISTED"}
                  />
                  <label
                    class="plan-content"
                    for="FISTED"
                    style={{ padding: "20px" }}
                  >
                    <img
                      src={Tripod}
                      alt="FISTED"
                      class="img-fluid"
                      width={30}
                      height={30}
                    />
                    <div class="plan-details">
                      <span>Fisted</span>
                    </div>
                  </label>
                </div>
                <div class="plan h-100">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="pencilGrip"
                    id="PLAMERGRASP"
                    value="PLAMERGRASP"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pencilGrip === "PLAMERGRASP"}
                  />
                  <label
                    class="plan-content"
                    for="PLAMERGRASP"
                    style={{ padding: "10px 20px" }}
                  >
                    <img
                      src={Fisted}
                      alt="PLAMERGRASP"
                      class="img-fluid"
                      width={30}
                      height={30}
                    />
                    <div class="plan-details">
                      <span>Plamer Grasp</span>
                    </div>
                  </label>
                </div>
                <div class="plan h-100">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="pencilGrip"
                    id="TRIPOD"
                    value="TRIPOD"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pencilGrip === "TRIPOD"}
                  />
                  <label
                    class="plan-content"
                    for="TRIPOD"
                    style={{ padding: "20px" }}
                  >
                    <img
                      src={Plamer}
                      alt="TRIPOD"
                      class="img-fluid"
                      width={30}
                      height={30}
                    />
                    <div class="plan-details">
                      <span>Tripod</span>
                    </div>
                  </label>
                </div>
                <div class="plan h-100">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="pencilGrip"
                    id="FOREFINGERANDTHUMB"
                    value="FOREFINGERANDTHUMB"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pencilGrip === "FOREFINGERANDTHUMB"}
                  />
                  <label
                    class="plan-content"
                    for="FOREFINGERANDTHUMB"
                    style={{ padding: "10px" }}
                  >
                    <img
                      src={Fore}
                      alt="FOREFINGERANDTHUMB"
                      class="img-fluid"
                      width={30}
                      height={30}
                    />
                    <div class="plan-details">
                      <span>Fore Finger And Thumb</span>
                    </div>
                  </label>
                </div>
                {formik.errors.pencilGrip && formik.touched.pencilGrip && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {formik.errors.pencilGrip}
                  </div>
                )}
              </div>
              <div>
                <div className="d-flex mt-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pencilGripHandle"
                    id="STEADY"
                    value="STEADY"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pencilGripHandle === "STEADY"}
                  />
                  <label className="form-check-label mx-2">Steady</label>
                  <input
                    className="form-check-input ms-3"
                    type="radio"
                    name="pencilGripHandle"
                    id="LOOSE"
                    value="LOOSE"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pencilGripHandle === "LOOSE"}
                  />
                  <label className="form-check-label mx-2">Loose</label>
                </div>
                {formik.errors.pencilGripHandle &&
                  formik.touched.pencilGripHandle && (
                    <div
                      className="text-danger mt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {formik.errors.pencilGripHandle}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default AssessmentChildPencil;
