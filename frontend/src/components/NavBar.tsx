"use client";

import { useContext, useState } from "react";

import { Link} from "react-router-dom";
import { Briefcase, Search, Bell, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { UserDataContext } from "@/context/UserContext";
import { Separator } from "@/components/ui/separator";

const NavBar = ({ pathname }: { pathname: string }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {userData} = useContext(UserDataContext)!;

  const navItems = [
    { name: "Find Jobs", href: "/jobs", icon: Search },
    { name: "My Applications", href: "/users/applications", icon: Briefcase },
    { name: "Notifications", href: "/notifications", icon: Bell },
  ];

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">GetAJob</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-blue-800 text-white"
                      : "text-blue-300 hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative rounded-full bg-blue-800 p-1 text-blue-200  focus:outline-none focus:ring-2 "
                  >
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarImage
                        src="https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
                        alt="User avatar"
                      />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="grid gap-4">
                    <div className="">
                      <div className="text-base font-medium leading-none text-black">
                        {userData?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-blue-600">
                        {userData?.email}
                      </div>
                    </div>
                    <Separator className="text-black"/>
                    <Link
                      to="/users/profile"
                      className="font-medium hover:underline"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/users/settings"
                      className="font-medium hover:underline"
                    >
                      Settings
                    </Link>
                    <hr className="my-2" />
                    <Link
                      to="/users/logout"
                      className="font-medium text-red-600 hover:underline"
                    >
                      Logout
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-300 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "bg-blue-800 text-white"
                    : "text-blue-300 hover:bg-blue-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-blue-800">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {userData?.name}
                </div>
                <div className="text-sm font-medium leading-none text-blue-300">
                  {userData?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-300 hover:text-white hover:bg-blue-800"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-300 hover:text-white hover:bg-blue-800"
              >
                Settings
              </Link>
              <Link
                to="/logout"
                className="block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-white hover:bg-blue-800"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
