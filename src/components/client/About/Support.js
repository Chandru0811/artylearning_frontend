import React from "react";
import Glass from "../../../assets/clientimage/glass-painting.png";

function Support() {
  return (
    <section className="support">
      <div className="container-fluid backgound-imag-2">
        <div className="container pt-4" style={{ minHeight: "80vh" }}>
          <div className="row pt-5">
            <div
              className="col-md-5 col-12 d-flex align-items-center justify-content-end paint"
            >
              <img
                src={Glass}
                style={{
                  borderRight: "10px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                }}
                alt="glass"
                className="img-fluid"
              ></img>
            </div>
            <div
              className="col-md-7 col-12 p-5"
              style={{
                backgroundColor: "#dab25a",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                borderRight: "10px solid #000",
              }}
            >
              <p>
                With <b>unwavering support</b> from their family, the{" "}
                <b>Wonder Sisters </b>
                embarked on their journey to establish Arty Learning.
              </p>
              <p>
                Rooted in a foundation of <b>strong family values,</b> they held
                a steadfast conviction in ensuring that every child, regardless
                of their background, had equal opportunities to acquire language
                skills and flourish.
              </p>
              <p>
                Their dedication to this cause not only resonated in their
                beliefs but was also demonstrated through the{" "}
                <b>unwavering support </b>
                they provided to ensure the success of each and every child, as
                well as their staff.
              </p>
              <p>
                In their relentless pursuit of growth and skill enhancement, the
                <b> Wonder Sisters</b> pursued a diverse array of
                certifications.
              </p>
              <p>
                These encompassed being First Aid Certified with CPR + AED
                provider, achieving the status of Certified Practitioners of
                Neuro-Linguistic Enneagram, and successfully completing the
                Positive Focus Impact Training for Educators.
              </p>
              <p>
                Amanda's credentials extended to a Certificate of Professional
                Practice in Phonics and a Diploma in Early Childhood Education.
                Similarly, Michelle's qualifications featured a Diploma in Early
                Literacy accredited by the London Teacher Training College. This
                comprehensive training underscored their steadfast commitment to
                delivering the utmost quality education through the platform of
                Arty Learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Support;
