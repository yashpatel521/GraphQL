import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    iquote(by: ID!): [Quote]
    myprofile: User
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    isAdmin: Boolean
    quotes: [Quote]
  }
  type QuoteWithName {
    _id: String
    name: String
    by: IdName
  }
  type IdName {
    _id: String
    firstName: String
  }
  type Quote {
    by: String
    name: String
  }
  type Token {
    token: String!
  }
  type Mutation {
    signupUser(UserNew: UserInput!): User
    updateUser(UpdateUser: updateUserInput!): String
    signinUser(userSignin: signinUserInput!): Token
    createQuote(name: String!): String
    updateQuote(_id: String, name: String): String
    deleteQuote(_id: String!): String
  }
  input UserInput {
    firstName: String!
    lastName: String!
    isAdmin: Boolean
    email: String!
    password: String!
  }
  input updateUserInput {
    firstName: String
    lastName: String
  }
  input signinUserInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
