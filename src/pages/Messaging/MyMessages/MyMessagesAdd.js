import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllStudentsWithIds from "../../List/StudentList";

function MyMessagesAdd({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const validationSchema = yup.object().shape({
    student: yup.string().required("*Student is required"),
    message: yup.string().required("*Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      student: "",
      message: "",
      recipientName: "",
      files: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("object", values);

      const formData = new FormData();
      formData.append("senderName", data.userNames);
      formData.append("senderId", userId);
      formData.append("senderRole", userName);
      formData.append("messageTo", "PARENT");
      formData.append("recipientId", values.student);
      formData.append("recipientName", values.recipientName);
      formData.append("recipientRole", "SMS_PARENT");
      formData.append("message", values.message);
      if(values.files){
        values.files.forEach((file, index) => {
          formData.append(`attachments`, file);
        });
      }

      try {
        const response = await api.post("/sendMessage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          setShow(false)
          onSuccess();
          formik.resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const fetchStudent = async () => {
    try {
      const studentNames = await fetchAllStudentsWithIds();
      setStudentData(studentNames);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStudentChange = (event) => {
    const selectedStudentId = event.target.value;
    formik.setFieldValue("student", selectedStudentId);

    const selectedStudent = studentData.find(
      (student) => student.id === parseInt(selectedStudentId)
    );
    formik.setFieldValue(
      "recipientName",
      selectedStudent ? selectedStudent.studentNames : ""
    );
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllUserList`);
        const roleName = response.data.find((item) => item.id == userId);
        setData(roleName);
      } catch (error) {
        toast.error("Error Fetching Data", error.message);
      }
    };
    getData();
    fetchStudent();
  }, [userId]);

  return (
    <>
      <div className="mb-5 mt-3 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShow}
        >
          Add <i className="bx bx-plus"></i>
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-model-title-vcenter"
        centered
      >
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="headColor">New Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row ">
                <div className="col-md-12 col-12 mb-2">
                  <label>
                    Student<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <select
                      {...formik.getFieldProps("student")}
                      className={`form-select ${
                        formik.touched.student && formik.errors.student
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Default select example"
                      onChange={handleStudentChange}
                    >
                      <option />
                      {studentData &&
                        studentData.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.studentNames}
                          </option>
                        ))}
                    </select>
                    {formik.touched.student && formik.errors.student && (
                      <div className="invalid-feedback">
                        {formik.errors.student}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12 col-12 mb-2">
                  <label>
                    Message<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <textarea
                      {...formik.getFieldProps("message")}
                      className={`form-control  ${
                        formik.touched.message && formik.errors.message
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Default select example"
                    ></textarea>
                    {formik.touched.message && formik.errors.message && (
                      <div className="invalid-feedback">
                        {formik.errors.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12 col-12 mb-2">
                  <label>Attachment</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="file"
                      accept="*"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "files",
                          Array.from(event.target.files)
                        );
                      }}
                      multiple
                    />
                  </div>
                  {formik.touched.files && formik.errors.files && (
                    <small className="text-danger">{formik.errors.files}</small>
                  )}
                  <label className="text-muted">
                    Note : MP4 and Max Size 1 GB.
                  </label>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
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
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default MyMessagesAdd;
