import React, { useEffect, useState } from "react";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import CmsBanner from "./CmsBanner";
import CmsCourseListing from "./CmsCourseListing";

export default function CmsCourseEdit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const getData = async () => {
    try {
      const response = await api.get(`/getCoursesSaveById/${id}`);
      const fetchedData = response.data;
      setData(fetchedData);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handelPublishEnglishCourse = async () => {
    try {
      const response = await api.post(`publishCourseSaveChinese`);
      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (e) {
      toast.warning("Error Publish Data ", e.response.data.message);
    }
  };

  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
      <div className="container cms-header shadow-sm py-2">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Course</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {/* {storedScreens?.chineseCoursePublish && (
              <button
                className="btn btn-sm btn-outline-danger border ms-2"
                onClick={handelPublishEnglishCourse}
              >
                Publish
              </button>
            )} */}
            <Link to={'/cms/CmsCourses'}>
              <button
                className="btn btn-sm btn-outline-danger border ms-2"
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>

      <CmsBanner
        data={data}
        menuLogo={data.menuLogo}
        menuTitle={data.menuTitle}
        backgroundImage={data.backgroundImage}
        heading={data.heading}
        contentOne={data.contentOne}
        getData={getData}
        courseId={id}
      />
      <CmsCourseListing
        contentTwo={data.contentTwo}
        cardOneImage={data.cardOneImage}
        cardOneHeading={data.cardOneHeading}
        cardOneContent={data.cardOneContent}
        cardTwoImage={data.cardTwoImage}
        cardTwoHeading={data.cardTwoHeading}
        cardTwoContent={data.cardTwoContent}
        cardThreeImage={data.cardThreeImage}
        cardThreeHeading={data.cardThreeHeading}
        cardThreeContent={data.cardThreeContent}
        finalContent={data.finalContent}
        getData={getData}
        courseId={id}
      />
    </section>
  );
}
