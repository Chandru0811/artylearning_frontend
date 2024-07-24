import React, { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllPackageListByCenter from "../List/PackageListByCenter";
import fetchAllStudentListByCenter from "../List/StudentListByCenter";

const invoiceItemSchema = Yup.object().shape({
  item: Yup.string().required("Item name is required"),
  itemAmount: Yup.number()
    .required("Item amount is required")
    .positive("Item amount must be a positive number"),
  taxType: Yup.string().required("Tax type is required"),
  gstAmount: Yup.number()
    .required("GST amount is required")
    .positive("GST amount must be a positive number"),
  totalAmount: Yup.number()
    .required("Total amount is required")
    .positive("Total amount must be a positive number"),
});

const validationSchema = Yup.object({
  center: Yup.string().required("*Select a Centre"),
  parent: Yup.string().required("*Parent is required"),
  student: Yup.string().required("*Select a Student"),
  course: Yup.string().required("*Select a course"),
  schedule: Yup.string().required("*Select a schedule"),
  invoiceDate: Yup.string().required("*Invoice Date is required"),
  dueDate: Yup.string().required("*Due Date is required"),
  packageId: Yup.string().required("*Package is required"),
  invoicePeriodTo: Yup.string().required("*Invoice Period To is required"),
  invoicePeriodFrom: Yup.string().required("*Invoice Period From is required"),
  receiptAmount: Yup.number()
    .required("*Receipt Amount is required")
    .typeError("*Must be a Number"),
  invoiceItems: Yup.array()
    .of(invoiceItemSchema)
    // .min(1, "At least one invoice item is required")
    .required("Invoice items are required"),
});

export default function InvoiceAdd() {
  const [rows, setRows] = useState([{}]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentID = searchParams.get("studentID");

  console.log("Stdent ID:", studentID);

  const navigate = useNavigate();
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [taxData, setTaxData] = useState([]);

  const fetchTaxData = async () => {
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      center: "",
      parent: "",
      student: "",
      course: "",
      schedule: "",
      noOfLessons: "",
      remark: "",
      invoiceDate: "",
      dueDate: "",
      packageId: null,
      invoicePeriodTo: "",
      invoicePeriodFrom: "",
      receiptAmount: "",
      creditAdviceOffset: "",
      gst: "",
      totalAmount: "",
      invoiceItems: [
        {
          item: "",
          itemAmount: "",
          taxType: "",
          gstAmount: "",
          totalAmount: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        // Prepare the payload to send to the API
        const payload = {
          generateInvoice: {
            centerId: values.center,
            parent: values.parent,
            studentId: values.student,
            courseId: values.course,
            schedule: values.schedule,
            invoiceDate: values.invoiceDate,
            dueDate: values.dueDate,
            packageId: values.packageId,
            noOfLessons: values.noOfLessons,
            invoicePeriodFrom: values.invoicePeriodFrom,
            invoicePeriodTo: values.invoicePeriodTo,
            gst: parseFloat(values.gst), // Ensure numerical values are parsed correctly
            creditAdviceOffset: parseFloat(values.creditAdviceOffset), // Ensure numerical values are parsed correctly
            totalAmount: parseFloat(values.totalAmount), // Ensure numerical values are parsed correctly
            remark: values.remark,
            receiptAmount: parseFloat(values.receiptAmount), // Ensure numerical values are parsed correctly
          },
          invoiceItemsList: values.invoiceItems.map((item) => ({
            item: item.item,
            itemAmount: parseFloat(item.itemAmount), // Ensure numerical values are parsed correctly
            taxType: item.taxType,
            gstAmount: parseFloat(item.gstAmount), // Ensure numerical values are parsed correctly
            totalAmount: parseFloat(item.totalAmount), // Ensure numerical values are parsed correctly
          })),
        };

        // Send the request to the API
        const response = await api.post("/generateInvoice", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/invoice");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while submitting the form"
        );
      } finally {
        setLoadIndicator(false);
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

  const fetchCourses = async (centerId) => {
    try {
      const courseData = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchPackage = async (centerId) => {
    try {
      const packageData = await fetchAllPackageListByCenter(centerId);
      setPackageData(packageData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchStudent = async (centerId) => {
    try {
      const student = await fetchAllStudentListByCenter(centerId);
      setStudentData(student);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCenterChange = (event) => {
    setCourseData(null);
    setPackageData(null);
    setStudentData(null);
    const center = event.target.value;
    formik.setFieldValue("center", center);
    fetchCourses(center); // Fetch courses for the selected center
    fetchPackage(center); // Fetch courses for the selected center
    fetchStudent(center);
  };

  const handleSelectChange = (index, value) => {
    // const selectedTax = taxData.find((tax) => tax.id === value);
    const selectedTax = taxData.find((tax) => tax.id === parseInt(value));
    const gstRate = selectedTax ? selectedTax.rate : 0;
    const itemAmount = formik.values.invoiceItems[index]?.itemAmount || 0;

    // Calculate GST amount
    const gstAmount = (parseFloat(itemAmount) * parseFloat(gstRate)) / 100;
    const validGstAmount = isNaN(gstAmount) ? 0 : gstAmount;

    // Calculate total amount
    const totalAmount = parseFloat(itemAmount) + validGstAmount;
    const validTotalAmount = isNaN(totalAmount) ? 0 : totalAmount;

    // Update rows state
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      taxType: value,
      gstAmount: gstRate,
      totalAmount: validTotalAmount,
    };
    setRows(updatedRows);

    // Update formik values
    formik.setFieldValue(`invoiceItems[${index}].taxType`, value);
    formik.setFieldValue(
      `invoiceItems[${index}].gstAmount`,
      validGstAmount.toFixed(2)
    );
    formik.setFieldValue(
      `invoiceItems[${index}].totalAmount`,
      validTotalAmount.toFixed(2)
    );
  };

  const handleItemAmountChange = (index, value) => {
    const selectedTaxType = formik.values.invoiceItems[index]?.taxType;
    const selectedTax = taxData.find((tax) => tax.taxType === selectedTaxType);
    const gstRate = selectedTax ? selectedTax.rate : 0;
    const itemAmount = parseFloat(value);

    // Calculate GST amount
    const gstAmount = (itemAmount * parseFloat(gstRate)) / 100;
    const validGstAmount = isNaN(gstAmount) ? 0 : gstAmount;

    // Calculate total amount
    const totalAmount = itemAmount + validGstAmount;
    const validTotalAmount = isNaN(totalAmount) ? 0 : totalAmount;

    // Update rows state
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      itemAmount: itemAmount,
      gstAmount: gstRate,
      totalAmount: validTotalAmount,
    };
    setRows(updatedRows);

    // Update formik values
    formik.setFieldValue(`invoiceItems[${index}].itemAmount`, itemAmount);
    formik.setFieldValue(
      `invoiceItems[${index}].gstAmount`,
      validGstAmount.toFixed(2)
    );
    formik.setFieldValue(
      `invoiceItems[${index}].totalAmount`,
      validTotalAmount.toFixed(2)
    );
  };

  useEffect(() => {
    const getData = async () => {
      if (studentID) {
        try {
          const response = await api.get(`/getAllStudentDetails/${studentID}`);
          const studentData = response.data;
          console.log("Student Data:", studentData);

          // Uncomment and update this section if you want to set values in a form
          formik.setValues({
            center: studentData.centerId || "",
            parent: studentData?.studentParentsDetails[0]?.parentName || "",
            student: studentID,
            course: studentData.studentCourseDetailModels[0].courseId,
            packageId: studentData.studentCourseDetailModels[0].packageName,
            schedule: studentData.studentCourseDetailModels[0].batch,
            noOfLessons: studentData.noOfLessons,
            remark: studentData.remark,
            invoiceDate: "",
            dueDate: "",
            invoicePeriodTo: "",
            invoicePeriodFrom: "",
            receiptAmount: "",
            creditAdviceOffset: "",
            gst: "",
            totalAmount: "",
          });
          fetchCourses(studentData.centerId); // Fetch courses for the selected studentData.centerId
          fetchPackage(studentData.centerId); // Fetch courses for the selected center
          fetchStudent(studentData.centerId);
          formik.setFieldValue("center", studentData.centerId);
          formik.setFieldValue("invoiceItems", [
            {
              item: "",
              itemAmount: "",
              taxType: "",
              gstAmount: "",
              totalAmount: "",
            },
          ]);
        } catch (error) {
          console.error("Error fetching Student Data:", error);
          toast.error("Error fetching Student Data");
        }
      }
    };
    getData();
  }, [studentID]);

  useEffect(() => {
    fetchData();
    fetchTaxData();
  }, []);

  const calculateTotalAmount = (itemAmount, gstRate) => {
    const itemAmountValue = parseFloat(itemAmount) || 0;
    if (!itemAmountValue) {
      return {
        gstAmount: "0.00",
        totalAmount: "0.00",
      };
    }

    const gstAmount = itemAmountValue * (parseFloat(gstRate) / 100);
    const totalAmount = itemAmountValue + gstAmount;
    return {
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    };
  };

  useEffect(() => {
    rows.forEach((_, index) => {
      const itemAmount =
        parseFloat(formik.values.invoiceItems[index]?.itemAmount) || 0;

      if (formik.values.invoiceItems[index]?.taxType === "Standard") {
        const { gstAmount, totalAmount } = calculateTotalAmount(itemAmount, 9);
        formik.setFieldValue(`invoiceItems[${index}].gstAmount`, gstAmount);
        formik.setFieldValue(`invoiceItems[${index}].totalAmount`, totalAmount);
      } else if (formik.values.invoiceItems[index]?.taxType === "Non-Taxable") {
        formik.setFieldValue(`invoiceItems[${index}].gstAmount`, "0.00");
        const totalAmount = calculateTotalAmount(itemAmount, 0).totalAmount;
        formik.setFieldValue(`invoiceItems[${index}].totalAmount`, totalAmount);
      }
    });
  }, [formik.values.invoiceItems]);

  useEffect(() => {
    // Calculate total Item Amounts
    const totalItemAmount = formik.values.invoiceItems.reduce(
      (total, item) => total + parseFloat(item.itemAmount || 0),
      0
    );
    formik.setFieldValue("creditAdviceOffset", totalItemAmount.toFixed(2));

    // Calculate total Gst
    const totalGst = formik.values.invoiceItems.reduce(
      (total, item) => total + parseFloat(item.gstAmount || 0),
      0
    );
    formik.setFieldValue("gst", totalGst.toFixed(2));

    // Calculate total Amount
    const totalAmount = formik.values.invoiceItems.reduce(
      (total, item) => total + parseFloat(item.totalAmount || 0),
      0
    );
    formik.setFieldValue("totalAmount", totalAmount.toFixed(2));
  }, [formik.values.invoiceItems]);

  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="container py-3">
          <div className="row mt-3">
            <div className="col-lg-6 col-md-6 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Centre<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("center")}
                  name="center"
                  className={`form-select ${
                    formik.touched.center && formik.errors.center
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={handleCenterChange}
                >
                  <option selected></option>
                  {centerData &&
                    centerData.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.centerNames}
                      </option>
                    ))}
                </select>
                {formik.touched.center && formik.errors.center && (
                  <div className="invalid-feedback">{formik.errors.center}</div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Parent<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("parent")}
                  className={`form-control  ${
                    formik.touched.parent && formik.errors.parent
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                />
                {formik.touched.parent && formik.errors.parent && (
                  <div className="invalid-feedback">{formik.errors.parent}</div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Student<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("student")}
                  className={`form-select ${
                    formik.touched.student && formik.errors.student
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected></option>
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
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Course<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("course")}
                  className={`form-select ${
                    formik.touched.course && formik.errors.course
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected></option>
                  {courseData &&
                    courseData.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseNames}
                      </option>
                    ))}
                </select>
                {formik.touched.course && formik.errors.course && (
                  <div className="invalid-feedback">{formik.errors.course}</div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Schedule<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("schedule")}
                  className={`form-select ${
                    formik.touched.schedule && formik.errors.schedule
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option value=""></option>
                  <option value="2:30 pm">2:30 pm</option>
                  <option value="3:30 pm">3:30 pm</option>
                  <option value="5:00 pm">5:00 pm</option>
                  <option value="7:00 pm">7:00 pm</option>
                </select>
                {formik.touched.schedule && formik.errors.schedule && (
                  <div className="invalid-feedback">
                    {formik.errors.schedule}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Number of Lesson
                </label>
                <br />
                <select
                  name="noOfLessons"
                  {...formik.getFieldProps("noOfLessons")}
                  class="form-select "
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Remarks
                </label>
                <br />
                <textarea
                  {...formik.getFieldProps("remark")}
                  className="form-control "
                  type="text"
                  placeholder="Remarks"
                  style={{
                    height: "7rem",
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Invoice Date<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("invoiceDate")}
                  className={`form-control  ${
                    formik.touched.invoiceDate && formik.errors.invoiceDate
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.invoiceDate && formik.errors.invoiceDate && (
                  <div className="invalid-feedback">
                    {formik.errors.invoiceDate}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Due Date<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("dueDate")}
                  className={`form-control  ${
                    formik.touched.dueDate && formik.errors.dueDate
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.dueDate && formik.errors.dueDate && (
                  <div className="invalid-feedback">
                    {formik.errors.dueDate}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Package<span class="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("packageId")}
                  className={`form-select ${
                    formik.touched.packageId && formik.errors.packageId
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected></option>
                  {packageData &&
                    packageData.map((packages) => (
                      <option key={packages.id} value={packages.id}>
                        {packages.packageNames}
                      </option>
                    ))}
                </select>
                {formik.touched.packageId && formik.errors.packageId && (
                  <div className="invalid-feedback">
                    {formik.errors.packageId}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Invoice Period From<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("invoicePeriodFrom")}
                  {...formik.getFieldProps("invoicePeriodFrom")}
                  className={`form-control  ${
                    formik.touched.invoicePeriodFrom &&
                    formik.errors.invoicePeriodFrom
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.invoicePeriodFrom &&
                  formik.errors.invoicePeriodFrom && (
                    <div className="invalid-feedback">
                      {formik.errors.invoicePeriodFrom}
                    </div>
                  )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Invoice Period To<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("invoicePeriodTo")}
                  className={`form-control  ${
                    formik.touched.invoicePeriodTo &&
                    formik.errors.invoicePeriodTo
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.invoicePeriodTo &&
                  formik.errors.invoicePeriodTo && (
                    <div className="invalid-feedback">
                      {formik.errors.invoicePeriodTo}
                    </div>
                  )}
              </div>

              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Receipt Amount<span class="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("receiptAmount")}
                  className={`form-control  ${
                    formik.touched.receiptAmount && formik.errors.receiptAmount
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  placeholder=""
                />
                {formik.touched.receiptAmount &&
                  formik.errors.receiptAmount && (
                    <div className="text-danger" style={{ fontSize: ".875em" }}>
                      {formik.errors.receiptAmount}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="row mt-5 pt-5 flex-nowrap">
            <div className="col-12">
              <div className="table-responsive table-bordered">
                <table className="table table-light table-nowrap">
                  <thead className="thead-light">
                    <tr>
                      <th>
                        Item<span className="text-danger">*</span>
                      </th>
                      <th>
                        Item Amount (Exc GST)
                        <span className="text-danger">*</span>
                      </th>
                      <th>
                        Tax Type<span className="text-danger">*</span>
                      </th>
                      <th>
                        GST Amount<span className="text-danger">*</span>
                      </th>
                      <th>
                        Total Amount (Inc GST)
                        <span className="text-danger">*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].item`
                            )}
                            className={`form-control ${
                              formik.touched.invoiceItems?.[index]?.item &&
                              formik.errors.invoiceItems?.[index]?.item
                                ? "is-invalid"
                                : ""
                            }`}
                            type="text"
                            style={{ width: "80%" }}
                          />
                          {formik.touched.invoiceItems?.[index]?.item &&
                            formik.errors.invoiceItems?.[index]?.item && (
                              <div className="invalid-feedback">
                                {formik.errors.invoiceItems[index].item}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].itemAmount`
                            )}
                            className={`form-control ${
                              formik.touched.invoiceItems?.[index]
                                ?.itemAmount &&
                              formik.errors.invoiceItems?.[index]?.itemAmount
                                ? "is-invalid"
                                : ""
                            }`}
                            type="number"
                            min={0}
                            style={{ width: "80%" }}
                            onChange={(e) =>
                              handleItemAmountChange(index, e.target.value)
                            }
                          />
                          {formik.touched.invoiceItems?.[index]?.itemAmount &&
                            formik.errors.invoiceItems?.[index]?.itemAmount && (
                              <div className="invalid-feedback">
                                {formik.errors.invoiceItems[index].itemAmount}
                              </div>
                            )}
                        </td>
                        <td>
                          <select
                            className={`form-select ${
                              formik.touched.invoiceItems?.[index]?.taxType &&
                              formik.errors.invoiceItems?.[index]?.taxType
                                ? "is-invalid"
                                : ""
                            }`}
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].taxType`
                            )}
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              handleSelectChange(index, e.target.value)
                            }
                          >
                            <option value=""></option>
                            {taxData &&
                              taxData.map((tax) => (
                                <option key={tax.id} value={tax.id}>
                                  {tax.taxType}
                                </option>
                              ))}
                          </select>
                          {formik.touched.invoiceItems?.[index]?.taxType &&
                            formik.errors.invoiceItems?.[index]?.taxType && (
                              <div className="invalid-feedback">
                                {formik.errors.invoiceItems[index].taxType}
                              </div>
                            )}
                        </td>
                        <td>
                          <input
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].gstAmount`
                            )}
                            className="form-control"
                            type="text"
                            style={{ width: "80%" }}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            {...formik.getFieldProps(
                              `invoiceItems[${index}].totalAmount`
                            )}
                            className="form-control"
                            type="text"
                            style={{ width: "80%" }}
                            readOnly
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 text-end mt-3">
              {rows.length > 1 && (
                <button
                  type="button"
                  className="btn btn-sm mx-2 text-danger border-danger bg-white"
                  onClick={() => {
                    setRows((pr) => pr.slice(0, -1));
                    formik.setFieldValue(
                      "invoiceItems",
                      formik.values.invoiceItems.slice(0, -1)
                    );
                  }}
                >
                  Delete
                </button>
              )}
              <button
                className="btn btn-sm btn-danger me-2"
                type="button"
                onClick={() => {
                  setRows((pr) => [...pr, {}]);
                }}
              >
                Add Row
              </button>
            </div>
            <div className="col-lg-6 col-md-6 col-12"></div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="">
                <div className="text-start mt-3">
                  <label htmlFor="" className="mb-1 fw-medium">
                    Credit Advise Offset
                  </label>
                  <br />
                  <input
                    {...formik.getFieldProps("creditAdviceOffset")}
                    className="form-control"
                    type="text"
                    placeholder=""
                    readOnly
                  />
                </div>
                <div className="text-start mt-3">
                  <label htmlFor="" className="mb-1 fw-medium">
                    GST Amount
                  </label>
                  <br />
                  <input
                    {...formik.getFieldProps("gst")}
                    className="form-control  "
                    type="text"
                    placeholder=""
                    readOnly
                  />
                </div>
                <div className="text-start mt-3">
                  <label htmlFor="" className="mb-1 fw-medium">
                    Total Amount
                  </label>
                  <br />
                  <input
                    {...formik.getFieldProps("totalAmount")}
                    className="form-control  "
                    type="text"
                    placeholder=""
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="col-12 text-end  mt-3">
              <Link to="/invoice">
                <button className="btn btn-sm btn-border mx-2">Cancel</button>
              </Link>
              <button
                type="submit"
                className="btn btn-sm btn-button mx-2"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Generate
              </button>

              {/* <button type="submit" className="btn btn-sm btn-button mx-2">
                Generate
              </button> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
