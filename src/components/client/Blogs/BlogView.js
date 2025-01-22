import React, { useEffect, useState } from 'react'
import img4 from "../../../assets/clientimage/parent-img.jpeg";
import { useParams } from 'react-router-dom';
import api from '../../../config/URL';
export default function BlogView() {

  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getBlogSavePublishById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [id]);

  return (
    <div>
        <div className=" p-3">
              <h2>{data.title || ""}</h2>
              <img
                src={data.imagerOne || ""}
                className="img-fluid py-1 rounded"
                alt="Article"
              />
              <p className='text-wrap text-break'>
                {data.description || ""}
              </p>
            </div>
    </div>
  )
}
