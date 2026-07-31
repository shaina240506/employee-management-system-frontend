import axios from "axios";

const BASE_URL = "http://localhost:8080/api/assets";

export const assignAsset = (asset) =>
    axios.post(`${BASE_URL}/assign`, asset);

export const getAllAssets = () =>
    axios.get(`${BASE_URL}/get-all`);

export const getEmployeeAssets = (employeeId) =>
    axios.get(`${BASE_URL}/employee/${employeeId}`);

export const deleteAsset = (id) =>
    axios.delete(`${BASE_URL}/delete/${id}`);
export const getAssetById = (id) =>
    axios.get(`${BASE_URL}/${id}`);

export const updateAsset = (id, asset) =>
    axios.put(`${BASE_URL}/update/${id}`, asset);
export const getEmployeeAssetSummary = () =>
    axios.get(`${BASE_URL}/summary`);
export const deleteMultipleAssets = (assetIds) =>
    axios.delete(`${BASE_URL}/delete-multiple`, {
        data: assetIds
    });