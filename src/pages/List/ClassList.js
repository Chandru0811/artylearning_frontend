// apiService.js

import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllClassesWithIds = async () => {
  try {
    const response = await api.get("getAllClassNamesWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllClassesWithIds;
