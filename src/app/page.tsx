import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import ProfileClient from "./ui/ProfileClient";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const info = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="flex space-between items-center justify-between w-full">
        <h1>Invoice Generator</h1>
        <ProfileClient />
        {info?.user ? (
          <a className="btn" href="/api/auth/logout">
            Logout
          </a>
        ) : (
          <a className="btn" href="/api/auth/login">
            Login
          </a>
        )}
      </div>
      <div className="pt-24 flex flex-col items-center justify-center">
        <p>
          Invoice Generator for freelancers. Unlock essential features such as
          unlimited invoices, estimates and clients.
        </p>
      </div>
    </main>
  );
}
