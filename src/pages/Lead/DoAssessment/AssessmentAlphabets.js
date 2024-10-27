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

        recognitionOfLetterA: formData.recognitionOfLetterA || false,
        recognitionOfLetterB: formData.recognitionOfLetterB || false,
        recognitionOfLetterC: formData.recognitionOfLetterC || false,
        recognitionOfLetterD: formData.recognitionOfLetterD || false,
        recognitionOfLetterE: formData.recognitionOfLetterE || false,
        recognitionOfLetterF: formData.recognitionOfLetterF || false,
        recognitionOfLetterG: formData.recognitionOfLetterG || false,
        recognitionOfLetterH: formData.recognitionOfLetterH || false,
        recognitionOfLetterI: formData.recognitionOfLetterI || false,
        recognitionOfLetterJ: formData.recognitionOfLetterJ || false,
        recognitionOfLetterK: formData.recognitionOfLetterK || false,
        recognitionOfLetterL: formData.recognitionOfLetterL || false,
        recognitionOfLetterM: formData.recognitionOfLetterM || false,
        recognitionOfLetterN: formData.recognitionOfLetterN || false,
        recognitionOfLetterO: formData.recognitionOfLetterO || false,
        recognitionOfLetterP: formData.recognitionOfLetterP || false,
        recognitionOfLetterQ: formData.recognitionOfLetterQ || false,
        recognitionOfLetterR: formData.recognitionOfLetterR || false,
        recognitionOfLetterS: formData.recognitionOfLetterS || false,
        recognitionOfLetterT: formData.recognitionOfLetterT || false,
        recognitionOfLetterU: formData.recognitionOfLetterU || false,
        recognitionOfLetterV: formData.recognitionOfLetterV || false,
        recognitionOfLetterW: formData.recognitionOfLetterW || false,
        recognitionOfLetterX: formData.recognitionOfLetterX || false,
        recognitionOfLetterY: formData.recognitionOfLetterY || false,
        recognitionOfLetterZ: formData.recognitionOfLetterZ || false,

        recognitionOfSoundA: formData.recognitionOfSoundA || false,
        recognitionOfSoundB: formData.recognitionOfSoundB || false,
        recognitionOfSoundC: formData.recognitionOfSoundC || false,
        recognitionOfSoundD: formData.recognitionOfSoundD || false,
        recognitionOfSoundE: formData.recognitionOfSoundE || false,
        recognitionOfSoundF: formData.recognitionOfSoundF || false,
        recognitionOfSoundG: formData.recognitionOfSoundG || false,
        recognitionOfSoundH: formData.recognitionOfSoundH || false,
        recognitionOfSoundI: formData.recognitionOfSoundI || false,
        recognitionOfSoundJ: formData.recognitionOfSoundJ || false,
        recognitionOfSoundK: formData.recognitionOfSoundK || false,
        recognitionOfSoundL: formData.recognitionOfSoundL || false,
        recognitionOfSoundM: formData.recognitionOfSoundM || false,
        recognitionOfSoundN: formData.recognitionOfSoundN || false,
        recognitionOfSoundO: formData.recognitionOfSoundO || false,
        recognitionOfSoundP: formData.recognitionOfSoundP || false,
        recognitionOfSoundQ: formData.recognitionOfSoundQ || false,
        recognitionOfSoundR: formData.recognitionOfSoundR || false,
        recognitionOfSoundS: formData.recognitionOfSoundS || false,
        recognitionOfSoundT: formData.recognitionOfSoundT || false,
        recognitionOfSoundU: formData.recognitionOfSoundU || false,
        recognitionOfSoundV: formData.recognitionOfSoundV || false,
        recognitionOfSoundW: formData.recognitionOfSoundW || false,
        recognitionOfSoundX: formData.recognitionOfSoundX || false,
        recognitionOfSoundY: formData.recognitionOfSoundY || false,
        recognitionOfSoundZ: formData.recognitionOfSoundZ || false,

        writingLetterA: formData.writingLetterA || false,
        writingLetterB: formData.writingLetterB || false,
        writingLetterC: formData.writingLetterC || false,
        writingLetterD: formData.writingLetterD || false,
        writingLetterE: formData.writingLetterE || false,
        writingLetterF: formData.writingLetterF || false,
        writingLetterG: formData.writingLetterG || false,
        writingLetterH: formData.writingLetterH || false,
        writingLetterI: formData.writingLetterI || false,
        writingLetterJ: formData.writingLetterJ || false,
        writingLetterK: formData.writingLetterK || false,
        writingLetterL: formData.writingLetterL || false,
        writingLetterM: formData.writingLetterM || false,
        writingLetterN: formData.writingLetterN || false,
        writingLetterO: formData.writingLetterO || false,
        writingLetterP: formData.writingLetterP || false,
        writingLetterQ: formData.writingLetterQ || false,
        writingLetterR: formData.writingLetterR || false,
        writingLetterS: formData.writingLetterS || false,
        writingLetterT: formData.writingLetterT || false,
        writingLetterU: formData.writingLetterU || false,
        writingLetterV: formData.writingLetterV || false,
        writingLetterW: formData.writingLetterW || false,
        writingLetterX: formData.writingLetterX || false,
        writingLetterY: formData.writingLetterY || false,
        writingLetterZ: formData.writingLetterZ || false,
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
          } finally {
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
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

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
                    <th className="text-end fw-medium">
                      Recognition of sounds:
                    </th>
                    {firstHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`recognitionOfSound${char}`}
                            onChange={handleCheckboxChange(
                              `recognitionOfSound${char}`
                            )}
                            checked={formik.values[`recognitionOfSound${char}`]}
                          />
                          <label
                            htmlFor={`recognitionOfSound${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">
                      Recognition of letters:
                    </th>
                    {firstHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`recognitionOfLetter${char}`}
                            onChange={handleCheckboxChange(
                              `recognitionOfLetter${char}`
                            )}
                            checked={
                              formik.values[`recognitionOfLetter${char}`]
                            }
                          />
                          <label
                            htmlFor={`recognitionOfLetter${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Writing:</th>
                    {firstHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`writingLetter${char}`}
                            onChange={handleCheckboxChange(
                              `writingLetter${char}`
                            )}
                            checked={
                              formik.values[`writingLetter${char}`]
                            }
                          />
                          <label
                            htmlFor={`writingLetter${char}`}
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
                    <th className="text-end fw-medium">
                      Recognition of sounds:
                    </th>
                    {secondHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`recognitionOfSound${char}`}
                            onChange={handleCheckboxChange(
                              `recognitionOfSound${char}`
                            )}
                            checked={formik.values[`recognitionOfSound${char}`]}
                          />
                          <label
                            htmlFor={`recognitionOfSound${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">
                      Recognition of letters:
                    </th>
                    {secondHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`recognitionOfLetter${char}`}
                            onChange={handleCheckboxChange(
                              `recognitionOfLetter${char}`
                            )}
                            checked={
                              formik.values[`recognitionOfLetter${char}`]
                            }
                          />
                          <label
                            htmlFor={`recognitionOfLetter${char}`}
                            className="on-off-toggle__slider"
                          ></label>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="text-end fw-medium">Writing:</th>
                    {secondHalfArray.map((char) => (
                      <td key={char}>
                        <div className="on-off-toggle">
                          <input
                            className="on-off-toggle__input"
                            type="checkbox"
                            id={`writingLetter${char}`}
                            onChange={handleCheckboxChange(
                              `writingLetter${char}`
                            )}
                            checked={
                              formik.values[`writingLetter${char}`]
                            }
                          />
                          <label
                            htmlFor={`writingLetter${char}`}
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
