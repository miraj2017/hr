import React, { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firbase";

const initialState = {
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  phoneNo: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  const { email, password, firstName, lastName, confirmPassword } = state;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("password didn't match");
      }
      if (firstName && lastName && password && confirmPassword) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }
    navigate("/");
  };
  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <div style={{ textAlign: "center", margin: "40px 0px" }}>
              <Typography variant="h5">
                {" "}
                {!signUp ? "Log In" : "SignUp"}
              </Typography>
            </div>
            <div style={{ width: "270px", margin: "0 auto" }}>
              <form onSubmit={handleAuth}>
                {signUp && (
                  <div>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        placeholder="First Name"
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px" }}
                      />{" "}
                    </div>
                    <br />
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px" }}
                      />{" "}
                    </div>
                    <br />
                  </div>
                )}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />{" "}
                </div>
                <br />
                <div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>
                <br />
                {signUp && (
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      style={{ width: "100%", padding: "10px" }}
                    />
                  </div>
                )}
                <div>
                  <br />
                  {!signUp ? (
                    <div>
                      <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        style={{
                          width: "295px",
                          textAlign: "center",
                          margin: "0 auto",
                        }}
                      >
                        Sign In
                      </Button>
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      <Button
                        variant="contained"
                        color="error"
                        type="submit"
                        style={{
                          width: "295px",
                          textAlign: "center",
                          margin: "0 auto",
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </form>
              <div>
                <br />
                {!signUp ? (
                  <div style={{ textAlign: "center" }}>
                    <Typography variant="p">
                      Don't have an account?{" "}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setSignUp(true)}
                      >
                        Sign Up
                      </span>
                    </Typography>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <Typography variant="p">
                      Already have an account?{" "}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setSignUp(false)}
                      >
                        Sign In
                      </span>
                    </Typography>
                  </div>
                )}
              </div>
              <Link to="/employeelogin">Employee Login</Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Auth;
