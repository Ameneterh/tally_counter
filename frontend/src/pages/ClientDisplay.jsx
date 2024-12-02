import React, { useEffect, useState } from "react";
import ShowClient from "../components/ShowClient";

export default function ClientDisplay() {
  const [clients, setClients] = useState([]);
  const [totalClients, setTotalClients] = useState(0);

  // console.log(totalClients);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchClients = async () => {
        try {
          const res = await fetch(
            `/server/clients/get-clients?isDispensed=false`
          );
          const data = await res.json();
          if (res.ok) {
            setClients(data.isDispensed);
            setTotalClients(data.totalClients);
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchClients();
    }, 10000); //set your time here. repeat every 5 seconds

    return () => clearInterval(interval);
  }, [totalClients]);

  return (
    <div className="min-h-[80svh] flex flex-col gap-6 w-full max-w-6xl mx-auto mt-5 px-10">
      <div className="text-3xl w-full font-bold text-center">
        Clients in Attendance:
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        {clients.map((client, id) => (
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
