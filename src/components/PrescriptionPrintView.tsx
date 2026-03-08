"use client";

import { forwardRef } from "react";

export interface PrintData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientPhone: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  medications: { name: string; dosage: string; frequency: string; duration: string }[];
  tests: string;
  advice: string;
  nextVisit: string;
  chamber?: {
    name: string;
    address: string;
    phone: string;
  };
}

interface Props {
  data: PrintData;
}

const PrescriptionPrintView = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <>
      <style type="text/css" media="print">
        {`
          @page { size: A4 portrait; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        `}
      </style>
      <div ref={ref} className="p-8 bg-white text-black mx-auto flex flex-col relative
        w-[210mm] min-h-[297mm] 
        print:w-[210mm] print:h-[297mm] print:m-0 print:p-8 print:box-border print:overflow-hidden break-inside-avoid !max-w-none border shadow-sm print:border-none print:shadow-none">
        {/* Header */}
      <div className="border-b-2 border-blue-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Dr. John Doe</h1>
          <p className="text-gray-600 font-semibold">MBBS, MD (Neurology)</p>
          <p className="text-sm text-gray-500">Sr. Consultant Neurologist</p>
        </div>
        <div className="text-right text-sm">
          <p><strong>{data.chamber?.name || "Select a Chamber"}</strong></p>
          <p>{data.chamber?.address || "123 Health Avenue, Medical District"}</p>
          <p>Phone: {data.chamber?.phone || "+1 234 567 890"}</p>
        </div>
      </div>

      {/* Patient Info */}
      <div className="flex justify-between border-b pb-4 mb-6 text-sm">
        <div>
          <p><strong>Patient Name:</strong> {data.patientName || "_________________"}</p>
          <p><strong>Age/Gender:</strong> {data.patientAge || "___"} / {data.patientGender || "___"}</p>
          <p><strong>Phone:</strong> {data.patientPhone || "_________________"}</p>
        </div>
        <div className="text-right">
          <p><strong>Date:</strong> {data.date || new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 min-h-[500px]">
        {/* Left Column (Symptoms, Tests) */}
        <div className="col-span-1 border-r pr-4">
          {data.symptoms && (
            <div className="mb-6 break-inside-avoid">
              <h3 className="font-bold text-gray-800 border-b mb-2">Chief Complaints</h3>
              <p className="whitespace-pre-wrap text-sm">{data.symptoms}</p>
            </div>
          )}
          
          {data.diagnosis && (
            <div className="mb-6 break-inside-avoid">
              <h3 className="font-bold text-gray-800 border-b mb-2">Diagnosis</h3>
              <p className="text-sm font-semibold">{data.diagnosis}</p>
            </div>
          )}

          {data.tests && (
            <div className="mb-6 break-inside-avoid">
              <h3 className="font-bold text-gray-800 border-b mb-2">Investigations Advised</h3>
              <p className="whitespace-pre-wrap text-sm">{data.tests}</p>
            </div>
          )}
        </div>

        {/* Right Column (Rx) */}
        <div className="col-span-2 pl-2">
          <h2 className="text-4xl text-blue-900 font-serif mb-6">Rx</h2>
          
          <div className="space-y-6">
            {data.medications?.map((med, index) => (
              <div key={index} className="mb-4 break-inside-avoid">
                <p className="font-bold text-lg">{index + 1}. {med.name}</p>
                <div className="flex gap-4 text-sm text-gray-700 ml-4">
                  <p>Dosage: <strong>{med.dosage}</strong></p>
                  <p>Freq: <strong>{med.frequency}</strong></p>
                  <p>Duration: <strong>{med.duration}</strong></p>
                </div>
              </div>
            ))}
          </div>

          {data.advice && (
            <div className="mt-12 break-inside-avoid">
              <h3 className="font-bold text-gray-800 border-b mb-2">Advice</h3>
              <p className="whitespace-pre-wrap text-sm">{data.advice}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t flex justify-between items-end break-inside-avoid">
        <div>
          {data.nextVisit && (
            <p className="font-semibold text-blue-900">Next Visit: {new Date(data.nextVisit).toLocaleDateString()}</p>
          )}
        </div>
        <div className="text-center">
          <div className="w-32 h-16 border-b border-dashed mb-2"></div>
          <p className="text-sm font-bold">Doctor's Signature</p>
        </div>
      </div>
    </div>
    </>
  );
});

PrescriptionPrintView.displayName = "PrescriptionPrintView";

export default PrescriptionPrintView;
