import { setUser, setLoading, setError } from "./auth";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signIn = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const { uid, displayName, email: userEmail } = response.user;
    dispatch(setUser({ uid, displayName, email: userEmail }));

    localStorage.setItem(
      "user",
      JSON.stringify({ uid, displayName, email: userEmail })
    );
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const LogOut = () => (dispatch) => {
  dispatch(setLoading(true));
  try {
    signOut(auth);
    dispatch(setUser(null));
    dispatch(setLoading(false));
    localStorage.removeItem("user");
    window.location.reload();
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const register = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid, displayName, email: userEmail } = response.user;
    dispatch(setUser({ uid, displayName, email: userEmail }));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};
