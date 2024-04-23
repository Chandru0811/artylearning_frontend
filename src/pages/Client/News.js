import React from "react";
import { Link } from "react-router-dom";
import View from "../../assets/clientimage/View.jpeg";
function News() {
  return (
    <div class="news">
      <div class="container py-5">
        <div class="content my-4">
          <p>
            Stay informed with our latest news and updates. Discover exciting
            news and upcoming events from Arty Learning. Come<br></br>
            join us on our journey of continuous learning and growth
          </p>
        </div>
        <div class="row">
          <div className="col-md-4 col-12 calender">
            <div class="card align-items-center mx-3 mt-2 pt-3">
              <img src={View} alt="view" className="img-fluid" />
              <div class="card-body">
                <div class="mt-3 mx-2">
                  <h6 class="card-title">
                    2024 Arty Learning <br></br>Calender
                  </h6>
                  <span class="card-text mt-4">
                    admin / October 1-2021 / No Comments
                  </span>
                  <div>
                    <Link to="/calender">
                      <button class="button mt-4">Read More</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
