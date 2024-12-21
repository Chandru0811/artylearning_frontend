import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithCenterIds from "../List/CourseListByCenterIdS";
import fetchAllClassByCourseIds from "../List/ClassListByCourseIdS";
import { MultiSelect } from "react-multi-select-component";
import AttactmentPdf from "../../assets/images/Attactmentpdf.jpg";
import AttactmentExcel from "../../assets/images/AttactmentExcel.jpg";
import AttactmentOther from "../../assets/images/Attactmentothers.jpg";
import AttactmentWord from "../../assets/images/AttactmentWord.jpg";
import AttactmentPpt from "../../assets/images/AttachmentPpt.png";
import { IoMdDownload } from "react-icons/io";

const validationSchema = Yup.object({
  recipient: Yup.string().required("*Recipient Name is required"),
  messageTitle: Yup.string().required("*Title is required"),
  centerIds: Yup.array().min(1, "At least one center must be selected"),
  courseIds: Yup.array().min(1, "At least one course must be selected"),
  classIds: Yup.array().min(1, "At least one class must be selected"),
  days: Yup.string().required("*Day is required"),
  // attachments: Yup.string().required("*Photo is required"),
});

function SendNotificationEdit() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const userName = localStorage.getItem("userName");

  const centerOptions = centerData.map((center) => ({
    label: center.centerNames,
    value: center.id,
  }));
  const courseOptions = courseData.map((course) => ({
    label: course.courseName,
    value: course.courseId,
  }));
  const classOptions = classData.map((classes) => ({
    label: classes.className,
    value: classes.classId,
  }));
  console.log("centerdta", centerData);

  useEffect(() => {
    fetchAllCentersWithIds()
      .then(setCenterData)
      .catch((error) => toast.error(error.message));
  }, []);

  useEffect(() => {
    if (selectedCenters.length > 0) {
      const centerIds = selectedCenters.map((option) => option.value);
      fetchAllCoursesWithCenterIds(centerIds)
        .then(setCourseData)
        .catch((error) => toast.error(error.message));
    } else {
      setCourseData([]);
    }
  }, [selectedCenters]);

  useEffect(() => {
    if (selectedCourses.length > 0) {
      const courseIds = selectedCourses.map((option) => option.value);
      fetchAllClassByCourseIds(courseIds)
        .then(setClassData)
        .catch((error) => toast.error(error.message));
    } else {
      setClassData([]);
    }
  }, [selectedCourses]);

  const renderAttachment = (attachment) => {
    if (!attachment || !attachment.fileUrl) {
      return <span>No attachment available</span>;
    }
    // console.log("firstAttachment", attachment)
    const url = attachment.fileUrl;
    const extension = url.split(".").pop().toLowerCase();
    const fileName = url.split("/").pop();

    const downloadFile = () => {
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    // const deletedId = data.smsPushNotificationAttachments[0]?.id;

    const renderCard = (src, label, attachmentId, isVideo = false) => (
      <div className="position-relative d-flex align-items-center mb-3">
        <div className="card" style={{ width: "18rem", marginTop: "20px" }}>
          {isVideo ? (
            <video
              width="100%"
              height="auto"
              controls
              style={{ maxHeight: "150px" }}
            >
              <source src={src} type="video/mp4" />
              <source src={src} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={src}
              alt={label}
              style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
            />
          )}
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 col-12 text-end">
                <p>{fileName}</p>
              </div>
              <div className="col-md-4 col-12 text-end">
                <p>
                  <IoMdDownload
                    onClick={downloadFile}
                    style={{ cursor: "pointer" }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="delete-icon-container"
          style={{ marginLeft: "10px", marginBottom: "8rem" }}
        >
          <Delete path={`/deleteSmsPushNotifications/${deletedId}`} id={attachmentId} onSuccess={getData} />
          <Delete id={attachmentId} onSuccess={getData} />
        </div> */}
      </div>
    );

    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return renderCard(url, "Image", attachment.id);
      case "pdf":
        return renderCard(AttactmentPdf, "PDF", attachment.id);
      case "xls":
      case "xlsx":
      case "csv":
        return renderCard(AttactmentExcel, "Excel", attachment.id);
      case "mp4":
      case "ogg":
        return renderCard(url, "Video", attachment.id, true);
      case "doc":
      case "docx":
        return renderCard(AttactmentWord, "Word", attachment.id);
      case "ppt":
      case "pptx":
        return renderCard(AttactmentPpt, "PPT", attachment.id);
      default:
        return renderCard(AttactmentOther, "Other", attachment.id);
    }
  };

  const formik = useFormik({
    initialValues: {
      recipient: "",
      messageTitle: "",
      centerIds: [],
      courseIds: [],
      classIds: [],
      days: "",
      messageDescription: "",
      attachments: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Send Norification Data:", values);
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("recipient", values.recipient);
      formData.append("messageTitle", values.messageTitle);
      formData.append("centerIds", values.centerIds);
      formData.append("courseIds", values.courseIds);
      formData.append("classIds", values.classIds);
      formData.append("days", values.days);
      formData.append("messageDescription", values.messageDescription);
      // formData.append("attachments", values.attachments);
      formData.append("updatedBy", userName);

      // Append files to formData if available
      if (values.attachments && values.attachments.length > 0) {
        values.attachments.forEach((file) => {
          formData.append("attachments", file);
        });
      }

      try {
        const response = await api.put(
          `/updateSmsPushNotifications/${id}`,
          formData
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/sendNotification");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("Duplicate Error:", error);
        if (error.response.status === 409) {
          toast.warning("Already Sent!");
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllSmsPushNotificationsById/${id}`);
        const announcementData = response.data;

        // Transform the data for MultiSelect components
        const transformedCenterIds = announcementData.centerIds.map(
          (center) => ({ label: center.centerName, value: center.centerId })
        );
        const transformedCourseIds = announcementData.courseIds.map(
          (course) => ({ label: course.courseName, value: course.courseId })
        );
        const transformedClassIds = announcementData.classIds.map((cls) => ({
          label: cls.className,
          value: cls.classId,
        }));

        // Set the form values
        formik.setValues({
          recipient: announcementData.recipient,
          messageTitle: announcementData.messageTitle,
          centerIds: transformedCenterIds.map((option) => option.value),
          courseIds: transformedCourseIds.map((option) => option.value),
          classIds: transformedClassIds.map((option) => option.value),
          days: announcementData.days,
          messageDescription: announcementData.messageDescription,
          attachments: announcementData.attachments || "",
        });

        // Set the selected options for MultiSelect components
        setSelectedCenters(transformedCenterIds);
        setSelectedCourses(transformedCourseIds);
        setSelectedClasses(transformedClassIds);
        setData(announcementData);
      } catch (error) {
        toast.error("Error fetching data:", error.message);
      }
    };
    getData();
  }, []); // Ensure that classData is available before mapping classes

  return (
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Messaging
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/sendNotification" className="custom-breadcrumb">
            School Announcement
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          School Announcement Edit
        </li>
      </ol>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="card">
          <div
            className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
            style={{ background: "#f5f7f9" }}
          >
            <div class="d-flex align-items-center">
              <div class="d-flex">
                <div class="dot active"></div>
              </div>
              <span class="me-2 text-muted">School Announcement Edit</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/sendNotification">
                <button type="button " className="btn btn-sm btn-border   ">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
                type="submit"
                className="btn btn-button btn-sm"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Update
              </button>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row ">
              <div class="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Recipient<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("recipient")}
                  className={`form-select  ${
                    formik.touched.recipient && formik.errors.recipient
                      ? "is-invalid"
                      : ""
                  }`}
                  name="recipient"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recipient}
                >
                  <option selected value="ALL">
                    All
                  </option>
                  <option value="PARENTS">Parents</option>
                  <option value="TEACHERS">Teachers</option>
                </select>
                {formik.touched.recipient && formik.errors.recipient && (
                  <div className="invalid-feedback">
                    {formik.errors.recipient}
                  </div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Title<span class="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("messageTitle")}
                  className={`form-control  ${
                    formik.touched.messageTitle && formik.errors.messageTitle
                      ? "is-invalid"
                      : ""
                  }`}
                  name="messageTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.messageTitle}
                ></input>
                {formik.touched.messageTitle && formik.errors.messageTitle && (
                  <div className="invalid-feedback">
                    {formik.errors.messageTitle}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Centre<span className="text-danger">*</span>
                </label>
                {centerOptions.length > 0 && (
                  <MultiSelect
                    options={centerOptions}
                    value={selectedCenters}
                    onChange={(selected) => {
                      setSelectedCenters(selected);
                      formik.setFieldValue(
                        "centerIds",
                        selected.map((option) => option.value)
                      );
                    }}
                    labelledBy="Select Centers"
                    className={`form-multi-select ${
                      formik.touched.centerIds && formik.errors.centerIds
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                )}
                {formik.touched.centerIds && formik.errors.centerIds && (
                  <div className="invalid-feedback">
                    {formik.errors.centerIds}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Course<span className="text-danger">*</span>
                </label>
                <MultiSelect
                  options={courseOptions}
                  value={selectedCourses}
                  onChange={(selected) => {
                    setSelectedCourses(selected);
                    formik.setFieldValue(
                      "courseIds",
                      selected.map((option) => option.value)
                    );
                  }}
                  labelledBy="Select Courses"
                  className={`form-multi-select ${
                    formik.touched.courseIds && formik.errors.courseIds
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.courseIds && formik.errors.courseIds && (
                  <div className="invalid-feedback">
                    {formik.errors.courseIds}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Class<span className="text-danger">*</span>
                </label>
                <MultiSelect
                  options={classOptions}
                  value={selectedClasses}
                  onChange={(selected) => {
                    setSelectedClasses(selected);
                    formik.setFieldValue(
                      "classIds",
                      selected.map((option) => option.value)
                    );
                  }}
                  labelledBy="Select Classes"
                  className={`form-multi-select ${
                    formik.touched.classIds && formik.errors.classIds
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.classIds && formik.errors.classIds && (
                  <div className="invalid-feedback">
                    {formik.errors.classIds}
                  </div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Day<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("days")}
                  name="days"
                  className={`form-select   ${
                    formik.touched.days && formik.errors.days
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  class="form-select "
                >
                  <option selected></option>
                  <option value="SUNDAY">Sunday</option>
                  <option value="MONDAY">Monday</option>
                  <option value="TUESDAY">Tuesday</option>
                  <option value="WEDNESDAY">Wednesday</option>
                  <option value="THURSDAY">Thursday</option>
                  <option value="FRIDAY">Friday</option>
                  <option value="SATURDAY">Saturday</option>
                </select>
                {formik.touched.days && formik.errors.days && (
                  <div className="invalid-feedback">{formik.errors.days}</div>
                )}
              </div>

              {/* <div class="col-md-6 col-12 mb-4">
              <label className="form-label">Attachement</label>

              <input
                type="file"
                multiple
                name="attachments"
                className={`form-control  ${formik.touched.attachments && formik.errors.attachments
                  ? "is-invalid"
                  : ""
                  }`}
                onChange={(event) => {
                  formik.setFieldValue("attachments", event.target.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.attachments && formik.errors.attachments && (
                <div className="invalid-feedback">{formik.errors.attachments}</div>
              )}
            </div> */}

              <div className="col-md-6 col-12 mb-4">
                <label className="form-label">Attachments</label>
                <input
                  type="file"
                  className={`form-control ${
                    formik.touched.attachments && formik.errors.attachments
                      ? "is-invalid"
                      : ""
                  }`}
                  multiple
                  onChange={(event) => {
                    const files = Array.from(event.currentTarget.files);
                    formik.setFieldValue("attachments", files);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.attachments && formik.errors.attachments && (
                  <div className="invalid-feedback">
                    {formik.errors.attachments}
                  </div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-4">
                <label className="form-label">Description</label>
                <textarea
                  name="messageDescription"
                  class="form-control "
                  row="5"
                  type="text"
                  className={`form-control  ${
                    formik.touched.messageDescription &&
                    formik.errors.messageDescription
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    height: "7rem",
                  }}
                  {...formik.getFieldProps("messageDescription")}
                />
                {formik.touched.messageDescription &&
                  formik.errors.messageDescription && (
                    <div className="invalid-feedback">
                      {formik.errors.messageDescription}
                    </div>
                  )}
              </div>

              <div className="col-12">
                <div className="row mb-2">
                  <div className="col-12">
                    <p className="fw-medium">Attachments &nbsp; : &nbsp;</p>
                  </div>
                  {data.attachments && data.attachments.length > 0 ? (
                    <div className="row">
                      {data.attachments.map((attachment, index) => (
                        <div key={index} className="col-md-6 col-12 mb-2">
                          {renderAttachment(attachment)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No attachments available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendNotificationEdit;
