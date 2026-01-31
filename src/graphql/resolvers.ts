import { baseContacts, generateContactStatistics } from "../mocks/data/shared";

function getAvatarInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export const resolvers = {
  Query: {
    contacts: () => {
      return baseContacts.map((contact) => ({
        ...contact,
        avatar: getAvatarInitials(contact.firstName, contact.lastName),
        statistics: generateContactStatistics(),
      }));
    },

    contact: (_: never, { id }: { id: string }) => {
      const contact = baseContacts.find((c) => c.id === id);

      if (!contact) {
        throw new Error(`Contact with ID ${id} not found`);
      }

      return {
        ...contact,
        avatar: getAvatarInitials(contact.firstName, contact.lastName),
        statistics: generateContactStatistics(),
      };
    },
  },
};
