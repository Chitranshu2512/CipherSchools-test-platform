// src/services/authService.js
import axios from 'axios';

const login = async (email, password,) => {

  try {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${apiUrl}/api/auth/login`, 
      { email, password }, 
      {withCredentials: true}
    );
    
    return response.data.data;
  } 
  catch (error) {
    console.error("Error while login a user")
    throw error;
  }
};

const authService = { login };

export default authService;
