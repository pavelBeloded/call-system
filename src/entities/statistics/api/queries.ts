import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Contact } from "../model/types";

const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      id
      firstName
      lastName
      phoneNumber
      contactedDate
      avatar
      mobilityStatus
      age
      statistics {
        callVolume {
          time
          value
        }
        callsHandled {
          time
          value
        }
        averageHoldTime {
          time
          value
        }
        serviceLevel {
          time
          value
        }
        adjustedCallsOffered {
          time
          value
        }
        abandonedCalls {
          time
          value
        }
        averageTalkTime {
          time
          value
        }
        abandonRate {
          time
          value
        }
        callTransfers {
          time
          value
        }
        averageHandleTime {
          time
          value
        }
        aiCallDeflection {
          time
          value
        }
        aiCallEscalation {
          time
          value
        }
        firstCallResolution {
          time
          value
        }
        averageAnswerSpeed {
          time
          value
        }
      }
    }
  }
`;

export function useContacts() {
  return useQuery<{ contacts: Contact[] }>(GET_CONTACTS);
}

const GET_CONTACT = gql`
  query GetContact($id: ID!) {
    contact(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      contactedDate
      avatar
      mobilityStatus
      age
      statistics {
        callVolume {
          time
          value
        }
        callsHandled {
          time
          value
        }
        averageHoldTime {
          time
          value
        }
        serviceLevel {
          time
          value
        }
        adjustedCallsOffered {
          time
          value
        }
        abandonedCalls {
          time
          value
        }
        averageTalkTime {
          time
          value
        }
        abandonRate {
          time
          value
        }
        callTransfers {
          time
          value
        }
        averageHandleTime {
          time
          value
        }
        aiCallDeflection {
          time
          value
        }
        aiCallEscalation {
          time
          value
        }
        firstCallResolution {
          time
          value
        }
        averageAnswerSpeed {
          time
          value
        }
      }
    }
  }
`;

export function useContact(id: string) {
  return useQuery<{ contact: Contact }>(GET_CONTACT, {
    variables: { id },
    skip: !id,
  });
}
