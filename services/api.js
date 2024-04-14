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

const getDetailsByOneMember = async (id) => {
  try {
    const response = await axios.get(apiUrl + "/persons/" + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const ApiService = {
  getAllMembers,
  getDetailsByOneMember,
};

export default ApiService;
