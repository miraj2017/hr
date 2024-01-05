import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

const SingleReview = () => {
  return (
    <div style={{ background: "#F5F2F7", padding: "100px 0px" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <FaQuoteLeft></FaQuoteLeft> <br />
            <Typography variant="p">
              As a small business, Bambee was exactly what we needed for HR.
              Affordable, professional, and friendly! We absolutely recommend
              them.
            </Typography>{" "}
            <br />
            <FaQuoteRight></FaQuoteRight>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <div style={{ width: "20%" }}>
                <Typography>Miraj Sarkar</Typography>
                <Typography variant="p" style={{ color: "gray" }}>
                  Owner and CEO of DU Learners
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SingleReview;
