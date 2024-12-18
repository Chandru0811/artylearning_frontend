import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/clientimage/Logo.png";
import api from "../../../config/URL";

function Header() {
  const expand = "xl";
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const location = useLocation();
  const [coursesListData, setCoursesListData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchAllCoursesList = async () => {
    try {
      const response = await api.get("getCoursesNameList");
      setCoursesListData(response.data);
      // console.log("getCoursesNameList:",response.data);
      
    } catch (error) {
      console.error("Error fetching courses data:", error);
      setError(error); // Set the error state
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCourseClick = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/courses/${id}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllHeaderSavePublish`);
        setData(response.data);
      } catch (error) {
        console.error("Error Fetching Data: " + error.message);
      }
    };
    getData();
    fetchAllCoursesList();
  }, []);

  const isCourseActive = location.pathname.startsWith("/courses");

  return (
    <>
      <Navbar
        expand={expand}
        className="navbar clientNavBar"
        style={{ backgroundColor: "#ffff" }}
      >
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" onClick={handleClick}>
            <img
              src={data.artyLogo || Logo}
              alt="WWG"
              width={150}
              className="img-fluid"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Arty Learning
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="navWrapper ms-5">
                <Nav className="justify-content-center align-items-center flex-grow-1 pe-3 navMenu">
                  <Nav.Link
                    as={NavLink}
                    style={{ whiteSpace: "nowrap" }}
                    to="/about"
                    onClick={handleClick}
                  >
                    About us
                  </Nav.Link>
            
                 {/* Apply active class to the "Courses" link */}
                 <NavDropdown
                    title="Courses"
                    id="courses-dropdown"
                    className={isCourseActive ? "bgActive" : ""}
                  >
                    {loading ? (
                      <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
                    ) : error ? (
                      <NavDropdown.Item disabled>
                        Error fetching courses
                      </NavDropdown.Item>
                    ) : (
                      coursesListData.map((course) => (
                        <NavDropdown.Item
                          key={course.id}
                          as={NavLink}
                          to={`/courses/${course.id}`}
                          className={`header-dropdown-menu mb-3 ${
                            location.pathname === `/courses/${course.id}` ? "active" : ""
                          }`}
                        >
                          <div style={{ verticalAlign: "middle" }}>
                            <span className="course-icons">
                              <img
                                src={course.menuLogo}
                                alt={course.menuTitle}
                                width={30}
                              />
                            </span>
                            {course.menuTitle}
                          </div>
                        </NavDropdown.Item>
                      ))
                    )}
                  </NavDropdown>
                  
                  <Nav.Link as={NavLink} to="/teachers" onClick={handleClick}>
                    Teachers
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/products" onClick={handleClick}>
                    Products
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    style={{ whiteSpace: "nowrap" }}
                    to="/news"
                    onClick={handleClick}
                  >
                    News & Updates
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    style={{ whiteSpace: "nowrap" }}
                    to="/contact"
                    onClick={handleClick}
                  >
                    Contact Us
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    style={{ whiteSpace: "nowrap" }}
                    to="/blog"
                    onClick={handleClick}
                  >
                    Blog
                  </Nav.Link>
                </Nav>
              </div>
              {/* <Link to={"/login"}>
                <button onClick={handleClick} className="donateBtnHeader">
                  Login
                </button>
              </Link> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
