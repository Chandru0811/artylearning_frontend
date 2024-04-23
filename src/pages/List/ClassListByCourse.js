// apiService.js

import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllClassesWithIdsC = async (id) => {
  try {
    const response = await api.get(`getClassIdsAndNamesByCourseId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Class data:", error);
    throw error;
  }
};

export default fetchAllClassesWithIdsC;
