"use client";

import { Plus, Printer, Save, Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import PrescriptionPrintView, { PrintData } from "./PrescriptionPrintView";

interface PrescriptionFormData {
  id?: string;
  patientId?: string;
  appointmentId?: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientPhone: string;
  patientBloodGroup: string;
  patientAddress: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  medications: { name: string; dosage: string; frequency: string; duration: string }[];
  tests: string;
  advice: string;
  nextVisit: string;
  chamberId: string;
}

export default function PrescriptionForm() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");

  const { register, control, handleSubmit, watch, reset, getValues } = useForm<PrescriptionFormData>({
    defaultValues: {
      medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
      date: new Date().toLocaleDateString(),
      chamberId: "",
      patientBloodGroup: "",
      patientAddress: ""
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medications"
  });

  const [chambers, setChambers] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const formData = watch();
  
  // Initial data fetches
  useEffect(() => {
    // Fetch chambers
    fetch('/api/chambers')
      .then(res => res.json())
      .then(data => {
        setChambers(data);
        if (data.length > 0 && !getValues("chamberId")) {
           reset({ ...getValues(), chamberId: data[0].id });
        }
      })
      .catch(err => console.error(err));

    // Fetch patient info if available
    if (patientId) {
      fetch(`/api/patients/${patientId}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            reset({
              ...getValues(),
              patientName: data.name || "",
              patientPhone: data.phone || "",
              patientAge: data.age ? String(data.age) : "",
              patientGender: data.gender || "Male",
              patientBloodGroup: data.bloodGroup || "",
              patientAddress: data.address || ""
            });
          }
        })
        .catch(err => console.error("Failed to load patient autofill:", err));
    }

    // Fetch existing prescription if editing
    const prescriptionId = searchParams.get("prescriptionId");
    if (prescriptionId) {
      fetch(`/api/prescriptions/${prescriptionId}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            reset({
              ...getValues(),
              symptoms: data.symptoms || "",
              diagnosis: data.diagnosis || "",
              medications: data.medications || [{ name: "", dosage: "", frequency: "", duration: "" }],
              tests: data.tests || "",
              advice: data.advice || "",
              nextVisit: data.nextVisit ? new Date(data.nextVisit).toISOString().split('T')[0] : "",
              appointmentId: data.appointmentId || ""
            });
          }
        })
        .catch(err => console.error("Failed to load existing prescription:", err));
    }
  }, [patientId, searchParams, reset, getValues]);

  // Combine fetched settings with FormData for Printing
  const selectedChamber = chambers.find(c => c.id === formData.chamberId) || chambers[0];
  const printData: PrintData = {
    ...formData,
    chamber: selectedChamber ? {
      name: selectedChamber.name,
      address: selectedChamber.address,
      phone: selectedChamber.phone
    } : undefined
  };

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Prescription_${formData.patientName || 'Patient'}`,
  });

  const onSubmit = async (data: PrescriptionFormData) => {
    setIsSaving(true);
    try {
      // 1. Create Patient First
      const patientRes = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.patientName || "Unknown Patient",
          phone: data.patientPhone || "01XXXXXXXXX",
          age: data.patientAge,
          gender: data.patientGender,
          bloodGroup: data.patientBloodGroup,
          address: data.patientAddress
        })
      });
      
      if (!patientRes.ok) throw new Error("Failed to save patient");
      const patient = await patientRes.json();

      // 2. Create/Update Prescription linked to Patient
      const prescRes = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: searchParams.get("prescriptionId") || undefined,
          patientId: patient.id,
          appointmentId: searchParams.get("appointmentId") || undefined,
          symptoms: data.symptoms,
          diagnosis: data.diagnosis,
          medications: data.medications,
          tests: data.tests,
          advice: data.advice,
          nextVisit: data.nextVisit,
          chamberId: data.chamberId
        })
      });
      
      if (!prescRes.ok) throw new Error("Failed to save prescription");

      alert("Prescription saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save patient or prescription in database.");
    } finally {
      setIsSaving(false);
    }
  };

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form Area */}
      <div className="bg-white p-6 rounded-xl border shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Write Prescription</h2>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Select Chamber:</label>
            <select 
              {...register("chamberId")} 
              className="p-2 border rounded-md text-sm font-medium bg-gray-50 focus:ring-primary focus:border-primary w-full sm:w-auto"
            >
              {chambers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
              ))}
              {chambers.length === 0 && <option value="">Loading chambers...</option>}
            </select>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name <span className="text-red-500">*</span></label>
              <input {...register("patientName", { required: true })} className="w-full p-2 border rounded-md" placeholder="Enter Patient Name" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
              <input {...register("patientPhone", { required: true })} className="w-full p-2 border rounded-md" placeholder="+8801XXXXXXXXX" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input {...register("patientAge")} className="w-full p-2 border rounded-md" placeholder="e.g. 45" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select {...register("patientGender")} className="w-full p-2 border rounded-md">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select {...register("patientBloodGroup")} className="w-full p-2 border rounded-md">
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input {...register("patientAddress")} className="w-full p-2 border rounded-md" placeholder="Enter patient address" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms / Chief Complaints</label>
            <textarea {...register("symptoms")} className="w-full p-2 border rounded-md" rows={2} placeholder="e.g. Toothache, Gum Bleeding, Sensitivity, Cavity"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
            <input {...register("diagnosis")} className="w-full p-2 border rounded-md" placeholder="e.g. Dental Caries, Gingerities, Impacted Tooth" />
          </div>

          <div className="border-t pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <label className="block text-lg font-medium text-gray-800">Medications <span className="text-primary text-xl font-serif">Rx</span></label>
              <button 
                type="button" 
                onClick={() => append({ name: "", dosage: "", frequency: "", duration: "" })}
                className="text-sm bg-primary/5 px-4 py-2 rounded-md text-primary font-medium flex items-center gap-1 hover:bg-primary/10 transition w-full sm:w-auto justify-center"
              >
                <Plus size={16} /> Add Drug
              </button>
            </div>
            
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-200 group relative">
                  <div className="flex-1 space-y-4">
                    <div className="relative">
                      <input {...register(`medications.${index}.name`)} className="w-full p-3 border rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Drug Name (e.g. Tab. Paracetamol 500mg)" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <input {...register(`medications.${index}.dosage`)} className="w-full p-3 border text-sm rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" placeholder="Dosage (e.g. 1+0+1)" />
                        <div className="flex flex-wrap gap-1">
                          {['1+0+1', '1+1+1', '0+0+1', '1+0+0'].map(d => (
                            <button key={d} type="button" onClick={() => {
                              const values = getValues();
                              const newMeds = [...values.medications];
                              newMeds[index].dosage = d;
                              reset({ ...values, medications: newMeds });
                            }} className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-lg hover:border-primary hover:text-primary transition-all font-bold text-slate-500 uppercase">{d}</button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input {...register(`medications.${index}.frequency`)} className="w-full p-3 border text-sm rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" placeholder="Freq (e.g. After Meal)" />
                        <div className="flex flex-wrap gap-1">
                          {['After Meal', 'Before Meal', 'Apply Locally', '2 Times Daily'].map(f => (
                            <button key={f} type="button" onClick={() => {
                              const values = getValues();
                              const newMeds = [...values.medications];
                              newMeds[index].frequency = f;
                              reset({ ...values, medications: newMeds });
                            }} className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-lg hover:border-primary hover:text-primary transition-all font-bold text-slate-500 uppercase">{f}</button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input {...register(`medications.${index}.duration`)} className="w-full p-3 border text-sm rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" placeholder="Duration (e.g. 5 Days)" />
                        <div className="flex flex-wrap gap-1">
                          {['5 Days', '7 Days', '15 Days', '1 Month'].map(dur => (
                             <button key={dur} type="button" onClick={() => {
                              const values = getValues();
                              const newMeds = [...values.medications];
                              newMeds[index].duration = dur;
                              reset({ ...values, medications: newMeds });
                            }} className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-lg hover:border-primary hover:text-primary transition-all font-bold text-slate-500 uppercase">{dur}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={() => remove(index)} className="mt-1 text-slate-300 hover:text-red-500 p-2 transition-colors">
                    <Trash size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investigations / Tests Advised</label>
            <textarea {...register("tests")} className="w-full p-2 border rounded-md" rows={2} placeholder="e.g. X-ray OPG, Bitewing X-ray, Dental Scaling"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">General Advice</label>
            <textarea {...register("advice")} className="w-full p-2 border rounded-md" rows={2} placeholder="e.g. Ensure adequate hydration, maintain a regular sleep schedule."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Next Visit Date</label>
            <input type="date" {...register("nextVisit")} className="w-full p-2 border rounded-md" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t mt-8">
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-green-600 text-white p-3 rounded-lg font-medium hover:bg-green-700 flex justify-center items-center gap-2 transition w-full"
            >
              <Save size={20} /> {isSaving ? "Saving..." : "Save Prescription"}
            </button>
            
            <button 
              type="button" 
              onClick={() => setShowPreview(true)}
              className="bg-primary/5 text-primary border border-primary/20 p-3 rounded-lg font-medium hover:bg-primary/10 flex justify-center items-center gap-2 transition w-full"
            >
              View Preview
            </button>

            <button 
              type="button" 
              onClick={() => handlePrint()}
              className="bg-primary text-white p-3 rounded-lg font-medium hover:bg-primary/90 flex justify-center items-center gap-2 transition w-full"
            >
              <Printer size={20} /> Print Now
            </button>
          </div>
        </form>
      </div>

      {/* Hidden Print Area */}
      <div className="hidden">
        <PrescriptionPrintView data={printData} ref={printRef} />
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
            <div className="bg-white border-b px-8 py-6 flex justify-between items-center z-10 shadow-sm shrink-0">
               <div>
                 <h3 className="font-black text-xl text-slate-900 tracking-tight">Prescription Preview</h3>
                 <p className="text-sm text-slate-500 font-medium">Review before printing or saving</p>
               </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    handlePrint();
                    setShowPreview(false);
                  }} 
                  className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex gap-2 items-center hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                  <Printer size={18} /> Print
                </button>
                <button 
                  onClick={() => setShowPreview(false)} 
                  className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="p-4 md:p-12 flex justify-center bg-slate-200/50 overflow-auto flex-1">
               <div className="bg-white shadow-2xl origin-top mb-10 translate-y-0 scale-[0.5] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform duration-500">
                  <PrescriptionPrintView data={printData} ref={null} />
               </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
