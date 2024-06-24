import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllRaceWithIds = async () => {
  try {
    const response = await api.get("getAllRaceSetting");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllRaceWithIds;
