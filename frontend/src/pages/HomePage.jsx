import React, { useState } from "react";
import InAttendance from "../components/InAttendance";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { currentUser } = useSelector((state) => state.user);
  const [count, setCount] = useState(1);

  const increment = (currentCount) => {
    let count = currentCount + 1;

    if (count <= 100) {
      setCount(count);
    } else {
      setCount(1);
    }
  };

  const reset = () => {
    setCount(1);
  };

  const callNextClient = (count) => {
    const next = increment(count);
    const location = currentUser.location;
    console.log(location, next);
  };

  return (
    <div className="min-h-[80svh] flex flex-col gap-6 justify-center max-w-6xl mx-auto mt-5 px-10">
      <div className="flex flex-1 gap-4 flex-wrap items-center justify-center rounded-2xl">
        <div className="text-3xl w-full font-bold text-center">
          Next Number On Queue:
        </div>
        <div className="w-full max-w-96 h-96 bg-blue-950 rounded-2xl flex items-center justify-center text-white text-[200px] font-bold">
          {count}
        </div>
      </div>

      {currentUser ? (
        <div className="flex items-center gap-5 w-full">
          <Button onClick={() => reset()} className="w-full">
            Reset
          </Button>
          <Button onClick={() => callNextClient(count)} className="w-full">
            Next
          </Button>
        </div>
      ) : (
        <Link
          to="/login"
          className={`max-w-7xl mx-auto flex items-center justify-center text-blue-950 border hover:text-white border-blue-950 px-4 py-2 rounded-lg hover:bg-blue-950`}
        >
          Login To Invite a Client
        </Link>
      )}
    </div>
  );
}
