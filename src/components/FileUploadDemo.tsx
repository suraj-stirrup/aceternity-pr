"use client";

import React from "react";
import { FileUpload } from "@/components/ui/file-upload";

interface FileUploadDemoProps {
  onUploaded: (file: File) => void;
}

export function FileUploadDemo({ onUploaded }: FileUploadDemoProps) {
  const handleFileUpload = (files: File[]) => {
    if (!files.length) return;
    onUploaded(files[0]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto border border-dashed rounded-lg p-4">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
