import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllClassRoomWithCenterIds = async (id)=> {
  try {
    const response = await api.get(`getAllClassRoomsByCenterId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Course data:", error.message);
    throw error;
  }
};

export default fetchAllClassRoomWithCenterIds;



