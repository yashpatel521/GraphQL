import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../GQLOperations/mutations";

const Login = () => {
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("Token", data.user.token);
      navigate("/");
    },
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
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
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Please enter Email"
          name="email"
          required
          onChange={handleChange}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Please enter Password"
          name="password"
          required
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            className="filled-in"
            onClick={(e) => {
              setShowPassword(!showPassword);
            }}
          />
          <span>Show Password</span>
        </label>
        <br />
        <Link to="/signup">
          <p>Dont have an account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
