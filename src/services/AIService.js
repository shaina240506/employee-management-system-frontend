import axios from "axios";

const BASE_URL = "http://localhost:8080/api/ai";

export const chatWithAI = async (message, employeeId, role) => {

    const response = await axios.post(`${BASE_URL}/chat`, {

        message,

        employeeId,

        role

    });

    return response.data.response;

};