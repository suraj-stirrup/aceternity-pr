"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  title: string;
  companyName: string;
  date: string;
  pdfName: string;
  content: string;
  design: string;
  production: string;
  qc: string;
}

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function ReportForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    companyName: "",
    date: "",
    pdfName: "",
    content: "",
    design: "",
    production: "",
    qc: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`❌ Error: ${result.error}`);
      } else {
        alert("✅ Report submitted successfully!");
        setFormData({
          title: "",
          companyName: "",
          date: "",
          pdfName: "",
          content: "",
          design: "",
          production: "",
          qc: "",
        });
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6 mt-20"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Report Entry Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Title" name="title" value={formData.title} onChange={handleChange} />
        <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
        <InputField label="Date" name="date" value={formData.date} onChange={handleChange} type="date" />
        <InputField label="PDF Name" name="pdfName" value={formData.pdfName} onChange={handleChange} />
      </div>

      <fieldset className="border border-gray-200 p-4 rounded-lg">
        <legend className="text-lg font-semibold text-gray-800">Team Fields</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputField label="Content" name="content" value={formData.content} onChange={handleChange} />
          <InputField label="Design" name="design" value={formData.design} onChange={handleChange} />
          <InputField label="Production" name="production" value={formData.production} onChange={handleChange} />
          <InputField label="QC" name="qc" value={formData.qc} onChange={handleChange} />
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: InputFieldProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        required={name !== "pdfName"}
      />
    </div>
  );
}
