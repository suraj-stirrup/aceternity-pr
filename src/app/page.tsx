import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        📚 Welcome to the Library App
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
        {/* User Section */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">User Access</h2>
          <div className="space-x-4">
            <Link href="/user/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
            <Link href="/user/signup" className="text-green-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Admin Section */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Admin Access</h2>
          <div className="space-x-4">
            <Link href="/admin/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
            <Link href="/admin/signup" className="text-green-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
