import React from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/clientimage/Logo.png";
import English from "../../../assets/clientimage/eng.png";
import Chinesh from "../../../assets/clientimage/Alphabet.png";

function Header() {
  const expand = "xl";

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar
        expand={expand}
        className="navbar clientNavBar"
        style={{ backgroundColor: "#ffff" }}
      >
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" onClick={handleClick}>
            <img src={Logo} alt="WWG" width={150} className="img-fluid" />
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

                  <NavDropdown title="Courses">
                    <NavDropdown.Item
                      as={NavLink}
                      to="/course/english"
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
                      to="/course/chinesh"
                      onClick={handleClick}
                      className="header-dropdown-menu"
                    >
                      <span className="course-icons">
                        <img src={Chinesh} alt="english" width={30}></img>
                      </span>
                      Chinese
                    </NavDropdown.Item>
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
