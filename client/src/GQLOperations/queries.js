import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quotes {
      _id
      name
      by {
        _id
        firstName
      }
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query getMyProfile {
    user: myprofile {
      firstName
      lastName
      email
      quotes {
        name
      }
    }
  }
`;

export const GET_PROFILE_BY_ID = gql`
  query getUserByID($userId: ID!) {
    user(_id: $userId) {
      _id
      firstName
      lastName
      email
      quotes {
        name
      }
    }
  }
`;
