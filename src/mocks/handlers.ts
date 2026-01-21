import { http, HttpResponse } from 'msw'

export type CallType = "incoming" | "outgoing" | "missed"

export type AccountStatus =
  | "client"
  | "lead"
  | "prospect"
  | "no_account"

export interface Call {
  id: string
  phoneNumber: string 
  contactName?: string

  time: string
  duration?: number

  accountStatus?: AccountStatus
  recording: boolean

  type: CallType
}

const calls: Call[] = [
  {
    id: "1",
    contactName: "Tim Miller",
    phoneNumber: "8831240087",
    time: "Dec 16, 2022 - 9:03:11",
    accountStatus: "client",
    duration: 168,
    recording: true,
    type: "incoming",
  },
  {
    id: "2",
    contactName: "Unknown",
    phoneNumber: "8831243413",
    time: "Dec 16, 2022 - 9:10:44",
    accountStatus: "no_account",
    recording: false,
    type: "missed",
  },
  {
    id: "3",
    contactName: "Adelaide Johnson",
    phoneNumber: "3762750915",
    time: "Dec 16, 2022 - 9:15:22",
    accountStatus: "lead",
    duration: 245,
    recording: true,
    type: "outgoing",
  },
  {
    id: "4",
    phoneNumber: "6965420182",
    time: "Dec 16, 2022 - 9:28:37",
    accountStatus: "prospect",
    duration: 132,
    recording: false,
    type: "incoming",
  },
  {
    id: "5",
    contactName: "Chet Baker",
    phoneNumber: "3717890123",
    time: "Dec 16, 2022 - 9:45:18",
    accountStatus: "client",
    recording: true,
    type: "outgoing",
  }
];

export const handlers = [
    http.get("api/calls", () => {
        console.log("New call request");
        return HttpResponse.json<Call[]>(calls)
    })
]