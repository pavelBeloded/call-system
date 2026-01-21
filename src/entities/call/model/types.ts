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