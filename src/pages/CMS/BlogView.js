import React from 'react'
import img4 from "../../assets/clientimage/parent-img.jpeg";
export default function BlogView() {
  return (
    <div>
        <div className=" p-3">
              <h2>Popular Articles</h2>
              <img
                src={img4}
                className="img-fluid py-1 rounded"
                alt="Article"
              />
              <h3>
                Guardians of the Pride: The Urgency of Lion Conservation Efforts
              </h3>
              <button className="btn btn-outline-dark btn-sm rounded-5">
                Species
              </button>
            </div>
    </div>
  )
}
