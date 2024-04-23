import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllTeacherListByCenter = async (id) => {
  try {
    const response = await api.get(`getTeacherListByCenterId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Course data:", error);
    throw error;
  }
};

export default fetchAllTeacherListByCenter;
