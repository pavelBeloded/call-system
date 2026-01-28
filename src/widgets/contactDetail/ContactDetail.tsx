import { useCall } from "@/entities/call";
import { useSearch } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TabType = "details" | "interactions" | "billing" | "service";

export function ContactDetail() {
  const search = useSearch({ from: '/communication' });
  const { data: call, isLoading, error } = useCall(search.callId);
  const [activeTab, setActiveTab] = useState<TabType>("details");

  // When no call is selected
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

  const tabs: { id: TabType; label: string }[] = [
    { id: "details", label: "Details" },
    { id: "interactions", label: "Interactions" },
    { id: "billing", label: "Billing history" },
    { id: "service", label: "Service plans" },
  ];

  return (
    <div className="bg-white h-full px-4 py-4 space-y-6">
      {/* Header with name and action buttons */}
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-900">
          {call.contactName || "Unknown"}
        </h2>
        <div className="flex gap-2">
          <button className="p-2 border border-blue-600 rounded-full text-blue-600 hover:bg-blue-50 transition-colors">
            <Phone size={18} />
          </button>
          <button className="p-2 border border-blue-600 rounded-full text-blue-600 hover:bg-blue-50 transition-colors">
            <Mail size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-blue-600 font-bold"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "details" && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">
            Personal Information
          </h3>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <InfoBlock 
              label="First Name:" 
              value={call.firstName || call.contactName?.split(' ')[0] || "-"} 
            />
            <InfoBlock 
              label="Phone Number:" 
              value={call.phoneNumber || "Unknown"} 
            />
            <InfoBlock 
              label="Middle Name:" 
              value={call.middleName || "-"} 
            />
            <InfoBlock 
              label="Mobility Status:" 
              value={call.mobilityStatus ? call.mobilityStatus.charAt(0).toUpperCase() + call.mobilityStatus.slice(1) : "-"}
            />
            <InfoBlock 
              label="Last Name:" 
              value={call.lastName || call.contactName?.split(' ')[1] || "-"} 
            />
            <InfoBlock 
              label="Age:" 
              value={call.age?.toString() || "-"}
            />
          </div>
        </div>
      )}

      {activeTab === "interactions" && (
        <div className="text-sm text-gray-600 py-8">
          No interaction history available
        </div>
      )}

      {activeTab === "billing" && (
        <div className="text-sm text-gray-600 py-8">
          No billing history available
        </div>
      )}

      {activeTab === "service" && (
        <div className="text-sm text-gray-600 py-8">
          No service plans available
        </div>
      )}
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
      <span className="text-sm font-bold text-gray-900">
        {label}
      </span>
      <span className={cn("text-sm text-gray-600 font-medium", valueClassName)}>
        {value}
      </span>
    </div>
  );
}
