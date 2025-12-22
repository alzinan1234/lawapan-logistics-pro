"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Truck,
  FileText,
  AlertCircle,
  Settings,
  ChevronUp,
  LogOut,
  User,
  Lock,
  Wallet,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/dashboard/Shipper", icon: LayoutDashboard },
  { name: "My Shipments", href: "/dashboard/Shipper/shipments", icon: Truck },
  { name: "Invoices", href: "/admin/invoices", icon: FileText },
  { name: "Issue reported", href: "/admin/issues", icon: AlertCircle },
];

const settingsDropdown = [
  { name: "Edit Profile", href: "/admin/settings/profile", icon: User },
  { name: "Change Password", href: "/admin/settings/password", icon: Lock },
  { name: "Bank Details", href: "/admin/settings/bank", icon: Wallet },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        }`}
      >
        <div className="flex flex-col h-full justify-between border-r border-[#D6D6D6]">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between border-b border-[#D6D6D6] py-5 px-[10px]">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded text-[#000]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="8"
                viewBox="0 0 21 8"
                fill="none"
              >
                <path
                  d="M1.5 1H19.5"
                  stroke="#242323"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                <path
                  d="M1.5 7H19.5"
                  stroke="#252525"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-4 space-y-2 flex-grow overflow-y-auto px-4">
            {navItems.map(({ name, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center px-4 py-3 rounded transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-normal text-sm">{name}</span>
                </Link>
              );
            })}

            {/* Settings Dropdown */}
            <div className="mt-6">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded transition-all ${
                  settingsOpen
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-3" />
                  <span className="font-normal text-sm">Settings</span>
                </div>
                <ChevronUp
                  className={`w-4 h-4 transition-transform ${
                    settingsOpen ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>

              {/* Settings Submenu */}
              {settingsOpen && (
                <div className="mt-2 space-y-1 bg-gray-50 rounded p-2 border border-gray-200">
                  {settingsDropdown.map(({ name, href, icon: Icon }) => (
                    <Link
                      key={name}
                      href={href}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded text-sm transition-all"
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      <span>{name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <div className="border-t border-[#D6D6D6] pt-6 mt-6">
              <button className="flex items-center gap-2 text-red-500 hover:text-red-600 px-4 py-2 rounded hover:bg-red-50 transition-all">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-normal">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Open Button (When Sidebar is Closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg flex items-center justify-center hover:bg-blue-700 transition"
        >
          <Image src="/bars.png" alt="menu" width={24} height={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;