import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../../../assets/clientimage/susan-liew.jpg";
import img2 from "../../../assets/clientimage/andy-ng.jpg";
import img3 from "../../../assets/clientimage/ser-yin.jpg";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function ParentSayAboutUs() {
  const responsive = {
    desktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 576 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <div className="container-fluid carousel_container px-5 slidePaddings m-0">
        <div className="text-center my-4">
          <span className="display-4 fw-bolder">What Parents Say About Us</span>
        </div>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {/* Slide 1 */}
          <div
            className="container-fluid d-flex justify-content-between align-items-center m-0"
            style={{ minHeight: "120vh" }}
          >
            <div className="row">
              <div className="offset-md-1 col-md-10 col-12 px-4 slidePaddings">
                <div className="row">
                  <div class="col-md-3 col-12 d-flex align-items-center jusify-content-center">
                    <div className="d-flex align-items-center jusify-content-center p-2">
                      <img
                        src={img1}
                        alt="img1"
                        className="img-fluid imgWidth"
                        style={{
                          borderRadius: "10px",
                          border: "2px solid yellow",
                          boxShadow: "3px 3px 4px black !important",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-9 col-12 ">
                    <span className="text-danger fs-4">
                      <FaQuoteLeft />
                    </span>
                    <p className="fw-bolder paraSize text-start">
                      So thankful that the teachers here are so patient in
                      guiding and teaching my son for 2 years. After 2 years
                      with Arty, my son is able to read and write so well! My
                      son is happily graduated just before P1 and so ready to
                      learn more in future! Will definitely enrol my twins with
                      Arty Learning's enrichment classes in time to come, and
                      recommend other parents too!
                      <span className="text-danger fs-4">
                        <FaQuoteRight />
                      </span>
                    </p>
                    <span className="fw-bolder fs-6 text-danger ">
                      Susan Liew
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div
            className="container-fluid d-flex justify-content-between align-items-center m-0"
            style={{ minHeight: "120vh" }}
          >
            <div className="row">
              <div className="offset-md-1 col-md-10 col-12 px-4">
                <div className="row">
                  <div class="col-md-3 col-12 d-flex align-items-center jusify-content-center">
                    <div className="d-flex align-items-center jusify-content-center">
                      <img
                        src={img2}
                        alt="img2"
                        className="img-fluid imgWidth"
                        style={{
                          borderRadius: "10px",
                          border: "2px solid yellow",
                          boxShadow: "3px 3px 4px black !important",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-9 col-12 ">
                    <span className="text-danger fs-4">
                      <FaQuoteLeft />
                    </span>
                    <p className="fw-bolder paraSize text-start">
                      I truly appreciate Arty Learning Team, Teacher Michelle,
                      Teacher Amanda, Teacher Felicia and other teachers who had
                      put in effort to guide, and coach Alyssa with patience! It
                      has been a wonderful journey with all of you! The
                      creativity and passion of teaching amazed me! You guys
                      have been a great help in assisting parents! Keep going
                      and shaping the children's growing mind! Thank you so
                      much!❤️❤️
                      <span className="text-danger fs-4">
                        <FaQuoteRight />
                      </span>
                    </p>
                    <span className="fw-bolder fs-6 text-danger ">Andy Ng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div
            className="container-fluid d-flex justify-content-between align-items-center m-0"
            style={{ minHeight: "120vh" }}
          >
            <div className="row">
              <div className="offset-md-1 col-md-10 col-12 px-4">
                <div className="row">
                  <div class="col-md-3 col-12 d-flex align-items-center jusify-content-center">
                    <div className="d-flex align-items-center jusify-content-center">
                      <img
                        src={img3}
                        alt="img3"
                        className="img-fluid imgWidth"
                        style={{
                          borderRadius: "10px",
                          border: "2px solid yellow",
                          boxShadow: "3px 3px 4px black !important",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-9 col-12 ">
                    <span className="text-danger fs-4">
                      <FaQuoteLeft />
                    </span>
                    <p className="fw-bolder paraSize text-start">
                      曹老师 holds very interesting lessons that captivates my
                      girl's attention and kept her focused during class. She is
                      now able to write her name well and recognises more
                      Chinese words. In fact the art pieces and songs used
                      during lessons helped my girl remember better..Strongly
                      encourage parents to join Arty Chinese where children
                      learn during play and enjoy their lessons!
                      <span className="text-danger fs-4">
                        <FaQuoteRight />
                      </span>
                    </p>
                    <span className="fw-bolder fs-6 text-danger ">SeR Yin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4 */}
          <div
            className="container-fluid d-flex justify-content-between align-items-center m-0"
            style={{ minHeight: "120vh" }}
          >
            <div className="row">
              <div className="offset-md-1 col-md-10 col-12 px-4">
                <div className="row">
                  {/* <div class="col-md-3 col-12 d-flex align-items-center jusify-content-center">
                    <div className="d-flex align-items-center jusify-content-center">
                      <img
                        src={img2}
                        alt="img2"
                        className="img-fluid imgWidth"
                        style={{
                          borderRadius: "10px",
                          border: "2px solid yellow",
                          boxShadow: "3px 3px 4px black !important",
                        }}
                      />
                    </div>
                  </div> */}

                  <div className="col-md-12 col-12 ">
                    <span className="text-danger fs-4">
                      <FaQuoteLeft />
                    </span>
                    <p className="fw-bolder paraSize text-start">
                      5 Stars for Arty Learning - a very good center for young
                      children to start learning how to read and write words,
                      sentences, and even passages. <br />
                      <br /> We got to know about Arty Learning by word of mouth
                      and decided to give it a try since people around me (not
                      one but more than one) have raved about it. I was a great
                      choice. <br />
                      <br /> Arty has a small class size and good updates on my
                      kid's progress. It is a small class of 4 kids to 1
                      teacher, so there is good attention and interaction with
                      the teacher. After each session (within the same day), the
                      teachers will upload photos and videos of phonics concepts
                      learned in class. From there, we are able to know the
                      learning progress of my girl and revise concepts when
                      necessary. <br />
                      <br /> We also believe that kids should learn through
                      play. The teachers at Arty Learning are very young and
                      interactive. In an enjoyable setting, my girl picked up
                      phonics very quickly. She enjoys talking to the teachers
                      and she looks forward to every Arty class and even doing
                      the homework given. <br />
                      <br /> I strongly recommend Arty Learning to any parents
                      looking to nurture a strong interest and foundation in the
                      English Language in their children. &nbsp;
                      <span className="text-danger fs-4">
                        <FaQuoteRight />
                      </span>
                    </p>
                    <span className="fw-bolder fs-6 text-danger ">
                      Xinni Lin
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 5 */}
          <div
            className="container-fluid d-flex justify-content-between align-items-center m-0"
            style={{ minHeight: "120vh" }}
          >
            <div className="row">
              <div className="offset-md-1 col-md-10 col-12 px-4">
                <div className="row">
                  {/* <div class="col-md-3 col-12 d-flex align-items-center jusify-content-center">
                    <div className="d-flex align-items-center jusify-content-center">
                      <img
                        src={img2}
                        alt="img2"
                        className="img-fluid imgWidth"
                        style={{
                          borderRadius: "10px",
                          border: "2px solid yellow",
                          boxShadow: "3px 3px 4px black !important",
                        }}
                      />
                    </div>
                  </div> */}

                  <div className="col-md-12 col-12 d-flex flex-column align-items-center justify-content-center">
                    <p className="fw-bolder paraSize text-start">
                      <span className="text-danger fs-4">
                        <FaQuoteLeft />
                      </span>
                      &nbsp;I first came to know about Arty Learning's
                      enrichment classes in 2019 when I was searching around for
                      phonic classes for my elder daughter. Apart from being
                      strongly recommended by other fellow mothers, I was drawn
                      to its low teacher:child ratio and how it incorporated
                      hands on activities into the lessons. My elder daughter
                      enjoyed every lesson and is thriving well in primary
                      school now. Every teacher that we have crossed paths with
                      are competent, loving, patient and engaging. As parents we
                      look forward to the weekly face to face feedback and also
                      videos for us to reinforce the concepts at home
                      <br />
                      <br />
                      When my younger girl G started in 2022, she took a while
                      to warm up and Teacher Amanda went above and beyond to
                      ensure she was placed in a suitable class and settled in
                      well. Her listening ear and words of encouragement for us
                      to persevere on together is something that I doubt can be
                      found in any other centres, and for which I am very
                      grateful for. Teacher Amanda and Teacher Michelle have
                      always ensured that their team of teachers are familiar
                      with every child, even if they might not be under their
                      charge. We have never failed to be greeted with smiles and
                      warm welcomes, and G adapts well even if it’s a covering
                      teacher on rare occasions.
                      <br />
                      <br />
                      As such I also had full faith when G was assigned to be
                      under Teacher Rina. 1 year on, G has blossomed incredibly
                      under the loving guidance of Teacher Rina. Apart from
                      ensuring each lesson content is well delivered and
                      enjoyable, Teacher Rina goes the extra mile in
                      understanding other aspects of G’s overall development and
                      suggests ways we can work hand in hand too. We deeply
                      appreciate all the encouraging personal feedback that she
                      takes time to give every parent, as with all the other
                      teachers in the team. Efficient communication with the
                      teachers is also made possible with their portal through
                      which we can receive messages and individual videos of our
                      child during lesson.
                      <br />
                      <br />
                      Arty Learning is a centre which prioritises every child’s
                      well being and effective learning. Their commitment to
                      nurturing each child to be ready not only for school, but
                      for life, is truly commendable. My girls are blessed to be
                      part of this family and I sincerely hope many more
                      children will be able to experience the same too. Thank
                      you Arty Learning!&nbsp;
                      <span className="text-danger fs-4">
                        <FaQuoteRight />
                      </span>
                    </p>
                  </div>
                  <span className="fw-bolder fs-6 text-danger ">
                    Joanna (2 Daughters, 7years old, 5years old)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Carousel>

        <div className="fs-4 text-center my-3">
          <Link
            to={"https://www.facebook.com/artylearning/reviews"}
            style={{ color: "red" }}
          >
            Click Here For More Testimonials
          </Link>
        </div>
      </div>
    </>
  );
}

export default ParentSayAboutUs;
