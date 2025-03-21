import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchOverAllStudentCompletionForm = async () => {
  try {
    const response = await api.get("getOverAllStudentCompletionForm");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchOverAllStudentCompletionForm ;
