import { useCall } from "@/entities/call/api/useCall";
import { useSearch } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactDetail() {
  const search = useSearch({ from: '/communication' });
  const { data: call, isLoading, error } = useCall(search.callId);

  // Состояние, когда звонок не выбран
  if (!search.callId) {
    return (
      <div className="flex h-full items-center justify-center text-slate-400 italic">
        Select a contact to view details
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-slate-500">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !call) {
    return (
      <div className="p-8 border-red-200 bg-red-50 text-red-700 rounded-lg">
        <p className="font-semibold">Error loading contact data</p>
      </div>
    );
  }

  return (
    <div className="bg-white h-full px-2 py-1">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-[22px] font-bold text-[#1a1c1e] tracking-tight">
          {call.contactName || "Unknown"}
        </h2>
        <div className="flex gap-3">
          <button className="p-1.5 border border-blue-500 rounded-full text-blue-500 hover:bg-blue-50 transition-colors">
            <Phone size={18} />
          </button>
          <button className="p-1.5 border border-blue-500 rounded-full text-blue-500 hover:bg-blue-50 transition-colors">
            <Mail size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-slate-100 mb-8">
        <button className="pb-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600">
          Details
        </button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-800">
          Interactions
        </button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-800">
          Billing history
        </button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-800">
          Service plans
        </button>
      </div>

      <div>
        <h3 className="text-[19px] font-bold text-[#1a1c1e] mb-6">
          Personal Information
        </h3>

        <div className="grid grid-cols-2 gap-y-8 gap-x-12">
          <div className="space-y-6">
            <InfoBlock 
                label="First Name:" 
                value={call.contactName?.split(' ')[0] || "-"} 
            />
            <InfoBlock 
                label="Last Name:" 
                value={call.contactName?.split(' ')[1] || call.contactName || "-"} 
            />
          </div>

          <div className="space-y-6">
            <InfoBlock 
                label="Phone Number:" 
                value={call.phoneNumber || "unknown"} 
            />
            <InfoBlock 
                label="Account Status:" 
                value={call.accountStatus || "-"}
                valueClassName="text-slate-800"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}


function InfoBlock({ 
    label, 
    value, 
    valueClassName 
}: { 
    label: string, 
    value: string | number, 
    valueClassName?: string 
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[15px] font-bold text-[#1a1c1e]">
        {label}
      </span>
      <span className={cn("text-[14px] text-slate-600 font-medium", valueClassName)}>
        {value}
      </span>
    </div>
  );
}