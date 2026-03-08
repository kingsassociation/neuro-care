"use client";

import { Edit, Hospital, MapPin, Phone, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

type Chamber = {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
};

export default function ChambersPage() {
  const [chambers, setChambers] = useState<Chamber[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    type: "Primary",
    address: "",
    phone: ""
  });

  const fetchChambers = async () => {
    try {
      const res = await fetch('/api/chambers');
      const data = await res.json();
      setChambers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChambers();
  }, []);

  const handleSave = async (id?: string) => {
    const method = id ? 'PATCH' : 'POST';
    const body = id ? { id, ...formData } : formData;

    try {
      const res = await fetch('/api/chambers', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        await fetchChambers();
        setIsAdding(false);
        setIsEditing(null);
        setFormData({ name: "", type: "Primary", address: "", phone: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chamber? This will also delete all associated schedules.")) return;
    
    try {
      const res = await fetch(`/api/chambers?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchChambers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (chamber: Chamber) => {
    setFormData({
      name: chamber.name,
      type: chamber.type,
      address: chamber.address,
      phone: chamber.phone
    });
    setIsEditing(chamber.id);
    setIsAdding(false);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Chambers...</div>;

  return (
    <div className="max-w-6xl space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chamber Management</h1>
          <p className="text-gray-500">Configure your hospital and clinic locations.</p>
        </div>
        {!isAdding && !isEditing && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={20} /> Add New Chamber
          </button>
        )}
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-white p-6 rounded-2xl border-2 border-primary/10 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center bg-primary/5 -m-6 mb-4 px-6 py-4 rounded-t-2xl border-b border-primary/10">
            <h3 className="font-bold text-primary flex items-center gap-2">
               <Hospital size={18} /> {isAdding ? "Register New Chamber" : "Edit Chamber Details"}
            </h3>
            <button onClick={() => { setIsAdding(false); setIsEditing(null); }} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Chamber Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Sevron Hospital"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Type</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition"
              >
                <option value="Primary">Primary</option>
                <option value="Visiting">Visiting</option>
                <option value="Home">Home Clinic</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Address</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                placeholder="Panchlaish Residential Area, Chattogram"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Phone</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="+880 1XXX-XXXXXX"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
             <button 
               onClick={() => { setIsAdding(false); setIsEditing(null); }}
               className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition"
             >
               Cancel
             </button>
             <button 
               onClick={() => handleSave(isEditing || undefined)}
               className="bg-primary text-white px-8 py-2.5 rounded-xl font-bold hover:opacity-90 flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
             >
               <Save size={18} /> {isEditing ? "Save Changes" : "Create Chamber"}
             </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-800">
        {chambers.map((chamber) => (
          <div key={chamber.id} className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
               <button 
                 onClick={() => startEdit(chamber)}
                 className="p-2 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition"
               >
                 <Edit size={16} />
               </button>
               <button 
                 onClick={() => handleDelete(chamber.id)}
                 className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
               >
                 <Trash2 size={16} />
               </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                   <h3 className="font-bold text-xl">{chamber.name}</h3>
                   <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-primary/20">
                     {chamber.type}
                   </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{chamber.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <p className="text-sm text-slate-600 font-medium">{chamber.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {chambers.length === 0 && !loading && (
          <div className="md:col-span-2 lg:col-span-3 text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
             <Hospital size={48} className="mx-auto text-slate-300 mb-4" />
             <p className="text-slate-400 font-medium italic">No chambers registered yet. Add your first location to start managing schedules.</p>
          </div>
        )}
      </div>
    </div>
  );
}
