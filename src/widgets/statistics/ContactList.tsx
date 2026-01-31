import { Input } from "@/components/ui/input";
import { Contact } from "@/entities/statistics";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ContactList({
  contacts,
  selectedContactId,
  onSelectContact,
  searchQuery,
  onSearchChange,
}: ContactListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
        {contacts.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-8">
            No contacts found
          </div>
        ) : (
          contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-colors",
                selectedContactId === contact.id
                  ? "bg-blue-50 border border-blue-200"
                  : "hover:bg-gray-50",
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-semibold text-sm">
                  {contact.avatar ||
                    `${contact.firstName[0]}${contact.lastName[0]}`}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {contact.firstName} {contact.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    Contacted:{" "}
                    {new Date(contact.contactedDate).toLocaleDateString(
                      "en-GB",
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
