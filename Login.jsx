import React, { useState } from "react";
import axios from "axios";
import "../main.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div class="flex justify-center items-center h-screen">
      <div class="w-96 p-6 shadow-lg  rounded-md">
        <h1 className="text-center mb-10 text-4xl font-medium">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label for="email" className="mb-4 text-xl font-normal">
              Email address
            </label>
            <input
              className="p-2 border-solid border-2"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label for="password" className="mt-4 mb-4 text-xl font-normal">
              Password
            </label>
            <input
              className="p-2 border-solid border-2"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="mt-5 bg-blue-700 rounded-md text-white p-2 text-xl font-medium hover:bg-blue-600"
            >
              Login
            </button>
            <span className="mt-2 text-sm">
              Don't have account?
              <a className="font-medium text-blue-600" href="">
                Register
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
