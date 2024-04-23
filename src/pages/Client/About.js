import React from "react";
import AboutUs from "../../components/client/About/AboutUs";
import Support from "../../components/client/About/Support";
import AboutAmanda from "../../components/client/About/AboutAmanda";
import Personalized from "../../components/client/About/Personalized";
import AboutJoinUs from "../../components/client/About/AboutJoinUs";

function About() {
  return (
    <section className="about_us">
      <AboutUs />
      <Support />
      <AboutAmanda />
      <Personalized />
      <AboutJoinUs />
    </section>
  );
}

export default About;
