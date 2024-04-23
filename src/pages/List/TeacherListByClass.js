import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllTeachersWithIdsC = async (id) => {
  try {
    const response = await api.get(`getTeacherIdsAndTeacherNamesByClassId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllTeachersWithIdsC;
