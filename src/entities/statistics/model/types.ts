export interface DataPoint {
  time: string;
  value: number;
}

export interface ContactStatistics {
  callVolume: DataPoint[];
  callsHandled: DataPoint[];
  averageHoldTime: DataPoint[];
  serviceLevel: DataPoint[];
  adjustedCallsOffered: DataPoint[];
  abandonedCalls: DataPoint[];
  averageTalkTime: DataPoint[];
  abandonRate: DataPoint[];
  callTransfers: DataPoint[];
  averageHandleTime: DataPoint[];
  aiCallDeflection: DataPoint[];
  aiCallEscalation: DataPoint[];
  firstCallResolution: DataPoint[];
  averageAnswerSpeed: DataPoint[];
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  contactedDate: string;
  avatar?: string;
  mobilityStatus?: string;
  age?: number;
  statistics: ContactStatistics;
}
