import React, { useEffect, useState } from "react";
import Blog from "../CMS/Blog";
import api from "../../config/URL";
import { toast } from "react-toastify";

function Blog1() {
  // const [datas, setDatas] = useState([]);
  const datas = "hello"

  const getData = async () => {
    try {
      const response = await api.get(`/getAllBlogSavePublish`);
      // setDatas(response.data);
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

export default Blog1;
