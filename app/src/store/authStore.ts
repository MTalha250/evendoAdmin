import { create } from "zustand";
import { User } from "../types";
import { CustomerType } from "../types";

type Location = {
    lat: number;
    lng: number;
};

type AuthStore = {
    token: string | null | undefined;
    user: User | null;
    customer: CustomerType | null;
    location: Location;
    locationName: String | null;
    city: String | null;
    country: String | null;
    setLocationName: (locationName: String) => void,
    setCountry: (city: String) => void;
    setLocation: (lat: number, lng: number) => void;
    setCity: (city: String) => void;
    setCustomer: (customer: CustomerType | null) => void;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
    token: "",
    user: null,
    customer: null,
    location: {
        lat: 0,
        lng: 0
    },
    city: null,
    country: null,
    locationName: null,
    setLocationName: (locationName) => set({ locationName }),
    setCountry: (country) => set({ country }),
    setCity: (city) => set({ city }),
    setLocation: (lat: number, lng: number) => ({ lat, lng }),
    setCustomer: (customer) => set({ customer }),
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
}));

export default useAuthStore;