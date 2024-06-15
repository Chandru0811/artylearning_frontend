import React from 'react'
import CmsEnglishBanner from './CmsEnglishBanner'
import CmsEnglishCourseListing from './CmsEnglishCourseListing'

export default function CmsEnglish() {
  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
            <div className="container cms-header shadow-sm py-2">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>CMS English Course</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            <button className="btn btn-sm btn-outline-primary border ms-2">
              Save
            </button>
            <button className="btn btn-sm btn-outline-danger border ms-2">
              Save & Publish
            </button>
          </div>
        </div>
      </div>
      <CmsEnglishBanner />
      <CmsEnglishCourseListing />
       </section>
  )
}
