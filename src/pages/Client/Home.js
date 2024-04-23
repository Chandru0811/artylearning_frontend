import React from "react";
import Hero from "../../components/client/Home/Hero";
import EnrichmentClass from "../../components/client/Home/EnrichmentClass";
import WhyArtyLearning from "../../components/client/Home/WhyArtyLearning";
import ParentSayAboutUs from "../../components/client/Home/ParentSayAboutUs";
import Youtube from "../../components/client/Home/Youtube";
import FreeAssessment from "../../components/client/Home/FreeAssessment";

function Home() {
  return (
    <section>
      <Hero />
      <EnrichmentClass />
      <WhyArtyLearning />
      <Youtube />
      <ParentSayAboutUs/>
      <FreeAssessment />
    </section>
  );
}

export default Home;
