import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const Mainpage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/home", { name, username, password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/home")
      .then((datas) => setDatas(datas.data))
      .catch((err) => console.log(err));
  }, []);

  const [reg, setReg] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/register")
      .then((reg) => setReg(reg.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(reg.length);

  const handleEdit = (id) => {
    const newName = prompt("enter new name");
    const newEmail = prompt("enter new email");
    const newPassword = prompt("enter new password");

    axios
      .put("http://localhost:3001/update", {
        name: newName,
        email: newEmail,
        password: newPassword,
        id: id,
      })
      .then((resp) => console.log(resp));

    console.log(newName, newEmail, newPassword, id);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`delete ${name}`)) {
      axios
        .get("http://localhost:3001/deleteUser")
        .then((reg) => setReg(reg.data));
    } else {
    }
  };

  return (
    <div className="flex">
      <div className="flex-none w-64 bg-blue-100 h-screen">
        <div className="">
          <input
            className="mb-3 w-64 p-3 bg-blue-100"
            type="text"
            placeholder="Search"
          ></input>
          <span className="m-3 cursor-pointer">Passwords</span>
        </div>
      </div>

      <div className="flex-auto  w-64">
        <div className="p-5">
          <form className="" onSubmit={handleSubmit}>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="name"
              className="mr-10 w-64"
              placeholder="name"
              type="text"
            ></input>

            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              name="username"
              className="mr-10 w-64"
              placeholder="username"
              type="text"
            ></input>

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              className="mr-10 w-64"
              placeholder="password"
              type="password"
            ></input>
            <button
              type="submit"
              className="bg-blue-800 p-2 rounded-md ml-3 mt-3 text-white"
            >
              Add password
            </button>
          </form>
        </div>
        <div className="flex m-5">
          <div className="flex-1 w-32">
            <span className="text-gray-400">Name</span>
          </div>
          <div className="flex-1 w-32">
            <span className="text-gray-400">Username</span>
          </div>
          <div className="flex-1 w-32">
            <span className="text-gray-400">Password</span>
          </div>
          <div className="flex-2 w-16"></div>
        </div>
        {reg.map((data) => (
          <div className="flex m-5">
            <div className="flex-1 w-32">
              <span className="text-black-400">{data.name}</span>
            </div>
            <div className="flex-1 w-32">
              <span className="text-black-400">{data.email}</span>
            </div>
            <div className="flex-1 w-32">
              <span className="text-black-400">{data.password}</span>
            </div>
            <div className="flex-2 space-x-4 w-16 items-end">
              <button className="" onClick={() => handleEdit(data._id)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className=""
                onClick={() => handleDelete(data._id, data.name)}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ color: "#ff0000" }}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mainpage;
