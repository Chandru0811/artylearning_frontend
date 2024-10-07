// apiService.js

import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllCentersWithStudentList = async () => {
  try {
    const response = await api.get("centersWithStudents");
    console.log("centersWithStudents",response.data);
    
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllCentersWithStudentList;
