import { CallHistory } from "@/widgets/callHistory/CallHistory";
import { ContactDetail } from "@/widgets/contactDetail/ContactDetail";
import { ActiveCallBanner } from "@/widgets/ActiveCallBanner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function CommunicationPage() {
  return (
    <div className="bg-gray-50 w-full flex flex-col min-h-full">
      <ActiveCallBanner />

      <div className="w-full px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-[#1a1c1e]">Communication</h1>

        <Tabs defaultValue="call" className="w-full">
          <TabsList variant="line">
            <TabsTrigger value="call">
              <span className="flex items-center gap-2">
                Call
              </span>
            </TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="call" className="mt-6 border-none p-0 outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white rounded-lg shadow-sm border border-slate-200 min-h-125 px-4 py-4 ">
                <CallHistory />
              </div>
              <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border border-slate-200 min-h-125">
                <ContactDetail />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="mt-10 text-center text-slate-400">
            Chat module will be here
          </TabsContent>

          <TabsContent value="email" className="mt-10 text-center text-slate-400">
            Email module placeholder
          </TabsContent>

          <TabsContent value="stats" className="mt-10 text-center text-slate-400">
            Internal statistics placeholder
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}