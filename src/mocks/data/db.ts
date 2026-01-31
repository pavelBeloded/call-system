import { Call } from "@/entities/call";
import { Task } from "@/entities/task";
import { baseContacts } from "./shared";

export const calls: Call[] = baseContacts.map((contact, index) => ({
  id: contact.id,
  contactName: `${contact.firstName} ${contact.lastName}`,
  firstName: contact.firstName,
  lastName: contact.lastName,
  phoneNumber: contact.phoneNumber,
  time: new Date(contact.contactedDate).toLocaleString(),
  accountStatus:
    index % 4 === 0
      ? "client"
      : index % 4 === 1
        ? "lead"
        : index % 4 === 2
          ? "prospect"
          : "no_account",
  mobilityStatus: contact.mobilityStatus,
  age: contact.age,
  duration: Math.floor(Math.random() * 300) + 60,
  recording: Math.random() > 0.3,
  type: index % 3 === 0 ? "incoming" : index % 3 === 1 ? "outgoing" : "missed",
}));

export const tasks: Task[] = [
  {
    id: "A02",
    customerId: "7567479",
    request: "Change tariff",
    status: "in_progress",
    date: "2023-04-03",
    deadline: "2023-04-03",
    sendNotifications: true,
  },
  {
    id: "B03",
    customerId: "7567568",
    request: "Technical support",
    status: "in_progress",
    date: "2023-04-03",
    deadline: "2023-04-03",
    sendNotifications: false,
  },
  {
    id: "A12",
    customerId: "3739390",
    request: "Change tariff",
    status: "in_progress",
    date: "2023-04-03",
    deadline: "2023-04-03",
    sendNotifications: true,
  },
  {
    id: "C85",
    customerId: "7393043",
    request: "Billing inquiry",
    status: "done",
    date: "2023-04-03",
    deadline: "2023-04-03",
    sendNotifications: false,
  },
  {
    id: "B02",
    customerId: "8430283",
    request: "Change tariff",
    status: "in_progress",
    date: "2023-04-03",
    deadline: "2023-04-03",
    sendNotifications: true,
  },
  {
    id: "A01",
    customerId: "6302320",
    request: "Change tariff",
    status: "in_progress",
    date: "2023-04-03",
    deadline: "2023-04-03",
    sendNotifications: false,
  },
  {
    id: "C19",
    customerId: "0494547",
    request: "Service upgrade",
    status: "in_progress",
    date: "2023-04-03",
    deadline: "2023-04-03",
    sendNotifications: true,
  },
  {
    id: "D192",
    customerId: "6392020",
    request: "Technical support",
    status: "pending",
    date: "2023-04-03",
    deadline: "2023-04-03",
    sendNotifications: false,
  },
  {
    id: "D129",
    customerId: "7293997",
    request: "Change tariff",
    status: "in_progress",
    date: "2023-04-03",
    deadline: "2023-04-03",
    sendNotifications: true,
  },
  {
    id: "C01",
    customerId: "7294939",
    request: "Internet troubleshooting",
    status: "pending",
    date: "2023-04-01",
    deadline: "2023-04-01",
    sendNotifications: false,
  },
  {
    id: "A10",
    customerId: "8463920",
    request: "Change tariff",
    status: "done",
    date: "2023-03-28",
    deadline: "2023-03-28",
    sendNotifications: true,
  },
  {
    id: "B04",
    customerId: "8291748",
    request: "Internet troubleshooting",
    status: "done",
    date: "2023-03-24",
    deadline: "2023-03-24",
    sendNotifications: false,
  },
];
