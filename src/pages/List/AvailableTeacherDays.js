import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAvailableTeacherDays = async (id) => {
  try {
    const response = await api.get(
      `getWorkingDaysByTeacherId/${id}`
    );
    console.log("fetchAvailableTeacherDays:",response.data);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Course data:", error);
    throw error;
  }
};

export default fetchAvailableTeacherDays;
