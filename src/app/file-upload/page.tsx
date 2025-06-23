// file uplaod page
import React from "react";
import { FileUploadDemo } from "@/components/FileUploadDemo";    

export default function FileUploadPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-6">File Upload</h2>
            <FileUploadDemo />
        </div>
        </div>
    );
}