import React, { useEffect, useState } from "react";
import InAttendance from "../components/InAttendance";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoader } from "../redux/loaderSlice.js";

export default function HomePage() {
  const { loading } = useSelector((state) => state.loaders);
  const { currentUser } = useSelector((state) => state.user);
  const [currentTally, setCurrentTally] = useState(0);
  const [formData, setFormData] = useState({});
  const [callError, setCallError] = useState(null);
  const [client, setClient] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const primal = { tally: 0 };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        dispatch(setLoader(true));
        const res = await fetch(`/server/clients/get-clients`);
        const data = await res.json();

        if (res.ok) {
          dispatch(setLoader(false));
          setCurrentTally(
            data.lastClient[0] === undefined ? primal : data.lastClient[0]
          );
        }
      } catch (error) {
        dispatch(setLoader(false));
        console.log(error.message);
      }
    };
    fetchClients();
  }, []);

  const setNextClient = (currentTally) => {
    let nextClient =
      currentTally.tally === undefined ? 1 : parseInt(currentTally.tally) + 1;
    const location = currentUser.location;

    console.log(nextClient, location);

    setFormData({
      tally: nextClient,
      location: location,
    });
    setClient(true);
  };

  const callNextClient = async () => {
    try {
      dispatch(setLoader(true));
      const res = await fetch("/server/clients/client-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(setLoader(false));
        setCallError(data.message);
        return;
      }
      if (data.success === false) {
        setCallError(data.message);
        return;
      }
      if (res.ok) {
        dispatch(setLoader(false));
        setCallError(null);
        navigate(`/client/${data._id}`);
      }
    } catch (error) {
      dispatch(setLoader(false));
      setCallError("Something went wrong!");
    }
    setClient(false);
  };

  return (
    <div className="min-h-[80svh] flex flex-col gap-6 justify-center max-w-6xl mx-auto mt-5 px-10 py-10">
      <div className="flex flex-1 gap-4 flex-wrap items-center justify-center rounded-2xl">
        <div className="w-full max-w-5xl h-60 rounded-2xl flex items-center justify-center text-blue-950 text-center text-6xl font-extrabold">
          Invite Next Client
        </div>
      </div>

      {currentUser ? (
        <div className="flex items-center gap-5 w-full">
          {client ? (
            <div className="flex flex-col gap-5 w-full justify-center text-center">
              <p className="font-bold text-blue-950">
                You have successfully set Next Client to Invite
              </p>
              <Button
                onClick={() => callNextClient()}
                className="w-full max-w-80 mx-auto bg-blue-950 h-16 items-center justify-center text-3xl"
              >
                Click Here to Invite Client
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setNextClient(currentTally)}
              className="w-full max-w-60 mx-auto outline bg-transparent text-green-950 hover:text-white h-16 items-center justify-center text-3xl"
            >
              Set Next Client
            </Button>
          )}
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
