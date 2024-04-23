import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

const AssessmentPursuers = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        singleWords: formData.singleWords || "",
        remarks1: formData.remarks1 || "",
        remarks2: formData.remarks2 || "",
        remarks3: formData.remarks3 || "",
        remarks4: formData.remarks4 || "",
        
        
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
      AssessmentPursuers: handleNextStep,
    }));


  return (
    <section>
      <h5 className="headColor py-3">Arty Pursuers</h5>
      <div className="container mt-5 px-4">
        <div class="row">
          <div className="table-responsive">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    style={{ width: "200px" }}
                    className="text-end fw-medium"
                  >
                    Sight Words:
                  </th>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        name="singleWords"
                        value="The"
                        checked={
                          formik.values.singleWords &&
                          formik.values.singleWords.includes("The")
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        The
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        name="singleWords"
                        value="She"
                        checked={
                          formik.values.singleWords &&
                          formik.values.singleWords.includes("She")
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        She
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        name="singleWords"
                        value="See"
                        checked={
                          formik.values.singleWords &&
                          formik.values.singleWords.includes("See")
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        See
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                         class="form-check-input"
                         type="checkbox"
                         id="inlineCheckbox1"
                         name="singleWords"
                         value="He"
                         checked={
                           formik.values.singleWords &&
                           formik.values.singleWords.includes("He")
                         }
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        He
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                         class="form-check-input"
                         type="checkbox"
                         id="inlineCheckbox1"
                         name="singleWords"
                         value="On"
                         checked={
                           formik.values.singleWords &&
                           formik.values.singleWords.includes("On")
                         }
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        On
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td>
                    <div class="form-check">
                      <input
                         class="form-check-input"
                         type="checkbox"
                         id="inlineCheckbox1"
                         name="singleWords"
                         value="Could"
                         checked={
                           formik.values.singleWords &&
                           formik.values.singleWords.includes("Could")
                         }
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Could
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        name="singleWords"
                        value="White"
                        checked={
                          formik.values.singleWords &&
                          formik.values.singleWords.includes("White")
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        White
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        name="singleWords"
                        value="Together"
                        checked={
                          formik.values.singleWords &&
                          formik.values.singleWords.includes("Together")
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Together
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        name="singleWords"
                        value="Might"
                        checked={
                          formik.values.singleWords &&
                          formik.values.singleWords.includes("Might")
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Might
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        name="singleWords"
                        value="About"
                        checked={
                          formik.values.singleWords &&
                          formik.values.singleWords.includes("About")
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        About
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table class="table table-borderless">
              <tbody>
                <tr style={{ width: "200px" }}>
                  <th scope="row" className="text-end fw-medium">
                    CVC:
                  </th>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      A
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      E
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      I
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      O
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      U
                    </p>
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th scope="row" className="text-end fw-medium">
                    Real:
                  </th>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis1"
                        />
                        <label
                          for="bopis1"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Hag
                    </div>
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis2"
                        />
                        <label
                          for="bopis2"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>
                      &nbsp; Keg
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis3"
                        />
                        <label
                          for="bopis3"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>
                      &nbsp; Dip
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis4"
                        />
                        <label
                          for="bopis4"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>
                      &nbsp; Lot
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis5"
                        />
                        <label
                          for="bopis5"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Bud
                    </div>{" "}
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th scope="row" className="text-end fw-medium">
                    Non sense:
                  </th>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis6"
                        />
                        <label
                          for="bopis6"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Zam
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis7"
                        />
                        <label
                          for="bopis7"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Den
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis8"
                        />
                        <label
                          for="bopis8"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Wip
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis9"
                        />
                        <label
                          for="bopis9"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Sot
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis10"
                        />
                        <label
                          for="bopis10"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Yub
                    </div>{" "}
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th
                    scope="row"
                    className="text-end fw-medium"
                    style={{ width: "200px" }}
                  >
                    Spelling:
                  </th>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="text-end fw-medium"
                    style={{ width: "200px" }}
                  >
                    Remarks:
                  </th>
                  <td>
                    <textarea
                       type="text"
                       name="remarks1"
                       className="form-control"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.remarks1}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table class="table table-borderless">
              <tbody>
                <tr style={{ width: "200px" }}>
                  <th scope="row" className="text-end fw-medium">
                    CVC:
                  </th>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      A
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      E
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      I
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      O
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      U
                    </p>
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th scope="row" className="text-end fw-medium">
                    L Blend:
                  </th>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis11"
                        />
                        <label
                          for="bopis11"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Claf
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis12"
                        />
                        <label
                          for="bopis12"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Fled
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis13"
                        />
                        <label
                          for="bopis13"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Silm
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis14"
                        />
                        <label
                          for="bopis14"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Glob
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis15"
                        />
                        <label
                          for="bopis15"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Blum
                    </div>{" "}
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th
                    scope="row"
                    className="text-end fw-medium"
                    style={{ width: "200px" }}
                  >
                    Spelling:
                  </th>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th scope="row" className="text-end fw-medium">
                    R Blend:
                  </th>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis16"
                        />
                        <label
                          for="bopis16"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Drap
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis17"
                        />
                        <label
                          for="bopis17"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Cued
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis18"
                        />
                        <label
                          for="bopis18"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Brim
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis19"
                        />
                        <label
                          for="bopis19"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Trop
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis20"
                        />
                        <label
                          for="bopis20"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Crum
                    </div>{" "}
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th
                    scope="row"
                    className="text-end fw-medium"
                    style={{ width: "200px" }}
                  >
                    Spelling:
                  </th>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th scope="row" className="text-end fw-medium">
                    R Blend:
                  </th>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis21"
                        />
                        <label
                          for="bopis21"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Snap
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis22"
                        />
                        <label
                          for="bopis22"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Smeg
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis23"
                        />
                        <label
                          for="bopis23"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Spit
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis24"
                        />
                        <label
                          for="bopis24"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Stomp
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis25"
                        />
                        <label
                          for="bopis25"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Swum
                    </div>{" "}
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th
                    scope="row"
                    className="text-end fw-medium"
                    style={{ width: "200px" }}
                  >
                    Spelling:
                  </th>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="text-end fw-medium"
                    style={{ width: "200px" }}
                  >
                    Remarks:
                  </th>
                  <td>
                    <textarea
                     type="text"
                     name="remarks2"
                     className="form-control"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.remarks2}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table class="table table-borderless">
              <tbody>
                <tr style={{ width: "200px" }}>
                  <th scope="row" className="text-end fw-medium">
                    {" "}
                    H Brothers:
                  </th>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      SH
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      CH
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      WH
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      TH
                    </p>
                  </td>
                  <td>
                    <p
                      className="border border-3 d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      PH
                    </p>
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th scope="row" className="text-end fw-medium">
                    {" "}
                    L Blend :
                  </th>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis26"
                        />
                        <label
                          for="bopis26"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Shamrock
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis27"
                        />
                        <label
                          for="bopis27"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Choose
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis28"
                        />
                        <label
                          for="bopis28"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Whack
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis29"
                        />
                        <label
                          for="bopis29"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Thrust
                    </div>{" "}
                  </td>
                  <td>
                    <div class="d-flex">
                      <div class="on-off-toggle">
                        <input
                          class="on-off-toggle__input"
                          type="checkbox"
                          id="bopis30"
                        />
                        <label
                          for="bopis30"
                          class="on-off-toggle__slider"
                        ></label>
                      </div>{" "}
                      &nbsp; Phobics
                    </div>{" "}
                  </td>
                </tr>
                <tr style={{ width: "200px" }}>
                  <th
                    scope="row"
                    className="text-end fw-medium"
                    style={{ width: "200px" }}
                  >
                    Spelling:
                  </th>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control "
                      type="text"
                      style={{ width: "px" }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="text-end fw-medium"
                    style={{ width: "200px" }}
                  >
                    Remarks:
                  </th>
                  <td>
                    <textarea
                       type="text"
                       name="remarks3"
                       className="form-control"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.remarks3}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    style={{ width: "200px" }}
                    className="text-end fw-medium"
                  >
                    Sight Words:
                  </th>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        ee
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        ng
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        oo
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        squ
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        scr
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        ow
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        ou
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        ai
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        ay
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        oa
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        aw
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        ar
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        ie
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        er
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        wr
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="text-end fw-medium"
                    style={{ width: "200px" }}
                  >
                    Remarks:
                  </th>
                  <td>
                    <textarea
                      type="text"
                      name="remarks4"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.remarks4}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
);

export default AssessmentPursuers;
