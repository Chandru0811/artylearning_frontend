import React from "react";
import { useNavigate } from "react-router-dom";
import TeacherView from "../../pages/Teacher/TeacherView";

function Header({ onLogout }) {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("userName");
  const handelLogOutClick = () => {
    onLogout();
    navigate("/login");
  };
  const handleSwitchAccount = () => {
    navigate("/teacher/view/:id");
  };
  return (
    <nav>
      <div className="d-flex align-items-center justify-content-between pt-2 pb-2 px-2">
        <div className="sidebar-button">
          <i className="bx bx-menu sidebarBtn"></i>
        </div>
        <div className="">
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userName}
            </button>
            <ul class="dropdown-menu px-2">
              {/* <li style={{ cursor: "pointer" }} onClick={handleSwitchAccount}>
                Account
              </li> */}
              <li style={{ cursor: "pointer" }} onClick={handelLogOutClick}>
                Log out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
