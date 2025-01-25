import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

const AssessmentAlphabets = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        association: formData.association || "",
        remarks: formData.remarks || "",
        
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
      AssessmentAlphabets: handleNextStep,
    }));
  return (
    <div className="py-3">
      <h5 className="headColor"> Alphabet</h5>
      <div className="py-3">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>
                <p className="text-end fw-medium"> Alphabets :</p>
              </th>
              <th>
                {" "}
                <p
                  className="border border-3  text-end fw-medium  d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  A
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  B
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3text-end fw-medium  d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  C
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  D
                </p>{" "}
              </th>
              <th>
                {" "}
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  E
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  F
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  G
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium  d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  H
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  I
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  J
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  K
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  L
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  M
                </p>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-end fw-medium">Uppecase:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis1"
                  />
                  <label for="bopis1" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis2"
                  />
                  <label for="bopis2" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis3"
                  />
                  <label for="bopis3" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis4"
                  />
                  <label for="bopis4" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis5"
                  />
                  <label for="bopis5" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis6"
                  />
                  <label for="bopis6" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis7"
                  />
                  <label for="bopis7" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis8"
                  />
                  <label for="bopis8" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis9"
                  />
                  <label for="bopis9" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis10"
                  />
                  <label for="bopis10" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis11"
                  />
                  <label for="bopis11" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis12"
                  />
                  <label for="bopis12" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis13"
                  />
                  <label for="bopis13" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Written Strokes:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis14"
                  />
                  <label for="bopis14" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis15"
                  />
                  <label for="bopis15" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis16"
                  />
                  <label for="bopis16" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis17"
                  />
                  <label for="bopis17" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis18"
                  />
                  <label for="bopis18" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis19"
                  />
                  <label for="bopis19" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis20"
                  />
                  <label for="bopis20" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis21"
                  />
                  <label for="bopis21" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis22"
                  />
                  <label for="bopis22" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis23"
                  />
                  <label for="bopis23" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis24"
                  />
                  <label for="bopis24" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis25"
                  />
                  <label for="bopis25" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis26"
                  />
                  <label for="bopis26" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Lowercase:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis27"
                  />
                  <label for="bopis27" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis28"
                  />
                  <label for="bopis28" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis29"
                  />
                  <label for="bopisj29" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis30"
                  />
                  <label for="bopis30" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis31"
                  />
                  <label for="bopis31" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis32"
                  />
                  <label for="bopis32" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis33"
                  />
                  <label for="bopis33" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis34"
                  />
                  <label for="bopis34" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis35"
                  />
                  <label for="bopis35" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis36"
                  />
                  <label for="bopis36" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis37"
                  />
                  <label for="bopis37" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis38"
                  />
                  <label for="bopis38" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis39"
                  />
                  <label for="bopis39" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Written Strokes:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis40"
                  />
                  <label for="bopis40" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis41"
                  />
                  <label for="bopis41" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis42"
                  />
                  <label for="bopis42" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis43"
                  />
                  <label for="bopis43" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis44"
                  />
                  <label for="bopis44" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis45"
                  />
                  <label for="bopis45" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis46"
                  />
                  <label for="bopis46" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis47"
                  />
                  <label for="bopis47" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis48"
                  />
                  <label for="bopis48" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis49"
                  />
                  <label for="bopis49" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis50"
                  />
                  <label for="bopis50" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis51"
                  />
                  <label for="bopis51" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis52"
                  />
                  <label for="bopis52" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Beginning Sound:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis53"
                  />
                  <label for="bopis53" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis54"
                  />
                  <label for="bopis54" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis55"
                  />
                  <label for="bopis55" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis56"
                  />
                  <label for="bopis56" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis57"
                  />
                  <label for="bopis57" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis58"
                  />
                  <label for="bopis58" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis59"
                  />
                  <label for="bopis59" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis60"
                  />
                  <label for="bopis60" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis61"
                  />
                  <label for="bopis61" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis62"
                  />
                  <label for="bopis62" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis63"
                  />
                  <label for="bopis63" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis64"
                  />
                  <label for="bopis64" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis65"
                  />
                  <label for="bopis65" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>
                <p className="text-end fw-medium"> Alphabets :</p>
              </th>
              <th>
                {" "}
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  N
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  O
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  P
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  Q
                </p>{" "}
              </th>
              <th>
                {" "}
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  R
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  S
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  T
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  U
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  V
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  W
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  X
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  Y
                </p>{" "}
              </th>
              <th>
                <p
                  className="border border-3 text-end fw-medium d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  Z
                </p>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-end fw-medium">Uppecase:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis66"
                  />
                  <label for="bopis66" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis67"
                  />
                  <label for="bopis67" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis68"
                  />
                  <label for="bopis68" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis69"
                  />
                  <label for="bopis69" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis70"
                  />
                  <label for="bopis70" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis71"
                  />
                  <label for="bopis71" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis72"
                  />
                  <label for="bopis72" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis73"
                  />
                  <label for="bopis73" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis74"
                  />
                  <label for="bopis74" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis75"
                  />
                  <label for="bopis75" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis76"
                  />
                  <label for="bopis76" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis77"
                  />
                  <label for="bopis77" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis78"
                  />
                  <label for="bopis78" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Written Strokes:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis7"
                  />
                  <label for="bopis79" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis80"
                  />
                  <label for="bopis80" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis81"
                  />
                  <label for="bopis81" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis82"
                  />
                  <label for="bopis82" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis83"
                  />
                  <label for="bopis83" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis84"
                  />
                  <label for="bopis84" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis85"
                  />
                  <label for="bopis85" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis86"
                  />
                  <label for="bopis86" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis87"
                  />
                  <label for="bopis87" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis88"
                  />
                  <label for="bopis88" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis89"
                  />
                  <label for="bopis89" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis90"
                  />
                  <label for="bopis90" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis91"
                  />
                  <label for="bopis91" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Lowercase:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis92"
                  />
                  <label for="bopis92" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis93"
                  />
                  <label for="bopis93" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis94"
                  />
                  <label for="bopis94" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis95"
                  />
                  <label for="bopis95" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis96"
                  />
                  <label for="bopis96" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis97"
                  />
                  <label for="bopis97" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis98"
                  />
                  <label for="bopis98" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis99"
                  />
                  <label for="bopis99" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis100"
                  />
                  <label for="bopis100" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis101"
                  />
                  <label for="bopis101" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis102"
                  />
                  <label for="bopis102" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis103"
                  />
                  <label for="bopis103" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis104"
                  />
                  <label for="bopis104" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Written Strokes:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis105"
                  />
                  <label for="bopis105" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis106"
                  />
                  <label for="bopis106" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis107"
                  />
                  <label for="bopis107" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis108"
                  />
                  <label for="bopis108" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis109"
                  />
                  <label for="bopis109" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis110"
                  />
                  <label for="bopis110" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis111"
                  />
                  <label for="bopis111" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis112"
                  />
                  <label for="bopis112" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis113"
                  />
                  <label for="bopis113" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis114"
                  />
                  <label for="bopis114" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis115"
                  />
                  <label for="bopis115" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis116"
                  />
                  <label for="bopis116" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis117"
                  />
                  <label for="bopis117" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Beginning Sound:</th>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis118"
                  />
                  <label for="bopis118" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis119"
                  />
                  <label for="bopis119" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis120"
                  />
                  <label for="bopis120" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis121"
                  />
                  <label for="bopis121" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis122"
                  />
                  <label for="bopis122" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis123"
                  />
                  <label for="bopis123" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis124"
                  />
                  <label for="bopis124" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis125"
                  />
                  <label for="bopis125" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis126"
                  />
                  <label for="bopis126" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis127"
                  />
                  <label for="bopis127" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis128"
                  />
                  <label for="bopis128" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis129"
                  />
                  <label for="bopis129" className="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div className="on-off-toggle">
                  <input
                    className="on-off-toggle__input"
                    type="checkbox"
                    id="bopis130"
                  />
                  <label for="bopis130" className="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row p-3">
        <div className="col-md-6 col-12 mb-4">
          <p>Association</p>
          <div className="form-check form-check-inline">
            <input
             className="form-check-input "
             value="Yes"
             name="association"
             type="radio"
             checked={formik.values.association === "Yes"}
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
            />
            <label className="form-check-label" for="inlineRadio1">
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
               className="form-check-input"
               value="No"
               name="association"
               type="radio"
               checked={formik.values.association === "No"}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
            />
            <label className="form-check-label" for="inlineRadio1">
              No
            </label>
          </div>
        </div>
        <div className="col-md-6 col-12 mb-4">
          <label for="floatingTextarea2">Remarks</label>
          <div className="">
            <textarea
              type="text"
              name="remarks"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.remarks}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
);
export default AssessmentAlphabets;