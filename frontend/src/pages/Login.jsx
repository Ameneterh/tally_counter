import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextInput, Spinner, Alert } from "flowbite-react";
import { MdLogin } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return setError("Please, fill out all fields");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/server/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);

      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center w-[90%] sm:max-w-sm mx-auto gap-4 text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-sm mx-auto mt-5 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10 border-b-2 border-black w-full pb-4 ">
          <p className="text-3xl prata-regular flex items-center gap-3">
            <MdLogin className="font-extrabold text-white bg-black p-1 rounded" />
            Login
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        <TextInput
          type="text"
          className="w-full rounded-md active:shadow-md hover:bg-slate-50"
          placeholder="Username"
          required
          id="username"
          onChange={handleChange}
        />
        <div className="flex items-center w-full rounded-md active:shadow-md hover:bg-slate-50 relative">
          <TextInput
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full"
            id="password"
            onChange={handleChange}
            required
          />
          <span
            className="absolute right-2 text-[#999BA1] text-xl cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="w-full flex justify-between text-sm mt-[-6px] text-blue-500">
          <p className="cursor-pointer hover:underline underline-offset-1">
            Forgot your password?
          </p>

          <Link
            to="/register"
            className="cursor-pointer hover:underline underline-offset-1"
          >
            Register Here
          </Link>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center bg-slate-700 px-8 text-sm font-medium text-white hover:bg-slate-500 active:bg-blue-600 rounded-md w-full uppercase"
        >
          {loading ? (
            <>
              <Spinner
                height={5}
                width={5}
                border_width={4}
                border_color={"white"}
              />{" "}
              <span className="pl-3">processing ...</span>
            </>
          ) : (
            "sign in [login]"
          )}
        </Button>
      </form>

      {error && (
        <Alert className="mt-5" color="failure">
          {error}
        </Alert>
      )}
    </div>
  );
}
