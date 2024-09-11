import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAvailableCentersWithIds = async () => {
  try {
    const response = await api.get("getAllCentersBasedOnScheduledStudents");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAvailableCentersWithIds;
