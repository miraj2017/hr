import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const Achievement = () => {
  return (
    <div style={{ margin: "110px 0px" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3} lg={3}>
            <div>
              <Typography variant="h6">1000+</Typography>
              <Typography variant="p" style={{ color: "gray" }}>
                Companies On Board
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={3} lg={3}>
            <div>
              <Typography variant="h6">10+</Typography>
              <Typography variant="p" style={{ color: "gray" }}>
                Countries Globally
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={3} lg={3}>
            <div>
              <Typography variant="h6">1 lakh + </Typography>
              <Typography variant="p" style={{ color: "gray" }}>
                Employees Served
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={3} lg={3}>
            <div>
              <Typography variant="h6">HR Certified </Typography>
              <Typography variant="p" style={{ color: "gray" }}>
                Employees Served
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Achievement;
