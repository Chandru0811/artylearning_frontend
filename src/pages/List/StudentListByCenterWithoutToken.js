import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllStudentListByCenterWOT = async (id) => {
  try {
    const response = await api.get(`getStudentNamesByCenterId/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchAllStudentListByCenterWOT;
