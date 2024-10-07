import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../assets/clientimage/Logo.png";
import api from "../../../config/URL";

function Header() {
  const expand = "xl";
  const navigate = useNavigate();
  const [data, setData] = useState({});
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
              <div className="navWrapper">
                <Nav className="justify-content-center align-items-center flex-grow-1 pe-3 navMenu">
                  <Nav.Link
                    as={NavLink}
                    style={{ whiteSpace: "nowrap" }}
                    to="/about"
                    onClick={handleClick}
                  >
                    About us
                  </Nav.Link>
                  {/* <NavDropdown title="Courses">
                    <NavDropdown.Item
                      as={NavLink}
                      to="/course/english?subjects=ENGLISH"
                      onClick={handleClick}
                      className="header-dropdown-menu mb-3"
                    >
                      <div style={{ verticalAlign: "middle" }}>
                        <span className="course-icons">
                          <img src={English} alt="english" width={30}></img>
                        </span>
                        English
                      </div>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to="/course/chinesh?subjects=CHINESE"
                      onClick={handleClick}
                      className="header-dropdown-menu"
                    >
                      <span className="course-icons">
                        <img src={Chinesh} alt="english" width={30}></img>
                      </span>
                      Chinese
                    </NavDropdown.Item>
                  </NavDropdown> */}
                  <NavDropdown title="Courses" id="courses-dropdown">
                    {loading ? (
                      <NavDropdown.Item disabled>Loading...</NavDropdown.Item> // Loading state
                    ) : error ? (
                      <NavDropdown.Item disabled>
                        Error fetching courses
                      </NavDropdown.Item> // Error state
                    ) : (
                      coursesListData.map((course) => (
                        <NavDropdown.Item
                          key={course.id}
                          as={NavLink}
                          // to={`/course/${course.id
                          //   .toLowerCase()
                          //   .replace(
                          //     / /g,
                          //     ""
                          //   )}?subjects=${course.menuTitle.toUpperCase()}`}
                          to={`/courses/${course.id}`}
                          // onClick={() => handleCourseClick(course.id)}
                          className="header-dropdown-menu mb-3"
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
              <Link to={"/login"}>
                <button onClick={handleClick} className="donateBtnHeader">
                  Login
                </button>
              </Link>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
