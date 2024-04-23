import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllTeachersWithIds = async () => {
  try {
    const response = await api.get("getAllTeacherNamesWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllTeachersWithIds;
