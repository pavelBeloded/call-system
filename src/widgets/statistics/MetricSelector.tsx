import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MetricOption {
  key: string;
  label: string;
}

interface MetricSelectorProps {
  selectedMetrics: string[];
  onToggleMetric: (metric: string) => void;
}

const METRICS: MetricOption[] = [
  { key: "callVolume", label: "Call volume (VOL)" },
  { key: "callsHandled", label: "Calls handled (CH)" },
  { key: "averageHoldTime", label: "Average hold time (AH)" },
  { key: "serviceLevel", label: "Service level (SL)" },
  { key: "adjustedCallsOffered", label: "Adjusted calls offered (ACO)" },
  { key: "abandonedCalls", label: "Abandoned calls (AC)" },
  { key: "averageTalkTime", label: "Average talk time (ATT)" },
  { key: "abandonRate", label: "Abandon rate" },
  { key: "callTransfers", label: "Call transfers" },
  { key: "averageHandleTime", label: "Average handle time (AHT)" },
  { key: "aiCallDeflection", label: "AI call deflection" },
  { key: "aiCallEscalation", label: "AI call escalation rate" },
  { key: "firstCallResolution", label: "First call resolution" },
  { key: "averageAnswerSpeed", label: "Average answer speed (AAS)" },
];

export function MetricSelector({
  selectedMetrics,
  onToggleMetric,
}: MetricSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Choose columns to show
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {METRICS.map((metric) => (
          <div key={metric.key} className="flex items-center space-x-2">
            <Checkbox
              id={metric.key}
              checked={selectedMetrics.includes(metric.key)}
              onCheckedChange={() => onToggleMetric(metric.key)}
            />
            <Label
              htmlFor={metric.key}
              className="text-sm font-normal cursor-pointer"
            >
              {metric.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
