'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (!res.ok) return alert(`Error: ${data.error}`);
    alert(`Uploaded: ${data.data.name}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-700">Upload File</h1>

        <input
  type="file"
  name="file" // ✅ THIS IS REQUIRED
  onChange={(e) => setFile(e.target.files?.[0] || null)}
  className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
/>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
