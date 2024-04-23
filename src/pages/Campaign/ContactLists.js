import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoIosPersonAdd } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";


function ContactLists() {
  const [checkbox, setCheckboxs] = useState([
    {
      id: 1,
      name: "Arty Learning",
      check: false,
    },
    {
      id: 2,
      name: "Arty Dreamers",
      check: false,
    },
    {
      id: 3,
      name: "Arty Pursures",
      check: false,
    },
    {
      id: 4,
      name: "Arty Learning",
      check: false,
    },
    {
      id: 5,
      name: "Arty Dreamers",
      check: false,
    },
    {
      id: 6,
      name: "Arty Learning",
      check: false,
    },
  ]);

  const handleChangeCheckboxs = (id) => {
    setCheckboxs((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        } else {
          return { ...item };
        }
      });
    });
  };

  const renderCheckboxs = () => {
    return checkbox.map((item) => (
      <div
        className="card-body"
        key={item.id}
        style={{ display: "flex", flexDirection: "column", maxHeight: "100vh" }}
      >
        <div
          className="mylist d-flex justify-content-between"
          onClick={() => handleChangeCheckboxs(item.id)}
        >
          <div>
            <input
              class="form-check-input me-1"
              type="checkbox"
              value=""
              aria-label="..."
              id={item.id}
            />
            <label for="Artylearning">{item.name}</label>
          </div>

          {item.check && (
            <>
              <div className="mylistBefore"></div>
              <div className="mylistAfter"></div>
            </>
          )}
          <div>
            <IoIosPersonAdd />
          </div>
        </div>
      </div>
    ));
  };
  const renderFilters = () => {
    return checkbox.map((item) => {
      if (item.check) {
        return (
          <div className="d-flex justify-content-between mb-2 ">
            <div>
              <span
                onClick={() => handleChangeCheckboxs(item.id)}
                className="option"
                key={item.id}
              >
                <IoIosPerson className="icon" />
                <span className="item-name">{item.name}</span>
                <RxCross2 className="icon" />
              </span>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  };
  return (
    <div className="campaignStudentAdd">
      <div className="d-flex justify-content-around align-items-center">
        <div
          className="card mt-5"
          style={{ width: "25rem", minHeight: "100px" }}
        >
          <div className="card-header d-flex justify-content-between">
            <div>
              <input
                class="form-check-input me-1"
                type="checkbox"
                value=""
                aria-label="..."
              />
              <span className="headColor">My List</span> <IoIosArrowDown />
            </div>
            <div>
              <button className="btn btn-light" type="button">
                <FaSearch />
              </button>
              <button className="btn btn-light" type="button">
                <FaPlus />
              </button>
            </div>
          </div>
          {renderCheckboxs()}
        </div>
        <div className="card mt-5" style={{ width: "25rem", height: "400px" }}>
          <div className="card-header  d-flex justify-content-between">
            Selected List{" "}
          </div>
          <div
            className="card-body"
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "100vh",
            }}
          >
            {renderFilters()}
            {/* {checkbox.some(item=>item.check) ? null: <span>Empty</span>} */}
          </div>
        </div>
      </div>
      <div className="mx-3 d-flex justify-content-end align-items-end mt-5">
        <Link to="/campaign">
          <button className="btn btn-border btn-sm mx-3">Cancel</button>
        </Link>
        <button className="btn btn-button btn-sm">Save</button>
      </div>
    </div>
  );
}

export default ContactLists;
