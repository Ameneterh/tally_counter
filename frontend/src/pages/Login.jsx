import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLogin } from "react-icons/md";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";
// import Spinner from "../Components/Spinner";

export default function Login() {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/user/signin", {
        email,
        password,
      });
      console.log(response);
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex flex-col items-center w-[90%] sm:max-w-sm mx-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10 border-b-2 border-black w-full pb-4 ">
        <p className="text-3xl prata-regular flex items-center gap-3">
          <MdLogin className="font-extrabold text-white bg-black p-1 rounded" />
          Login
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <input
        type="email"
        className="w-full pax-3 border border-gray-300 rounded-md active:shadow-md hover:bg-slate-50"
        placeholder="Location"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="w-full pax-3 border border-gray-300 rounded-md active:shadow-md hover:bg-slate-50"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <div className="w-full flex justify-between text-sm mt-[-6px] text-blue-500">
        <p className="cursor-pointer hover:underline underline-offset-1">
          Forgot your password?
        </p>

        <Link
          to="/register"
          className="cursor-pointer hover:underline underline-offset-1"
        >
          Create account
        </Link>
      </div>
      <button className="flex justify-center items-center bg-slate-700 px-8 py-3 text-sm font-medium text-white hover:bg-slate-500 active:bg-blue-600 rounded-md w-full uppercase">
        {loading ? (
          <>
            <Spinner
              height={5}
              width={5}
              border_width={4}
              border_color={"white"}
            />{" "}
            processing ...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
