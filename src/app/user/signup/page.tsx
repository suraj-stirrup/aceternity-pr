// import SignUpForm from "@/components/SignUpForm";
import { SignupFormDemo } from "@/components/SignupFormDemo";
// import React from "react";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {/* <SignUpForm /> */}
        <SignupFormDemo />
      </div>
    </div>
  );
}
