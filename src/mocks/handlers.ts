import { http, HttpResponse } from 'msw'
import { Call, ActiveCall } from '@/entities/call'


const calls: Call[] = [
  {
    id: "1",
    contactName: "Tim Miller",
    firstName: "Tim",
    lastName: "Miller",
    phoneNumber: "8831240087",
    time: "Dec 16, 2022 - 9:03:11",
    accountStatus: "client",
    mobilityStatus: "working",
    age: 49,
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
    firstName: "Adelaide",
    lastName: "Johnson",
    phoneNumber: "3762750915",
    time: "Dec 16, 2022 - 9:15:22",
    accountStatus: "lead",
    duration: 245,
    recording: true,
    type: "outgoing",
  },
  {
    id: "4",
    contactName: "Gregory Norm",
    firstName: "Gregory",
    lastName: "Norm",
    phoneNumber: "8844222245",
    time: "Dec 10, 2022 - 5:11:42",
    accountStatus: "client",
    mobilityStatus: "working",
    age: 42,
    duration: 119,
    recording: true,
    type: "incoming",
  },
  {
    id: "5",
    phoneNumber: "8831243413",
    contactName: "Unknown",
    time: "Dec 03, 2022 - 2:34:44",
    accountStatus: "no_account",
    duration: 44,
    recording: false,
    type: "missed",
  },
];

let activeCall: ActiveCall | null = null;


export const handlers = [
  http.get("/api/calls", () => {
    console.log("GET /api/calls");
    return HttpResponse.json<Call[]>(calls)
  }),

  http.get('/api/calls/:id', ({ params }) => {
    const { id } = params;
    const call = calls.find(c => c.id === id);

    if (!call) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(call);
  }),

   http.get('/api/active-call', () => {
    if (!activeCall) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(activeCall);
  }),

  http.post('/api/calls/initiate', async ({ request }) => {
    const body = await request.json() as { phoneNumber: string };
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newCallId = String(calls.length + 1);
    const existingContact = calls.find(c => c.phoneNumber === body.phoneNumber);
    
    activeCall = {
      callId: newCallId,
      contactName: existingContact?.contactName || "Unknown",
      phoneNumber: body.phoneNumber,
      startTime: new Date(),
      status: "active",
    };

    const newCall: Call = {
      id: newCallId,
      phoneNumber: body.phoneNumber,
      contactName: existingContact?.contactName,
      firstName: existingContact?.firstName,
      lastName: existingContact?.lastName,
      time: new Date().toLocaleString(),
      type: "outgoing",
      recording: false,
      accountStatus: existingContact?.accountStatus,
      mobilityStatus: existingContact?.mobilityStatus,
      age: existingContact?.age,
    };

    calls.unshift(newCall);

    return HttpResponse.json(activeCall);
  }),

   http.post('/api/calls/end', async () => {
    if (!activeCall) {
      return new HttpResponse(null, { status: 404 });
    }

    const callToUpdate = calls.find(c => c.id === activeCall?.callId);
    if (callToUpdate) {
      const duration = Math.floor((new Date().getTime() - activeCall.startTime.getTime()) / 1000);
      callToUpdate.duration = duration;
      callToUpdate.recording = true;
    }

    activeCall = null;

    return HttpResponse.json({ success: true });
  }),
]