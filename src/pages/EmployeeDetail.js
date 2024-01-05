import { Button, Grid, Typography } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firbase";

const EmployeeDetail = ({ employee }) => {
  const [vacationDays, setVacationDays] = useState(0);
  const handleVacationRequest = async (e) => {
    try {
      await addDoc(collection(db, "vacation"), {
        timestamp: serverTimestamp(),
        days: vacationDays,
        employeeName: employee?.employeeName,
        employeeEmail: employee?.employeeEmail,
        companyEmail: employee?.companyEmail,
        authorEmail: employee?.authorEmail,
        vacation: employee?.vacation,
        vacationTaken: employee?.vacationTaken,
        status: "pending",
      });
      alert("request sent successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSalaryRequest = async (e) => {
    try {
      await addDoc(collection(db, "salary"), {
        timestamp: serverTimestamp(),

        employeeName: employee?.employeeName,
        employeeEmail: employee?.employeeEmail,
        companyEmail: employee?.companyEmail,
        authorEmail: employee?.authorEmail,
        salary: employee?.salary,
        status: "pending",
      });
      alert("request sent successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ width: "50%", textAlign: "center", margin: "0 auto" }}>
      <Typography variant="h4" style={{ margin: "80px 0px" }}>
        {employee?.companyName}
      </Typography>{" "}
      <br />
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={6} lg={6}>
          <Typography variant="h6">
            Name:
            <span>{employee?.employeeName}</span>
          </Typography>
          <Typography variant="h6">
            Email of the Company:
            <span>{employee?.companyEmail}</span>
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6}>
          <Typography variant="h6">
            Total Vacation: <span>{employee?.vacation}</span>
          </Typography>
          <Typography variant="h6">
            VacationTaken:
            <span>{employee?.vacationTaken}</span>
          </Typography>
        </Grid>
      </Grid>
      <br />
      <div style={{ margin: "100px 0px" }}>
        <Grid container spacing={2}>
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Vacation Request
            </Typography>
            <label>
              Number of Days:
              <input
                type="number"
                value={vacationDays}
                onChange={(e) => setVacationDays(e.target.value)}
              />
            </label>
            <Button
              variant="contained"
              onClick={handleVacationRequest}
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              Request Vacation
            </Button>
          </Grid>
        </Grid>
      </div>
      <div style={{ margin: "100px 0px" }}>
        <Grid container spacing={2}>
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Salary Request
            </Typography>
            <Button variant="contained" onClick={handleSalaryRequest}>
              Request Salary
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EmployeeDetail;
