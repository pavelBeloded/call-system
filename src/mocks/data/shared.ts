export interface BaseContact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  contactedDate: string;
  mobilityStatus?: "working" | "idle" | "offline";
  age?: number;
}

export function generateTimeSeriesData(
  points: number = 24,
): { time: string; value: number }[] {
  const data = [];
  for (let i = 0; i < points; i++) {
    const hour = i % 24;
    const ampm = hour < 12 ? "am" : "pm";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

    data.push({
      time: `${displayHour.toString().padStart(2, "0")}${ampm}`,
      value: Math.floor(Math.random() * 80) + 20,
    });
  }
  return data;
}

export function generateContactStatistics() {
  return {
    callVolume: generateTimeSeriesData(),
    callsHandled: generateTimeSeriesData(),
    averageHoldTime: generateTimeSeriesData(),
    serviceLevel: generateTimeSeriesData(),
    adjustedCallsOffered: generateTimeSeriesData(),
    abandonedCalls: generateTimeSeriesData(),
    averageTalkTime: generateTimeSeriesData(),
    abandonRate: generateTimeSeriesData(),
    callTransfers: generateTimeSeriesData(),
    averageHandleTime: generateTimeSeriesData(),
    aiCallDeflection: generateTimeSeriesData(),
    aiCallEscalation: generateTimeSeriesData(),
    firstCallResolution: generateTimeSeriesData(),
    averageAnswerSpeed: generateTimeSeriesData(),
  };
}
