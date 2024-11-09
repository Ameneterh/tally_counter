import React, { useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { LuClipboardSignature } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice";

export default function HeaderComponent() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const res = await fetch("/server/user/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(logoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar fluid className="max-w-6xl mx-auto">
      <Navbar.Brand href="/">
        <img
          src="/amsh_rx_logo.png"
          className="mr-3 h-9 sm:h-12"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-2xl font-bold text-blue-950">
          DEPARTMENT OF
          <span className="block -mt-2 text-lg">Pharmaceutical Services</span>
        </span>
      </Navbar.Brand>
      <div className="flex gap-3 items-center md:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                className="border-2 border-blue-900 rounded-full"
                alt="User settings"
                img={currentUser.userImage}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-extrabold">
                <span className="font-normal mr-2">Location:</span>
                {currentUser.location}
              </span>
              <span className="block truncate text-sm font-medium">
                <span className="font-normal mr-2">Username:</span>
                {currentUser.username}
              </span>
            </Dropdown.Header>
            <Dropdown.Item className="text-red-600" onClick={handleLogout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link
              to="/login"
              className={`h-full flex items-center text-blue-950 border hover:text-white border-blue-950 px-4 py-2 rounded-lg hover:bg-blue-950 hover:opacity-50`}
            >
              <FaSignInAlt className="inline-block sm:hidden text-2xl" />
              <span className="hidden sm:inline-block">Login</span>
            </Link>
            <Link
              to="/register"
              className={`h-full flex items-center text-[white] bg-blue-950
              px-4 py-2 rounded-lg hover:opacity-50`}
            >
              <LuClipboardSignature className="inline-block sm:hidden text-2xl" />
              <span className="hidden sm:inline-block">Sign Up</span>
            </Link>
          </>
        )}

        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
