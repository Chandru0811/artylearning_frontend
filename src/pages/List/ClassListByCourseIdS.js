import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllClassByCourseIds = async (ids) => {
  const courseIds = ids.join(',');
  console.log(courseIds);
  try {
    const response = await api.get(`/getClassesByCourseIds?courseIds=${courseIds}`);
    console.log("center Ids:",response.data);
    return response.data;
  } catch (error) {
    toast.error(`Error fetching Course data: ${error.message}`);
    throw error;
  }
};

export default fetchAllClassByCourseIds;
