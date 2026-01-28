import { CallHistory } from "@/widgets/callHistory/CallHistory";
import { ContactDetail } from "@/widgets/contactDetail/ContactDetail";
import { ActiveCallBanner } from "@/widgets/ActiveCallBanner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function CommunicationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ActiveCallBanner />
      
      <div className="max-w-screen-2xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Communication</h1>

        <Tabs defaultValue="call" className="w-full">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 space-x-8">
            <TabsTrigger 
              value="call" 
              className="data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none pb-3 px-0 font-medium"
            >
              <span className="flex items-center gap-2">
                Call
                <Badge className="bg-blue-600 text-white rounded-full h-5 min-w-5 px-1.5">1</Badge>
              </span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="pb-3 px-0 font-medium text-gray-600">Chat</TabsTrigger>
            <TabsTrigger value="email" className="pb-3 px-0 font-medium text-gray-600">Email</TabsTrigger>
            <TabsTrigger value="stats" className="pb-3 px-0 font-medium text-gray-600">Statistics</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <CallHistory />
          </div>
          <div className="lg:col-span-5 bg-white rounded-lg shadow-sm">
            <ContactDetail />
          </div>
        </div>
      </div>
    </div>
  );
}
