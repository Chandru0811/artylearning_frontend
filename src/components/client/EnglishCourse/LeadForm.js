import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../../pages/List/CenterList";
import { useSearchParams } from "react-router-dom";
import fetchAllStudentListByCenterWOT from "../../../pages/List/StudentListByCenterWithoutToken";

const validationSchema = Yup.object().shape({
  centerId: Yup.string().required("*Centre name is required"),
  studentName: Yup.string().required("*Child name is required"),
  gender: Yup.string().required("*Select a gender"),
  dateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      "*Date of Birth must be at least 1 year ago"
    ),
  pencilGrip: Yup.string().required("*Pencil Grip is required"),
  subjectId: Yup.string().required("*Subject is required"),
  marketingSource: Yup.string().required("*Marketing Source is required"),
  // referBy: Yup.string().required("*Referred is required"),
  writeUpperAToZ: Yup.string().required("*UpperCase is required"),
  writeLowerAToZ: Yup.string().required("*LowerCase is required"),
  soundOfAToZ: Yup.string().required("*Sounds is required"),
  canReadSimpleSentence: Yup.string().required("*Simple Sentence is required"),
  fathersFullName: Yup.string().required("*Parent Name is required"),
  fathersEmailAddress: Yup.string()
    .email("*Enter valid email")
    .required("*Email is required"),
  // fathersMobileNumber: Yup.string()
  //   .typeError("Contact Number must be a number")
  //   .required("Contact Number is required")
  //   .test("is-number", "Please enter a valid number", (value) => !isNaN(value))
  //   .test("is-integer", "Contact Number must be an integer", (value) =>
  //     Number.isInteger(parseFloat(value))
  //   ),
  fathersMobileNumber: Yup.string()
    .required("*Contact Number is required")
    .test("*is-valid-number", "*Invalid contact number", function (value) {
      const { parentMobileNumberPrefix } = this.parent;
      if (parentMobileNumberPrefix === "+65") {
        // Singapore numbers should be exactly 8 digits
        return /^[0-9]{8}$/.test(value);
      }
      if (parentMobileNumberPrefix === "+91") {
        // Indian numbers should be exactly 10 digits
        return /^[0-9]{10}$/.test(value);
      }
      return true;
    }),
  relation: Yup.string().required("*Relation is required"),
  writing: Yup.string().required("*Writing is required"),
  recognizeAToZ: Yup.string().required("*Recognize is required"),
});

function LeadForm({Id}) {
  const [centerData, setCenterData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  console.log("subjectData::",subjectData);
  
  const [studentData, setStudentData] = useState(null);
  console.log("ID:",Id);

  const formik = useFormik({
    initialValues: {
      centerId: "",
      studentName: "",
      gender: "",
      dateOfBirth: "",
      pencilGrip: "",
      subjectId:"",
      marketingSource: "",
      referBy: "",
      writeUpperAToZ: "",
      writeLowerAToZ: "",
      soundOfAToZ: "",
      canReadSimpleSentence: "",
      fathersEmailAddress: "",
      fathersFullName: "",
      relation: "",
      parentMobileNumberPrefix: "",
      fathersMobileNumber: "",
      writing: "",
      recognizeAToZ: "",
      preferredDay: [],
      preferredTime: [],
      preferredTimeSlot: [],
      remark: "",
      agreeCondition:[],
      leadStatus: "NEW_WAITLIST" || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      console.log(data);
      const uppercase = data.writeUpperAToZ === "Yes" ? true : false;
      const lowercase = data.writeLowerAToZ === "Yes" ? true : false;
      const sound = data.soundOfAToZ === "Yes" ? true : false;
      const readSentence = data.canReadSimpleSentence === "Yes" ? true : false;

      const createData = {
        ...data,
        writeUpperAToZ: uppercase,
        writeLowerAToZ: lowercase,
        soundOfAToZ: sound,
        canReadSimpleSentence: readSentence,
      };
      try {
        const response = await api.post("/createLeadInfo", createData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          formik.resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCenterChange = (event) => {
    setStudentData(null);
    const center = event.target.value;
    formik.setFieldValue("centerId", center);
    fetchStudent(center);
  };

  useEffect(() => {
    const fetchAllSubjectsList = async () => {
      try {
        const response = await api.get("getAllSubjectWithoutToken");
        setSubjectData(response.data);
  
        // Find matching subject by ID with type conversion
        const matchingSubject = response.data.find(
          (subject) => String(subject.id) === String(Id) // Ensure both are strings
        );
        console.log("Matching Subject:", matchingSubject);
  
        // Update the subjectId field in the form
        if (matchingSubject) {
          formik.setFieldValue("subjectId", matchingSubject.id); // Set default subject ID
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
  
    fetchAllSubjectsList();
  }, [Id]);
  const fetchStudent = async (centerId) => {
    try {
      const student = await fetchAllStudentListByCenterWOT(centerId);
      setStudentData(student);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    formik.setFieldValue("parentMobileNumberPrefix","65")
    fetchData();
  }, []);

  return (
    <div className="container">
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="row headbody">
          <h1 className="form-font mb-3">Waitlist Request Form</h1>
          <div className="col-md-6 col-12 mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Centre / 中心 <span className="text-danger">*</span>
            </label>
            <select
              {...formik.getFieldProps("centerId")}
              className={`form-select    ${
                formik.touched.centerId && formik.errors.centerId
                  ? "is-invalid"
                  : ""
              }`}
              onChange={handleCenterChange}

            >
              <option selected>--Select--</option>
              {centerData &&
                centerData.map((centerId) => (
                  <option key={centerId.id} value={centerId.id}>
                    {centerId.centerNames}
                  </option>
                ))}
            </select>
            {formik.touched.centerId && formik.errors.centerId && (
              <div className="invalid-feedback">{formik.errors.centerId}</div>
            )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Child's Name / 孩子名字 <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control  ${
                  formik.touched.studentName && formik.errors.studentName
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...formik.getFieldProps("studentName")}
                type="text"
              />
              {formik.touched.studentName && formik.errors.studentName && (
                <div className="invalid-feedback">
                  {formik.errors.studentName}
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
                id="Male"
                value="Male"
                onChange={formik.handleChange}
                checked={formik.values.gender === "Male"}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="Female"
                value="Female"
                onChange={formik.handleChange}
                checked={formik.values.gender === "Female"}
              />
              <label className="form-check-label">Female</label>
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
                {...formik.getFieldProps("dateOfBirth")}
                name="dateOfBirth"
                type="date"
                className={`form-control   ${
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className="invalid-feedback">
                  {formik.errors.dateOfBirth}
                </div>
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
                <option value="Steady">Steady / 稳握</option>
                <option value="Loose">Loose / 松握</option>
                {/* <option value="Unable">Unable / 不能握</option> */}
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
                {...formik.getFieldProps("subjectId")}
                className={`form-select    ${
                  formik.touched.subjectId && formik.errors.subjectId
                    ? "is-invalid"
                    : ""
                }`}
              >
                <option value="" selected>--Select--</option>
                {subjectData &&
                  subjectData.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.subjects}
                    </option>
                  ))}
              </select>
              {formik.touched.subjectId && formik.errors.subjectId && (
                <div className="invalid-feedback">{formik.errors.subjectId}</div>
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
                {...formik.getFieldProps("marketingSource")}
                className={`form-select    ${
                  formik.touched.marketingSource &&
                  formik.errors.marketingSource
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
              {formik.touched.marketingSource &&
                formik.errors.marketingSource && (
                  <div className="invalid-feedback">
                    {formik.errors.marketingSource}
                  </div>
                )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <label for="exampleFormControlInput1" className="form-label">
                Referred by / 介绍人 
              </label>
              <input
                type="text"
                name="referBy"
                className={`form-control  ${
                  formik.touched.referBy && formik.errors.referBy
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("referBy")}
              />
               {/* <select
                  {...formik.getFieldProps("referBy")}
                  className={`form-select ${
                    formik.touched.referBy && formik.errors.referBy
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected></option>
                  {studentData &&
                    studentData.map((referBy) => (
                      <option key={referBy.id} value={referBy.id}>
                        {referBy.studentNames}
                      </option>
                    ))}
                </select> */}
              {formik.touched.referBy && formik.errors.referBy && (
                <div className="invalid-feedback">{formik.errors.referBy}</div>
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
                name="writeUpperAToZ"
                id="Yes"
                value="Yes"
                onChange={formik.handleChange}
                checked={formik.values.writeUpperAToZ === "Yes"}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="writeUpperAToZ"
                id="No"
                value="No"
                onChange={formik.handleChange}
                checked={formik.values.writeUpperAToZ === "No"}
              />
              <label className="form-check-label">No</label>
            </div>
            {formik.errors.writeUpperAToZ && formik.touched.writeUpperAToZ && (
              <div className="text-danger  " style={{ fontSize: ".875em" }}>
                {formik.errors.writeUpperAToZ}
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
                name="writeLowerAToZ"
                id="Yes"
                value="Yes"
                onChange={formik.handleChange}
                checked={formik.values.writeLowerAToZ === "Yes"}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="writeLowerAToZ"
                id="No"
                value="No"
                onChange={formik.handleChange}
                checked={formik.values.writeLowerAToZ === "No"}
              />
              <label className="form-check-label">No</label>
            </div>
            {formik.errors.writeLowerAToZ && formik.touched.writeLowerAToZ && (
              <div className="text-danger  " style={{ fontSize: ".875em" }}>
                {formik.errors.writeLowerAToZ}
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
                name="soundOfAToZ"
                id="Yes"
                value="Yes"
                onChange={formik.handleChange}
                checked={formik.values.soundOfAToZ === "Yes"}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="soundOfAToZ"
                id="No"
                value="No"
                onChange={formik.handleChange}
                checked={formik.values.soundOfAToZ === "No"}
              />
              <label className="form-check-label">No</label>
            </div>
            {formik.errors.soundOfAToZ && formik.touched.soundOfAToZ && (
              <div className="text-danger" style={{ fontSize: ".875em" }}>
                {formik.errors.soundOfAToZ}
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
                name="canReadSimpleSentence"
                id="Yes"
                value="Yes"
                onChange={formik.handleChange}
                checked={formik.values.canReadSimpleSentence === "Yes"}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="canReadSimpleSentence"
                id="No"
                value="No"
                onChange={formik.handleChange}
                checked={formik.values.canReadSimpleSentence === "No"}
              />
              <label className="form-check-label">No</label>
            </div>
            {formik.errors.canReadSimpleSentence &&
              formik.touched.canReadSimpleSentence && (
                <div className="text-danger" style={{ fontSize: ".875em" }}>
                  {formik.errors.canReadSimpleSentence}
                </div>
              )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">
              Parent Name / 父母姓名 <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control  ${
                formik.touched.fathersFullName && formik.errors.fathersFullName
                  ? "is-invalid"
                  : ""
              }`}
              name="fathersFullName"
              aria-label="Username"
              aria-describedby="basic-addon1"
              {...formik.getFieldProps("fathersFullName")}
              type="text"
            ></input>
            {formik.touched.fathersFullName &&
              formik.errors.fathersFullName && (
                <div className="invalid-feedback">
                  {formik.errors.fathersFullName}
                </div>
              )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">
              Email / 邮箱地址 <span className="text-danger">*</span>
            </label>
            <input
              {...formik.getFieldProps("fathersEmailAddress")}
              type="email"
              className={`form-control   ${
                formik.touched.fathersEmailAddress &&
                formik.errors.fathersEmailAddress
                  ? "is-invalid"
                  : ""
              }`}
              name="fathersEmailAddress"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
            {formik.touched.fathersEmailAddress &&
              formik.errors.fathersEmailAddress && (
                <div className="invalid-feedback">
                  {formik.errors.fathersEmailAddress}
                </div>
              )}
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">
              Contact Number / 联络号 <span className="text-danger">*</span>
            </label>
            <div className="input-group mb-3">
              <div
                className="input-group-text bg-white"
                style={{ padding: "0px" }}
              >
                <select
                  {...formik.getFieldProps("parentMobileNumberPrefix")}
                  
                  className="form-select"
                  aria-label="Default select example"
                  style={{ border: "none" }}
                >
                  <option value="91">+91</option>
                  <option value="65">+65</option>
                </select>
              </div>
              <input
                type="text"
                name="fathersMobileNumber"
                className={`form-control ${
                  formik.touched.fathersMobileNumber &&
                  formik.errors.fathersMobileNumber
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Text input with checkbox"
                {...formik.getFieldProps("fathersMobileNumber")}
              />
              {formik.touched.fathersMobileNumber &&
                formik.errors.fathersMobileNumber && (
                  <div className="invalid-feedback">
                    {formik.errors.fathersMobileNumber}
                  </div>
                )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-label">
              Relation / 关系 <span className="text-danger">*</span>
            </label>
            {/* <input
              className={`form-control  ${formik.touched.relation && formik.errors.relation
                ? "is-invalid"
                : ""
                }`}
              name="relation"
              aria-label="Username"
              aria-describedby="basic-addon1"
              {...formik.getFieldProps("relation")}
              type="text"
            ></input> */}
            <select
              {...formik.getFieldProps("relation")}
              className={`form-select    ${
                formik.touched.relation && formik.errors.relation
                  ? "is-invalid"
                  : ""
              }`}
              aria-label="Default select example"
            >
              <option selected>--Select--</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Grandparents">Grandparents</option>
              <option value="Helper">Helper</option>
              <option value="Others">Others</option>
            </select>
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
                name="writing"
                aria-label="Default select example"
              >
                <option selected>--Select--</option>
                <option value="Straight & Firm Lines">
                  Straight & Firm Lines / 书写工整
                </option>
                <option value="Crooked & Light Lines">
                  Crooked & Light Lines / 书写扭曲或轻盈
                </option>
                <option value="Scribbles">Scribbles / 涂鸦</option>
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
                {...formik.getFieldProps("recognizeAToZ")}
                className={`form-select    ${
                  formik.touched.recognizeAToZ && formik.errors.recognizeAToZ
                    ? "is-invalid"
                    : ""
                }`}
                name="recognizeAToZ"
                aria-label="Default select example"
              >
                <option selected>--Select--</option>
                <option value="Uppercase">Uppercase</option>
                <option value="Lowercase">Lowercase</option>
                <option value="Both">Both</option>
                <option value="Some">Some</option>
                <option value="None">None</option>
              </select>
              {formik.touched.recognizeAToZ && formik.errors.recognizeAToZ && (
                <div className="invalid-feedback">
                  {formik.errors.recognizeAToZ}
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
                  id="TUESDAY"
                  name="preferredDay"
                  value="TUESDAY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredDay.includes("TUESDAY")}
                />
                <label className="form-check-label">Tuesday</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="WEDNESDAY"
                  name="preferredDay"
                  value="WEDNESDAY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredDay.includes("WEDNESDAY")}
                />
                <label className="form-check-label">Wednesday</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="THURSDAY"
                  name="preferredDay"
                  value="THURSDAY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredDay.includes("THURSDAY")}
                />
                <label className="form-check-label">Thursday</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="FRIDAY"
                  name="preferredDay"
                  value="FRIDAY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredDay.includes("FRIDAY")}
                />
                <label className="form-check-label">Friday</label>
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
                  id="3.30PM"
                  name="preferredTimeSlot"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredTimeSlot.includes("3.30PM")}
                />
                <label className="form-check-label">3.30PM</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="5.00PM"
                  id="5.00PM"
                  name="preferredTimeSlot"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredTimeSlot.includes("5.00PM")}
                />
                <label className="form-check-label">5.00PM</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="7.00PM"
                  id="7.00PM"
                  name="preferredTimeSlot"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredTimeSlot.includes("7.00PM")}
                />
                <label className="form-check-label">7.00PM</label>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="SATURDAY"
                  name="preferredDay"
                  value="SATURDAY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredDay.includes("SATURDAY")}
                />
                <label className="form-check-label">Saturday</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="SUNDAY"
                  name="preferredDay"
                  value="SUNDAY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredDay.includes("SUNDAY")}
                />
                <label className="form-check-label">Sunday</label>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-3">
            {/* <label className="form-label">Preferred Time Slot /首选时间</label> */}
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="9AM - 12NN"
                  id="9AM - 12NN"
                  name="preferredTimeSlot"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredTimeSlot.includes(
                    "9AM - 12NN"
                  )}
                />
                <label className="form-check-label">9AM - 12NN</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="12NN - 3PM"
                  id="12NN - 3PM"
                  name="preferredTimeSlot"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredTimeSlot.includes(
                    "12NN - 3PM"
                  )}
                />
                <label className="form-check-label">12NN - 3PM</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="3PM - 6PM"
                  id="3PM - 6PM"
                  name="preferredTimeSlot"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.preferredTimeSlot.includes(
                    "3PM - 6PM"
                  )}
                />
                <label className="form-check-label">3PM - 6PM</label>
              </div>
            </div>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Remarks /附注</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="remark"
              {...formik.getFieldProps("remark")}
            ></textarea>
          </div>
          <div className="col-12 mb-3">
            <div className="d-flex">
              <input
                type="checkbox"
                name="agreeCondition"
                className="form-check-input mx-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value="agreeCondition"
                checked={formik.values.agreeCondition.includes("agreeCondition")}
              />
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
