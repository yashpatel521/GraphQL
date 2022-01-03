import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGN_UP_USER } from "../GQLOperations/mutations";

const Signup = () => {
  const [signupUser, { data, loading, error }] = useMutation(SIGN_UP_USER);

  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <div className="container my-container">
        {error && <div className="red card-panel">{error.message}</div>}
        {data && data.user && (
          <div className="green card-panel">
            {data.user.firstName} is created.
          </div>
        )}
        <h5>SignUp!!</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Please enter First name"
            name="firstName"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Please enter Last name"
            name="lastName"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Please enter Email"
            name="email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Please enter Password"
            name="password"
            required
            onChange={handleChange}
          />
          <Link to="/login">
            <p>Already have an account ?</p>
          </Link>
          <button className="btn #673ab7 deep-purple" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
