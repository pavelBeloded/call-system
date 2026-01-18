import { useCalls } from "@/entities/call/api/use-call";


export function CommunicationPage() {
    const { data: calls, isLoading, error } = useCalls();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Communication</h1>
            <ul>
                {calls?.map(call => (
                    <li key={call.id} className="border-b py-2">
                        {call.contactName} — {call.phoneNumber} ({call.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};