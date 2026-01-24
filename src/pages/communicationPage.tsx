import { CallHistory } from "@/widgets/callHistory/CallHistory";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export function CommunicationPage() {
 
  


  return (

    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#1a1c1e]">Communication</h1>

      <Tabs defaultValue="call" className="w-full">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 space-x-8">
          <TabsTrigger value="call" className="data-[state=active]:border-blue-600 data-[state=active]:bg-transparent border-b-2 border-transparent rounded-none pb-2 px-0">Call</TabsTrigger>
          <TabsTrigger value="chat" className="pb-2 px-0">Chat</TabsTrigger>
          <TabsTrigger value="email" className="pb-2 px-0">Email</TabsTrigger>
          <TabsTrigger value="stats" className="pb-2 px-0">Statistics</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <CallHistory />
        </div>
        <div className="lg:col-span-5">
          {/* <ContactDetail /> */}
        </div>
      </div>
    </div>

  );
}