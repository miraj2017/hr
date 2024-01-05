import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
  return (
    <div style={{ background: "#F1F5F6", height: "90vh" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={6} lg={6}>
            <Typography
              variant="h5"
              style={{
                marginTop: "30vh",
                fontSize: "2vw",
              }}
            >
              Searching For <br />
              <span>Human Resource Management?</span>
            </Typography>
          </Grid>
          <Grid
            style={{ margin: "0 auto", textAlign: "center" }}
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            <img
              src="/Screenshot 2023-12-22 142549.png"
              alt="no"
              style={{ width: "60 vw", height: "60vh", marginTop: "15vh" }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
