import axiosInstance from "./api.service";

const socialMediaApi = {
    //Authentication
    login: (data) => axiosInstance.post("/api/auth/login", data),
    register: (data) => axiosInstance.post("/api/auth/register", data),
    logout: () => axiosInstance.post("/api/auth/logout"),
    refreshToken: () => axiosInstance.post("/api/auth/refresh"),
    //User
    
};

export default socialMediaApi;