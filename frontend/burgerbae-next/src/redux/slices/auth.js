import { authApi } from "../../mocks/authApi";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser(state, action) {
      let data = action.payload.data;

      state.user = data;
    },
    login(state, action) {
      let data = { ...action.payload.data };
      state.user = data;
    },
    updateUser(state, action) {
      let data = action.payload.data;
      state.user = { ...state.user, ...data };
    },
    deleteUser(state, action) {
      let data = action.payload.data;
      state.user = null;
    },
    logoutUser(state, action) {
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { reducer } = slice;

//  verifyUser dispatched this thunk .....checkIfUserLoggedIn thunk called api , fetched data , and dispatched action with user data
//  middleware passes real dispatch here now you can use it freely inside thunk

export const checkIfUserLoggedIn = () => async (dispatch) => {
  console.log("checkIfUserLoggedIn is used.....");
  const result = await authApi.checkIfLoggedIn();
  console.log("result of checkIfLoggedIn api call", result);
  if (result) {
    dispatch(slice.actions.getUser({ data: result.data })); // sync user into redux
    return true;
  }
  return false;
};

export const updateUserThunk = (id, data) => async (dispatch) => {
  const result = await authApi.Update(id, data);
  console.log("result of updateUserThunk", result);
  if (result) {
    await dispatch(slice.actions.updateUser({ data: result.data }));
    return result;
  }
  return false;
};

export const register = (data) => async (dispatch) => {
  const result = await authApi.register(data);
  if (result) return true;
  return false;
};
export const login = (data, users) => async (dispatch) => {
  const result = await authApi.login(data);
  if (result) {
    await dispatch(slice.actions.login(result));
    return result.data;
  }
  return false;
};

export const loginAdmin = (data, users) => async (dispatch) => {
  const result = await authApi.loginAdmin(data);
  if (result) return result.data;
  return false;
};

export const logoutUser = () => async (dispatch) => {
  await dispatch(slice.actions.logoutUser());
  return true;
};

export default slice;
