import { SET_AUTH, SET_LOADING, SET_PROFILES } from "./reducer";
import loginService from "../services/login.service";
import registerService from "../services/register.service";
import exitService from "../services/exit.service";
import refreshService from "../services/refresh.service";
import { toast } from "react-toastify";

export const setAuth = (bool) => ({
  type: SET_AUTH,
  payload: bool,
});

export const setProfiles = (profiles) => ({
  type: SET_PROFILES,
  payload: profiles,
});

export const setLoading = (bool) => ({
  type: SET_LOADING,
  payload: bool,
});

export const login = (login, password, navigate) => async (dispatch) => {
  try {
    const response = await loginService.login(login, password);
    localStorage.setItem("token", response.accessToken);
    dispatch(setAuth(true));
    dispatch(setProfiles(response.profiles));
    navigate("/");
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

export const registration = (login, password, navigate) => async (dispatch) => {
  try {
    const response = await registerService.registration(login, password);
    localStorage.setItem("token", response.accessToken);
    dispatch(setAuth(true));
    dispatch(setProfiles(response.profiles));
    navigate("/");
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    await exitService.logout();
    localStorage.removeItem("token");
    dispatch(setAuth(false));
    dispatch(setProfiles({}));
    navigate("/login");
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

export const checkAuth = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await refreshService.refresh();
    localStorage.setItem("token", response.accessToken);
    dispatch(setAuth(true));
    dispatch(setProfiles(response.profiles));
  } catch (error) {
    toast.error(error.response?.data?.message);
  } finally {
    dispatch(setLoading(false));
  }
};
