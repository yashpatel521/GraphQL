import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(UserNew: $userNew) {
      firstName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Usersignin($userNew: signinUserInput!) {
    user: signinUser(userSignin: $userNew) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createQuote($name: String!) {
    Quote: createQuote(name: $name)
  }
`;
