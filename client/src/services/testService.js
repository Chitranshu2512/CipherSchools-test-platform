// src/services/testService.js

import axios from 'axios';

const getTests = async (testId) => {

  try {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${apiUrl}/api/tests`,  
      {testId,},
      {withCredentials: true}
    );
    
    return response.data.data;
  } 
  catch (error) {
    console.log("Error while opening the test")
  }
  
};


const attemptTest = async (testId) => {

  try {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${apiUrl}/api/tests/attemptTest`,  
      {testId},
      {withCredentials: true}
    );
    const data = response.data.data.test;
    const user = response.data.data.user;
    return {data, user};
  } 
  catch (error) {
    console.log("Error while opening the test")
  }
  
};

const testService = { getTests, attemptTest };

export default testService;
