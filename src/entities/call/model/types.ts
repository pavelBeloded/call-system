export interface Call {
    id: string
    contactName: string,
    phoneNumber: string,
    time: string,
    status: string,
    duration: number,
    recording: boolean,
    type: 'incoming' | 'outgoing';
}