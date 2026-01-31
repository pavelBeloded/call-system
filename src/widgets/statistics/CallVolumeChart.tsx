import { ContactStatistics, DataPoint } from "@/entities/statistics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
interface CallVolumeChartProps {
  data: DataPoint[];
  selectedMetrics: string[];
  allMetrics: ContactStatistics;
}

const METRIC_COLORS: Record<string, string> = {
  callVolume: "#3b82f6", // blue
  callsHandled: "#8b5cf6", // purple
  averageHoldTime: "#ec4899", // pink
  serviceLevel: "#10b981", // green
  adjustedCallsOffered: "#f59e0b", // orange
  abandonedCalls: "#ef4444", // red
  averageTalkTime: "#06b6d4", // cyan
  abandonRate: "#f97316", // orange-red
  callTransfers: "#84cc16", // lime
  averageHandleTime: "#6366f1", // indigo
  aiCallDeflection: "#14b8a6", // teal
  aiCallEscalation: "#a855f7", // purple-light
  firstCallResolution: "#22c55e", // green-light
  averageAnswerSpeed: "#0ea5e9", // sky
};

const METRIC_LABELS: Record<string, string> = {
  callVolume: "Call volume (VOL)",
  callsHandled: "Calls handled (CH)",
  averageHoldTime: "Average hold time (AH)",
  serviceLevel: "Service level (SL)",
  adjustedCallsOffered: "Adjusted calls offered (ACO)",
  abandonedCalls: "Abandoned calls (AC)",
  averageTalkTime: "Average talk time (ATT)",
  abandonRate: "Abandon rate",
  callTransfers: "Call transfers",
  averageHandleTime: "Average handle time (AHT)",
  aiCallDeflection: "AI call deflection",
  aiCallEscalation: "AI call escalation rate",
  firstCallResolution: "First call resolution",
  averageAnswerSpeed: "Average answer speed (AAS)",
};
interface ChartDataPoint {
  time: string;
  [key: string]: number | string;
}
export function CallVolumeChart({
  selectedMetrics,
  allMetrics,
}: CallVolumeChartProps) {
  const chartData: ChartDataPoint[] = allMetrics.callVolume.map(
    (point, index) => {
      const dataPoint: ChartDataPoint = { time: point.time };

      selectedMetrics.forEach((metric) => {
        const metricKey = metric as keyof ContactStatistics;
        if (allMetrics[metricKey] && allMetrics[metricKey][index]) {
          dataPoint[metric] = allMetrics[metricKey][index].value;
        }
      });

      return dataPoint;
    },
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Call volume</h3>

        <select className="text-sm border border-gray-300 rounded px-3 py-1">
          <option>01.06</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
            formatter={(value) => METRIC_LABELS[value] || value}
          />

          {selectedMetrics.map((metric) => (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={METRIC_COLORS[metric]}
              strokeWidth={2}
              dot={false}
              name={metric}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
