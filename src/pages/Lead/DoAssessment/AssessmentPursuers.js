import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  sightWords: Yup.array()
    .min(1, "*Select at least one Sight Words")
    .required("*Select Sight Words"),
  hbrothersSightWords: Yup.array()
    .min(1, "*Select at least one Sight Words")
    .required("*Select Sight Words"),
});

const AssessmentPursuers = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [assessmentAvailable, setAssessmentAvailable] = useState(false);
    const [PursuerAssessmentId, setPursuerAssessmentId] = useState(false);
    const { leadId } = useParams();
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        sightWords: formData.sightWords || "",
        hbrothersSightWords: formData.sightWords || "",

        realHag: formData.realHag || false,
        realHagSpelling: formData.realHagSpelling || "",

        realKeg: formData.realKeg || false,
        realKegSpelling: formData.realKegSpelling || "",

        realDip: formData.realDip || false,
        realDipSpelling: formData.realDipSpelling || "",

        realLot: formData.realLot || false,
        realLotSpelling: formData.realLotSpelling || "",

        realBud: formData.realBud || false,
        realBudSpelling: formData.realBudSpelling || "",

        nonSenseZam: formData.nonSenseZam || false,
        nonSenseZamSpelling: formData.nonSenseZamSpelling || "",

        nonSenseDen: formData.nonSenseDen || false,
        nonSenseDenSpelling: formData.nonSenseDenSpelling || "",

        nonSenseWip: formData.nonSenseWip || false,
        nonSenseWipSpelling: formData.nonSenseWipSpelling || "",

        nonSenseSot: formData.nonSenseSot || false,
        nonSenseSotSpelling: formData.nonSenseSotSpelling || "",

        nonSenseYub: formData.nonSenseYub || false,
        nonSenseYubSpelling: formData.nonSenseYubSpelling || "",

        // L Blend
        lblendClaf: formData.lblendClaf || false,
        lblendClafSpelling: formData.lblendClafSpelling || "",

        lblendFled: formData.lblendFled || false,
        lblendFledSpelling: formData.lblendFledSpelling || "",

        lblendSilm: formData.lblendSilm || false,
        lblendSilmSpelling: formData.lblendSilmSpelling || "",

        lblendGlob: formData.lblendGlob || false,
        lblendGlobSpelling: formData.lblendGlobSpelling || "",

        lblendBlum: formData.lblendBlum || false,
        lblendBlumSpelling: formData.lblendBlumSpelling || "",

        // R Blend
        rblendDrap: formData.rblendDrap || false,
        rblendDrapSpelling: formData.rblendDrapSpelling || "",

        rblendCued: formData.rblendCued || false,
        rblendCuedSpelling: formData.rblendCuedSpelling || "",

        rblendBrim: formData.rblendBrim || false,
        rblendBrimSpelling: formData.rblendBrimSpelling || "",

        rblendTrop: formData.rblendTrop || false,
        rblendTropSpelling: formData.rblendTropSpelling || "",

        rblendCrum: formData.rblendCrum || false,
        rblendCrumSpelling: formData.rblendCrumSpelling || "",

        // S Blend
        sblendSnap: formData.sblendSnap || false,
        sblendSnapSpelling: formData.sblendSnapSpelling || "",

        sblendSmeg: formData.sblendSmeg || false,
        sblendSmegSpelling: formData.sblendSmegSpelling || "",

        sblendSpit: formData.sblendSpit || false,
        sblendSpitSpelling: formData.sblendSpitSpelling || "",

        sblendStomp: formData.sblendStomp || false,
        sblendStompSpelling: formData.sblendStompSpelling || "",

        sblendSwum: formData.sblendSwum || false,
        sblendSwumSpelling: formData.sblendSwumSpelling || "",

        // H Brothers L Blend
        lblendShamrock: formData.lblendShamrock || false,
        lblendShamrockSpelling: formData.lblendShamrockSpelling || "",

        lblendChoose: formData.lblendChoose || false,
        lblendChooseSpelling: formData.lblendChooseSpelling || "",

        lblendWhack: formData.lblendWhack || false,
        lblendWhackSpelling: formData.lblendWhackSpelling || "",

        lblendThrust: formData.lblendThrust || false,
        lblendThrustSpelling: formData.lblendThrustSpelling || "",

        lblendPhobics: formData.lblendPhobics || false,
        lblendPhobicsSpelling: formData.lblendPhobicsSpelling || "",

        realRemarks: formData.realRemarks || "",
        blendRemarks: formData.blendRemarks || "",
        sightWordsRemarks: formData.sightWordsRemarks || "",
        hbrothersRemarks: formData.hbrothersRemarks || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        data.leadId = leadId;
        if (assessmentAvailable) {
          try {
            const response = await api.put(
              `/updateLeadDoAssessmentArtyPursuers/${PursuerAssessmentId}`,
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              setFormData((prv) => ({ ...prv, ...data, leadId }));
              navigate("/lead/lead");
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
              "/createLeadDoAssessmentArtyPursuers",
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 201) {
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
        const PursuerResponse = await api.get(
          `/getLeadAssessmentDataByLeadId/${leadId}`
        );
        console.log("PursuerResponse is", PursuerResponse);
        if (PursuerResponse?.data?.leadDoAssessmentArtyPursuers?.length > 0) {
          setAssessmentAvailable(true);
          setPursuerAssessmentId(
            PursuerResponse.data.leadDoAssessmentArtyPursuers[0].id
          );
          formik.setValues(
            PursuerResponse.data.leadDoAssessmentArtyPursuers[0]
          );
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
      AssessmentPursuers: formik.handleSubmit,
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
                      Sight Words<span className="text-danger">*</span> :
                    </th>
                    <td>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox1"
                          name="sightWords"
                          value="THE"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("THE")
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
                          name="sightWords"
                          value="SHE"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("SHE")
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
                          name="sightWords"
                          value="HE"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("HE")
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
                          name="sightWords"
                          value="SEE"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("SEE")
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
                          name="sightWords"
                          value="ON"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("ON")
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
                          name="sightWords"
                          value="COULD"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("COULD")
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
                          name="sightWords"
                          value="WHITE"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("WHITE")
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
                          name="sightWords"
                          value="TOGETHER"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("TOGETHER")
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
                          name="sightWords"
                          value="MIGHT"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("MIGHT")
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
                          name="sightWords"
                          value="ABOUT"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("ABOUT")
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
                  <tr>
                    <th scope="row"></th>
                    <td>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox1"
                          name="sightWords"
                          value="NIL"
                          checked={
                            formik.values.sightWords &&
                            formik.values.sightWords.includes("NIL")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Nil
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td>
                      {formik.touched.sightWords && formik.errors.sightWords ? (
                        <div className="text-danger">
                          {formik.errors.sightWords}
                        </div>
                      ) : null}
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
                            id="realHag"
                            name="realHag"
                            checked={formik.values.realHag}
                            onChange={handleCheckboxChange("realHag")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="realHag"
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
                            id="realKeg"
                            name="realKeg"
                            checked={formik.values.realKeg}
                            onChange={handleCheckboxChange("realKeg")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="realKeg"
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
                            name="realDip"
                            checked={formik.values.realDip}
                            onChange={handleCheckboxChange("realDip")}
                            onBlur={formik.handleBlur}
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
                            id="realLot"
                            name="realLot"
                            checked={formik.values.realLot}
                            onChange={handleCheckboxChange("realLot")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="realLot"
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
                            id="realBud"
                            name="realBud"
                            checked={formik.values.realBud}
                            onChange={handleCheckboxChange("realBud")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="realBud"
                            class="on-off-toggle__slider"
                          ></label>
                        </div>{" "}
                        &nbsp; Bud
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
                        type="text"
                        style={{ width: "px" }}
                        name="realHagSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.realHagSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="realKegSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.realKegSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="realDipSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.realDipSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="realLotSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.realLotSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="realBudSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.realBudSpelling}
                      />
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
                            id="nonSenseZam"
                            name="nonSenseZam"
                            checked={formik.values.nonSenseZam}
                            onChange={handleCheckboxChange("nonSenseZam")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="nonSenseZam"
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
                            id="nonSenseDen"
                            name="nonSenseDen"
                            checked={formik.values.nonSenseDen}
                            onChange={handleCheckboxChange("nonSenseDen")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="nonSenseDen"
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
                            id="nonSenseWip"
                            name="nonSenseWip"
                            checked={formik.values.nonSenseWip}
                            onChange={handleCheckboxChange("nonSenseWip")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="nonSenseWip"
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
                            id="nonSenseSot"
                            name="nonSenseSot"
                            checked={formik.values.nonSenseSot}
                            onChange={handleCheckboxChange("nonSenseSot")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="nonSenseSot"
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
                            id="nonSenseYub"
                            name="nonSenseYub"
                            checked={formik.values.nonSenseYub}
                            onChange={handleCheckboxChange("nonSenseYub")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="nonSenseYub"
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
                        type="text"
                        style={{ width: "px" }}
                        name="nonSenseZamSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nonSenseZamSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="nonSenseDenSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nonSenseDenSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="nonSenseWipSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nonSenseWipSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="nonSenseSotSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nonSenseSotSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="nonSenseYubSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nonSenseYubSpelling}
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
                        name="realRemarks"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.realRemarks}
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
                            id="lblendClaf"
                            name="lblendClaf"
                            checked={formik.values.lblendClaf}
                            onChange={handleCheckboxChange("lblendClaf")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendClaf"
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
                            id="lblendFled"
                            name="lblendFled"
                            checked={formik.values.lblendFled}
                            onChange={handleCheckboxChange("lblendFled")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendFled"
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
                            id="lblendSilm"
                            name="lblendSilm"
                            checked={formik.values.lblendSilm}
                            onChange={handleCheckboxChange("lblendSilm")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendSilm"
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
                            id="lblendGlob"
                            name="lblendGlob"
                            checked={formik.values.lblendGlob}
                            onChange={handleCheckboxChange("lblendGlob")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendGlob"
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
                            id="lblendBlum"
                            name="lblendBlum"
                            checked={formik.values.lblendBlum}
                            onChange={handleCheckboxChange("lblendBlum")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendBlum"
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
                        type="text"
                        style={{ width: "px" }}
                        name="lblendClafSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendClafSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="lblendFledSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendFledSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="lblendSilmSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendSilmSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="lblendGlobSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendGlobSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="lblendBlumSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendBlumSpelling}
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
                            id="rblendDrap"
                            name="rblendDrap"
                            checked={formik.values.rblendDrap}
                            onChange={handleCheckboxChange("rblendDrap")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="rblendDrap"
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
                            id="rblendCued"
                            name="rblendCued"
                            checked={formik.values.rblendCued}
                            onChange={handleCheckboxChange("rblendCued")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="rblendCued"
                            class="on-off-toggle__slider"
                          ></label>
                        </div>{" "}
                        &nbsp; Curd
                      </div>{" "}
                    </td>
                    <td>
                      <div class="d-flex">
                        <div class="on-off-toggle">
                          <input
                            class="on-off-toggle__input"
                            type="checkbox"
                            id="rblendBrim"
                            name="rblendBrim"
                            checked={formik.values.rblendBrim}
                            onChange={handleCheckboxChange("rblendBrim")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="rblendBrim"
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
                            id="rblendTrop"
                            name="rblendTrop"
                            checked={formik.values.rblendTrop}
                            onChange={handleCheckboxChange("rblendTrop")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="rblendTrop"
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
                            id="rblendCrum"
                            name="rblendCrum"
                            checked={formik.values.rblendCrum}
                            onChange={handleCheckboxChange("rblendCrum")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="rblendCrum"
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
                        type="text"
                        style={{ width: "px" }}
                        name="rblendDrapSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rblendDrapSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="rblendCuedSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rblendCuedSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="rblendBrimSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rblendBrimSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="rblendTropSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rblendTropSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="rblendCrumSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rblendCrumSpelling}
                      />
                    </td>
                  </tr>

                  <tr style={{ width: "200px" }}>
                    <th scope="row" className="text-end fw-medium">
                      S Blend:
                    </th>
                    <td>
                      <div class="d-flex">
                        <div class="on-off-toggle">
                          <input
                            class="on-off-toggle__input"
                            type="checkbox"
                            id="sblendSnap"
                            name="sblendSnap"
                            checked={formik.values.sblendSnap}
                            onChange={handleCheckboxChange("sblendSnap")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="sblendSnap"
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
                            id="sblendSmeg"
                            name="sblendSmeg"
                            checked={formik.values.sblendSmeg}
                            onChange={handleCheckboxChange("sblendSmeg")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="sblendSmeg"
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
                            id="sblendSpit"
                            name="sblendSpit"
                            checked={formik.values.sblendSpit}
                            onChange={handleCheckboxChange("sblendSpit")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="sblendSpit"
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
                            id="sblendStomp"
                            name="sblendStomp"
                            checked={formik.values.sblendStomp}
                            onChange={handleCheckboxChange("sblendStomp")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="sblendStomp"
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
                            id="sblendSwum"
                            name="sblendSwum"
                            checked={formik.values.sblendSwum}
                            onChange={handleCheckboxChange("sblendSwum")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="sblendSwum"
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
                        type="text"
                        style={{ width: "px" }}
                        name="sblendSnapSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sblendSnapSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="sblendSmegSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sblendSmegSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="sblendSpitSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sblendSpitSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="sblendStompSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sblendStompSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="sblendSwumSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sblendSwumSpelling}
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
                        name="blendRemarks"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.blendRemarks}
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
                            id="lblendShamrock"
                            name="lblendShamrock"
                            checked={formik.values.lblendShamrock}
                            onChange={handleCheckboxChange("lblendShamrock")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendShamrock"
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
                            id="lblendChoose"
                            name="lblendChoose"
                            checked={formik.values.lblendChoose}
                            onChange={handleCheckboxChange("lblendChoose")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendChoose"
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
                            id="lblendWhack"
                            name="lblendWhack"
                            checked={formik.values.lblendWhack}
                            onChange={handleCheckboxChange("lblendWhack")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendWhack"
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
                            id="lblendThrust"
                            name="lblendThrust"
                            checked={formik.values.lblendThrust}
                            onChange={handleCheckboxChange("lblendThrust")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendThrust"
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
                            id="lblendPhobics"
                            value="lblendPhobics"
                            checked={formik.values.lblendPhobics}
                            onChange={handleCheckboxChange("lblendPhobics")}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            for="lblendPhobics"
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
                        type="text"
                        style={{ width: "px" }}
                        name="lblendShamrockSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendShamrockSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="lblendChooseSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendChooseSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="lblendWhackSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendWhackSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="lblendThrustSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendThrustSpelling}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "px" }}
                        name="lblendPhobicsSpelling"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lblendPhobicsSpelling}
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
                        name="sightWordsRemarks"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.sightWordsRemarks}
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
                      Sight Words<span className="text-danger">*</span> :
                    </th>
                    <td>
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="EE"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("EE")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="NG"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("NG")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="OO"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("OO")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="SQU"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("SQU")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="SCR"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("SCR")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="OW"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("OW")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="OU"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("OU")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="AI"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("AI")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="AY"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("AY")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="OA"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("OA")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="AW"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("AW")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="AR"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("AR")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="IE"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("IE")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="ER"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("ER")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="WR"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("WR")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          wr
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td>
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="hbrothersSightWords"
                          value="NIL"
                          checked={
                            formik.values.hbrothersSightWords &&
                            formik.values.hbrothersSightWords.includes("NIL")
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Nil
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td>
                      {formik.touched.hbrothersSightWords &&
                      formik.errors.hbrothersSightWords ? (
                        <div className="text-danger">
                          {formik.errors.hbrothersSightWords}
                        </div>
                      ) : null}
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
                        name="hbrothersRemarks"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.hbrothersRemarks}
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
