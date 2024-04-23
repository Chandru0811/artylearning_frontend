import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  pencilGrip: Yup.string().required("*Select Pencil Grip"),
  writing: Yup.string().required("*Select Written Stockes"),
  recognizeAToZ: Yup.string().required("*Select recognizeAToZ A to Z"),
  writeUpperAToZ: Yup.string().required("*Written writeUpperAToZ is required"),
  writeLowerAToZ: Yup.string().required("*Written LowerCace is required"),
  soundOfAToZ: Yup.string().required("*Choose One!"),
  canReadSimpleSentence: Yup.string().required("*Choose One!"),
});

const LeadChildEdit = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        pencilGrip: formData.pencilGrip || "" || "",
        writing: formData.writing || "",
        recognizeAToZ: formData.recognizeAToZ || "",
        writeUpperAToZ: formData.writeUpperAToZ || "",
        writeLowerAToZ: formData.writeLowerAToZ || "",
        soundOfAToZ: formData.soundOfAToZ || "",
        canReadSimpleSentence: formData.canReadSimpleSentence || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setFormData((prv) => ({ ...prv, ...data }));
        // console.log("form parent",formData );
        const uppercase = data.writeUpperAToZ === "Yes" ? true : false;
        const lowercase = data.writeLowerAToZ === "Yes" ? true : false;
        const sound = data.soundOfAToZ === "Yes" ? true : false;
        const readSentence =
          data.canReadSimpleSentence === "Yes" ? true : false;
        const updatedData = {
          ...data,
          writeUpperAToZ: uppercase,
          writeLowerAToZ: lowercase,
          soundOfAToZ: sound,
          canReadSimpleSentence: readSentence,
        };
        try {
          const response = await api.put(
            `/updateLeadInfo/${formData.id}`,
            updatedData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            // const lead_id = response.data.lead_id;
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...updatedData }));
            // console.log("Form data is ",formData)
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }
      },
    });

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
          const {
            writeUpperAToZ,
            writeLowerAToZ,
            soundOfAToZ,
            canReadSimpleSentence,
            ...otherData
          } = response.data;
          const updatedValues = {
            ...otherData,
            writeUpperAToZ: writeUpperAToZ ? "Yes" : "No",
            writeLowerAToZ: writeLowerAToZ ? "Yes" : "No",
            soundOfAToZ: soundOfAToZ ? "Yes" : "No",
            canReadSimpleSentence: canReadSimpleSentence ? "Yes" : "No",
          };

          formik.setValues(updatedValues);
        } catch (error) {
          toast.error("Error Fetch Data ", error);
        }
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      childAbilty: formik.handleSubmit,
    }));

    return (
      <section>
        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <div className="row px-1">
              <div className="py-3">
                <p className="headColor">Child Ability</p>
              </div>

              <div class="col-md-6 col-12 mb-2">
                <label>
                  Pencil Grip<span class="text-danger">*</span>
                </label>
                <div className="input-group">
                  <select
                    className="form-select"
                    name="pencilGrip"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pencilGrip}
                  >
                    <option value=""></option>
                    <option value="Fisted">Fisted</option>
                    <option value="Palmer Grasp">Palmer Grasp</option>
                    <option value="Tripod">Tripod</option>
                    <option value="Four Finger and Thumb">
                      Four Finger and Thumb
                    </option>
                  </select>
                </div>
                {formik.touched.pencilGrip && formik.errors.pencilGrip && (
                  <div className="error text-danger">
                    <small>{formik.errors.pencilGrip}</small>
                  </div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-2 ">
                <div className="row">
                  <label>
                    writing<span class="text-danger">*</span>
                  </label>
                  <div className="input-group ">
                    <select
                      className="form-select"
                      name="writing"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.writing}
                    >
                      <option value=""></option>
                      <option value="Steady">Steady</option>
                      <option value="Loose">Loose</option>
                    </select>
                  </div>
                </div>
                {formik.touched.writing && formik.errors.writing && (
                  <div className="error text-danger">
                    <small>{formik.errors.writing}</small>
                  </div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-2">
                <div className="row">
                  <label>
                    recognizeAToZ A-Z <span class="text-danger">*</span>
                  </label>
                  <div className="input-group ">
                    <select
                      className="form-select"
                      name="recognizeAToZ"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.recognizeAToZ}
                    >
                      <option value=""></option>
                      <option value="Good">Good</option>
                      <option value="Bad">Bad</option>
                    </select>
                  </div>
                  {formik.touched.recognizeAToZ &&
                    formik.errors.recognizeAToZ && (
                      <div className="error text-danger">
                        <small>{formik.errors.recognizeAToZ}</small>
                      </div>
                    )}
                </div>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <div className="row">
                  <div class="col-sm-6 col-12 my-3">
                    <label>
                      Write A-Z(writeUpperAToZ){" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div class="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="Yes"
                          name="writeUpperAToZ"
                          type="radio"
                          checked={formik.values.writeUpperAToZ === "Yes"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label">Yes</label>
                      </div>
                      <div class="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="No"
                          name="writeUpperAToZ"
                          type="radio"
                          checked={formik.values.writeUpperAToZ === "No"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label">No</label>
                      </div>
                    </div>
                    {formik.errors.writeUpperAToZ ? (
                      <div className="text-danger">
                        <small>{formik.errors.writeUpperAToZ}</small>
                      </div>
                    ) : null}
                  </div>
                  <div class="col-sm-6 col-12 my-3">
                    <label>
                      Write a-z(writeLowerAToZ)
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div class="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="Yes"
                          name="writeLowerAToZ"
                          type="radio"
                          checked={formik.values.writeLowerAToZ === "Yes"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label">Yes</label>
                      </div>
                      <div class="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="No"
                          name="writeLowerAToZ"
                          type="radio"
                          checked={formik.values.writeLowerAToZ === "No"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label">No</label>
                      </div>
                    </div>
                    {formik.errors.writeLowerAToZ ? (
                      <div className="text-danger">
                        <small>{formik.errors.writeLowerAToZ}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-12 ">
                <div className="row">
                  <div class="col-sm-6 col-12">
                    <label>
                      Sounds of (a-z)
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div class="form-check p-0">
                        <input
                          className="form-check-input mx-2"
                          value="Yes"
                          name="soundOfAToZ"
                          type="radio"
                          checked={formik.values.soundOfAToZ === "Yes"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label">Yes</label>
                      </div>
                      <div class="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="No"
                          name="soundOfAToZ"
                          type="radio"
                          checked={formik.values.soundOfAToZ === "No"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label">No</label>
                      </div>
                    </div>
                    {formik.errors.soundOfAToZ ? (
                      <div className="text-danger">
                        <small>{formik.errors.soundOfAToZ}</small>
                      </div>
                    ) : null}
                  </div>
                  <div class="col-sm-6 col-12 p-0">
                    <label>
                      Can read simple sentence
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div class="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="Yes"
                          name="canReadSimpleSentence"
                          type="radio"
                          checked={
                            formik.values.canReadSimpleSentence === "Yes"
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label">Yes</label>
                      </div>
                      <div class="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="No"
                          name="canReadSimpleSentence"
                          type="radio"
                          checked={formik.values.canReadSimpleSentence === "No"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label">No</label>
                      </div>
                    </div>
                    {formik.errors.canReadSimpleSentence ? (
                      <div className="text-danger">
                        <small>{formik.errors.canReadSimpleSentence}</small>
                      </div>
                    ) : null}
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

export default LeadChildEdit;
