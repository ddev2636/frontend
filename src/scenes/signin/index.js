import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut, register } from "../../state/authActions";

const SignIn = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    dispatch(signIn(email.value, password.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      {error && <p>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default SignIn;
