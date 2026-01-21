import { useCalls } from "@/entities/call/api/use-call";
import { columns } from "@/widgets/callHistory/columns"
import { DataTable } from "@/widgets/callHistory/DataTable";

export function CommunicationPage() {
  const { data: calls, isLoading, error } = useCalls();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Communication</h1>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={calls!} />
    </div>
    </div>
  );
}
