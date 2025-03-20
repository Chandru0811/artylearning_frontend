import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllClassRoomWithAll = async ()=> {
  try {
    const response = await api.get(`getAllCenterClassRooms`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching data:", error.message);
    throw error;
  }
};

export default fetchAllClassRoomWithAll;



