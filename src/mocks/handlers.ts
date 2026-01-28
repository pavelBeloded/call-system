import { http, HttpResponse } from "msw";
import { Call, ActiveCall } from "@/entities/call";
import { calls, tasks } from "./db";
import { Task } from "@/entities/task";



let activeCall: ActiveCall | null = null;

export const handlers = [
  // Calls
  http.get("/api/calls", () => {
    console.log("GET /api/calls");
    return HttpResponse.json<Call[]>(calls);
  }),

  http.get("/api/calls/:id", ({ params }) => {
    const { id } = params;
    const call = calls.find((c) => c.id === id);

    if (!call) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(call);
  }),

  http.get("/api/active-call", () => {
    if (!activeCall) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(activeCall);
  }),

  http.post("/api/calls/initiate", async ({ request }) => {
    const body = (await request.json()) as { phoneNumber: string };

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newCallId = String(calls.length + 1);
    const existingContact = calls.find(
      (c) => c.phoneNumber === body.phoneNumber,
    );

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

  http.post("/api/calls/end", async () => {
    if (!activeCall) {
      return new HttpResponse(null, { status: 404 });
    }

    const callToUpdate = calls.find((c) => c.id === activeCall?.callId);
    if (callToUpdate) {
      const duration = Math.floor(
        (new Date().getTime() - activeCall.startTime.getTime()) / 1000,
      );
      callToUpdate.duration = duration;
      callToUpdate.recording = true;
    }

    activeCall = null;

    return HttpResponse.json({ success: true });
  }),

  // Tasks
  // GET    /api/tasks              // Get all tasks
  // GET    /api/tasks/:id          // Get single task
  // POST   /api/tasks              // Create new task
  // PATCH  /api/tasks/:id          // Update task (status, etc.)
  // DELETE /api/tasks/:id          // Delete task

  http.get("/api/tasks", () => {
    console.log("GET /api/tasks");
    return HttpResponse.json(tasks);
  }),

  http.get("/api/tasks/:id", ({ params }) => {
    const { id } = params;
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(task);
  }),

  http.post("/api/tasks", async ({ request }) => {
    const body = (await request.json()) as Task;

    const taskIdPattern = /^[A-Z]\d{1,3}$/;
    if (!taskIdPattern.test(body.id)) {
      return HttpResponse.json(
        { error: "Invalid Task ID format" },
        { status: 400 }
      );
    }

    if (tasks.find((t) => t.id === body.id)) {
      return HttpResponse.json(
        { error: "Task ID already exists" },
        { status: 409 }
      );
    }

    const newTask = { ...body };
    tasks.unshift(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.patch("/api/tasks/:id", async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Partial<Task>;

    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...body
    };

    return HttpResponse.json(tasks[taskIndex]);
  }),

  http.delete("/api/tasks/:id", ({ params }) => {
    const { id } = params;
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    tasks.splice(taskIndex, 1);
    return HttpResponse.json({ success: true });
  }),
];
