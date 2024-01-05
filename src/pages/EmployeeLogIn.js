import { Button, Container, Grid, Typography } from "@mui/material";

import React from "react";

const EmployeeLogIn = ({ handleEmployeeLogin, handleChange, state }) => {
  const { employeeEmail, companyEmail, companyName } = state;
  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <div style={{ textAlign: "center", margin: "40px 0px" }}>
              <Typography variant="h5">Employee Login</Typography>
            </div>
            <div style={{ width: "270px", margin: "0 auto" }}>
              <form onSubmit={handleEmployeeLogin}>
                <div>
                  <div>
                    <input
                      type="text"
                      name="companyName"
                      value={companyName}
                      placeholder="Company Name"
                      onChange={handleChange}
                      style={{ width: "100%", padding: "10px" }}
                    />{" "}
                  </div>
                  <br />
                </div>
                <div>
                  <input
                    type="email"
                    name="companyEmail"
                    value={companyEmail}
                    placeholder="Company Email"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />{" "}
                </div>
                <br />
                <div>
                  <input
                    type="email"
                    name="employeeEmail"
                    value={employeeEmail}
                    placeholder="Employee Email"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>
                <br />
                <div style={{ width: "100%" }}>
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
                    LogIn
                  </Button>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EmployeeLogIn;
