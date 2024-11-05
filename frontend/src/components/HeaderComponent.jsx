import React, { useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { LuClipboardSignature } from "react-icons/lu";
import { staff } from "../assets/staff";

export default function HeaderComponent() {
  const [currentUser, setCurrentUser] = useState(false);
  const path = useLocation().pathname;

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
            label={<Avatar alt="User settings" img={staff[0].avatar} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{staff[0].name}</span>
              <span className="block truncate text-sm font-medium">
                {staff[0].email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
            <Link
              to="/log-in"
              className={`h-full flex items-center text-blue-950 border hover:text-white border-blue-950 px-4 py-2 rounded-lg hover:bg-blue-950 hover:opacity-50`}
            >
              <FaSignInAlt className="inline-block sm:hidden text-2xl" />
              <span className="hidden sm:inline-block">Login</span>
            </Link>
            <Link
              to="/sign-up"
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
