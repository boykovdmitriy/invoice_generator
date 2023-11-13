import { getSession, getAccessToken } from "@auth0/nextjs-auth0";
import Profile from "@/ui/Profile";
import Button from "@/ui/Button";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex  justify-between w-full items-start">
        <div className="mb-10 text-left">
          <h1 className="text-6xl font-bold text-red-700">Invoice Generator</h1>
          <p className="text-2xl text-black">The Most Basic</p>
        </div>
        <div className="pt-2">
          {session?.user ? (
            <Profile />
          ) : (
            <Button component="a" variant="green" href="/api/auth/login">
              Login
            </Button>
          )}
        </div>
      </div>
      <Profile />
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <div className="p-10 rounded shadow-xl w-1/2">
          <p className="text-xl mb-5 flex flex-col text-center">
            We can make PDF invoices by data you enter.
            <span className="font-bold text-red-700 text-xl">That is all.</span>
            No fee, no complexity, at least for now.
          </p>
          <div className="text-center">
            <Button variant="green">Get Started</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
