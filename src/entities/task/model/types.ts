export type TaskStatus = "done" | "in_progress" | "pending"

export type TaskRequestType =
    | "Change tariff"
    | "Internet troubleshooting"
    | "Technical support"
    | "Billing inquiry"
    | "Service upgrade"
    | "Account closure"

export interface Task {
    id: string              // Format: A02, B03, C85, etc. (Letter + 2-3 digits)
    customerId: string      // Format: 7-8 digit number
    request: TaskRequestType
    status: TaskStatus
    date: string           // ISO date string when task was created
    deadline: string       // ISO date string
    sendNotifications: boolean
}

export interface CreateTaskInput {
    customerId: string
    request: TaskRequestType
    taskId: string
    date: string
    deadline: string
    sendNotifications: boolean
}