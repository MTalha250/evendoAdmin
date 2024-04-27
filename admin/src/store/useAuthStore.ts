import {create} from "zustand";
import {UserType} from "../types";

type State = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({user}),
  loading: false,
  setLoading: (loading) => set({loading}),
}));