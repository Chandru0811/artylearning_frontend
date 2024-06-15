import React from 'react'
import CmsChineseBanner from './CmsChineshBanner'
import CmsChineseCourseListing from './CmsChineshCourseListing'

export default function CmsChinesh() {
  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
    <CmsChineseBanner />
    <CmsChineseCourseListing />   
  </section>
  )
}
