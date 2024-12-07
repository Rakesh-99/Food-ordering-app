import axios from "axios";





// User instance : 
export const axiosUserInstance = axios.create({
    baseURL: `http://localhost:8000/api/user`,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    }
});

// Restaurant instance : 
export const axiosRestaurantInstance = axios.create({
    baseURL: `http://localhost:8000/api/restaurant`,
    withCredentials: true,
    headers: {
        'Content-Type': "multipart/json"
    }
});

// Menu instance : 
export const axiosMenuInstance = axios.create({
    baseURL: `http://localhost:8000/api/menu`,
    withCredentials: true,
    headers: {
        'Content-Type': "multipart/json"
    }
})