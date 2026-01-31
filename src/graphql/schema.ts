// src/graphql/schema.ts

export const typeDefs = `#graphql
  type Contact {
    id: ID!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    contactedDate: String!
    avatar: String
    mobilityStatus: String
    age: Int
    statistics: ContactStatistics!
  }

  type ContactStatistics {
    callVolume: [DataPoint!]!
    callsHandled: [DataPoint!]!
    averageHoldTime: [DataPoint!]!
    serviceLevel: [DataPoint!]!
    adjustedCallsOffered: [DataPoint!]!
    abandonedCalls: [DataPoint!]!
    averageTalkTime: [DataPoint!]!
    abandonRate: [DataPoint!]!
    callTransfers: [DataPoint!]!
    averageHandleTime: [DataPoint!]!
    aiCallDeflection: [DataPoint!]!
    aiCallEscalation: [DataPoint!]!
    firstCallResolution: [DataPoint!]!
    averageAnswerSpeed: [DataPoint!]!
  }

  type DataPoint {
    time: String!
    value: Float!
  }

  type Query {
    # Get all contacts
    contacts: [Contact!]!
    
    # Get one specific contact by ID
    contact(id: ID!): Contact
  }
`;
