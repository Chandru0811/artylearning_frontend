import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ChangePassword from "./ChangePassword";
import { BiLogOut } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";

function Header({ onLogout, handleCenterChange, centerData, selectedCenter }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("email");

  const handleLogOutClick = () => {
    document.body.classList.remove("offcanvas-backdrop", "modal-open");
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
    onLogout();
    navigate("/login");
  };

  // Condition to hide the select dropdown
  const hideCenterSelect =
    location.pathname === "/sms/calendar" ||
    location.pathname === "/calendar" ||
    location.pathname === "/sms/scheduleReport" ||
    location.pathname === "/scheduleReport";

  return (
    <nav>
      <div className="d-flex align-items-center justify-content-between pt-2 pb-2 px-2">
        <div className="sidebar-button">
          <i className="bx bx-menu sidebarBtn"></i>
        </div>

        <div className="d-flex align-items-center justify-content-evenly">
          <Link to={"/calendar"}>
            <button className="btn" type="button">
              <CiCalendarDate
                style={{
                  color: "#287f71",
                  fontSize: "25px",
                  fontWeight: "bolder",
                }}
              />
            </button>
          </Link>
          <div className="position-relative">
            {!hideCenterSelect && (
              <div className="position-relative">
                <select
                  value={selectedCenter}
                  name="studentRelationCenter"
                  className="form-select shadow-none"
                  onChange={handleCenterChange}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    width: "auto",
                    minWidth: "150px",
                    maxWidth: "100%",
                    padding: "0 10px",
                  }}
                >
                  <option value="" disabled>
                    Select a Centre
                  </option>
                  <option value="0">All Center</option>
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
            )}
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
              <h3 className="cname_canvas">Arty Learning</h3>
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
                <button className="btn btn-button mt-3 w-100">
                  <ChangePassword />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
