export type CallType = "incoming" | "outgoing" | "missed";

export type AccountStatus = "client" | "lead" | "prospect" | "no_account";

export type MobilityStatus = "working" | "idle" | "offline";

export interface Call {
  id: string;
  phoneNumber: string;
  contactName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;

  time: string;
  duration?: number;

  accountStatus?: AccountStatus;
  mobilityStatus?: MobilityStatus;
  age?: number;
  recording: boolean;

  type: CallType;
}

export interface ActiveCall {
  callId: string;
  contactName: string;
  phoneNumber: string;
  startTime: Date;
  status: "ringing" | "active" | "on-hold";
}
