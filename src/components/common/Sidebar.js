import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import Logo from "../../assets/images/Logo-Portal_Access.png";
import api from "../../config/URL";
import { PiBuildings } from "react-icons/pi";
import { BiRadioCircleMarked } from "react-icons/bi";
import { IoIosAdd, IoIosArrowDown, IoIosRemove } from "react-icons/io";
import { PiBookOpenText } from "react-icons/pi";
import { RiDashboardLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbUserSearch } from "react-icons/tb";
import { TbStatusChange } from "react-icons/tb";
import { TbCalendarTime } from "react-icons/tb";
import { TbFolderCog } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { VscReferences } from "react-icons/vsc";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { LiaUserEditSolid } from "react-icons/lia";
import { TbMessageCode } from "react-icons/tb";
import { GrUserSettings } from "react-icons/gr";
import { GiExitDoor } from "react-icons/gi";

const iconMapping = {
  "Centre Management": <PiBuildings />,
  "Course Management": <PiBookOpenText />,
  "Lead Management": <GiExitDoor />,
  Staffing: <HiOutlineUserGroup />,
  "Student Management": <TbUserSearch />,
  "Student Movement": <TbStatusChange />,
  Schedule: <TbCalendarTime />,
  "Document Management": <TbFolderCog />,
  "Invoice and Payment": <LiaFileInvoiceDollarSolid />,
  "Referal Management": <VscReferences />,
  "Report Management": <BsFileEarmarkRichtext />,
  "Content Management": <LiaUserEditSolid />,
  Messaging: <TbMessageCode />,
  Settings: <GrUserSettings />,
};

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [data, setData] = useState({});
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllHeaderSavePublish`);
        setData(response.data);
      } catch (error) {
        console.error("Error Fetching Data: " + error.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

    // Define your menu items based on screen access values
    const updatedMenuItems = [
      {
        title: "Centre Management",
        icon: "PiBuildings",
        isOpen: false,
        subMenus: [
          {
            title: "Centre Listing",
            path: "/center",
            access: storedScreens.centerListingIndex,
          },
        ],
      },
      {
        title: "Course Management",
        icon: "PiBookOpenText",
        isOpen: false,
        subMenus: [
          {
            title: "Subject",
            path: "/subject",
            access: storedScreens.subjectIndex,
          },
          { title: "Level", path: "/level", access: storedScreens.levelIndex },
          {
            title: "Course",
            path: "/course",
            access: storedScreens.courseIndex,
          },
          { title: "Class", path: "/class", access: storedScreens.classIndex },
        ],
      },
      {
        title: "Lead Management",
        icon: "GiExitDoor",
        isOpen: false,
        subMenus: [
          {
            title: "Lead Listing",
            path: "lead/lead",
            access: storedScreens.leadListingIndex,
          },
          {
            title: "Contacts",
            path: "/lead/contacted",
            access: storedScreens.enrollmentIndex,
          },
        ],
      },
      {
        title: "Staffing",
        icon: "HiOutlineUserGroup",
        isOpen: false,
        subMenus: [
          {
            title: "Staff",
            path: "/staff",
            access: storedScreens.staffIndex,
          },
          {
            title: "Teacher",
            path: "/teacher",
            access: storedScreens.teacherIndex,
          },
          {
            title: "Attendance",
            path: "/staffing/attendance",
            access: storedScreens.staffAttendanceIndex,
          },
          {
            title: "Check Attendance",
            path: "/staffing/check",
            access: storedScreens.staffAttendanceIndex,
          },
          {
            title: "Leave",
            path: "/leaveadmin",
            access: storedScreens.leaveAdminIndex,
          },
          {
            title: "Leave Request",
            path: "/leave",
            access: storedScreens.leaveIndex,
          },
          {
            title: "Holiday",
            path: "/holiday",
            access: storedScreens.holidayIndex,
          },
          {
            title: "Deduction",
            path: "/deduction",
            access: storedScreens.deductionIndex,
          },
          {
            title: "Payroll",
            path: "/payrolladmin",
            access: storedScreens.payrollIndex,
          },
          {
            title: "Payslip",
            path: "/employeepayslip",
            access: storedScreens.payslipIndex,
          },
          {
            title: "Freelancer Invoice",
            path: "/freelancerPayslip",
            access: storedScreens.freeLancerIndex,
          },
          {
            title: "Role & Matrix",
            path: "/role/add",
            access: storedScreens.rolesMatrixIndex,
          },
        ],
      },
      {
        title: "Student Management",
        icon: "TbUserSearch",
        isOpen: false,
        subMenus: [
          {
            title: "Student Listing",
            path: "/student",
            access: storedScreens.studentListingIndex,
          },
          {
            title: "Attendance",
            path: "/attendance",
            access: storedScreens.attendanceIndex,
          },
          {
            title: "Replace Class Lesson List",
            path: "/replaceclasslesson",
            access: storedScreens.attendanceIndex,
          },
        ],
      },
      {
        title: "Student Movement",
        icon: "TbStatusChange",
        isOpen: false,
        subMenus: [
          {
            title: "Transfer Out",
            path: "/transferOut",
            access: storedScreens.studentListingIndex,
          },
        ],
      },
      {
        title: "Schedule",
        icon: "TbCalendarTime",
        isOpen: false,
        subMenus: [
          {
            title: "Time Schedule",
            path: "/scheduleteacher",
            access: storedScreens.scheduleTeacherIndex,
          },
          // { title: "Make Up Class", path: "/reschedule" },
          // Add more submenus as needed
        ],
      },
      {
        title: "Document Management",
        icon: "TbFolderCog",
        isOpen: false,
        subMenus: [
          {
            title: "Document Folder",
            path: "/document",
            access: storedScreens.documentListingIndex,
          },
          {
            title: "Document Files",
            path: "/documentfile",
            access: storedScreens.documentFileIndex,
          },
          // Add more submenus as needed
        ],
      },
      {
        title: "Invoice and Payment",
        icon: "LiaFileInvoiceDollarSolid",
        isOpen: false,
        subMenus: [
          {
            title: "Invoice",
            path: "/invoice",
            access: storedScreens.invoiceIndex,
          },
        ],
      },
      {
        title: "Referal Management",
        icon: "VscReferences",
        isOpen: false,
        subMenus: [
          {
            title: "Set Referal Fees",
            path: "/referalFees",
            access: storedScreens.invoiceIndex,
          },
          {
            title: "Referal History",
            path: "/referalHistory",
            access: storedScreens.paymentIndex,
          },
        ],
      },
      {
        title: "Report Management",
        icon: "BsFileEarmarkRichtext ",
        isOpen: false,
        subMenus: [
          // {
          //   title: "Document Report",
          //   path: "/report/document",
          //   access: storedScreens.documentReportIndex,
          // },
          {
            title: "Attendance Report",
            path: "/report/attendance",
            access: storedScreens.attendanceReportIndex,
          },
          // {
          //   title: "Student Report",
          //   path: "/report/studentreport",
          //   access: storedScreens.studentReportIndex,
          // },
          // {
          //   title: "Assessment Report",
          //   path: "/report/assessment",
          //   access: storedScreens.assessmentReportIndex,
          // },
          {
            title: "Revenue Report",
            path: "/report/revenue",
            access: storedScreens.assessmentReportIndex,
          },
          {
            title: "Enrolment Report",
            path: "/report/enrolment",
            access: storedScreens.enrollmentReportIndex,
          },
          // {
          //   title: "Fee Collection Report",
          //   path: "/report/fee",
          //   access: storedScreens.feeCollectionReportIndex,
          // },
          // {
          //   title: "Package Balance Report",
          //   path: "/report/package",
          //   access: storedScreens.packageBalanceReportIndex,
          // },
          // {
          //   title: "Sales Revenue Report",
          //   path: "/report/sales",
          //   access: storedScreens.salesRevenueReportindex,
          // },
          // {
          //   title: "Replace Class Lesson List",
          //   path: "/report/replace_class",
          //   access: storedScreens.replaceClassLessonListindex,
          // },
        ],
      },
      {
        title: "Content Management",
        icon: "LiaUserEditSolid",
        isOpen: false,
        subMenus: [
          {
            title: "Header & Footer",
            path: "/cms/header",
            access: storedScreens.headerIndex,
          },
          {
            title: "Home",
            path: "/cms/home",
            access: storedScreens.homeIndex,
          },
          {
            title: "Blog",
            path: "/cms/cmsBlog",
            access: storedScreens.blogIndex,
          },
          {
            title: "Testimonial",
            path: "/cms/testimonial",
            access: storedScreens.testimonialIndex,
          },
          {
            title: "About",
            path: "/cms/aboutus",
            access: storedScreens.aboutIndex,
          },
          {
            title: "Courses",
            path: "/cms/CmsCourses",
            access: storedScreens.englishCourseIndex,
          },
          {
            title: "Teachers",
            path: "/cms/teacher",
            access: storedScreens.teacherSaveIndex,
          },
          {
            title: "Products",
            path: "/cms/products",
            access: storedScreens.productSaveIndex,
          },
          {
            title: "Products Items",
            path: "/cms/productsitem",
            access: storedScreens.productImageSaveIndex,
          },
          {
            title: "News & Updates",
            path: "/cms/newsupdate",
            access: storedScreens.newsUpdatesIndex,
          },
          {
            title: "Contact Us",
            path: "/cms/contact",
            access: storedScreens.contactUsIndex,
          },
        ],
      },
      {
        title: "Settings",
        icon: "GrUserSettings",
        isOpen: false,
        subMenus: [
          {
            title: "Tax",
            path: "/tax",
            access: storedScreens.taxSettingIndex,
          },
          {
            title: "Race",
            path: "/race",
            access: storedScreens.raceSettingIndex,
          },
          {
            title: "Country & Nationality",
            path: "/country",
            access: storedScreens.countrySettingIndex,
          },
          {
            title: "SHG",
            path: "/shg",
            access: storedScreens.shgSettingIndex,
          },
          {
            title: "Batch Time",
            path: "/batchtime",
            access: true,
          },
          {
            title: "Leave Type",
            path: "/leavetype",
            access: storedScreens.leaveSettingIndex,
          },
          {
            title: "ID Type",
            path: "/idType",
            access: storedScreens.idTypeSettingIndex,
          },
          {
            title: "Salary Type",
            path: "/salarytype",
            access: storedScreens.salarySettingIndex,
          },
          {
            title: "Absent Reason",
            path: "/absentreason",
            // access: storedScreens.absentSettingIndex,
            access: storedScreens.salarySettingIndex,
          },
          {
            title: "Email Template",
            path: "/emailTemplate",
            // access: storedScreens.emailTemplateSettingIndex,
            access: storedScreens.salarySettingIndex,
          },
        ],
      },
      {
        title: "Messaging",
        icon: "TbMessageCode",
        isOpen: false,
        subMenus: [
          {
            title: "My Messages",
            path: "/messaging",
            access: storedScreens.smsMessageIndex,
            // access:true
          },
          {
            title: "Other Messages",
            path: "/othermessaging",
            access: storedScreens.smsMessageIndex,
            // access:true
          },
          {
            title: "School Announcement",
            path: "/sendNotification",
            access: storedScreens.sendNotificationIndex,
            // access:true
          },
        ],
      },
    ];
    setMenuItems(updatedMenuItems);
  }, []);

  const handleMenuClick = (index) => {
    if (index === null) {
      // If Home is clicked, deactivate all menus
      setMenuItems(menuItems.map((item) => ({ ...item, isOpen: false })));
      setActiveMenu(null);
    } else {
      const updatedMenuItems = menuItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isOpen: !item.isOpen,
          };
        } else {
          return {
            ...item,
            isOpen: false,
          };
        }
      });
      setMenuItems(updatedMenuItems);
      setActiveMenu(
        updatedMenuItems[index].isOpen ? updatedMenuItems[index].title : null
      );
    }
  };

  return (
    <div className="sidebar">
      <div className="logo-details">
        <span className="logo_name">
          <img src={Logo} alt="logo" width={110} className="img-fluid p-1" />
        </span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            onClick={() => handleMenuClick(null)}
            className={activeMenu === true ? "active activehover" : ""}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="home-tooltip">Home</Tooltip>}
            >
              <i className="homeIcons">
                <RiDashboardLine/>
              </i>
            </OverlayTrigger>
            <span className="links_name text-center">&nbsp;Home</span>
          </NavLink>
        </li>
        {menuItems.map(
          (item, index) =>
            item.subMenus.some((subMenu) => subMenu.access) && (
              
              <li key={index}>
                <Nav.Link
                  to="#"
                  onClick={() => handleMenuClick(index)}
                  className={
                    activeMenu === item.title ? "active activehover" : ""
                  }
                >
                  <div
                    className="w-100 d-flex justify-content-between"
                    style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                  >
                    <span className="d-flex justify-content-center text-center">
                      <div className="text-center">
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id={`${item.title}-tooltip`}>
                              {item.title}
                            </Tooltip>
                          }
                        >
                          {/* <span>
                            <i className={`${item.icon} activehover`}></i>
                          </span> */}
                          <span className="p-3">
                            {iconMapping[item.title] || "-"}
                          </span>
                        </OverlayTrigger>
                        <span className="links_name">{item.title}</span>
                      </div>
                    </span>
                    <span className="pe-4">
                      {item.isOpen ? (
                        <IoIosRemove
                          className="arrow open"
                          style={{
                            paddingRight: "5px",
                            minWidth: "0px",
                            fontWeight: "700",
                            fontSize: "24px",
                          }}
                        />
                      ) : (
                        <IoIosAdd
                          className="arrow"
                          style={{
                            paddingRight: "5px",
                            minWidth: "0px",
                            fontWeight: "700",
                            fontSize: "24px",
                          }}
                        />
                      )}
                    </span>
                  </div>
                </Nav.Link>

                <Collapse in={item.isOpen}>
                  <ul className="submenu">
                    {item.subMenus.map(
                      (subMenu, subIndex) =>
                        subMenu.access && (
                          <li key={subIndex}>
                            <NavLink
                              to={subMenu.path}
                              className={({ isActive }) =>
                                isActive ? "active-submenu" : ""
                              }
                            >
                              <OverlayTrigger
                                placement="right"
                                overlay={
                                  <Tooltip id={`${subMenu.title}-tooltip`}>
                                    {subMenu.title}
                                  </Tooltip>
                                }
                              >
                                <i
                                  className="bx bx-radio-circle-marked"
                                  style={{ fontWeight: "400" }}
                                ></i>
                                {/* <BiRadioCircleMarked className=""/> */}
                              </OverlayTrigger>
                              <span className="links_name links_names active">
                                {subMenu.title}
                              </span>
                            </NavLink>
                          </li>
                        )
                    )}
                  </ul>
                </Collapse>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
