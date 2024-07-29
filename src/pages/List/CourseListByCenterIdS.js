import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllCoursesWithCenterIds = async (ids) => {
  const centerIds = ids.join(',');
  console.log(centerIds);
  try {
    const response = await api.get(`/getCoursesByCenterIds?centerIds=${centerIds}`);
    console.log("center Ids:",response.data);
    return response.data;
  } catch (error) {
    toast.error(`Error fetching Course data: ${error.message}`);
    throw error;
  }
};

export default fetchAllCoursesWithCenterIds;
