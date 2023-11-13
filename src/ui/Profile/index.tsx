"use client";
import { useUser, UserProfile } from "@auth0/nextjs-auth0/client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export const ProfileComponent = ({ user }: { user: UserProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const ref = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (
        ref.current &&
        !(ref.current as Element).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleOutSideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, isOpen]);

  return (
    <div className="relative w-48" ref={ref}>
      <button
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
        onClick={toggleDropdown}
      >
        <Image
          className="rounded-full"
          src={user.picture || ""}
          alt={user.name || ""}
          width={32}
          height={32}
        />
        <span className="text-sm font-medium shrink-0">{user?.name}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 w-48 py-2 mt-1 bg-white rounded-md shadow-lg">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Settings
          </a>
          <a
            href="/api/auth/logout"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const { user } = useUser();

  if (!user) return null;

  return <ProfileComponent user={user} />;
};

export default Profile;
