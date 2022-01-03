import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_ALL_QUOTES } from "../GQLOperations/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
  }
  if (data.quotes.length === 0) {
    return <h1>No quotes</h1>;
  }
  return (
    <div className="container my-container">
      <h3>All Quotes !!!</h3>
      {data.quotes.map((quote) => {
        return (
          <blockquote key={quote._id}>
            <h6>{quote.name}</h6>
            <Link to={`/profile/${quote.by._id}`}>
              <p className="right-align">~{quote.by.firstName}</p>
            </Link>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Home;
