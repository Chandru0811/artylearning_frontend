import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllSalaryTypeWithIds = async () => {
  try {
    const response = await api.get("getAllSalarySetting");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllSalaryTypeWithIds;
