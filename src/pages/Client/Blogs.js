import React, { useEffect, useState } from "react";
import Blog from "../../components/client/Blogs/Blog";
import api from "../../config/URL";
import { toast } from "react-toastify";

function Blogs() {
  const [datas, setDatas] = useState([]);
  // const datas = "hello"

  console.log("Blog Data:",datas);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllBlogSavePublish`);
      setDatas(response.data);
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="">
        <Blog  datas={datas}/>
    </section>
  );
}

export default Blogs;
