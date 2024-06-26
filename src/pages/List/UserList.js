// apiService.js

import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllUserList = async () => {
  try {
    const response = await api.get("getAllUserList");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllUserList;
