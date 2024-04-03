import axios from "axios";

const apiUrl = "https://api.lagtinget.ax/api";

const getAllMembers = async () => {
  try {
    const response = await axios.get(apiUrl + "/persons.json");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const ApiService = {
  getAllMembers,
};

export default ApiService;
