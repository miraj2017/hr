import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoTimerSharp } from "react-icons/io5";
import { IoDocuments } from "react-icons/io5";

const Hrmodules = () => {
  return (
    <div style={{ marginTop: "90px", marginBottom: "110px" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <div
              style={{
                textAlign: "center",
                marginTop: "50px",
                marginBottom: "70px",
              }}
            >
              <Typography variant="h4">EASYHR Modules</Typography>
              <Typography variant="p">
                Step into the future with hands-free work environment.
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <div
              style={{ width: "90%", textAlign: "center", margin: "0 auto" }}
            >
              <AiOutlineSchedule style={{ fontSize: "3vw" }} />
              <Typography variant="h5">Schedular</Typography>
              <Typography variant="p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                aperiam sapiente autem tempora assumenda eum?
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <div
              style={{ width: "90%", textAlign: "center", margin: "0 auto" }}
            >
              <IoTimerSharp style={{ fontSize: "3vw" }} />
              <Typography variant="h5">Time & Attendance</Typography>
              <Typography variant="p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                aperiam sapiente autem tempora assumenda eum?
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <div
              style={{ width: "90%", textAlign: "center", margin: "0 auto" }}
            >
              <IoDocuments style={{ fontSize: "3vw" }} />
              <Typography variant="h5">Documents</Typography>
              <Typography variant="p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                aperiam sapiente autem tempora assumenda eum?
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Hrmodules;
