import { useState } from "react";
import { Button } from "flowbite-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HeaderComponent from "./components/HeaderComponent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDisplay from "./pages/ClientDisplay";
import CallClient from "./pages/CallClient";
import ClientNow from "./pages/ClientNow";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/client-display" element={<ClientDisplay />} />
          <Route path="/call-client" element={<CallClient />} />
          <Route path="/client/:clientId" element={<ClientNow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
