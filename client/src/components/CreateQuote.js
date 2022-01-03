import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../GQLOperations/mutations";

const CreateQuote = () => {
  const [quote, serQuote] = useState("");
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getMyProfile", "getAllQuotes"],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        name: quote,
      },
    });
  };

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error.mess);
  }

  return (
    <div>
      <div className="container my-container">
        {error && <div className="red card-panel">{error.message}</div>}
        {data && <div className="green card-panel">{data.Quote}</div>}
        <h5>Create Quote!!</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Please enter Quote"
            value={quote}
            required
            onChange={(e) => {
              serQuote(e.target.value);
            }}
          />
          <button className="btn green" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuote;
