import AuthServices from "../services/fetch.auth";
import { setSession } from "../utils/storage.utils";

export const loginAction = (data, nav) => async (dispatch) => {
  try {
    const session = await AuthServices.login(data);
    if (!session.isValid) {
      throw new Error(session.data);
    }
    setSession(session.data.data.token, true, nav);
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};
export const registerAction = (data, nav) => async (dispatch) => {
  try {
    const session = await AuthServices.register(data);
    if (!session.isValid) {
      throw new Error(session.data);
    }
    nav("/auth");
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};
export const logoutAction = (nav) => async (dispatch) => {
  try {
    const session = await AuthServices.logout();
    if (!session.isValid) {
      throw new Error(session.data);
    }
    sessionStorage.clear();
    nav("/auth");
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};
