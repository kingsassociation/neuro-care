"use client";

import PrescriptionForm from "@/components/PrescriptionForm";
import { Suspense } from "react";

export default function NewPrescriptionPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Prescription</h1>
          <p className="text-gray-500">Create and print a new prescription for a patient</p>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
        <PrescriptionForm />
      </Suspense>
    </div>
  );
}
