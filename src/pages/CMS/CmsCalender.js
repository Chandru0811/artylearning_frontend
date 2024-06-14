import React, { useState } from "react";
import account from "../../assets/clientimage/account.png";
import calenderIcon from "../../assets/clientimage/calendar.png";
import comment from "../../assets/clientimage/comment.png";
import ArtyLearningCalender from "../../assets/clientimage/ArtyLearningCalender.jpeg";
import { FaEdit, FaSave } from "react-icons/fa";

const CmsCalender = () => {
    const [editingField, setEditingField] = useState(null);
    const [admin, setadmin] = useState("admin");
    const [calender, setcalender] = useState("October 1st, 2023");
    const [comments, setcomments] = useState("No Comments");
    const [heading, setheading] = useState("2024 Arty Learning Calender");


    const toggleEdit = (field) => {
        setEditingField(field);
    };

    const saveContent = () => {
        setEditingField(null);
    };

    return (
        <div className="newsupdate">
            <div className="container">
                <div className="row py-5">
                    <div className="offset-md-1 col-md-10 col-12">
                        <span className="edit-container">
                            {editingField === "heading" ? (
                                <input
                                    type="text"
                                    value={heading}
                                    onChange={(e) => setheading(e.target.value)}
                                    className="topbar-wordpress w-100"
                                />
                            ) : (
                                heading
                            )}
                            {editingField === "heading" ? (
                                <button
                                    className="btn btn-sm btn-outline-primary border ms-2"
                                    onClick={saveContent}
                                >
                                    <FaSave />
                                </button>
                            ) : (
                                <button
                                    className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                                    onClick={() => toggleEdit("heading")}
                                >
                                    <FaEdit />
                                </button>
                            )}
                        </span>
                        <div className="row my-3">
                            <div className="col-md-4 col-12">
                                <img
                                    src={account}
                                    width={"20px"}
                                    height={"20px"}
                                    alt="account"
                                />{" "}
                                &nbsp;&nbsp;
                                <span className="edit-container">
                                    {editingField === "admin" ? (
                                        <input
                                            type="text"
                                            value={admin}
                                            onChange={(e) => setadmin(e.target.value)}
                                            className="topbar-wordpress w-100"
                                        />
                                    ) : (
                                        admin
                                    )}
                                    {editingField === "admin" ? (
                                        <button
                                            className="btn btn-sm btn-outline-primary border ms-2"
                                            onClick={saveContent}
                                        >
                                            <FaSave />
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                                            onClick={() => toggleEdit("admin")}
                                        >
                                            <FaEdit />
                                        </button>
                                    )}
                                </span>
                            </div>
                            <div className="col-md-4 col-12">
                                <img
                                    src={calenderIcon}
                                    width={"20px"}
                                    height={"20px"}
                                    alt="calender"
                                />
                                &nbsp;&nbsp;
                                <span className="edit-container">
                                    {editingField === "calender" ? (
                                        <input
                                            type="text"
                                            value={calender}
                                            onChange={(e) => setcalender(e.target.value)}
                                            className="topbar-wordpress w-100"
                                        />
                                    ) : (
                                        calender
                                    )}
                                    {editingField === "calender" ? (
                                        <button
                                            className="btn btn-sm btn-outline-primary border ms-2"
                                            onClick={saveContent}
                                        >
                                            <FaSave />
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                                            onClick={() => toggleEdit("calender")}
                                        >
                                            <FaEdit />
                                        </button>
                                    )}
                                </span>
                            </div>
                            <div className="col-md-4 col-12">
                                <img
                                    src={comment}
                                    width={"20px"}
                                    height={"20px"}
                                    alt="comment"
                                />
                                &nbsp;&nbsp;
                                <span className="edit-container">
                                    {editingField === "comments" ? (
                                        <input
                                            type="text"
                                            value={comments}
                                            onChange={(e) => setcomments(e.target.value)}
                                            className="topbar-wordpress w-100"
                                        />
                                    ) : (
                                        comments
                                    )}
                                    {editingField === "comments" ? (
                                        <button
                                            className="btn btn-sm btn-outline-primary border ms-2"
                                            onClick={saveContent}
                                        >
                                            <FaSave />
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                                            onClick={() => toggleEdit("comments")}
                                        >
                                            <FaEdit />
                                        </button>
                                    )}
                                </span>
                            </div>
                        </div>

                        <img
                            src={ArtyLearningCalender}
                            className="img-fluid"
                            alt="ArtyLearningCalender"
                            style={{ borderRadius: "5px" }}
                        />

                        <div className="comment pt-5 mt-3">
                            <h4 className="mb-3">Leave a Reply</h4>
                            <p className="mb-3">
                                Your email address will not be published.
                                <br />
                                Required fields are marked *
                            </p>
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                                <div className="form mt-3">
                                    <form>
                                        <div className="form-group mb-3">
                                            <label className="form-label h5">Comment</label>
                                            <textarea
                                                className="form-control"
                                                style={{ minHeight: "90px" }}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label h5">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ height: "50px" }}
                                            />
                                        </div>
                                        <div className=" form-group mb-3">
                                            <label className="form-label h5">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ height: "50px" }}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label h5">Website</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ height: "50px" }}
                                            />
                                        </div>
                                        <div className="mb-3" style={{ marginBottom: "20px" }}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                style={{ height: "20px", width: "20px" }}
                                            />
                                            <span className="mx-2" style={{ fontSize: "20px" }}>
                                                Save my name, email, and website in this browser for the
                                                next time I comment.
                                            </span>
                                        </div>
                                        <button className="button my-3">Post Comment</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CmsCalender;
