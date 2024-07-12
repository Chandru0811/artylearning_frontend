// apiService.js

import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllCentreManager = async () => {
  try {
    const response = await api.get("getAllCenterManagerList");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllCentreManager;
