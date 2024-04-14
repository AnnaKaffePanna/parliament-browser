import axios from "axios";

const apiUrl = "https://api.lagtinget.ax/api";

const getAllMembers = async () => {
  try {
    const response = await axios.get(apiUrl + "/persons.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching all members:", error);
    return [];
  }
};

const getDetailsById = async (id) => {
  try {
    const response = await axios.get(apiUrl + "/persons/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching details by id:", error);
    return {};
  }
};

const getRole = async (role) => {
  try {
    const response = await axios.get(apiUrl + "/roles/" + role);
    return response.data;
  } catch (error) {
    console.error("Error fetching role data:", error);
    return {};
  }
};

const ApiService = {
  getAllMembers,
  getDetailsById,
  getRole,
};

export default ApiService;
