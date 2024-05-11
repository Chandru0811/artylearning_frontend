import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({});

const alphabetArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const firstHalfArray = alphabetArray.slice(0, 13);
const secondHalfArray = alphabetArray.slice(13);

const AssessmentAlphabets = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const { leadId } = useParams();
    const [assessmentAvailable, setAssessmentAvailable] = useState(false);
    const [assessmentAlphabetId, setAssessmentAlphabetId] = useState(false);
    console.log(assessmentAlphabetId);
    const formik = useFormik({
      initialValues: {
        association: formData.association || false,
        alphabetRemarks: formData.alphabetRemarks || "",
        beginningSoundA: formData.beginningSoundA || false,
        beginningSoundB: formData.beginningSoundB || false,
        beginningSoundC: formData.beginningSoundC || false,
        beginningSoundD: formData.beginningSoundD || false,
        beginningSoundE: formData.beginningSoundE || false,
        beginningSoundF: formData.beginningSoundF || false,
        beginningSoundG: formData.beginningSoundG || false,
        beginningSoundH: formData.beginningSoundH || false,
        beginningSoundI: formData.beginningSoundI || false,
        beginningSoundJ: formData.beginningSoundJ || false,
        beginningSoundK: formData.beginningSoundK || false,
        beginningSoundL: formData.beginningSoundL || false,
        beginningSoundM: formData.beginningSoundM || false,
        beginningSoundN: formData.beginningSoundN || false,
        beginningSoundO: formData.beginningSoundO || false,
        beginningSoundP: formData.beginningSoundP || false,
        beginningSoundQ: formData.beginningSoundQ || false,
        beginningSoundR: formData.beginningSoundR || false,
        beginningSoundS: formData.beginningSoundS || false,
        beginningSoundT: formData.beginningSoundT || false,
        beginningSoundU: formData.beginningSoundU || false,
        beginningSoundV: formData.beginningSoundV || false,
        beginningSoundW: formData.beginningSoundW || false,
        beginningSoundX: formData.beginningSoundX || false,
        beginningSoundY: formData.beginningSoundY || false,
        beginningSoundZ: formData.beginningSoundZ || false,
        lowercaseA: formData.lowercaseA || false,
        lowercaseB: formData.lowercaseB || false,
        lowercaseC: formData.lowercaseC || false,
        lowercaseD: formData.lowercaseD || false,
        lowercaseE: formData.lowercaseE || false,
        lowercaseF: formData.lowercaseF || false,
        lowercaseG: formData.lowercaseG || false,
        lowercaseH: formData.lowercaseH || false,
        lowercaseI: formData.lowercaseI || false,
        lowercaseJ: formData.lowercaseJ || false,
        lowercaseK: formData.lowercaseK || false,
        lowercaseL: formData.lowercaseL || false,
        lowercaseM: formData.lowercaseM || false,
        lowercaseN: formData.lowercaseN || false,
        lowercaseO: formData.lowercaseO || false,
        lowercaseP: formData.lowercaseP || false,
        lowercaseQ: formData.lowercaseQ || false,
        lowercaseR: formData.lowercaseR || false,
        lowercaseS: formData.lowercaseS || false,
        lowercaseT: formData.lowercaseT || false,
        lowercaseU: formData.lowercaseU || false,
        lowercaseV: formData.lowercaseV || false,
        lowercaseW: formData.lowercaseW || false,
        lowercaseX: formData.lowercaseX || false,
        lowercaseY: formData.lowercaseY || false,
        lowercaseZ: formData.lowercaseZ || false,
        uppercaseA: formData.uppercaseA || false,
        uppercaseB: formData.uppercaseB || false,
        uppercaseC: formData.uppercaseC || false,
        uppercaseD: formData.uppercaseD || false,
        uppercaseE: formData.uppercaseE || false,
        uppercaseF: formData.uppercaseF || false,
        uppercaseG: formData.uppercaseG || false,
        uppercaseH: formData.uppercaseH || false,
        uppercaseI: formData.uppercaseI || false,
        uppercaseJ: formData.uppercaseJ || false,
        uppercaseK: formData.uppercaseK || false,
        uppercaseL: formData.uppercaseL || false,
        uppercaseM: formData.uppercaseM || false,
        uppercaseN: formData.uppercaseN || false,
        uppercaseO: formData.uppercaseO || false,
        uppercaseP: formData.uppercaseP || false,
        uppercaseQ: formData.uppercaseQ || false,
        uppercaseR: formData.uppercaseR || false,
        uppercaseS: formData.uppercaseS || false,
        uppercaseT: formData.uppercaseT || false,
        uppercaseU: formData.uppercaseU || false,
        uppercaseV: formData.uppercaseV || false,
        uppercaseW: formData.uppercaseW || false,
        uppercaseX: formData.uppercaseX || false,
        uppercaseY: formData.uppercaseY || false,
        uppercaseZ: formData.uppercaseZ || false,
        writtenStrokesLowerA: formData.writtenStrokesLowerA || false,
        writtenStrokesLowerB: formData.writtenStrokesLowerB || false,
        writtenStrokesLowerC: formData.writtenStrokesLowerC || false,
        writtenStrokesLowerD: formData.writtenStrokesLowerD || false,
        writtenStrokesLowerE: formData.writtenStrokesLowerE || false,
        writtenStrokesLowerF: formData.writtenStrokesLowerF || false,
        writtenStrokesLowerG: formData.writtenStrokesLowerG || false,
        writtenStrokesLowerH: formData.writtenStrokesLowerH || false,
        writtenStrokesLowerI: formData.writtenStrokesLowerI || false,
        writtenStrokesLowerJ: formData.writtenStrokesLowerJ || false,
        writtenStrokesLowerK: formData.writtenStrokesLowerK || false,
        writtenStrokesLowerL: formData.writtenStrokesLowerL || false,
        writtenStrokesLowerM: formData.writtenStrokesLowerM || false,
        writtenStrokesLowerN: formData.writtenStrokesLowerN || false,
        writtenStrokesLowerO: formData.writtenStrokesLowerO || false,
        writtenStrokesLowerP: formData.writtenStrokesLowerP || false,
        writtenStrokesLowerQ: formData.writtenStrokesLowerQ || false,
        writtenStrokesLowerR: formData.writtenStrokesLowerR || false,
        writtenStrokesLowerS: formData.writtenStrokesLowerS || false,
        writtenStrokesLowerT: formData.writtenStrokesLowerT || false,
        writtenStrokesLowerU: formData.writtenStrokesLowerU || false,
        writtenStrokesLowerV: formData.writtenStrokesLowerV || false,
        writtenStrokesLowerW: formData.writtenStrokesLowerW || false,
        writtenStrokesLowerX: formData.writtenStrokesLowerX || false,
        writtenStrokesLowerY: formData.writtenStrokesLowerY || false,
        writtenStrokesLowerZ: formData.writtenStrokesLowerZ || false,
        writtenStrokesUpperA: formData.writtenStrokesUpperA || false,
        writtenStrokesUpperB: formData.writtenStrokesUpperB || false,
        writtenStrokesUpperC: formData.writtenStrokesUpperC || false,
        writtenStrokesUpperD: formData.writtenStrokesUpperD || false,
        writtenStrokesUpperE: formData.writtenStrokesUpperE || false,
        writtenStrokesUpperF: formData.writtenStrokesUpperF || false,
        writtenStrokesUpperG: formData.writtenStrokesUpperG || false,
        writtenStrokesUpperH: formData.writtenStrokesUpperH || false,
        writtenStrokesUpperI: formData.writtenStrokesUpperI || false,
        writtenStrokesUpperJ: formData.writtenStrokesUpperJ || false,
        writtenStrokesUpperK: formData.writtenStrokesUpperK || false,
        writtenStrokesUpperL: formData.writtenStrokesUpperL || false,
        writtenStrokesUpperM: formData.writtenStrokesUpperM || false,
        writtenStrokesUpperN: formData.writtenStrokesUpperN || false,
        writtenStrokesUpperO: formData.writtenStrokesUpperO || false,
        writtenStrokesUpperP: formData.writtenStrokesUpperP || false,
        writtenStrokesUpperQ: formData.writtenStrokesUpperQ || false,
        writtenStrokesUpperR: formData.writtenStrokesUpperR || false,
        writtenStrokesUpperS: formData.writtenStrokesUpperS || false,
        writtenStrokesUpperT: formData.writtenStrokesUpperT || false,
        writtenStrokesUpperU: formData.writtenStrokesUpperU || false,
        writtenStrokesUpperV: formData.writtenStrokesUpperV || false,
        writtenStrokesUpperW: formData.writtenStrokesUpperW || false,
        writtenStrokesUpperX: formData.writtenStrokesUpperX || false,
        writtenStrokesUpperY: formData.writtenStrokesUpperY || false,
        writtenStrokesUpperZ: formData.writtenStrokesUpperZ || false,
      },

      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        data.leadId = formData.leadId;
        // console.log(data);
        if (assessmentAvailable) {
          try {
            const response = await api.put(
              `/updateLeadDoAssessmentAlphabet/${assessmentAlphabetId}`,
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
            const response = await api.post(
              "/createLeadDoAssessmentAlphabet",
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              const assesmentId = response.data.assessmentId;

              setFormData((prv) => ({
                ...prv,
                ...data,
                assesmentId,
              }));

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
        const AlphabetResponse = await api.get(
          `/getLeadAssessmentDataByLeadId/${leadId}`
        );
        console.log(
          "AlphabetResponse Data",
          AlphabetResponse.data.leadDoAssessmentAlphabet[0]
        );
        if (AlphabetResponse?.data?.leadDoAssessmentAlphabet?.length > 0) {
          setAssessmentAvailable(true);
          setAssessmentAlphabetId(
            AlphabetResponse.data.leadDoAssessmentAlphabet[0].id
          );
          formik.setValues(AlphabetResponse.data.leadDoAssessmentAlphabet[0]);
        }
      };
      getData();
    }, []);

    const handleCheckboxChange = (fieldName) => {
      return (event) => {
        formik.setFieldValue(fieldName, event.target.checked);
      };
    };

    useImperativeHandle(ref, () => ({
      AssessmentAlphabets: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid py-3">
        <div className="row">
          <h5 className="headColor">Alphabet</h5>
          <div className="py-3">
            <div className="table-responsive">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>
                      <p className="text-end fw-medium">Alphabets:</p>
                    </th>
                    {firstHalfArray.map((char) => (
                      <th key={char}>
                        <p
                          className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                          style={{ width: "40px", height: "40px" }}
                        >
                          {char}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-end fw-medium">Uppercase:</th>
                    {firstHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`uppercase${char}`}
                            onChange={handleCheckboxChange(`uppercase${char}`)}
                            checked={formik.values[`uppercase${char}`]}
                          />
                          <label
                            htmlFor={`uppercase${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Written Strokes:</th>
                    {firstHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`writtenStrokesUpper${char}`}
                            onChange={handleCheckboxChange(
                              `writtenStrokesUpper${char}`
                            )}
                            checked={
                              formik.values[`writtenStrokesUpper${char}`]
                            }
                          />
                          <label
                            htmlFor={`writtenStrokesUpper${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Lower Case:</th>
                    {firstHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`lowercase${char}`}
                            onChange={handleCheckboxChange(`lowercase${char}`)}
                            checked={formik.values[`lowercase${char}`]}
                          />
                          <label
                            htmlFor={`lowercase${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Written Strokes:</th>
                    {firstHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`writtenStrokesLower${char}`}
                            onChange={handleCheckboxChange(
                              `writtenStrokesLower${char}`
                            )}
                            checked={
                              formik.values[`writtenStrokesLower${char}`]
                            }
                          />
                          <label
                            htmlFor={`writtenStrokesLower${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Beginning Sound:</th>
                    {firstHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`beginningSound${char}`}
                            onChange={handleCheckboxChange(
                              `beginningSound${char}`
                            )}
                            checked={formik.values[`beginningSound${char}`]}
                          />
                          <label
                            htmlFor={`beginningSound${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="py-3">
            <div className="table-responsive">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>
                      <p className="text-end fw-medium">Alphabets:</p>
                    </th>
                    {secondHalfArray.map((char) => (
                      <th key={char}>
                        <p
                          className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                          style={{ width: "40px", height: "40px" }}
                        >
                          {char}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-end fw-medium">Uppercase:</th>
                    {secondHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`uppercase${char}`}
                            onChange={handleCheckboxChange(`uppercase${char}`)}
                            checked={formik.values[`uppercase${char}`]}
                          />
                          <label
                            htmlFor={`uppercase${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Written Strokes:</th>
                    {secondHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`writtenStrokesUpper${char}`}
                            onChange={handleCheckboxChange(
                              `writtenStrokesUpper${char}`
                            )}
                            checked={
                              formik.values[`writtenStrokesUpper${char}`]
                            }
                          />
                          <label
                            htmlFor={`writtenStrokesUpper${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Lower Case:</th>
                    {secondHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`lowercase${char}`}
                            onChange={handleCheckboxChange(`lowercase${char}`)}
                            checked={formik.values[`lowercase${char}`]}
                          />
                          <label
                            htmlFor={`lowercase${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Written Strokes:</th>
                    {secondHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`writtenStrokesLower${char}`}
                            onChange={handleCheckboxChange(
                              `writtenStrokesLower${char}`
                            )}
                            checked={
                              formik.values[`writtenStrokesLower${char}`]
                            }
                          />
                          <label
                            htmlFor={`writtenStrokesLower${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Beginning Sound:</th>
                    {secondHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`beginningSound${char}`}
                            onChange={handleCheckboxChange(
                              `beginningSound${char}`
                            )}
                            checked={formik.values[`beginningSound${char}`]}
                          />
                          <label
                            htmlFor={`beginningSound${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-4">
            <p>Association</p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                value="true"
                name="association"
                type="radio"
                checked={formik.values.association === true}
                onChange={() => formik.setFieldValue("association", true)}
              />
              <label className="form-check-label" htmlFor="true">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                value="false"
                name="association"
                type="radio"
                checked={formik.values.association === false}
                onChange={() => formik.setFieldValue("association", false)}
              />
              <label className="form-check-label" htmlFor="false">
                No
              </label>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-4">
            <label htmlFor="alphabetRemarks">Remarks</label>
            <div className="">
              <textarea
                type="text"
                name="alphabetRemarks"
                id="alphabetRemarks"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.alphabetRemarks}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default AssessmentAlphabets;
