import React, { useState } from "react";
import InAttendance from "../components/InAttendance";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ClientNow() {
  const { currentUser } = useSelector((state) => state.user);
  const [count, setCount] = useState(1);

  return (
    <div className="min-h-[80svh] flex flex-col gap-6 justify-center max-w-6xl mx-auto mt-5 px-10">
      <div className="flex flex-1 gap-4 flex-wrap items-center justify-center rounded-2xl">
        <div className="text-3xl w-full font-bold text-center">
          You're Expecting Client Number
        </div>
        <div className="w-full max-w-80 h-80 bg-blue-950 rounded-2xl flex items-center justify-center text-white text-[200px] font-bold">
          {count}
        </div>
      </div>

      <div className="flex items-center gap-5 w-full">
        <Button onClick={() => callNextClient(count)} className="w-full">
          Dispensed
        </Button>
      </div>
    </div>
  );
}
