import React, { useState } from 'react';
import Profile from "../../assets/images/profile.png";
import { IoIosSettings } from "react-icons/io";
import Signature from "../../assets/images/signature.jpg";
import { FaBook, FaUsers, FaPlus } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiSolidMessageRounded } from "react-icons/bi";
import StudentViewCourse from "../../pages/Student/StudentNewView/StudentViewCourse";
import StudentViewInvoice from "../../pages/Student/StudentNewView/StudentViewInvoice";
import StudentViewPayment from "../../pages/Student/StudentNewView/StudentViewPayment";
import StudentViewCreditNotes from "../../pages/Student/StudentNewView/StudentViewCreditNotes";
import StudentViewAbsentRecord from "../../pages/Student/StudentNewView/StudentViewAbsentRecord";
import ReferralList from "../../pages/Student/StudentNewView/ReferralList";

function StudentNewView() {
    const [activeTab, setActiveTab] = useState("tab1");
    const [subActiveTab, setSubActiveTab] = useState("tabA");

    const handleMainTabClick = (tab) => {
        setActiveTab(tab);

        if (tab === "tab1") {
            setSubActiveTab("tabA");
        } else if (tab === "tab2") {
            setSubActiveTab("tabB");
        }
    };

    return (
        <section className='p-3'>
            <div className='container-fluid studentView'>
                <div className='row mb-3'>
                    <div className='col-md-3 col-12 mb-3'>
                        <div className='card' style={{ padding: "10px" }}>
                            <div className='d-flex flex-column align-items-center'>
                                <img src={Profile} alt='Profile' className='img-fluid stdImg' />
                                <p className='fw-medium mt-2 mb-1'>Kalai Arasen Perumal</p>
                            </div>
                            <p className='stdSettings mb-0'><IoIosSettings /> Edit</p>
                            <p className='stdSettings mt-1 mb-0'><IoIosSettings /> Student Detail PDF</p>
                            <hr className='mt-2 mb-0' />
                            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                <li className='stdList'>
                                    <b>Student ID</b>
                                    <span>S000100</span>
                                </li>
                                <li className='stdList'>
                                    <b>Centre</b>
                                    <span>Arty@hougang</span>
                                </li>
                                <li className='stdList'>
                                    <b>Gender</b>
                                    <span>Female</span>
                                </li>
                                <li className='stdList'>
                                    <b>Nationality</b>
                                    <span></span>
                                </li>
                                <li className='stdList'>
                                    <b>School</b>
                                    <span>Kindergarten / adsa</span>
                                </li>
                                <li className='stdList'>
                                    <b>D.O.B</b>
                                    <span>1 February 2000 ( 24 years 10 months old )</span>
                                </li>
                                <li className='stdList'>
                                    <b>Date Enrolled</b>
                                    <span>29 October 2023</span>
                                </li>
                                <li className='stdList'>
                                    <b>Status</b>
                                    <span>Active</span>
                                </li>
                                <li className='stdList'>
                                    <b>Refer By Parent</b>
                                    <span></span>
                                </li>
                                <li className='stdList'>
                                    <b>Refer By Student</b>
                                    <span></span>
                                </li>
                                <li className='stdList'>
                                    <b>Signature</b>
                                    <span>
                                        <div style={{ textAlign: "left" }}>
                                            <div style={{ marginBottom: "4px" }}>
                                                <img src={Signature} alt="Signature" className='img-fluid' style={{ width: "100px", height: "50px", border: "1px solid #ccc" }} />
                                            </div>
                                        </div>
                                        2024-09-27
                                    </span>
                                </li>
                                <li className='stdList'>
                                    <b>T&C Signature</b>
                                    <span>
                                        <div style={{ textAlign: "left" }}>
                                            <div style={{ marginBottom: "4px" }}>
                                                <img src={Signature} alt="Signature" className='img-fluid' style={{ width: "100px", height: "50px", border: "1px solid #ccc" }} />
                                            </div>
                                        </div>
                                        2024-09-27
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-md-3 col-12 mb-3'>
                        <div className='card mb-3'>
                            <div className='withBorder'>
                                <p className='fw-medium ms-3 my-2'><FaBook size={20} />&nbsp;&nbsp;Course</p>
                            </div>
                            <div style={{ padding: "10px" }}>
                                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                    <li className='stdList' style={{ borderTop: "1px solid #ddd" }}>
                                        <b>Current Course</b>
                                        <span>Sunday Class</span>
                                    </li>
                                    <li className='stdList'>
                                        <b>Teacher</b>
                                        <span>-</span>
                                    </li>
                                    <li className='stdList'>
                                        <b>Start Date</b>
                                        <span>29-10-2023</span>
                                    </li>
                                    <li className='stdList'>
                                        <b>Last Lesson Attendance</b>
                                        <span>-</span>
                                    </li>
                                    <li className='stdList'>
                                        <b>Last Payment Made</b>
                                        <span>-</span>
                                    </li>
                                    <li className='stdList'>
                                        <b>Last Paid Lesson Date</b>
                                        <span>-</span>
                                    </li>
                                    <li className='stdList'>
                                        <b>Pre-Assessment Result</b>
                                        <span>No Assessment Performed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='withBorder'>
                                <p className='fw-medium ms-3 my-2'>Account Activate/Deactivate</p>
                            </div>
                            <div style={{ padding: "10px" }}>
                                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                    <li className='stdList1' style={{ borderTop: "1px solid #ddd" }}>
                                        <div class="dropdown">
                                            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Activate
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#">Deactivate</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className='stdList'>
                                        <b>Hikvision Status</b>
                                        <span>No</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 col-12 mb-3'>
                        <div className='card mb-3'>
                            <div className='withBorder'>
                                <p className='fw-medium ms-3 my-2'><FaUsers size={20} />&nbsp;&nbsp;Family</p>
                                <p className='stdSettings mb-0 me-2'><FaPlus /> Edit</p>
                                <p className='stdSettings mt-1 mb-0 me-2'><FaPlus /> Student Detail PDF</p>
                                <p className='stdSettings my-1 me-2'><FaPlus /> Student Detail PDF</p>
                            </div>
                            <div style={{ padding: "10px" }}>
                                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                    <li className='stdList' style={{ borderTop: "1px solid #ddd" }}>
                                        <p className='m-0'>
                                            <b>Name</b>
                                            <span>asdsad</span>
                                        </p>
                                        <p className='m-0'>
                                            <b>Mobile No</b>
                                            <span>+65 87872193</span>
                                        </p>
                                        <p className='m-0'>
                                            <b>Email</b>
                                            <span>kalai_knight@live.com</span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='card mb-3'>
                            <div className='withBorder'>
                                <p className='fw-medium ms-3 my-2'><FaUsers size={20} />&nbsp;&nbsp;Emergency Contact</p>
                            </div>
                            <div style={{ padding: "10px" }}>
                                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                    <li className='stdList' style={{ borderTop: "1px solid #ddd" }}>
                                        <p className='m-0'>
                                            <b>Name</b>
                                            <span></span>
                                        </p>
                                        <p className='m-0'>
                                            <b>Mobile No</b>
                                            <span>+65</span>
                                        </p>
                                        <p className='m-0'>
                                            <b>Relation</b>
                                            <span></span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='withBorder'>
                                <p className='fw-medium ms-3 my-2'><FaUsers size={20} />&nbsp;&nbsp; Authorized Person</p>
                            </div>
                            <div style={{ padding: "10px" }}>
                                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                    <li className='stdList' style={{ borderTop: "1px solid #ddd" }}>
                                        <p className='m-0'>
                                            <b>Name</b>
                                            <span></span>
                                        </p>
                                        <p className='m-0'>
                                            <b>Mobile No</b>
                                            <span>+65</span>
                                        </p>
                                        <p className='m-0'>
                                            <b>Relation</b>
                                            <span></span>
                                        </p>
                                        <p className='m-0'>
                                            <b>Address</b>
                                            <span></span>
                                        </p>
                                        <p className='m-0'>
                                            <b>Postal Code</b>
                                            <span></span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 col-12 mb-3'>
                        <div className='card mb-3'>
                            <div className='withBorder'>
                                <p className='fw-medium ms-3 my-2'><IoNotificationsOutline size={20} />&nbsp;&nbsp;Outstanding</p>
                                <p className='stdSettings my-1 me-2'><IoIosSettings /> Change Password</p>
                            </div>
                            <div style={{ padding: "10px" }}>
                                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                    <li className='stdList' style={{ borderTop: "1px solid #ddd" }}>
                                        <b>Outstanding</b>
                                        <span className='text-danger'>0.00</span>
                                    </li>
                                    <li className='stdList'>
                                        <b>Deposit Amount (Imported)</b>
                                        <span style={{ color: "#fa994af5" }}>0.00</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='card mb-3'>
                            <div className='withBorder'>
                                <p className='fw-medium ms-3 my-2'><BiSolidMessageRounded size={20} />&nbsp;&nbsp;Remark</p>
                                <p className='text-end me-2'>
                                    <button className='btn btn-success btn-sm' type='button'><FaPlus /> Add Task Note</button>
                                </p>
                            </div>
                            <div style={{ padding: "10px", height: "200px" }}></div>
                        </div>
                        <div className='card' style={{ padding: "10px" }}>
                            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                <li className='stdList' style={{ borderTop: "1px solid #ddd" }}>
                                    <b>Upload Assessment Form</b>
                                    <input type='file' className='form-control form-control-sm mt-1' />
                                </li>
                                <li className='stdList'>
                                    <b>Upload Enrollment Form</b>
                                    <input type='file' className='form-control form-control-sm mt-1' />
                                </li>
                                <button className='btn btn-danger btn-sm mt-2' type='button'>Save</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='card' style={{ borderRadius: "3px" }}>
                    <div className='d-flex gap-2' style={{ padding: "10px" }}>
                        <button className='btn btn-success btn-sm' type='button' style={{ fontSize: "12px" }}>Change Class</button>
                        <button className='btn btn-success btn-sm' type='button' style={{ fontSize: "12px" }}>Transfer Out</button>
                        <button className='btn btn-success btn-sm' type='button' style={{ fontSize: "12px" }}>Withdraw</button>
                        <button className='btn btn-success btn-sm' type='button' style={{ fontSize: "12px" }}>End Class</button>
                        <button className='btn btn-success btn-sm' type='button' style={{ fontSize: "12px" }}>Register New Course</button>
                    </div>
                    <ul className="nav nav-tabs stdNavTabs" style={{ justifyContent: "start" }}>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                                onClick={() => handleMainTabClick("tab1")}
                                style={{
                                    borderTop: activeTab === "tab1" ? "3px solid #fa994af5" : "none",
                                    borderRadius: "0px"
                                }}
                            >
                                Course/Lessons
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                                onClick={() => handleMainTabClick("tab2")}
                                style={{
                                    borderTop: activeTab === "tab2" ? "3px solid #fa994af5" : "none",
                                    borderRadius: "0px"
                                }}
                            >
                                Account Summary
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
                                onClick={() => setActiveTab("tab3")}
                                style={{
                                    borderTop: activeTab === "tab3" ? "3px solid #fa994af5" : "none",
                                    borderRadius: "0px"
                                }}
                            >
                                Referral List
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content mt-2">
                        {/* Tabs for tab1 */}
                        {activeTab === "tab1" && (
                            <>
                                <ul className="nav nav-tabs stdNavTabs" style={{ justifyContent: "start" }}>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${subActiveTab === "tabA" ? "active" : ""}`}
                                            onClick={() => setSubActiveTab("tabA")}
                                            style={{
                                                borderTop: subActiveTab === "tabA" ? "3px solid #fa994af5" : "none",
                                                borderRadius: "0px"
                                            }}
                                        >
                                            Course
                                        </button>
                                    </li>
                                </ul>
                                {/* Table for TabA */}
                                {subActiveTab === "tabA" && (
                                    <StudentViewCourse />
                                )}
                            </>
                        )}

                        {/* Tabs for tab2 */}
                        {activeTab === "tab2" && (
                            <>
                                <ul className="nav nav-tabs stdNavTabs" style={{ justifyContent: "start" }}>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${subActiveTab === "tabB" ? "active" : ""}`}
                                            onClick={() => setSubActiveTab("tabB")}
                                            style={{
                                                borderTop: subActiveTab === "tabB" ? "3px solid #fa994af5" : "none",
                                                borderRadius: "0px"
                                            }}
                                        >
                                            Invoice
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${subActiveTab === "tabC" ? "active" : ""}`}
                                            onClick={() => setSubActiveTab("tabC")}
                                            style={{
                                                borderTop: subActiveTab === "tabC" ? "3px solid #fa994af5" : "none",
                                                borderRadius: "0px"
                                            }}
                                        >
                                            Payment
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${subActiveTab === "tabD" ? "active" : ""}`}
                                            onClick={() => setSubActiveTab("tabD")}
                                            style={{
                                                borderTop: subActiveTab === "tabD" ? "3px solid #fa994af5" : "none",
                                                borderRadius: "0px"
                                            }}
                                        >
                                            Credit Notes
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${subActiveTab === "tabE" ? "active" : ""}`}
                                            onClick={() => setSubActiveTab("tabE")}
                                            style={{
                                                borderTop: subActiveTab === "tabE" ? "3px solid #fa994af5" : "none",
                                                borderRadius: "0px"
                                            }}
                                        >
                                            Absent Record With Deposit Balance
                                        </button>
                                    </li>
                                </ul>
                                {/* Table for TabB */}
                                {subActiveTab === "tabB" && (
                                    <StudentViewInvoice />
                                )}
                                {/* Table for TabC */}
                                {subActiveTab === "tabC" && (
                                    <StudentViewPayment />
                                )}
                                {/* Table for TabD */}
                                {subActiveTab === "tabD" && (
                                    <StudentViewCreditNotes />
                                )}
                                {/* Table for TabE */}
                                {subActiveTab === "tabE" && (
                                    <StudentViewAbsentRecord />
                                )}
                            </>
                        )}
                        {/* Tabs for tab3 */}
                        {activeTab === "tab3" && (
                            <ReferralList />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StudentNewView;