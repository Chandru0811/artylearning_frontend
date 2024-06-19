import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function ParentSayAboutUs() {
  const [datas, setDatas] = useState([]);
  console.log(datas);
  const responsive = {
    largeScreen: {
      breakpoint: { max: 2000, min: 1300 },
      items: 1,
      slidesToSlide: 1,
    },
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

  useEffect(() => {
    const getTestimonialData = async () => {
      try {
        const response = await api.get("/getAllTestimonialSavePublish");
        setDatas(response.data);
      } catch (error) {
        toast.error("Error Fetching Data: ", error.message);
      }
    };
    getTestimonialData();
  }, []);

  return (
    <>
      <div className="container-fluid carousel_container px-5  m-0">
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
          {datas &&
            datas.map((data) => (
              <div key={data.id} className="container-fluid m-0">
                <div className="row">
                  <div className="offset-md-1 col-md-10 col-12 px-4 slidePaddings">
                    <div className="row">
                        <div class="col-md-3 col-12 d-flex align-items-center jusify-content-center">
                          <div className="d-flex align-items-center jusify-content-center p-2">
                            <img
                              src={data.parentImage}
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
                          <p className="fw-bolder paraSize text-start preserve-whitespace">
                            {data.parentDescription}
                            <span className="text-danger fs-4">
                              <FaQuoteRight />
                            </span>
                          </p>
                          <span className="fw-bolder fs-6 text-danger ">
                            {data.parentName}
                          </span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Carousel>

        {/* <div className="fs-4 text-center my-3">
          <Link
            to={"https://www.facebook.com/artylearning/reviews"}
            style={{ color: "red" }}
          >
            Click Here For More Testimonials
          </Link>
        </div> */}
      </div>
    </>
  );
}

export default ParentSayAboutUs;
