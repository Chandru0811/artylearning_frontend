// apiService.js

import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllDocumentsWithIds = async () => {
  try {
    const response = await api.get("getAllDocumentIdsWithFolderNames");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllDocumentsWithIds;
