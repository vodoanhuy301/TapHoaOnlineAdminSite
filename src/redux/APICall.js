import { loginFail, loginStart, loginSuccess} from "./adminRedux";
import { publicRequest } from "../requestsAPI";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/dangnhap", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFail());
  }
};