import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchAllCentersWithIds from "../../pages/List/CenterList";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
import { BiLogOut } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";

function Header({ onLogout }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("email");
  const [centerData, setCenterData] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState("");

  const handleLogOutClick = () => {
    onLogout();
    navigate("/login");
  };

  const handleCenterChange = (e) => {
    setSelectedCenter(e.target.value);
    console.log("Selected Center:", e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const centerData = await fetchAllCentersWithIds();
        setCenterData(centerData);
  
        // Set the default selected value to the first center ID
        if (centerData && centerData.length > 0) {
          setSelectedCenter(centerData[0].id);
          console.log("Default Selected Center:", centerData[0].id); // Log the first center ID
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <nav>
      <div className="d-flex align-items-center justify-content-between pt-2 pb-2 px-2">
        <div className="sidebar-button">
          <i className="bx bx-menu sidebarBtn"></i>
        </div>

        <div className="d-flex align-items-center justify-content-evenly">
          <Link to={"/calendar"}>
            <button
              className="btn"
              type="button"
            >
              <CiCalendarDate
                style={{ color: "#287f71", fontSize: "25px" ,fontWeight:"bolder" }}
              />
            </button>
          </Link>

          <div style={{ minWidth: "50%" }}>
            <div className="position-relative">
              <select
                value={selectedCenter}
                name="studentRelationCenter"
                className="form-select shadow-none"
                onChange={handleCenterChange}
                style={{
                  border: "none",
                  outline: "none",
                  paddingRight: "5px",
                }}
              >
                {/* <option>Atry Learning @ AMK</option>
                <option>Atry Learning @ HG</option>
                <option>Atry Learning @ BB</option> */}
                {centerData &&
                  centerData.map((studentRelationCenter) => (
                    <option
                      key={studentRelationCenter.id}
                      value={studentRelationCenter.id}
                    >
                      {studentRelationCenter.centerNames}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button
            className="btn border border-1 rounded-circle"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i className="fa fa-user" style={{ color: "#eb862a" }}></i>
          </button>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end"
        id="offcanvasRight"
        tabIndex="-1"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          <div className="flex-grow-1">
            <div className="text-center">
              <h3 className="cname_canvas">Atry Learning</h3>
            </div>
            <div className="text-center mt-3">
              <i
                className="fa-duotone fa-solid fa-user"
                style={{
                  color: "#e99e5e",
                  background: "#fce6cf",
                  borderRadius: "100%",
                  padding: "20px",
                  cursor: "pointer",
                  fontSize: "4rem",
                }}
              ></i>
            </div>

            <div className="list-group list-group-flush pt-4 text-center">
              <p>{userName.replace(/_/g, " ")}</p>
              <p>{userEmail}</p>
            </div>
          </div>

          <div className="mt-auto gap-2">
            <div className="row">
              <div className="col-md-6 col-12">
                <button
                  className="btn btn-button mt-3 w-100"
                  onClick={handleLogOutClick}
                >
                  <BiLogOut /> Logout
                </button>
              </div>
              <div className="col-md-6 col-12" data-bs-dismiss="offcanvas">
                {/* <Link to="/changepassword" >
                  <button className="btn btn-danger mt-3 w-100"  data-bs-dismiss="offcanvas">
                    Change password
                  </button>
                </Link> */}
                <ChangePassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
