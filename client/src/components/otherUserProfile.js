import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROFILE_BY_ID } from "../GQLOperations/queries";
import { useParams } from "react-router-dom";

const OtherUserProfile = () => {
  const { userid } = useParams();
  const { loading, error, data } = useQuery(GET_PROFILE_BY_ID, {
    variables: {
      userId: userid,
    },
  });
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div className="container profile-container">
      <div className="center-align">
        <img
          className="profile-img circle"
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h5>{data.user.email}</h5>
      </div>
      <div>
        <h3>Your Quotes</h3>
        {data.user.quotes.map((quote) => {
          return (
            <blockquote key={quote.name}>
              <h6>{quote.name}</h6>
            </blockquote>
          );
        })}
      </div>
    </div>
  );
};

export default OtherUserProfile;
