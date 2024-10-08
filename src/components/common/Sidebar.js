import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav ,OverlayTrigger ,Tooltip  } from "react-bootstrap";
import Logo from "../../assets/images/Logo-Portal_Access.png";
import api from "../../config/URL";

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
        icon: "bx bx-building",
        isOpen: false,
        subMenus: [
          {
            title: "Centre Listing",
            path: "/center",
            access: storedScreens.centerListingIndex,
          },
          // {
          //   title: "Centre Manager",
          //   path: "/centermanager",
          //   access: storedScreens.centerListingIndex,
          // },
        ],
      },
      {
        title: "Course Management",
        icon: "bx bx-book-alt",
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

      // {
      //   title: "Campaign",
      //   icon: "bx bx-box",
      //   isOpen: false,
      //   subMenus: [{ title: "Campaign", path: "/campaign" }],
      // },
      {
        title: "Lead Management",
        icon: "bx bx-pie-chart-alt-2",
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
        icon: "bx bx-female",
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
            title: "Role & Matrix",
            path: "/role/add",
            access: storedScreens.rolesMatrixIndex,
          },
        ],
      },
      {
        title: "Student Management",
        icon: "bx bx-book-reader",
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
        ],
      },
      {
        title: "Schedule",
        icon: "bx bx-alarm-add",
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
        icon: "bx bx-folder-open",
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
        icon: "bx bx-spreadsheet",
        isOpen: false,
        subMenus: [
          {
            title: "Invoice",
            path: "/invoice",
            access: storedScreens.invoiceIndex,
          },
          // {
          //   title: "Payment",
          //   path: "/payment",
          //   access: storedScreens.paymentIndex,
          // },
          // Add more submenus as needed
        ],
      },

      {
        title: "Report Management",
        icon: "bx bx-food-menu",
        isOpen: false,
        subMenus: [
          {
            title: "Document Report",
            path: "/report/document",
            access: storedScreens.documentReportIndex,
          },
          {
            title: "Attendance Report",
            path: "/report/attendance",
            access: storedScreens.attendanceReportIndex,
          },
          {
            title: "Student Report",
            path: "/report/studentreport",
            access: storedScreens.studentReportIndex,
          },
          {
            title: "Assessment Report",
            path: "/report/assessment",
            access: storedScreens.assessmentReportIndex,
          },
          {
            title: "Enrolment Report",
            path: "/report/enrolment",
            access: storedScreens.enrollmentReportIndex,
          },
          {
            title: "Fee Collection Report",
            path: "/report/fee",
            access: storedScreens.feeCollectionReportIndex,
          },
          {
            title: "Package Balance Report",
            path: "/report/package",
            access: storedScreens.packageBalanceReportIndex,
          },
          {
            title: "Sales Revenue Report",
            path: "/report/sales",
            access: storedScreens.salesRevenueReportindex,
          },
          {
            title: "Replace Class Lesson List",
            path: "/report/replace_class",
            access: storedScreens.replaceClassLessonListindex,
          },
        ],
      },
      {
        title: "Content Management",
        icon: "bx bx-message-edit",
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
            access:storedScreens.blogIndex,
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
          // {
          //   title: "English Course",
          //   path: "/cms/englishcourse",
          //   access: storedScreens.englishCourseIndex,
          // },
          // {
          //   title: "Chinese Course",
          //   path: "/cms/chineshcourse",
          //   access: storedScreens.chineseCourseIndex,
          // },
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
        icon: "bx bx-cog",
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
        ],
      },
      {
        title: "Messaging",
        icon: "bx bx-send",
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
          // Add more submenus as needed
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
          <img src={Logo} alt="logo" width={130} className="img-fluid" />
        </span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" onClick={() => handleMenuClick(null)}>
          <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="home-tooltip">Home</Tooltip>}
            >
              <i className="bx bx-grid-alt"></i>
            </OverlayTrigger>
            <span className="links_name">Home</span>
          </NavLink>
        </li>

        {menuItems.map(
          (item, index) =>
            item.subMenus.some((subMenu) => subMenu.access) && (
              <li key={index}>
                <Nav.Link
                  to="#"
                  onClick={() => handleMenuClick(index)}
                  className={activeMenu === item.title ? "active" : ""}
                >
                  <div
                    className="w-100 d-flex justify-content-between"
                    style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                  >
                    <span>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id={`${item.title}-tooltip`}>
                            {item.title}
                          </Tooltip>
                        }
                      >
                        <span>
                          <i className={item.icon}></i>
                        </span>
                      </OverlayTrigger>
                      <span className="links_name">{item.title}</span>
                    </span>
                    <span>
                      <i
                        className={`bx bx-chevron-down arrow ${
                          item.isOpen ? "open" : ""
                        }`}
                        style={{
                          paddingRight: "5px",
                          minWidth: "0px",
                          fontWeight: "700",
                        }}
                      ></i>
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
                              className="links_name"
                              activeClassName="active-submenu"
                            >
                              <OverlayTrigger
                                placement="right"
                                overlay={
                                  <Tooltip id={`${subMenu.title}-tooltip`}>
                                    {subMenu.title}
                                  </Tooltip>
                                }
                              >
                                <i className="bx bx-radio-circle-marked"></i>
                              </OverlayTrigger>
                              <span className="links_name links_names">
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
        {/* {storedScreens?.sendNotificationIndex && (
          <li>
            <NavLink
              to="/sendNotification"
              onClick={() => handleMenuClick(null)}
            >
              <i class="bx bx-send"></i>
              <span className="links_name">Announcement</span>
            </NavLink>
          </li>
        )} */}
      </ul>
    </div>
  );
}

export default Sidebar;
