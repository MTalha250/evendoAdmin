// auth.ts
import axios from "axios";
import useAuthStore from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email: string, password: string) => {
    const { data } = await axios.post(`https://yadbyadserver.vercel.app/auth/login`, { email, password });
    // localStorage.setItem("token", data.token);
    return data;
};

export const register = async (name: string, email: string, password: string) => {
    const res = await axios.post(`https://yadbyadserver.vercel.app/auth/register`, { name, email, password });
    // localStorage.setItem("token", data.token);
    return res.data;
};

export const logout = () => {
    // localStorage.removeItem("token");

    return null;
};

export const loginBack = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
        return null;
    }

    const { data } = await axios.get(`${process.env.BASE_URI}/auth/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return { user: data, token };
};
export const deleteAccount = async () => {
    const res = await axios.delete(`${process.env.BASE_URI}/auth`, {
        headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
        }
    });
    return res.data;
};