import { LoadingError } from "@/components/ErrorDisplay";
import { useContacts } from "@/entities/statistics";
import { ContactList } from "@/widgets/statistics/ContactList";
import { ContactStatisticsPanel } from "@/widgets/statistics/ContactStatisticsPanel";
import { useState } from "react";

export function StatisticsPage() {
  const { data, loading, error } = useContacts();
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-500">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    <div className="min-h-screen bg-gray-50 p-8">
      <LoadingError onRetry={() => window.location.reload()} />
    </div>;
  }

  const contacts = data?.contacts || [];
  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(searchLower) ||
      contact.lastName.toLowerCase().includes(searchLower) ||
      contact.phoneNumber.includes(searchLower)
    );
  });

  const selectedContact = selectedContactId
    ? contacts.find((c) => c.id === selectedContactId)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Statistics</h1>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <ContactList
              contacts={filteredContacts}
              selectedContactId={selectedContactId}
              onSelectContact={setSelectedContactId}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          <div className="col-span-8">
            {selectedContact ? (
              <ContactStatisticsPanel contact={selectedContact} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center text-gray-400 italic">
                Select a contact to view statistics
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
