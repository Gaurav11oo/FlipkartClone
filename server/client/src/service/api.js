import axios from "axios";

// const URL = "http://localhost:8000";
const URL = "";

export const authenticatesSignup = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.log("Error while calling Signup API: ", error);
  }
};

export const authenticatesLogin = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    console.log("Error while calling login API: ", error);
    return error.response;
  }
};

// export const payUsingPaytm = async (data) => {
//   try {
//     let response = await axios.post(`${URL}/payment`, data);
//     return response.data;
//   } catch (error) {
//     console.log("Error While calling payment Api!!!", error);
//   }
// };



