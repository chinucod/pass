import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [reg, setReg] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/register")
      .then((reg) => setReg(reg.data))
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newId = 0;
    if (reg.length == 0) {
      newId = 1;
    } else {
      newId = reg[reg.length - 1].id + 1;
    }
    try {
      const result = await axios.post("http://localhost:3001/register", {
        id: newId,
        name,
        email,
        password,
        active: true,
      });

      console.log(result);

      // Update the state with the new user
      setReg([...reg, { id: newId, name, email, password }]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="flex justify-center items-center h-screen">
      <div class="w-96 p-6 shadow-lg  rounded-md">
        <h1 className="text-center mb-10 text-4xl font-medium">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-3 text-xl font-normal">Name</label>
            <input
              className="p-2 border-solid border-2 mb-4"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label for="email" className="mb-3 text-xl font-normal">
              Email address
            </label>
            <input
              className="p-2 border-solid border-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="password" className="mt-3 mb-3 text-xl font-normal">
              Password
            </label>
            <input
              className="p-2 border-solid border-2"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="mt-5 bg-blue-700 rounded-md text-white p-2 text-xl font-medium hover:bg-blue-600">
              Register
            </button>
            <span className="mt-2 text-sm">
              Already have account?{" "}
              <a className="font-medium text-blue-600" href="">
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
