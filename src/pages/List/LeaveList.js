import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllLeaveList = async () => {
  try {
    const response = await api.get(`getAllLeaveSetting`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Employee data:", error);
    throw error;
  }
};

export default fetchAllLeaveList;
