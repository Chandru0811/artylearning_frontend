import Fisted from "../../../assets/images/Fisted.png";
import Fore from "../../../assets/images/Fore.png";
import Plamer from "../../../assets/images/Plamer.png";
import Tripod from "../../../assets/images/Tripod.png";
import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  fisted: Yup.string().required("*Select Fisted Pencil Grip"),
  tripod: Yup.string().required("*Select Tripod Pencil Grip"),
  plamerGrap: Yup.string().required("*Select Plamer Grasp Pencil Grip"),
  foreFinger: Yup.string().required(
    "*Select Fore Finger And Thumb Pencil Grip"
  ),
});

const AssessmentChildPencil = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        fisted: formData.fisted || "",
        tripod: formData.tripod || "",
        plamerGrap: formData.plamerGrap || "",
        foreFinger: formData.foreFinger || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setFormData((prv) => ({ ...prv, ...data }));
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
        }
      },
    });

    // const handleNextStep = () => {
    //   // e.preventDefault()
    //   formik.validateForm().then((errors) => {
    //     formik.handleSubmit();
    //     if (Object.keys(errors).length === 0) {
    //       handleNext();
    //     }
    //   });
    // };

    useImperativeHandle(ref, () => ({
      AssessmentChildPencil: formik.handleSubmit,
    }));

    return (
      <section>
        <form onSubmit={formik.handleSubmit}>
          <div className="py-3">
            <h5 className="headColor">Child Pencil Grip </h5>
            <div class="container-fluid row d-flex my-4">
              <div className="col-12 mb-4">
                <div className="row mt-3">
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-check-label">
                      Fisted
                      <img
                        src={Tripod}
                        alt="Tripod"
                        className="img-fluid"
                        width={30}
                        height={30}
                      />
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex mt-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="fisted"
                        id="STEADY"
                        value="STEADY"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.fisted === "STEADY"}
                      />
                      <label className="form-check-label mx-2">Steady</label>
                      <input
                        className="form-check-input ms-3"
                        type="radio"
                        name="fisted"
                        id="LOOSE"
                        value="LOOSE"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.fisted === "LOOSE"}
                      />
                      <label className="form-check-label mx-2">Loose</label>
                    </div>
                    {formik.errors.fisted && formik.touched.fisted && (
                      <div
                        className="text-danger mt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {formik.errors.fisted}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-check-label">
                      Plamer Grasp
                      <img
                        src={Fisted}
                        alt="Plamer Grasp"
                        className="img-fluid"
                        width={30}
                        height={30}
                      />
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex mt-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="plamerGrap"
                        id="STEADY"
                        value="STEADY"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.plamerGrap === "STEADY"}
                      />
                      <label className="form-check-label mx-2">Steady</label>
                      <input
                        className="form-check-input ms-3"
                        type="radio"
                        name="plamerGrap"
                        id="LOOSE"
                        value="LOOSE"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.plamerGrap === "LOOSE"}
                      />
                      <label className="form-check-label mx-2">Loose</label>
                    </div>
                    {formik.errors.plamerGrap && formik.touched.plamerGrap && (
                      <div
                        className="text-danger mt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {formik.errors.plamerGrap}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row my-5">
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-check-label">
                      Tripod
                      <img
                        src={Plamer}
                        alt="Tripod"
                        className="img-fluid"
                        width={30}
                        height={30}
                      />
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex mt-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tripod"
                        id="STEADY"
                        value="STEADY"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.tripod === "STEADY"}
                      />
                      <label className="form-check-label mx-2">Steady</label>
                      <input
                        className="form-check-input ms-3"
                        type="radio"
                        name="tripod"
                        id="LOOSE"
                        value="LOOSE"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.tripod === "LOOSE"}
                      />
                      <label className="form-check-label mx-2">Loose</label>
                    </div>
                    {formik.errors.tripod && formik.touched.tripod && (
                      <div
                        className="text-danger mt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {formik.errors.tripod}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-2">
                    <label className="form-check-label">
                      Fore Finger And Thumb
                      <img
                        src={Fore}
                        alt="Fore Finger And Thumb"
                        className="img-fluid"
                        width={30}
                        height={30}
                      />
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex mt-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="foreFinger"
                        id="STEADY"
                        value="STEADY"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.foreFinger === "STEADY"}
                      />
                      <label className="form-check-label mx-2">Steady</label>
                      <input
                        className="form-check-input ms-3"
                        type="radio"
                        name="foreFinger"
                        id="LOOSE"
                        value="LOOSE"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.foreFinger === "LOOSE"}
                      />
                      <label className="form-check-label mx-2">Loose</label>
                    </div>
                    {formik.errors.foreFinger && formik.touched.foreFinger && (
                      <div
                        className="text-danger mt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {formik.errors.foreFinger}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default AssessmentChildPencil;
