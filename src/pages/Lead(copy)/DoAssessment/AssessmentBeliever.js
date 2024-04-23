import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

const AssessmentBeliever = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        comprehendingOfInstructions: formData.comprehendingOfInstructions || "",
        verbalLanguageDevelopment: formData.verbalLanguageDevelopment || "",
        verbalLanguageDevelopments: formData.verbalLanguageDevelopments || "",
        remark: formData.remark || "",
      },
      validationSchema: validationSchema,
      onSubmit: (data) => {
        setFormData((prv) => ({ ...prv, ...data }));
        // console.log("form parent",formData );
        console.log("data", data);
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
      AssessmentBeliever: handleNextStep,
    }));

    return (
      <div>
        <div className="container-fluid row">
          <h5 className="headColor mt-2">Arty Beliver & Arty Dreamers</h5>
          <div className="col-md-6 col-12 mb-4 mt-4">
            <p>Comprehending Of Instructions</p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input mx-2"
                value="Yes"
                name="comprehendingOfInstructions"
                type="radio"
                checked={formik.values.comprehendingOfInstructions === "Yes"}
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
                name="comprehendingOfInstructions"
                type="radio"
                checked={formik.values.comprehendingOfInstructions === "No"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="form-check-label" for="inlineRadio1">
                No
              </label>
            </div>
            <div>
              <label for="floatingTextarea2">Remarks</label>
              <div className="form-floating">
                <textarea
                  type="text"
                  name="remark"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remark}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-4">
            <p>Verbal Language Development</p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input mx-2"
                value="Babbling"
                name="verbalLanguageDevelopment"
                type="radio"
                checked={formik.values.verbalLanguageDevelopment === "Babbling"}
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
                value="SingleWord"
                name="verbalLanguageDevelopment"
                type="radio"
                checked={
                  formik.values.verbalLanguageDevelopment === "SingleWord"
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
                value="TwoWord"
                name="verbalLanguageDevelopment"
                type="radio"
                checked={formik.values.verbalLanguageDevelopment === "TwoWord"}
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
                value="Telegraphic"
                name="verbalLanguageDevelopment"
                type="radio"
                checked={
                  formik.values.verbalLanguageDevelopment === "Telegraphic"
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
                value="MultiWord"
                name="verbalLanguageDevelopment"
                type="radio"
                checked={
                  formik.values.verbalLanguageDevelopment === "MultiWord"
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="form-check-label" for="inlineRadio2">
                Multi Word
              </label>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-4">
            <p>Attention Milestone</p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input mx-2"
                value="Fleeting"
                name="verbalLanguageDevelopments"
                type="radio"
                checked={
                  formik.values.verbalLanguageDevelopments === "Fleeting"
                }
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
                value="Focussing"
                name="verbalLanguageDevelopments"
                type="radio"
                checked={
                  formik.values.verbalLanguageDevelopments === "Focussing"
                }
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
                value="Rigid"
                name="verbalLanguageDevelopments"
                type="radio"
                checked={formik.values.verbalLanguageDevelopments === "Rigid"}
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
                value="TwoChallenged"
                name="verbalLanguageDevelopments"
                type="radio"
                checked={
                  formik.values.verbalLanguageDevelopments === "TwoChallenged"
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
                value="SingleChallenged"
                name="verbalLanguageDevelopments"
                type="radio"
                checked={
                  formik.values.verbalLanguageDevelopments ===
                  "SingleChallenged"
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="form-check-label" for="inlineRadio2">
                Single Challenged
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default AssessmentBeliever;
