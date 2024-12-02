import React from "react";

export default function ShowClient({ tally, location }) {
  return (
    <div className="shadow max-w-4xl p-10 bg-blue-950 text-white flex flex-col text-center rounded">
      <div className="text-8xl font-extrabold">{tally}</div>
      <div className="font-bold text-5xl">{location}</div>
    </div>
  );
}
