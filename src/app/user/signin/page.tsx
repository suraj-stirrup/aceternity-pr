import { SigninFormDemo } from "@/components/SigninFormDemo";
import React from "react";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <SigninFormDemo />
      </div>
    </div>
  );
}