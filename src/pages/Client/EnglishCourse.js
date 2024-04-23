import React from "react";
import EnglishBanner from "../../components/client/EnglishCourse/EnglishBanner";
import EnglishCourseListing from "../../components/client/EnglishCourse/EnglishCourseListing";
import LeadForm from "../../components/client/EnglishCourse/LeadForm";

function EnglishCourse() {
  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
      <EnglishBanner />
      <EnglishCourseListing />
     <LeadForm />
    </section>
  );
}

export default EnglishCourse;
