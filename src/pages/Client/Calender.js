import React from "react";
import account from "../../assets/clientimage/account.png";
import calender from "../../assets/clientimage/calendar.png";
import comment from "../../assets/clientimage/comment.png";
import ArtyLearningCalender from "../../assets/clientimage/ArtyLearningCalender.jpeg";

function Calender() {
  return (
    <div className="newsupdate">
      <div className="container">
        <div className="row py-5">
          <div className="offset-md-1 col-md-10 col-12">
            <p className="heading">2024 Arty Learning Calendar</p>
            <div className="row my-3">
              <div className="col-md-4 col-12">
                <img
                  src={account}
                  width={"20px"}
                  height={"20px"}
                  alt="account"
                />{" "}
                &nbsp;&nbsp;
                <span style={{ fontSize: "20px" }}>admin</span>
              </div>
              <div className="col-md-4 col-12">
                <img
                  src={calender}
                  width={"20px"}
                  height={"20px"}
                  alt="calender"
                />
                &nbsp;&nbsp;
                <span style={{ fontSize: "20px" }}>October 1st, 2023</span>
              </div>
              <div className="col-md-4 col-12">
                <img
                  src={comment}
                  width={"20px"}
                  height={"20px"}
                  alt="comment"
                />
                &nbsp;&nbsp;
                <span style={{ fontSize: "20px" }}>No Comments</span>
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

export default Calender;
