import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employees";

// Register
export const registerEmployee = (employee) =>
    axios.post(`${BASE_URL}/register`, employee);

// Login
export const loginEmployee = (loginData) =>
    axios.post(`${BASE_URL}/login`, loginData);

// Get All
export const getAllEmployees = () =>
    axios.get(BASE_URL);

// Get By Id
export const getEmployeeById = (id) =>
    axios.get(`${BASE_URL}/${id}`);

// Update
export const updateEmployee = (id, employee) =>
    axios.put(`${BASE_URL}/${id}`, employee);

// Delete
export const deleteEmployee = (id) =>
    axios.delete(`${BASE_URL}/${id}`);

// Search
export const searchEmployees = (params) =>
    axios.get(`${BASE_URL}/search`, { params });

// Count
export const countEmployees = () =>
    axios.get(`${BASE_URL}/count`);

// Change Password
export const changePassword = (data) =>
    axios.put(`${BASE_URL}/change-password`, data);

// Forget Password
export const forgetPassword = (data) =>
    axios.put(`${BASE_URL}/forget-password`, data);