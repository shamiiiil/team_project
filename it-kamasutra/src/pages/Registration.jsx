import React, {useState} from "react";
import { toast } from "react-toastify";
import "./Registration.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      })
      const res = await data.json();
      toast(res.message);
    } catch (error) {
      toast(error.message);
    }
  }

  return (
    <div className="registration">
      <h1>Registration</h1>
      <form className="registration__form">
        <label htmlFor="username">Username</label>
        <input onChange={(event) => {
          setUsername(event.target.value);
        }} type="text" value={username} name="username" id="username" />
        <label htmlFor="email">Email</label>
        <input onChange={(event) => {
          setEmail(event.target.value);
        }} type="email" value={email} name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input onChange={(event) => {
          setPassword(event.target.value);
        }} type="password" value={password} name="password" id="password" />
        <label htmlFor="confirm_password">Confirm Password</label>
        <input onChange={(event) => {
          setConfirmPassword(event.target.value);
        }} type="password" value={confirmPassword} name="confirm_password" id="confirm_password" />
        <button onClick={handleSubmit} type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
