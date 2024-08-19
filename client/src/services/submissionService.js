// src/services/submissionService.js

import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const submitTest = async (submissionData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/submissions`, submissionData ,{withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error submitting test:', error);
  }
};

export default { submitTest };
