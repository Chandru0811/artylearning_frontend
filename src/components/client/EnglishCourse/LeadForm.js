import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  centre: Yup.string().required("*Centre name is required"),
  childName: Yup.string().required("*Child name is required"),
  gender: Yup.string().required("*Select a gender"),
  dob: Yup.string().required("*Date Of Birth is required"),
  pencilGrip: Yup.string().required("*Pencil Grip is required"),
  subject: Yup.string().required("*Subject is required"),
  marketing: Yup.string().required("*Marketing Source is required"),
  referred: Yup.string().required("*Referred is required"),
  uppercase: Yup.string().required("*UpperCase is required"),
  lowercase: Yup.string().required("*LowerCase is required"),
  sounds: Yup.string().required("*Sounds is required"),
  readsimple: Yup.string().required("*Simple Sentence is required"),
  parentName: Yup.string().required("*Parent Name is required"),
  email: Yup.string()
    .email("*Enter valid email")
    .required("*Email is required"),
  contactNumber: Yup.string()
    .typeError("Contact Number must be a number")
    .required("Contact Number is required")
    .test("is-number", "Please enter a valid number", (value) => !isNaN(value))
    .test("is-integer", "Contact Number must be an integer", (value) =>
      Number.isInteger(parseFloat(value))
    ),
  relation: Yup.string().required("*Relation is required"),
  writing: Yup.string().required("*Writing is required"),
  recoginze: Yup.string().required("*Recoginze is required"),
  preferredDays: Yup.array()
    .min(1, ({ min }) => `Please select at least ${min} preferred day`)
    .required("*Preferred day is required"),
});

function LeadForm() {
  const formik = useFormik({
    initialValues: {
      centre: "",
      childName: "",
      gender: "",
      dob: "",
      pencilGrip: "",
      subject: "",
      marketing: "",
      referred: "",
      uppercase: "",
      lowercase: "",
      sounds: "",
      readsimple: "",
      email: "",
      parentName: "",
      relation: "",
      contactNumber: "",
      writing: "",
      recoginze: "",
      preferredDays: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.gender = values.gender === "true";
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="row headbody">
          <h1 className="form-font mb-3">Waitlist Request Form</h1>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Centre / 中心 <span className="text-danger">*</span>
            </label>
            <select
              {...formik.getFieldProps("centre")}
              className={`form-select    ${
                formik.touched.centre && formik.errors.centre
                  ? "is-invalid"
                  : ""
              }`}
              aria-label="Default select example"
            >
              <option selected>--Select--</option>
              <option value="Arty Learning @ Hougang">
                Arty Learning @ Hougang
              </option>
              <option value="Arty Learning @ Ang Mo Kio">
                Arty Learning @ Ang Mo Kio
              </option>
              <option value="Arty Learning @ Bukit Batok">
                Arty Learning @ Bukit Batok
              </option>
            </select>
            {formik.touched.centre && formik.errors.centre && (
              <div className="invalid-feedback">{formik.errors.centre}</div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Child’s Name / 孩子名字 <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control  ${
                  formik.touched.childName && formik.errors.childName
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...formik.getFieldProps("childName")}
                type="text"
              />
              {formik.touched.childName && formik.errors.childName && (
                <div className="invalid-feedback">
                  {formik.errors.childName}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Gender / 性别 <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="inlineRadio1"
                value="true"
                onChange={formik.handleChange}
                checked={formik.values.gender === "true"}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="inlineRadio2"
                value="false"
                onChange={formik.handleChange}
                checked={formik.values.gender === "false"}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Female
              </label>
            </div>
            {formik.errors.gender && formik.touched.gender && (
              <div className="text-danger  " style={{ fontSize: ".875em" }}>
                {formik.errors.gender}
              </div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Date of Birth / 生日 <span className="text-danger">*</span>
              </label>
              <input
                {...formik.getFieldProps("dob")}
                type="date"
                className={`form-control   ${
                  formik.touched.dob && formik.errors.dob ? "is-invalid" : ""
                }`}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              {formik.touched.dob && formik.errors.dob && (
                <div className="invalid-feedback">{formik.errors.dob}</div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Pencil Grip / 握笔姿势 <span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("pencilGrip")}
                className={`form-select    ${
                  formik.touched.pencilGrip && formik.errors.pencilGrip
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected>--Select--</option>
                <option value="">Steady / 稳握</option>
                <option value="Loose / 松握">Loose / 松握</option>
                <option value="Unable / 不能握">Unable / 不能握</option>
              </select>
              {formik.touched.pencilGrip && formik.errors.pencilGrip && (
                <div className="invalid-feedback">
                  {formik.errors.pencilGrip}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Subject / 课程 <span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("subject")}
                className={`form-select    ${
                  formik.touched.subject && formik.errors.subject
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected>--Select--</option>
                <option value="English / 英文">English / 英文</option>
                <option value="Chinese / 中文">Chinese / 中文</option>
                <option value="Arty Learning @ Bukit Batok">Both</option>
              </select>
              {formik.touched.subject && formik.errors.subject && (
                <div className="invalid-feedback">{formik.errors.subject}</div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Marketing Source / 信息来源{" "}
                <span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("marketing")}
                className={`form-select    ${
                  formik.touched.marketing && formik.errors.marketing
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected>--Select--</option>
                <option value="Friends or Relatives">
                  Friends or Relatives
                </option>
                <option value="Facebook">Facebook</option>
                <option value="Google">Google</option>
                <option value="Others">Others</option>
              </select>
              {formik.touched.marketing && formik.errors.marketing && (
                <div className="invalid-feedback">
                  {formik.errors.marketing}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Referred by / 介绍人 <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control  ${
                  formik.touched.referred && formik.errors.referred
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...formik.getFieldProps("referred")}
                type="text"
              />
              {formik.touched.referred && formik.errors.referred && (
                <div className="invalid-feedback">{formik.errors.referred}</div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Write A-Z (Upper Case) <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="uppercase"
                id="inlineRadio1"
                value="true"
                onChange={formik.handleChange}
                checked={formik.values.uppercase === "true"}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="uppercase"
                id="inlineRadio2"
                value="false"
                onChange={formik.handleChange}
                checked={formik.values.uppercase === "false"}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                No
              </label>
            </div>
            {formik.errors.uppercase && formik.touched.uppercase && (
              <div className="text-danger  " style={{ fontSize: ".875em" }}>
                {formik.errors.uppercase}
              </div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Write A-Z (Lower Case) <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="lowercase"
                id="inlineRadio1"
                value="true"
                onChange={formik.handleChange}
                checked={formik.values.lowercase === "true"}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="lowercase"
                id="inlineRadio2"
                value="false"
                onChange={formik.handleChange}
                checked={formik.values.lowercase === "false"}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                No
              </label>
            </div>
            {formik.errors.lowercase && formik.touched.lowercase && (
              <div className="text-danger  " style={{ fontSize: ".875em" }}>
                {formik.errors.lowercase}
              </div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Sounds of A-Z <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="sounds"
                id="inlineRadio1"
                value="true"
                onChange={formik.handleChange}
                checked={formik.values.sounds === "true"}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="sounds"
                id="inlineRadio2"
                value="false"
                onChange={formik.handleChange}
                checked={formik.values.sounds === "false"}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                No
              </label>
            </div>
            {formik.errors.lowercase && formik.touched.sounds && (
              <div className="text-danger  " style={{ fontSize: ".875em" }}>
                {formik.errors.sounds}
              </div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Can Read Simple Sentence / 能否读短句子
                <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="readsimple"
                id="inlineRadio1"
                value="true"
                onChange={formik.handleChange}
                checked={formik.values.readsimple === "true"}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="readsimple"
                id="inlineRadio2"
                value="false"
                onChange={formik.handleChange}
                checked={formik.values.readsimple === "false"}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                No
              </label>
            </div>
            {formik.errors.readsimple && formik.touched.readsimple && (
              <div className="text-danger  " style={{ fontSize: ".875em" }}>
                {formik.errors.readsimple}
              </div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">
              Parent Name / 父母姓名 <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control  ${
                formik.touched.parentName && formik.errors.parentName
                  ? "is-invalid"
                  : ""
              }`}
              aria-label="Username"
              aria-describedby="basic-addon1"
              {...formik.getFieldProps("parentName")}
              type="text"
            ></input>
            {formik.touched.parentName && formik.errors.parentName && (
              <div className="invalid-feedback">{formik.errors.parentName}</div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">
              Email / 邮箱地址 <span className="text-danger">*</span>
            </label>
            <input
              {...formik.getFieldProps("email")}
              type="email"
              className={`form-control   ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">
              Contact Number / 联络号 <span className="text-danger">*</span>
            </label>
            <div className="input-group mb-3">
              <div className="input-group-text bg-white">
                <select
                  {...formik.getFieldProps("contactNumberPrefix")}
                  className={`form-select ${
                    formik.touched.contactNumberPrefix &&
                    formik.errors.contactNumberPrefix
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  style={{
                    border: "none",
                  }}
                >
                  <option value="">+91</option>
                  <option value="">+65</option>
                </select>
              </div>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.contactNumber && formik.errors.contactNumber
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Text input with checkbox"
                {...formik.getFieldProps("contactNumber")}
              />
              {formik.touched.contactNumber && formik.errors.contactNumber && (
                <div className="invalid-feedback">
                  {formik.errors.contactNumber}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">
              Relation / 关系 <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control  ${
                formik.touched.relation && formik.errors.relation
                  ? "is-invalid"
                  : ""
              }`}
              aria-label="Username"
              aria-describedby="basic-addon1"
              {...formik.getFieldProps("relation")}
              type="text"
            ></input>
            {formik.touched.relation && formik.errors.relation && (
              <div className="invalid-feedback">{formik.errors.relation}</div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Writing / 写字方式 <span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("writing")}
                className={`form-select    ${
                  formik.touched.writing && formik.errors.writing
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected>--Select--</option>
                <option value="Straight & Firm Lines / 书写工整">
                  Straight & Firm Lines / 书写工整
                </option>
                <option value="Crooked & Light Lines / 书写扭曲或轻盈">
                  Crooked & Light Lines / 书写扭曲或轻盈
                </option>
                <option value="Scribbles / 涂鸦">Scribbles / 涂鸦</option>
              </select>
              {formik.touched.writing && formik.errors.writing && (
                <div className="invalid-feedback">{formik.errors.writing}</div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Recognize A-Z <span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("recoginze")}
                className={`form-select    ${
                  formik.touched.recoginze && formik.errors.recoginze
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected>--Select--</option>
                <option value="Uppercase">Uppercase</option>
                <option value="Lowercase">Lowercase</option>
                <option value="Both">Both</option>
                <option value="Same">Same</option>
                <option value="None">None</option>
              </select>
              {formik.touched.recoginze && formik.errors.recoginze && (
                <div className="invalid-feedback">
                  {formik.errors.recoginze}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">Preferred Day / 首选日期</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="PreferredDay"
                  value="Tuesday"
                />
                <label className="form-check-label" for="PreferredDay">
                  Tuesday
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="PreferredDay"
                  value="Wednesday"
                />
                <label className="form-check-label" for="PreferredDay">
                  Wednesday
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="PreferredDay"
                  value="Thursday"
                />
                <label className="form-check-label" for="PreferredDay">
                  Thursday
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="PreferredDay"
                  value="Friday"
                />
                <label className="form-check-label" for="PreferredDay">
                  Friday
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">Preferred Time Slot /首选时间</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="3.30PM"
                  id="PreferredTime "
                />
                <label className="form-check-label" for="PreferredTime">
                  3.30PM
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="5.00PM"
                  id="PreferredTime"
                />
                <label className="form-check-label" for="PreferredTime">
                  5.00PM
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="7.00PM"
                  id="PreferredTime"
                />
                <label className="form-check-label" for="PreferredTime">
                  7.00PM
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">Preferred Day / 首选日期</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="PreferredDay"
                  value="Saturday"
                />
                <label className="form-check-label" for="PreferredDay">
                  Saturday
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="PreferredDay"
                  value="Sunday"
                />
                <label className="form-check-label" for="PreferredDay">
                  Sunday
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">Preferred Time Slot /首选时间</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="9AM - 12NN"
                  id="PreferredTime "
                />
                <label className="form-check-label" for="PreferredTime">
                  9AM - 12NN
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="12NN - 3PM"
                  id="PreferredTime"
                />
                <label className="form-check-label" for="PreferredTime">
                  12NN - 3PM
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="3PM - 6PM"
                  id="PreferredTime"
                />
                <label className="form-check-label" for="PreferredTime">
                  3PM - 6PM
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Remarks /附注</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="col-12 mb-3">
            <div className="d-flex">
            <input type="checkbox" className="form-check-input mx-2"></input>
            <label className="form-label">
              By submitting this form, I confirm that I agree on releasing the
              above details to Arty Learning./
              本人同意将上述表格资料提供给学校。
            </label>
            </div>
          </div>
          <div className="">
            <button type="submit" className="btn btn-primary mb-4">
              Submit Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LeadForm;
