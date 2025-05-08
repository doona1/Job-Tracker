import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getItems = async (page = 1) => {
    const response = await axios.get(`${API_BASE_URL}/items?page=${page}&limit=10`);
    return response.data;
};

export const updateItem = async (id, updatedData) => {
    const response = await axios.put(`${API_BASE_URL}/items/${id}`, updatedData);
    return response.data;
};

// ✅ Add new item
export const addItem = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/items`, data);
    return response.data;
};

// ✅ Delete item
export const deleteItem = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/items/${id}`);
    return response.data;
};
