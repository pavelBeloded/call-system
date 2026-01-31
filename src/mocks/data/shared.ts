export interface BaseContact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  contactedDate: string;
  mobilityStatus?: "working" | "idle" | "offline";
  age?: number;
}

export const baseContacts: BaseContact[] = [
  {
    id: "1",
    firstName: "Gregory",
    lastName: "Norm",
    phoneNumber: "8831240087",
    contactedDate: "2022-11-08",
    mobilityStatus: "working",
    age: 42,
  },
  {
    id: "2",
    firstName: "Skyler",
    lastName: "Snow",
    phoneNumber: "8831243413",
    contactedDate: "2022-05-26",
    mobilityStatus: "working",
    age: 35,
  },
  {
    id: "3",
    firstName: "Marry",
    lastName: "Addison",
    phoneNumber: "3762750915",
    contactedDate: "2022-05-26",
    mobilityStatus: "idle",
    age: 28,
  },
  {
    id: "4",
    firstName: "Mark",
    lastName: "Miller",
    phoneNumber: "8844222245",
    contactedDate: "2022-05-26",
    mobilityStatus: "working",
    age: 45,
  },
  {
    id: "5",
    firstName: "Antonio",
    lastName: "Sanchez",
    phoneNumber: "8831243413",
    contactedDate: "2022-05-25",
    age: 31,
  },
  {
    id: "6",
    firstName: "Mario",
    lastName: "Alvarez",
    phoneNumber: "6302320111",
    contactedDate: "2022-05-25",
    mobilityStatus: "offline",
    age: 52,
  },
  {
    id: "7",
    firstName: "Margo",
    lastName: "Smith",
    phoneNumber: "0494547222",
    contactedDate: "2022-05-25",
    age: 29,
  },
  {
    id: "8",
    firstName: "Tim",
    lastName: "Miller",
    phoneNumber: "8831240087",
    contactedDate: "2022-05-25",
    mobilityStatus: "working",
    age: 49,
  },
  {
    id: "9",
    firstName: "Gretta",
    lastName: "Owens",
    phoneNumber: "7294939333",
    contactedDate: "2022-05-25",
    age: 38,
  },
  {
    id: "10",
    firstName: "Owen",
    lastName: "McArtur",
    phoneNumber: "8463920444",
    contactedDate: "2022-05-25",
    mobilityStatus: "idle",
    age: 41,
  },
  {
    id: "11",
    firstName: "Jon",
    lastName: "Walker",
    phoneNumber: "8291748555",
    contactedDate: "2022-05-25",
    age: 33,
  },
];

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
