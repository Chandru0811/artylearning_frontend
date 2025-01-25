import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  pencilGrip: Yup.string().required("*Select Pencil Grip"),
  writing: Yup.string().required("*Select Writing Stockes"),
  recognizeAToZ: Yup.string().required("*Select Recognize A to Z"),
  writeUpperAToZ: Yup.string().required("*Written Uppercase is required"),
  writeLowerAToZ: Yup.string().required("*Written Lowercase is required"),
  soundOfAToZ: Yup.string().required("*Select a Sounds"),
  canReadSimpleSentence: Yup.string().required("*Select a Simple Sentence"),
});

const EditForm2 = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const userName = localStorage.getItem("userName");
    const formik = useFormik({
      initialValues: {
        pencilGrip: formData.pencilGrip || "",
        writing: formData.writing || "",
        recognizeAToZ: formData.recognizeAToZ || "",
        writeUpperAToZ: formData.writeUpperAToZ || "",
        writeLowerAToZ: formData.writeLowerAToZ || "",
        soundOfAToZ: formData.soundOfAToZ || "",
        canReadSimpleSentence: formData.canReadSimpleSentence,
        updatedBy: userName,
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        data.updatedBy = userName;
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
    });

    useEffect(() => {
      const getData = async () => {
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
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      editForm2: formik.handleSubmit,
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
          <div className="container">
            <div className="row px-1">
              <div className="py-3">
                <p className="headColor">Child Ability</p>
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label>
                  Pencil Grip<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <select
                    className="form-select"
                    name="pencilGrip"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pencilGrip}
                  >
                    <option selected></option>
                    <option value="Steady">Steady</option>
                    <option value="Loose">Loose</option>
                    {/* <option value="Unable">Unable</option> */}
                  </select>
                </div>
                {formik.touched.pencilGrip && formik.errors.pencilGrip && (
                  <div className="error text-danger">
                    <small>{formik.errors.pencilGrip}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-2 ">
                <div className="row">
                  <label>
                    Writing<span className="text-danger">*</span>
                  </label>
                  <div className="input-group ">
                    <select
                      className="form-select"
                      name="writing"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.writing}
                    >
                      <option selected></option>
                      <option value="Straight & Firm Lines">
                        Straight & Firm Lines
                      </option>
                      <option value="Crooked & Light Lines">
                        Crooked & Light Lines
                      </option>
                      <option value="Scribbles">Scribbles</option>
                    </select>
                  </div>
                </div>
                {formik.touched.writing && formik.errors.writing && (
                  <div className="error text-danger">
                    <small>{formik.errors.writing}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-2">
                <div className="row">
                  <label>
                    Recognize A-Z<span className="text-danger">*</span>
                  </label>
                  <div className="input-group ">
                    <select
                      className="form-select"
                      name="recognizeAToZ"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.recognizeAToZ}
                    >
                      <option selected></option>
                      <option value="Uppercase">Uppercase</option>
                      <option value="Lowercase">Lowercase</option>
                      <option value="Both">Both</option>
                      <option value="Some">Some</option>
                      <option value="None">None</option>
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
                  <div className="col-sm-6 col-12 my-3">
                    <label>
                      Write A-Z (Uppercase)
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div className="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="Yes"
                          name="writeUpperAToZ"
                          type="radio"
                          checked={formik.values.writeUpperAToZ === "Yes"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="No"
                          name="writeUpperAToZ"
                          type="radio"
                          checked={formik.values.writeUpperAToZ === "No"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                    {formik.touched.writeUpperAToZ &&
                    formik.errors.writeUpperAToZ ? (
                      <div className="text-danger">
                        <small>{formik.errors.writeUpperAToZ}</small>
                      </div>
                    ) : null}
                  </div>
                  <div className="col-sm-6 col-12 my-3">
                    <label>
                      Write A-Z (Lowercase)
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div className="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="Yes"
                          name="writeLowerAToZ"
                          type="radio"
                          checked={formik.values.writeLowerAToZ === "Yes"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="No"
                          name="writeLowerAToZ"
                          type="radio"
                          checked={formik.values.writeLowerAToZ === "No"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                    {formik.touched.writeLowerAToZ &&
                    formik.errors.writeLowerAToZ ? (
                      <div className="text-danger">
                        <small>{formik.errors.writeLowerAToZ}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-12 ">
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <label>
                      Sounds of (A-Z)
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div className="form-check p-0">
                        <input
                          className="form-check-input mx-2"
                          value="Yes"
                          name="soundOfAToZ"
                          type="radio"
                          checked={formik.values.soundOfAToZ === "Yes"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="No"
                          name="soundOfAToZ"
                          type="radio"
                          checked={formik.values.soundOfAToZ === "No"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                    {formik.touched.soundOfAToZ && formik.errors.soundOfAToZ ? (
                      <div className="text-danger">
                        <small>{formik.errors.soundOfAToZ}</small>
                      </div>
                    ) : null}
                  </div>
                  <div className="col-sm-6 col-12 p-0">
                    <label>
                      Can Read Simple Sentence
                      <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <div className="form-check">
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
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input mx-2"
                          value="No"
                          name="canReadSimpleSentence"
                          type="radio"
                          checked={formik.values.canReadSimpleSentence === "No"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                    {formik.touched.canReadSimpleSentence &&
                    formik.errors.canReadSimpleSentence ? (
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

export default EditForm2;
