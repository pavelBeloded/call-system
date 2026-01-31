import { useState } from "react";
import { Contact } from "@/entities/statistics";
import { CallVolumeChart } from "./CallVolumeChart";
import { MetricSelector } from "./MetricSelector";
import { cn } from "@/lib/utils";

type TabType = "details" | "interactions";

interface ContactStatisticsPanelProps {
  contact: Contact;
}

export function ContactStatisticsPanel({
  contact,
}: ContactStatisticsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("details");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "callVolume",
    "callsHandled",
    "serviceLevel",
    "averageAnswerSpeed",
  ]);

  const handleToggleMetric = (metric: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric],
    );
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "details", label: "Details" },
    { id: "interactions", label: "Interactions" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {contact.firstName} {contact.lastName}
          </h2>
        </div>

        <div className="flex gap-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-blue-600 font-bold"
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "details" && (
          <div className="pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <InfoBlock label="First Name:" value={contact.firstName} />
              <InfoBlock label="Phone Number:" value={contact.phoneNumber} />
              <InfoBlock label="Middle Name:" value="-" />
              <InfoBlock
                label="Mobility Status:"
                value={
                  contact.mobilityStatus
                    ? contact.mobilityStatus.charAt(0).toUpperCase() +
                      contact.mobilityStatus.slice(1)
                    : "-"
                }
              />
              <InfoBlock label="Last Name:" value={contact.lastName} />
              <InfoBlock label="Age:" value={contact.age?.toString() || "-"} />
            </div>
          </div>
        )}

        {activeTab === "interactions" && (
          <div className="pt-6 text-sm text-gray-600">
            No interaction history available
          </div>
        )}
      </div>

      <CallVolumeChart
        data={contact.statistics.callVolume}
        selectedMetrics={selectedMetrics}
        allMetrics={contact.statistics}
      />

      <MetricSelector
        selectedMetrics={selectedMetrics}
        onToggleMetric={handleToggleMetric}
      />
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-bold text-gray-900">{label}</span>
      <span className="text-sm text-gray-600 font-medium">{value}</span>
    </div>
  );
}
