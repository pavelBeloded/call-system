import { CallHistory } from "@/widgets/callHistory/CallHistory";
import { ContactDetail } from "@/widgets/contactDetail/ContactDetail";
import { ActiveCallBanner } from "@/widgets/ActiveCallBanner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";
import { ChatPanel } from "@/widgets/chat/ChatPanel";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CommunicationPage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="bg-gray-50 w-full flex flex-col min-h-full">
      <ActiveCallBanner />

      <div className="w-full px-6 py-8 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Communication</h1>

          <Button
            onClick={() => setChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Open Chat
          </Button>
        </div>

        <Tabs defaultValue="call" className="w-full">
          <TabsList variant="line">
            <TabsTrigger value="call">
              <span className="flex items-center gap-2">Call</span>
            </TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent
            value="call"
            className="mt-6 border-none p-0 outline-none"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white rounded-lg shadow-sm border border-slate-200 min-h-125 px-4 py-4 ">
                <CallHistory />
              </div>
              <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border border-slate-200 min-h-125">
                <ContactDetail />
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="email"
            className="mt-10 text-center text-slate-400"
          >
            Email module placeholder
          </TabsContent>

          <TabsContent
            value="stats"
            className="mt-10 text-center text-slate-400"
          >
            Internal statistics placeholder
          </TabsContent>
        </Tabs>
      </div>
      <ChatPanel open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
