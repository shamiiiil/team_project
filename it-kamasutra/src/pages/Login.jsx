import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, checkIsAuth } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
    if (status) {
      toast(status);
    }
  }, [status, isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ username, email, password }));
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login__form">
        <label htmlFor="username">Username</label>
        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          type="text"
          value={username}
          name="username"
          id="username"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          value={email}
          name="email"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          value={password}
          name="password"
          id="password"
        />
        <button onClick={handleSubmit} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
