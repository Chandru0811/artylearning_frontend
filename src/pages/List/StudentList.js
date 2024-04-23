import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllStudentsWithIds = async () => {
  try {
    const response = await api.get("getAllStudentNamesWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllStudentsWithIds ;
