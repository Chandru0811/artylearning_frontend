import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllCoursesWithIds = async () => {
  try {
    const response = await api.get("getAllCoursesWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllCoursesWithIds;
