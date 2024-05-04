import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/sidebar.css";
import "boxicons/css/boxicons.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import DataTable from "../pages/Datatable";
import Datatable2 from "../pages/Datatable2";
import Course from "../pages/Course/Course";
import Lead from "../pages/Lead/Lead";
import Student from "../pages/Student/Student";
import Teacher from "../pages/Teacher/Teacher";
import TeacherAdd from "../pages/Teacher/TeacherAdd";
import TeacherEdit from "../pages/Teacher/TeacherEdit";
import TeacherView from "../pages/Teacher/TeacherView";
import TeacherLeave from "../pages/Teacher/TeacherLeave";
import TeacherPayslip from "../pages/Teacher/TeacherPayslip";
import Attendance from "../pages/Report/Attendance";
import Enrolment from "../pages/Report/Enrolment";
import Fee from "../pages/Report/Fee";
import Package from "../pages/Report/Package";
import Sales from "../pages/Report/Sales";
import StudentReport from "../pages/Report/StudentReport";
import Center from "../pages/Center/Center";
import CenterAdd from "../pages/Center/CenterAdd";
import CenterView from "../pages/Center/CenterView";
import Staff from "../pages/Staff/Staff";
import Payment from "../pages/Payment/Payment";
import Invoice from "../pages/Invoice/Invoice";
import Document from "../pages/Document/Document";
import CourseAdd from "../pages/Course/CourseAdd";
import CourseEdit from "../pages/Course/CourseEdit";
import CourseView from "../pages/Course/CourseView";
import Subject from "../pages/Subject/Subject";
import SubjectAdd from "../pages/Subject/SubjectAdd";
import SubjectEdit from "../pages/Subject/SubjectEdit";
import SubjectView from "../pages/Subject/SubjectView";
import Level from "../pages/Level/Level";
import LevelAdd from "../pages/Level/LevelAdd";
import LevelEdit from "../pages/Level/LevelEdit";
import LevelView from "../pages/Level/LevelView";
import DocumentAdd from "../pages/Document/DocumentAdd";
import DocumentEdit from "../pages/Document/DocumentEdit";
import DocumentView from "../pages/Document/DocumentView";
import Class from "../pages/Class/Class";
import ClassAdd from "../pages/Class/ClassAdd";
import ClassEdit from "../pages/Class/ClassEdit";
import ClassView from "../pages/Class/ClassView";
import CenterEdit from "../pages/Center/CenterEdit";
import StaffAdd from "../pages/Staff/StaffAdd";
import StaffEdit from "../pages/Staff/StaffEdit";
import StaffLeave from "../pages/Staff/StaffLeave";
import StaffPayslip from "../pages/Staff/StaffPayslip";
import StaffView from "../pages/Staff/StaffView";
import StudentView from "../pages/Student/StudentView";
import InvoiceAdd from "../pages/Invoice/InvoiceAdd";
import InvoiceEdit from "../pages/Invoice/InvoiceEdit";
import InvoiceView from "../pages/Invoice/InvoiceView";
import InvoicePayment from "../pages/Invoice/InvoicePayment";
// import LeadAdd from "../pages/Lead/LeadAdd";
// import LeadEdit from "../pages/Lead/LeadEdit";
import LeadView from "../pages/Lead/LeadView";
import LeadAssessment from "../pages/Lead/LeadAssessment";
import StudentDeposit from "../pages/Student/StudentDeposit";
import StudentAdd from "../pages/Student/StudentAdd";
import StudentEdit from "../pages/Student/StudentEdit";
import StudentTransferOut from "../pages/Student/StudentTransferOut";
import StudentChangeClass from "../pages/Student/StudentChangeClass";
import StudentEndClass from "../pages/Student/StudentEndClass";
import StaffLeaveView from "../pages/Staff/StaffLeaveView";
import Attendances from "../pages/Attendance/Attendances";
import AttendancesAdd from "../pages/Attendance/AttendancesAdd";
import AttendancesEdit from "../pages/Attendance/AttendancesEdit";
import RolesAdd from "../pages/Roles/RolesAdd";
import TeacherLeaveView from "../pages/Teacher/TeacherLeaveView";
import DocumentReport from "../pages/Report/DocumentReport";
import DocumentReportView from "../pages/Report/DocumentReportView";
import AssessmentReport from "../pages/Report/AssessmentReport";
import ReplaceClass from "../pages/Report/ReplaceClass";
import WithdrawAdd from "../pages/Student/WithdrawAdd";
import EnrollmentAdd from "../pages/Lead/Enrollment/EnrollmentAdd";
import Video from "../pages/Video";
import DisplayMedia from "../pages/DisplayMedia";
import { ToastContainer } from "react-toastify";
import Reschedule from "../pages/Reschedule/Reschedule";
import RescheduleStudent from "../pages/Reschedule/RescheduleStudent";
import ScheduleTeacher from "../pages/ScheduleTeacher/ScheduleTeacher";
import AttendancesCourse from "../pages/Attendance/AttendancesCourse";
import Campaign from "../pages/Campaign/Campaign";
import CampaignAdd from "../pages/Campaign/CampaignAdd";
import CampaignEdit from "../pages/Campaign/CampaignEdit";
import CampaignView from "../pages/Campaign/CampaignView";
import Contact from "../pages/Campaign/Contact";
import ContactAdd from "../pages/Campaign/ContactAdd";
import CampaignStudentAdd from "../pages/Campaign/CampaignStudentAdd";
import ContactLists from "../pages/Campaign/ContactLists";
import ContactEdit from "../pages/Campaign/ContactEdit";
import DocumentFiles from "../pages/Document/DocumentFiles";
import ScheduleTime from "../pages/ScheduleTeacher/ScheduleTime";
import Test from "../pages/Test";
import ScheduleTeacherAdd from "../pages/ScheduleTeacher/ScheduleTeacherAdd";
import ScheduleTeacherEdit from "../pages/ScheduleTeacher/ScheduleTeacherEdit";
import ScheduleTeacherView from "../pages/ScheduleTeacher/ScheduleTeacherView";
import Curriculum from "../pages/Curriculum/Curriculum";
import EnrollmentEdit from "../pages/Lead/Enrollment/EnrollmentEdit";
import StudentRegisterCourse from "../pages/Student/StudentRegisterCourse";
import SendNotification from "../pages/SendNotification/SendNotification";
import SendNotificationAdd from "../pages/SendNotification/SendNotificationAdd";
import SendNotificationEdit from "../pages/SendNotification/SendNotificationEdit";
import StaffingAttendance from "../pages/StaffingAttendance/StaffingAttendance";
import StaffingAttendanceAdd from "../pages/StaffingAttendance/StaffingAttendanceAdd";
import StaffingAttendanceEdit from "../pages/StaffingAttendance/StaffingAttendanceEdit";
import StaffingAttendanceView from "../pages/StaffingAttendance/StaffingAttendanceView";
import Holiday from "../pages/Staff/Holiday/Holiday";
import HolidayAdd from "../pages/Staff/Holiday/HolidayAdd";
import HolidayEdit from "../pages/Staff/Holiday/HolidayEdit";
import HolidayView from "../pages/Staff/Holiday/HolidayView";
import Deduction from "../pages/Staff/Deductions/Deduction";
import DeductionAdd from "../pages/Staff/Deductions/DeductionAdd";
import DeductionEdit from "../pages/Staff/Deductions/DeductionEdit";
import DeductionView from "../pages/Staff/Deductions/DeductionView";
import LeaveAdmin from "../pages/Staff/Leave Admin/LeaveAdmin";
import Leave from "../pages/Staff/Leave/Leave";
import LeaveAdminEdit from "../pages/Staff/Leave Admin/LeaveAdminEdit";
import LeaveAdminView from "../pages/Staff/Leave Admin/LeaveAdminView";
import LeaveAdd from "../pages/Staff/Leave/LeaveAdd";
import LeaveView from "../pages/Staff/Leave/LeaveView";
import Payroll from "../pages/Payroll/PayrollAdmin/Payroll";
import AddPayroll from "../pages/Payroll/PayrollAdmin/AddPayroll";
import EditPayroll from "../pages/Payroll/PayrollAdmin/EditPayroll";
import Viewpayroll from "../pages/Payroll/PayrollAdmin/ViewPayroll";
import Payslip from "../pages/EmployeePayslip/Payslip";
import ViewPayslip from "../pages/EmployeePayslip/ViewPayslip";

function Admin({ handleLogout }) {
  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebarBtn.onclick = function () {
      sidebar.classList.toggle("active");
      if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Sidebar />
        <section className="home-section">
          <Header onLogout={handleLogout} />
          <div className="home-content" style={{ minHeight: "95vh" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/datatable" element={<DataTable />} />
              <Route path="/datatable2" element={<Datatable2 />} />
              <Route path="/batchtable" element={<Test />} />

              {/* Lead */}
              <Route path="/lead/lead" element={<Lead />} />
              <Route path="/lead/lead/add" element={<EnrollmentAdd />} />
              <Route path="/lead/lead/edit/:id" element={<EnrollmentEdit />} />
              <Route path="/lead/lead/view/:id" element={<LeadView />} />
              <Route
                path="/lead/lead/assessment/:leadId"
                element={<LeadAssessment />}
              />
              <Route path="/lead/enrollment" element={<EnrollmentAdd />} />
              <Route path="/video" element={<Video />} />
              <Route path="/displaymedia" element={<DisplayMedia />} />

              {/* {/ Student /} */}
              <Route path="/student" element={<Student />} />
              <Route path="/student/add" element={<StudentAdd />} />
              <Route path="/student/edit/:id" element={<StudentEdit />} />
              <Route path="/student/view/:id" element={<StudentView />} />
              <Route
                path="/student/view/transferOut/:id"
                element={<StudentTransferOut />}
              />
              <Route
                path="/student/view/changeClass"
                element={<StudentChangeClass />}
              />
              <Route
                path="/student/view/endClass/:id"
                element={<StudentEndClass />}
              />
              <Route
                path="/student/view/deposit"
                element={<StudentDeposit />}
              />
              <Route path="/student/withdraw" element={<WithdrawAdd />} />
              <Route
                path="/student/register/course/:id"
                element={<StudentRegisterCourse />}
              />

              {/* Center */}
              <Route path="/center" element={<Center />} />
              <Route path="/center/add" element={<CenterAdd />} />
              <Route path="/center/view/:id" element={<CenterView />} />
              <Route path="/center/edit/:id" element={<CenterEdit />} />

              {/* Teacher */}
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/teacher/add" element={<TeacherAdd />} />
              <Route path="/teacher/edit/:staff_id" element={<TeacherEdit />} />
              <Route path="/teacher/view/:id" element={<TeacherView />} />
              <Route path="/teacher/leave" element={<TeacherLeave />} />
              <Route
                path="/teacher/leave/view"
                element={<TeacherLeaveView />}
              />
              <Route path="/teacher/payslip" element={<TeacherPayslip />} />

              {/* StaffingAttendance */}
              <Route path="/staffing/attendance" element={<StaffingAttendance/>}/>
              <Route path="/staffing/attendance/add" element={<StaffingAttendanceAdd/>}/>
              <Route path="/staffing/attendance/edit" element={<StaffingAttendanceEdit/>}/>
              <Route path="/staffing/attendance/view" element={<StaffingAttendanceView/>}/>

              {/* {/ {/ Holiday /} /} */}
              <Route path="/holiday" element={<Holiday />} />
              <Route path="/holiday/add" element={<HolidayAdd />} />
              <Route path="/holiday/edit/:id" element={<HolidayEdit />} />
              <Route path="/holiday/list/:id" element={<HolidayView />} />

                   {/* {/ {/ Deduction /} /} */}
              <Route path="/deduction" element={<Deduction />} />
              <Route path="/deduction/add" element={<DeductionAdd />} />
              <Route path="/deduction/edit" element={<DeductionEdit />} />
              <Route path="/deduction/list" element={<DeductionView />} />

              {/* {/ Leave Admin /} */}
              <Route path="/leaveadmin" element={<LeaveAdmin />} />
              <Route path="/leaveadmin/edit" element={<LeaveAdminEdit />} />
              <Route path="/leaveadmin/view" element={<LeaveAdminView />} />

              {/* {/ Leave /} */}
              <Route path="/leave" element={<Leave />} />
              <Route path="/leave/add" element={<LeaveAdd />} />
              <Route path="/leave/view" element={<LeaveView />} />

              {/* {/ Payroll /} */}
              <Route path="/payrolladmin" element={<Payroll />} />
              <Route path="/payrolladmin/add" element={<AddPayroll />} />
              <Route path="/payrolladmin/edit" element={<EditPayroll />} />
              <Route path="/payrolladmin/view" element={<Viewpayroll />} />

              {/* {/ Payslip /} */}
              <Route path="/employeepayslip" element={<Payslip />} />
              <Route path="/employeepayslip/view" element={<ViewPayslip />} />

              {/* Report */}
              <Route path="/report/attendance" element={<Attendance />} />
              <Route path="/report/enrolment" element={<Enrolment />} />
              <Route path="/report/fee" element={<Fee />} />
              <Route path="/report/package" element={<Package />} />
              <Route path="/report/sales" element={<Sales />} />
              <Route path="/report/studentreport" element={<StudentReport />} />
              <Route path="/report/document" element={<DocumentReport />} />
              <Route path="/report/replace_class" element={<ReplaceClass />} />
              <Route
                path="/report/document/view"
                element={<DocumentReportView />}
              />
              <Route path="/report/assessment" element={<AssessmentReport />} />

              {/* staff  */}
              <Route path="/staff" element={<Staff />} />
              <Route path="/staff/add" element={<StaffAdd />} />
              <Route path="/staff/edit/:staff_id" element={<StaffEdit />} />
              <Route path="/staff/view/:id" element={<StaffView />} />
              <Route path="/staff/leave" element={<StaffLeave />} />
              <Route path="/staff/leave/view" element={<StaffLeaveView />} />
              <Route path="/staff/payslip" element={<StaffPayslip />} />

              {/* Course  */}
              <Route path="/course" element={<Course />} />
              <Route path="/course/add" element={<CourseAdd />} />
              <Route path="/course/edit/:id" element={<CourseEdit />} />
              <Route path="/course/view/:id" element={<CourseView />} />
              <Route path="/course/curriculum/:id" element={<Curriculum />} />
              <Route path="/curriculum" element={<Curriculum />} />

              {/* Payment  */}
              <Route path="/payment" element={<Payment />} />

              {/* Invoice  */}
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/invoice/add" element={<InvoiceAdd />} />
              <Route path="/invoice/edit/:id" element={<InvoiceEdit />} />
              <Route path="/invoice/view/:id" element={<InvoiceView />} />
              <Route path="/invoice/payment" element={<InvoicePayment />} />

              {/* Document  */}
              <Route path="/document" element={<Document />} />
              <Route path="/document/add" element={<DocumentAdd />} />
              <Route path="/document/edit" element={<DocumentEdit />} />
              <Route path="/document/view/:id" element={<DocumentView />} />
              <Route path="/documentfile" element={<DocumentFiles />} />

              {/* Subject  */}
              <Route path="/subject" element={<Subject />} />
              <Route path="/subject/add" element={<SubjectAdd />} />
              <Route path="/subject/edit" element={<SubjectEdit />} />
              <Route path="/subject/view/:id" element={<SubjectView />} />

              {/* Level */}
              <Route path="/level" element={<Level />} />
              <Route path="/level/add" element={<LevelAdd />} />
              <Route path="/level/edit/:id" element={<LevelEdit />} />
              <Route path="/level/view/:id" element={<LevelView />} />

              {/* Class */}
              <Route path="/class" element={<Class />} />
              <Route path="/class/add" element={<ClassAdd />} />
              <Route path="/class/edit/:id" element={<ClassEdit />} />
              <Route path="/class/view/:id" element={<ClassView />} />

              {/* {/ Attendance /} */}
              <Route path="/attendance/list" element={<AttendancesCourse />} />
              <Route path="/attendance" element={<Attendances />} />
              <Route path="/attendance/add" element={<AttendancesAdd />} />
              <Route path="/attendance/edit" element={<AttendancesEdit />} />

              {/* Send Notification */}
              <Route path="/sendNotification" element={<SendNotification />} />
              <Route path="/sendNotification/add" element={<SendNotificationAdd />} />
              <Route path="/sendNotification/edit" element={<SendNotificationEdit />} />

              {/* Re-Schedule */}
              <Route path="/reschedule" element={<Reschedule />} />
              <Route
                path="/reschedule/studentlist"
                element={<RescheduleStudent />}
              />

              {/* Schedule Teacher */}
              <Route path="/scheduleteacher" element={<ScheduleTeacher />} />
              <Route
                path="/scheduleteacher/add"
                element={<ScheduleTeacherAdd />}
              />
              <Route
                path="/scheduleteacher/edit/:id"
                element={<ScheduleTeacherEdit />}
              />
              <Route
                path="/scheduleteacher/view/:id"
                element={<ScheduleTeacherView />}
              />
              <Route
                path="/scheduleteacher/scheduletime/:id"
                element={<ScheduleTime />}
              />

              {/* {/ Role /} */}
              <Route path="/role/add" element={<RolesAdd />} />

              <Route path="*" element={<Dashboard />} />

              {/* Compaign */}
              <Route path="/campaign" element={<Campaign />} />
              <Route path="/campaign/add" element={<CampaignAdd />} />
              <Route path="/campaign/edit" element={<CampaignEdit />} />
              <Route path="/campaign/view" element={<CampaignView />} />
              <Route path="/campaign/contact" element={<Contact />} />
              <Route path="/campaign/contact/add" element={<ContactAdd />} />
              <Route path="/campaign/contact/edit" element={<ContactEdit />} />
              <Route
                path="/campaign/student/add"
                element={<CampaignStudentAdd />}
              />
              <Route
                path="/campaign/student/add/list"
                element={<ContactLists />}
              />
            </Routes>
          </div>
          <Footer />
        </section>
      </BrowserRouter>
    </div>
  );
}

export default Admin;
