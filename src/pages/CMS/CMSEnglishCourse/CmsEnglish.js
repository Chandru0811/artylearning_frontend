import React from 'react'
import CmsEnglishBanner from './CmsEnglishBanner'
import CmsEnglishCourseListing from './CmsEnglishCourseListing'

export default function CmsEnglish() {
  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
      <CmsEnglishBanner />
      <CmsEnglishCourseListing />
       </section>
  )
}
