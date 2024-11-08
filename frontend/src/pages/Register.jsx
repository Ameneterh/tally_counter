import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextInput } from "flowbite-react";
import { MdOutlineAppRegistration } from "react-icons/md";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
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
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[80vh] flex flex-col items-center w-[90%] sm:max-w-sm mx-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10 border-b-2 border-black w-full pb-4 ">
        <p className="text-3xl prata-regular flex items-center gap-3">
          <MdOutlineAppRegistration className="font-extrabold text-white bg-black p-1 rounded" />
          Register
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <TextInput
        type="text"
        className="w-full rounded-md active:shadow-md hover:bg-slate-50"
        placeholder="Location"
        required
        id="location"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <TextInput
        type="text"
        className="w-full rounded-md active:shadow-md hover:bg-slate-50"
        placeholder="Username"
        required
        id="username"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <TextInput
        type="password"
        className="w-full rounded-md active:shadow-md hover:bg-slate-50"
        placeholder="Password"
        required
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <div className="w-full flex justify-between text-sm mt-[-6px] text-blue-500">
        <p className="cursor-pointer hover:underline underline-offset-1">
          Forgot your password?
        </p>

        <Link
          to="/login"
          className="cursor-pointer hover:underline underline-offset-1"
        >
          Signin Here
        </Link>
      </div>
      <Button
        type="submit"
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
            processing ...
          </>
        ) : (
          "create account"
        )}
      </Button>
    </form>
  );
}
