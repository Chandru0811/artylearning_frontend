import React, { useEffect } from "react";
import {
  Link,
  useAsyncError,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
    .min(0, "GST amount must be a positive number or zero"),

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
    remark: Yup.string()
    .max(200, "*The maximum length is 200 characters").required("*Only 200 Letters"),
});

export default function InvoiceAdd() {
  const [rows, setRows] = useState([{}]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentID = searchParams.get("studentID");
  const lessonOptions = [];
  for (let i = 1; i <= 50; i++) {
    lessonOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const navigate = useNavigate();
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [taxData, setTaxData] = useState([]);
  const userName  = localStorage.getItem('userName');

  // const [isLoading, setIsLoading] = useState(true);

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
            createdBy: userName,

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

  const fetchTaxData = async () => {
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
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

  const handleStudentChange = (event) => {
    console.log("Event", event);
    formik.setFieldValue("student", event);
  };

  useEffect(() => {
    fetchData();
    fetchTaxData();
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      console.log("Formik student name", formik.values.student);
      console.log("Tax", taxData);
      console.log("Course", courseData);
      if (!formik.values.student) return;

      try {
        const response = await api.get(
          `/getAllStudentById/${formik.values.student}`
        );
        const studentCourseDetails = response.data.studentCourseDetailModels[0];
        const centerId = studentCourseDetails?.centerId;
        const courseId = studentCourseDetails?.courseId;
        const packageId = studentCourseDetails?.packageName;
        const studentData = response.data;
        let invoiceItems = [];

        if (centerId) {
          try {
            const response1 = await api.get(
              `/getLatestCenterRegistrationByCenterId/${centerId}`
            );
            console.log("Response 1:", response1.data);

            const selectedTax = taxData.find(
              (tax) => parseInt(response1.data.taxType) === tax.id
            );
            const gstRate = selectedTax ? selectedTax.rate : 0;
            const amount = response1.data.amount || 0;
            const gstAmount = (amount * gstRate) / 100 || 0;
            const amountBeforeGST = amount - gstAmount || 0;

            invoiceItems.push({
              item: "Registration Fee",
              itemAmount: isNaN(amountBeforeGST) ? 0 : amountBeforeGST,
              taxType: response1.data.taxType || "",
              gstAmount: isNaN(gstAmount) ? 0 : gstAmount,
              totalAmount: isNaN(amount) ? 0 : amount,
            });
          } catch (error) {
            console.error("Error fetching center registration:", error);
          }
        } else {
          console.error("Center ID not found");
        }

        if (courseId && packageId) {
          try {
            const response2 = await api.get(
              `/getActiveCourseFeesByPackageIdAndCourseId?packageId=${packageId}&courseId=${courseId}`
            );
            console.log("Response 2:", response2.data.taxType);

            const selectedTax = taxData.find(
              (tax) => parseInt(response2.data.taxType) === tax.id
            );
            console.log("selectedTax:", selectedTax);
            const selectedCourse = courseData.find(
              (course) => parseInt(response2.data.courseId) === course.id
            );
            console.log("selectedCourse:", selectedCourse);

            const itemsName = selectedCourse ? selectedCourse.courseNames : "";
            console.log("itemsName:", itemsName);
            const gstRate = selectedTax ? selectedTax.rate : 0;
            console.log("gstRate:", gstRate);
            const amount = response2.data.weekdayFee || 0;
            console.log("amount:", amount);
            const gstAmount = (amount * gstRate) / 100 || 0;
            console.log("gstAmount:", gstAmount);
            const amountBeforeGST = amount - gstAmount || 0;
            console.log("amountBeforeGST:", amountBeforeGST);

            invoiceItems.push({
              item: itemsName,
              itemAmount: isNaN(amountBeforeGST) ? 0 : amountBeforeGST,
              taxType: response2.data.taxType,
              gstAmount: isNaN(gstAmount) ? 0 : gstAmount,
              totalAmount: isNaN(amount) ? 0 : amount,
            });
            console.log("Course Fee Function is Executed Successfully");
          } catch (error) {
            console.error("Error fetching course fees:", error);
          }
        } else {
          console.error("Course ID and Package Id not found");
        }

        if (courseId) {
          try {
            const response3 = await api.get(
              `/getLatestCourseDepositFeesByCourseId/${courseId}`
            );
            console.log("Response 3:", response3.data);

            const selectedTax = taxData.find(
              (tax) => parseInt(response3.data.taxType) === tax.id
            );
            const itemsName = "Deposit Fee";
            const gstRate = selectedTax ? selectedTax.rate : 0;
            const amount = response3.data.depositFees || 0;
            const gstAmount = (amount * gstRate) / 100 || 0;
            const amountBeforeGST = amount - gstAmount || 0;

            invoiceItems.push({
              item: itemsName,
              itemAmount: isNaN(amountBeforeGST) ? 0 : amountBeforeGST,
              taxType: response3.data.taxType,
              gstAmount: isNaN(gstAmount) ? 0 : gstAmount,
              totalAmount: isNaN(amount) ? 0 : amount,
            });
          } catch (error) {
            console.error("Error fetching course deposit fees:", error);
          }
        } else {
          console.error("Course ID not found");
        }
        formik.setValues({
          center: studentData.centerId || "",
          parent: studentData?.studentParentsDetails[0]?.parentName || "",
          student: formik.values.student,
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
        formik.setFieldValue("invoiceItems", invoiceItems);
        setRows(invoiceItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (courseData && taxData && formik.values.student) {
      fetchStudentData(); // Call fetchStudentData only if courseData and taxData are available
    }
  }, [courseData, taxData, formik.values.student]);

  useEffect(() => {
    if (studentID) {
      handleStudentChange(studentID);
    }
  }, [studentID]);

  const handleSelectChange = (index, value) => {
    const selectedTax = taxData.find((tax) => tax.id === parseInt(value));
    const gstRate = selectedTax ? selectedTax.rate : 0;
    const totalAmount =
      parseFloat(formik.values.invoiceItems[index]?.totalAmount) || 0;

    // Recalculate itemAmount based on totalAmount and gstRate
    const gstAmount = (totalAmount * gstRate) / 100 ;
    const itemAmount = totalAmount - gstAmount;

    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      taxType: value,
      itemAmount: itemAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2), // Keep totalAmount unchanged
    };
    setRows(updatedRows);

    formik.setFieldValue(`invoiceItems[${index}].taxType`, value);
    formik.setFieldValue(
      `invoiceItems[${index}].itemAmount`,
      itemAmount.toFixed(2)
    );
    formik.setFieldValue(
      `invoiceItems[${index}].gstAmount`,
      gstAmount.toFixed(2)
    );
    formik.setFieldValue(
      `invoiceItems[${index}].totalAmount`,
      totalAmount.toFixed(2)
    );
  };

  const handelTotalAmountChange = (index, value) => {
    const selectedTaxType = formik.values.invoiceItems[index]?.taxType;
    const selectedTax = taxData.find((tax) => tax.id === parseInt(selectedTaxType));
  
    const gstRate = selectedTax ? selectedTax.rate : 0;
    const totalAmount = parseFloat(value) || 0;
    const itemAmount1 = (totalAmount) * (gstRate) / 100;
    const gstAmount = itemAmount1
    const itemAmount = totalAmount - gstAmount;
  
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      itemAmount: itemAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: value,
    };
    setRows(updatedRows);
  
    formik.setFieldValue(`invoiceItems[${index}].itemAmount`, itemAmount.toFixed(2));
    formik.setFieldValue(`invoiceItems[${index}].gstAmount`, gstAmount.toFixed(2));
    formik.setFieldValue(`invoiceItems[${index}].totalAmount`, value);
  };
  
  
  useEffect(() => {
    const getData = async () => {
      if (studentID) {
        try {
          const response = await api.get(`/getAllStudentById/${studentID}`);
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
          setRows(formik.values.invoiceItems);
        } catch (error) {
          console.error("Error fetching Student Data:", error);
          toast.error("Error fetching Student Data");
        }
      }
    };
    getData();
  }, [studentID]);
  const handleRowDelete = (index) => {
    const updatedInvoiceItems = formik.values.invoiceItems.filter(
      (_, i) => i !== index
    );

    // Update the rows and formik values
    setRows(updatedInvoiceItems);
    formik.setFieldValue("invoiceItems", updatedInvoiceItems);
  };

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
       <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
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
                  onChange={(event) => handleStudentChange(event.target.value)}
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
                  <option value="12:00 pm">12:00 pm</option>
                  <option value="1:00 pm">1:00 pm</option>
                </select>
                {formik.touched.schedule && formik.errors.schedule && (
                  <div className="invalid-feedback">
                    {formik.errors.schedule}
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
                  maxLength={200}

                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 px-5">
            <div className="text-start mt-3">
  <label htmlFor="" className="mb-1 fw-medium">
    Invoice Date<span className="text-danger">*</span>
  </label>
  <br />
  <input
    {...formik.getFieldProps("invoiceDate")}
    className={`form-control ${
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
    Due Date<span className="text-danger">*</span>
  </label>
  <br />
  <input
    {...formik.getFieldProps("dueDate")}
    className={`form-control ${
      formik.touched.dueDate && formik.errors.dueDate
        ? "is-invalid"
        : ""
    }`}
    type="date"
    // Set the minimum due date to the selected invoice date
    min={formik.values.invoiceDate || new Date().toISOString().split("T")[0]} 
  />
  {formik.touched.dueDate && formik.errors.dueDate && (
    <div className="invalid-feedback">
      {formik.errors.dueDate}
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
                  <option value="" selected></option>
                  {lessonOptions}
                </select>
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
                            onChange={formik.handleChange}
                            readOnly
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
                            onChange={formik.handleChange}
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
                            onChange={(e) =>
                              handelTotalAmountChange(index, e.target.value)
                            }
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
                  // onClick={() => {
                  //   setRows((pr) => pr.slice(0, -1));
                  //   formik.setFieldValue(
                  //     "invoiceItems",
                  //     formik.values.invoiceItems.slice(0, -1)
                  //   );
                  // }}
                  onClick={() => handleRowDelete(rows.length - 1)}
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
