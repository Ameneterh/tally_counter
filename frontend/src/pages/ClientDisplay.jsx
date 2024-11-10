import React from "react";
import ShowClient from "../components/ShowClient";
import { clientList } from "../assets/clientList.js";

export default function ClientDisplay() {
  return (
    <div className="min-h-[80svh] flex flex-col gap-6 max-w-6xl mx-auto mt-5 px-10">
      <div className="text-3xl w-full font-bold text-center">
        Clients in Attendance:
      </div>
      <div className="w-full grid grid-cols-3 gap-6">
        {clientList.map((client, id) => (
          <ShowClient
            key={id}
            tally={client.tally}
            location={client.location}
          />
        ))}
      </div>
    </div>
  );
}
