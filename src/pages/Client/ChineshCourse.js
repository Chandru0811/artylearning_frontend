import React from "react";
import ChineseBanner from "../../components/client/Chinese/ChineseBanner";
import ChineseCourseListing from "../../components/client/Chinese/ChineseCourseListing";
import LeadForm from "../../components/client/EnglishCourse/LeadForm";

function ChineshCourse() {
  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
      <ChineseBanner />
      <ChineseCourseListing />
      <LeadForm />
    </section>
  );
}

export default ChineshCourse;
