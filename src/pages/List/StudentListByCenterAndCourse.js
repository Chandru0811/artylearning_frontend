import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllStudentListByCenterAndCourse = async (centerId, courseId) => {
  try {
    const response = await api.get(`getIdsAndStudentNamesByCenterIdAndCourseId?centerId=${centerId}&courseId=${courseId}`);
    return response.data;
  } catch (error) {
    toast.error("Error Fetching Data:", error);
    throw error;
  }
};

export default fetchAllStudentListByCenterAndCourse;
