import React, { useEffect, useState } from 'react'
import CmsChineseBanner from './CmsChineshBanner'
import CmsChineseCourseListing from './CmsChineshCourseListing'
import api from '../../../config/URL';
import { toast } from 'react-toastify';

export default function CmsChinesh() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await api.get(`/getChineseCourse`);
      const fetchedData = response.data;
      setData(fetchedData);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handelPublishEnglishCourse= async()=>{
    try{
      const response = await api.post(`publishCourseSaveChinese`)
      if(response.status === 201){
        toast.success(response.data.message)
      }else{
        toast.warning(response.data.message)
      }
    }catch(e){
      toast.warning("Error Publish Data ", e.response.data.message)
    }
  }
  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
        <div className="container cms-header shadow-sm py-2">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>CMS Chinesh Course</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            <button className="btn btn-sm btn-outline-danger border ms-2" onClick={handelPublishEnglishCourse}>
              Publish
            </button>
          </div>
        </div>
      </div>

    <CmsChineseBanner 
      data={data}
      backgroundImage={data.backgroundImage}
      heading={data.heading}
      content1={data.content1}
      getData={getData}
      />
    <CmsChineseCourseListing 
     content2={data.content2}
     card1Image={data.card1Image}
     card1Heading={data.card1Heading}
     card1Content={data.card1Content}
     card2Image={data.card2Image}
     card2Heading={data.card2Heading}
     card2Content={data.card2Content}
     card3Image={data.card3Image}
     card3Heading={data.card3Heading}
     card3Content={data.card3Content}
     finalContent={data.finalContent}
     getData={getData}
     />   
  </section>
  )
}
