import React from "react";
import imgs1 from "../../assets/clientimage/threebookArty.png";
import imgs2 from "../../assets/clientimage/ntxauso.png";
import imgs3 from "../../assets/clientimage/antbook.png";
import imgs4 from "../../assets/clientimage/watermelonfruits.png";
import imgs5 from "../../assets/clientimage/cards-animated.gif";
import { IoIosCart } from "react-icons/io";
import Carousel from "react-multi-carousel";

function Products() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
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
      <div class="container">
        <div className="row">
          <div className="offset-md-3 col-md-6 col-12">
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              transitionDuration={500}
              showDots={true}
              arrows={true}
              swipeable={false}
              draggable={false}
              // ssr={true} // means to render carousel on server-side.
              customTransition="transform 500ms ease-in-out"
              keyBoardControl={true}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              // customDot={<CustomDot />}
            >
              <div>
                <img className="img-fluid" src={imgs1} alt="Slide 1" />
              </div>
              <div>
                <img className="img-fluid" src={imgs2} alt="Slide 2" />
              </div>
              <div>
                <img className="img-fluid" src={imgs3} alt="Slide 3" />
              </div>
              <div>
                <img className="img-fluid" src={imgs4} alt="Slide 4" />
              </div>
            </Carousel>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-3 col-md-6 col-12">
            <h1
              className="text-center fw-bolder mt-5"
              style={{ fontSize: "xxx-large" }}
            >
              A-Z Phonics Card
            </h1>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <img className="img-fluid" src={imgs5} alt="Slide 4" />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p
                className="text-center fw-small mt-5"
                style={{ fontSize: "large" }}
              >
                These cards are specially designed for parents to entice and
                help children to the letter sounds and assoiation. Each box of
                cards have different set of words so it will never be reapeted.
              </p>
              <p
                className="text-center fw-small mt-3"
                style={{ fontSize: "large" }}
              >
                There is a QR code which links user to a private Youtube channel
                on the phonics sounds as well as any new updates Arty Learning
                puts up.
              </p>
              <button
                className="m-5 shadow btn btn-danger"
                style={{ background: "red" }}
              >
                <IoIosCart />
                &nbsp; Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
