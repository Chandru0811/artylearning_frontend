// apiService.js

import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllCentersWithScheduleStudentList = async () => {
  try {
    const response = await api.get("getAllCentersBasedOnScheduledStudents");
    console.log("getAllCentersBasedOnScheduledStudents",response.data);
    
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllCentersWithScheduleStudentList;
