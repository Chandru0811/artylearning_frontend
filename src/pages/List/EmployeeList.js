import { toast } from "react-toastify";
import api from "../../config/URL";


const fetchAllEmployeeListByCenter = async (id) => {
  try {
    const response = await api.get(`getUserListByCenterId/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export default fetchAllEmployeeListByCenter;
