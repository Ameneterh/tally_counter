import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CallClient() {
  const [formData, setFormData] = useState({});
  const [callError, setCallError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/server/clients/client-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setCallError(data.message);
        return;
      }
      if (data.success === false) {
        setCallError(data.message);
        return;
      }
      if (res.ok) {
        setCallError(null);
        navigate(`/client/${data._id}`);
      }
    } catch (error) {
      setCallError("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          type="number"
          className="w-full active:shadow-md hover:bg-slate-50"
          placeholder="Tally Number"
          required
          id="tally"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          className="w-full active:shadow-md hover:bg-slate-50"
          placeholder="Location"
          required
          id="location"
          onChange={handleChange}
        />

        <Button type="submit">Submit Client Call</Button>
      </form>
    </div>
  );
}
