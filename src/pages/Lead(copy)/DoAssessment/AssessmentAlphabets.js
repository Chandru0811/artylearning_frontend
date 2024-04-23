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
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis1"
                  />
                  <label for="bopis1" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis2"
                  />
                  <label for="bopis2" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis3"
                  />
                  <label for="bopis3" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis4"
                  />
                  <label for="bopis4" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis5"
                  />
                  <label for="bopis5" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis6"
                  />
                  <label for="bopis6" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis7"
                  />
                  <label for="bopis7" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis8"
                  />
                  <label for="bopis8" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis9"
                  />
                  <label for="bopis9" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis10"
                  />
                  <label for="bopis10" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis11"
                  />
                  <label for="bopis11" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis12"
                  />
                  <label for="bopis12" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis13"
                  />
                  <label for="bopis13" class="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Written Strokes:</th>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis14"
                  />
                  <label for="bopis14" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis15"
                  />
                  <label for="bopis15" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis16"
                  />
                  <label for="bopis16" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis17"
                  />
                  <label for="bopis17" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis18"
                  />
                  <label for="bopis18" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis19"
                  />
                  <label for="bopis19" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis20"
                  />
                  <label for="bopis20" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis21"
                  />
                  <label for="bopis21" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis22"
                  />
                  <label for="bopis22" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis23"
                  />
                  <label for="bopis23" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis24"
                  />
                  <label for="bopis24" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis25"
                  />
                  <label for="bopis25" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis26"
                  />
                  <label for="bopis26" class="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Lowercase:</th>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis27"
                  />
                  <label for="bopis27" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis28"
                  />
                  <label for="bopis28" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis29"
                  />
                  <label for="bopisj29" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis30"
                  />
                  <label for="bopis30" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis31"
                  />
                  <label for="bopis31" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis32"
                  />
                  <label for="bopis32" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis33"
                  />
                  <label for="bopis33" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis34"
                  />
                  <label for="bopis34" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis35"
                  />
                  <label for="bopis35" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis36"
                  />
                  <label for="bopis36" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis37"
                  />
                  <label for="bopis37" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis38"
                  />
                  <label for="bopis38" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis39"
                  />
                  <label for="bopis39" class="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Written Strokes:</th>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis40"
                  />
                  <label for="bopis40" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis41"
                  />
                  <label for="bopis41" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis42"
                  />
                  <label for="bopis42" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis43"
                  />
                  <label for="bopis43" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis44"
                  />
                  <label for="bopis44" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis45"
                  />
                  <label for="bopis45" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis46"
                  />
                  <label for="bopis46" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis47"
                  />
                  <label for="bopis47" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis48"
                  />
                  <label for="bopis48" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis49"
                  />
                  <label for="bopis49" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis50"
                  />
                  <label for="bopis50" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis51"
                  />
                  <label for="bopis51" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis52"
                  />
                  <label for="bopis52" class="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Beginning Sound:</th>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis53"
                  />
                  <label for="bopis53" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis54"
                  />
                  <label for="bopis54" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis55"
                  />
                  <label for="bopis55" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis56"
                  />
                  <label for="bopis56" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis57"
                  />
                  <label for="bopis57" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis58"
                  />
                  <label for="bopis58" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis59"
                  />
                  <label for="bopis59" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis60"
                  />
                  <label for="bopis60" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis61"
                  />
                  <label for="bopis61" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis62"
                  />
                  <label for="bopis62" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis63"
                  />
                  <label for="bopis63" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis64"
                  />
                  <label for="bopis64" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis65"
                  />
                  <label for="bopis65" class="on-off-toggle__slider"></label>
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
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis66"
                  />
                  <label for="bopis66" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis67"
                  />
                  <label for="bopis67" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis68"
                  />
                  <label for="bopis68" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis69"
                  />
                  <label for="bopis69" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis70"
                  />
                  <label for="bopis70" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis71"
                  />
                  <label for="bopis71" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis72"
                  />
                  <label for="bopis72" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis73"
                  />
                  <label for="bopis73" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis74"
                  />
                  <label for="bopis74" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis75"
                  />
                  <label for="bopis75" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis76"
                  />
                  <label for="bopis76" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis77"
                  />
                  <label for="bopis77" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis78"
                  />
                  <label for="bopis78" class="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Written Strokes:</th>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis7"
                  />
                  <label for="bopis79" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis80"
                  />
                  <label for="bopis80" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis81"
                  />
                  <label for="bopis81" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis82"
                  />
                  <label for="bopis82" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis83"
                  />
                  <label for="bopis83" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis84"
                  />
                  <label for="bopis84" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis85"
                  />
                  <label for="bopis85" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis86"
                  />
                  <label for="bopis86" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis87"
                  />
                  <label for="bopis87" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis88"
                  />
                  <label for="bopis88" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis89"
                  />
                  <label for="bopis89" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis90"
                  />
                  <label for="bopis90" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis91"
                  />
                  <label for="bopis91" class="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Lowercase:</th>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis92"
                  />
                  <label for="bopis92" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis93"
                  />
                  <label for="bopis93" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis94"
                  />
                  <label for="bopis94" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis95"
                  />
                  <label for="bopis95" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis96"
                  />
                  <label for="bopis96" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis97"
                  />
                  <label for="bopis97" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis98"
                  />
                  <label for="bopis98" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis99"
                  />
                  <label for="bopis99" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis100"
                  />
                  <label for="bopis100" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis101"
                  />
                  <label for="bopis101" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis102"
                  />
                  <label for="bopis102" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis103"
                  />
                  <label for="bopis103" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis104"
                  />
                  <label for="bopis104" class="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Written Strokes:</th>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis105"
                  />
                  <label for="bopis105" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis106"
                  />
                  <label for="bopis106" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis107"
                  />
                  <label for="bopis107" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis108"
                  />
                  <label for="bopis108" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis109"
                  />
                  <label for="bopis109" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis110"
                  />
                  <label for="bopis110" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis111"
                  />
                  <label for="bopis111" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis112"
                  />
                  <label for="bopis112" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis113"
                  />
                  <label for="bopis113" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis114"
                  />
                  <label for="bopis114" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis115"
                  />
                  <label for="bopis115" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis116"
                  />
                  <label for="bopis116" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis117"
                  />
                  <label for="bopis117" class="on-off-toggle__slider"></label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-end fw-medium">Beginning Sound:</th>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis118"
                  />
                  <label for="bopis118" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis119"
                  />
                  <label for="bopis119" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis120"
                  />
                  <label for="bopis120" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis121"
                  />
                  <label for="bopis121" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis122"
                  />
                  <label for="bopis122" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis123"
                  />
                  <label for="bopis123" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis124"
                  />
                  <label for="bopis124" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis125"
                  />
                  <label for="bopis125" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis126"
                  />
                  <label for="bopis126" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis127"
                  />
                  <label for="bopis127" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis128"
                  />
                  <label for="bopis128" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis129"
                  />
                  <label for="bopis129" class="on-off-toggle__slider"></label>
                </div>
              </td>
              <td>
                <div class="on-off-toggle">
                  <input
                    class="on-off-toggle__input"
                    type="checkbox"
                    id="bopis130"
                  />
                  <label for="bopis130" class="on-off-toggle__slider"></label>
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