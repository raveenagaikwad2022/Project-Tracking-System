import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import authService from "../../services/auth";
import storage from "../../utils/localStorage";
import {
  CredentialsPayload,
  CredentialsPayloadLogin,
  UserState,
} from "../types";
import { fetchProjects } from "./projectsSlice";
import { notify } from "./notificationSlice";
import { fetchUsers } from "./usersSlice";
import { getErrorMsg } from "../../utils/helperFuncs";

interface InitialAuthState {
  user: UserState | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialAuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setAuthLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAuthLoadingFalse: (state) => {
      state.loading = false;
      state.error = null;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  removeUser,
  setAuthLoading,
  setAuthError,
  clearAuthError,
  setAuthLoadingFalse,
} = authSlice.actions;

export const login = (credentials: CredentialsPayloadLogin): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAuthLoading());
      const userData = await authService.login(credentials);
      dispatch(setUser(userData));

      storage.saveUser(userData);
      authService.setToken(userData.token);

      dispatch(fetchProjects());
      dispatch(fetchUsers());
      dispatch(notify(`Welcome back, ${userData.username}!`, "success"));
    } catch (e: any) {
      dispatch(setAuthError(getErrorMsg(e)));
    }
  };
};

export const signup = (credentials: CredentialsPayload): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAuthLoading());
      const userData = await authService.signup(credentials);
      dispatch(setAuthLoadingFalse());
      dispatch(
        notify(
          `${userData.username}! is onboarded with ${userData.role} role`,
          "success"
        )
      );
    } catch (e: any) {
      dispatch(setAuthError(getErrorMsg(e)));
    }
  };
};

export const logout = (): AppThunk => {
  return (dispatch) => {
    dispatch(removeUser());
    storage.removeUser();
    dispatch(notify("Logged out!", "success"));
  };
};

export const autoLogin = (): AppThunk => {
  return (dispatch) => {
    const loggedUser = storage.loadUser();
    if (loggedUser) {
      dispatch(setUser(loggedUser));
      authService.setToken(loggedUser.token);
      dispatch(fetchProjects());
      dispatch(fetchUsers());
    }
  };
};

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
