import { http, HttpResponse } from 'msw'

interface Call {
    id: string
    contactName: string,
    phoneNumber: string,
    time: string,
    status: string,
    duration: number,
    recording: boolean,
    type: 'incoming' | 'outgoing';
}

const calls: Call[] = [
  {
    id: "1",
    contactName: "Tim Miller",
    phoneNumber: "883-124-0087",
    time: "Dec 16, 2022 - 9:03:11",
    status: "Client",
    duration: 168,
    recording: true,
    type: 'incoming'
  },
  {
    id: "2",
    contactName: "Adelaide Johnson",
    phoneNumber: "376-275-0915",
    time: "Dec 16, 2022 - 9:11:54",
    status: "Client",
    duration: 196,
    recording: true,
    type: 'outgoing'
  },
  {
    id: "3",
    contactName: "Chet Baker",
    phoneNumber: "696-542-0182",
    time: "Dec 16, 2022 - 9:17:35",
    status: "Lead",
    duration: 145,
    recording: false,
    type: 'incoming'
  },
  {
    id: "4",
    contactName: "Betty Stapleton",
    phoneNumber: "371-789-0123",
    time: "Dec 16, 2022 - 9:22:01",
    status: "Lead",
    duration: 231,
    recording: true,
    type: 'outgoing'
  },
  {
    id: "5",
    contactName: "John Doe",
    phoneNumber: "555-123-4567",
    time: "Dec 16, 2022 - 9:30:15",
    status: "Client",
    duration: 189,
    recording: false,
    type: 'incoming'
  }
];

export const handlers = [
    http.get("api/calls", () => {
        console.log("New call request");
        return HttpResponse.json<Call[]>(calls)
    })
]