import React, { useEffect, useState } from "react";
import account from "../../assets/clientimage/account.png";
import calender from "../../assets/clientimage/calendar.png";
import comment from "../../assets/clientimage/comment.png";
import ArtyLearningCalender from "../../assets/clientimage/ArtyLearningCalender.jpeg";
import { useParams } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";

function Calender() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  // console.log(data);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllNewsUpdatedSavePublishById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data", error);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="newsupdate">
      <div className="container">
        <div className="row py-5">
          <div className="offset-md-1 col-md-10 col-12">
            <p className="heading">
              {data.heading || "2024 Arty Learning Calendar"}
            </p>
            <div className="row my-3">
              <div className="col-md-4 col-12">
                <img
                  src={account}
                  width={"20px"}
                  height={"20px"}
                  alt="account"
                />{" "}
                &nbsp;&nbsp;
                <span style={{ fontSize: "20px" }}>
                  {data.role || "Admin"}
                </span>
              </div>
              <div className="col-md-4 col-12">
                <img
                  src={calender}
                  width={"20px"}
                  height={"20px"}
                  alt="calender"
                />
                &nbsp;&nbsp;
                <span style={{ fontSize: "20px" }}>
                  {data.date || "October 1st, 2024"}
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
                <span style={{ fontSize: "20px" }}>
                  {data.comment || "No Comments"}
                </span>
              </div>
            </div>

            <img
              src={data.cardImageOne || ArtyLearningCalender}
              className="img-fluid"
              alt="ArtyLearningCalender"
              style={{ borderRadius: "5px" }}
            />

            <div className="comment pt-5 mt-3">
              {/* <h4 className="mb-3">Leave a Reply</h4> */}
              <p className="mb-3">
                {data.para || "Stay informed with our latest news and updates. Discover exciting news and upcoming events from Arty Learning. Come"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calender;
