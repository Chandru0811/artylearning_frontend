import React from 'react'
import CmshomeHero from './CmsHomeHero'
import CmsHomeEnrichmentClass from './CmsHomeEnrichmentClass'
import CmsHomeWhyArtyLearning from './CmsHomeWhyArtyLearning'
import CmsHomeYoutube from './CmsHomeYoutube'

function CmsHome() {
  return (
    <>
    <div className="container card my-2 py-2">
      <div className="row p-1">
        <div className="col-md-6 col-12">
          <h4>Home</h4>
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
    <CmshomeHero/>
    <CmsHomeEnrichmentClass/>
    <CmsHomeWhyArtyLearning/>
    <CmsHomeYoutube/>
    </>
  )
}

export default CmsHome