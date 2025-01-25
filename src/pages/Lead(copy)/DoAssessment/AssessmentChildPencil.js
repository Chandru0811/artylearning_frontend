import Fisted from "../../../assets/images/Fisted.png";
import Fore from "../../../assets/images/Fore.png";
import Plamer from "../../../assets/images/Plamer.png";
import Tripod from "../../../assets/images/Tripod.png";
import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

const AssessmentChildPencil = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        grip: formData.grip || "",
        writtenStrokes: formData.writtenStrokes || "",
      },
      validationSchema: validationSchema,
      onSubmit: (data) => {
        setFormData((prv) => ({ ...prv, ...data }));
        // console.log("form parent",formData );
        // console.log("data", data);
      },
    });
    const handleNextStep = () => {
      // e.preventDefault()
      formik.validateForm().then((errors) => {
        formik.handleSubmit();
        if (Object.keys(errors).length === 0) {
          handleNext();
        }
      });
    };
    useImperativeHandle(ref, () => ({
      AssessmentChildPencil: handleNextStep,
    }));

    return (
      <section>
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <div className="py-3">
            <h5 className="headColor">Child Pencil Grip </h5>
            <div className="container-fluid row d-flex my-4">
              <div className="col-12 mb-4">
                <p>Pencil Grip</p>
                <div className="row">
                  <div className="col-md-3 col-6">
                    <div className=" form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="grip"
                        id="fisted"
                        value="fisted"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.grip === "fisted"}
                      />
                      <label className="form-check-label" htmlFor="fisted">
                        Fisted
                        <img
                          src={Tripod}
                          alt="Tripod"
                          className="img-fluid"
                          width={30}
                          height={30}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className=" form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="grip"
                        id="grasp"
                        value="plamer"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.grip === "plamer"}
                      />
                      <label className="form-check-label" htmlFor="plamer">
                        Plamer Grasp
                        <img
                          src={Fisted}
                          alt="Test"
                          className="img-fluid"
                          width={30}
                          height={30}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className=" form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="grip"
                        id="tripod"
                        value="tripod"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.grip === "tripod"}
                      />
                      <label className="form-check-label" htmlFor="tripod">
                        Tripod
                        <img
                          src={Plamer}
                          alt="Test"
                          className="img-fluid"
                          width={30}
                          height={30}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className=" form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="grip"
                        id="foreFingerAndThumb"
                        value="foreFingerAndThumb"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.grip === "foreFingerAndThumb"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="foreFingerAndThumb"
                      >
                        Fore Finger And Thumb
                      </label>
                      <div>
                        <img
                          src={Fore}
                          alt="Test"
                          className="img-fluid"
                          width={30}
                          height={30}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid row d-flex my-4">
            <div className="col-12 mb-4">
              <p>Written Strokes</p>
              <div className="row">
                <div className="col-md-3 col-6">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="writtenStrokes"
                      id="steady1"
                      value="steady"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.writtenStrokes === "steady"}
                    />
                    <label className="form-check-label" htmlFor="steady1">
                      Steady
                    </label>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="writtenStrokes"
                      id="steady2"
                      value="steady"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.writtenStrokes === "steady"}
                    />
                    <label className="form-check-label" htmlFor="steady2">
                      Steady
                    </label>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="writtenStrokes"
                      id="steady3"
                      value="steady"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.writtenStrokes === "steady"}
                    />
                    <label className="form-check-label" htmlFor="steady3">
                      Steady
                    </label>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="writtenStrokes"
                      id="steady4"
                      value="steady"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.writtenStrokes === "steady"}
                    />
                    <label className="form-check-label" htmlFor="steady4">
                      Steady
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mb-4">
              <div className="row">
                <div className="col-md-3 col-6">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="writtenStrokes"
                      id="inlineRadio1"
                      value="loose1"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.writtenStrokes === "loose1"}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Loose
                    </label>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="writtenStrokes"
                      id="inlineRadio2"
                      value="loose2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.writtenStrokes === "loose2"}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Loose
                    </label>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="writtenStrokes"
                      id="inlineRadio3"
                      value="loose3"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.writtenStrokes === "loose3"}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                      Loose
                    </label>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="writtenStrokes"
                      id="inlineRadio4"
                      value="loose4"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.writtenStrokes === "loose4"}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio4">
                      Loose
                    </label>
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
