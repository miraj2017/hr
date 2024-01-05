import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div style={{ background: "#F1F5F6", color: "black", padding: "80px" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div>
              <Typography variant="h4">EASYHR</Typography> <br />
              <Typography variant="p">
                Copyright &copy; 2020 All rights are reserved
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <Typography variant="h6">Useful Links</Typography> <br />
              <div>
                <Typography variant="p">About Us</Typography>
                <br />
                <Typography variant="p">Our Services</Typography>
                <br />
                <Typography variant="p">Information</Typography> <br />
                <Typography variant="p">Privacy policy</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <Typography variant="h6">Our Terms</Typography> <br />
              <div>
                <Typography variant="p">Support</Typography>
                <br />
                <Typography variant="p">Contacts</Typography>
                <br />
                <Typography variant="p">Typography</Typography> <br />
                <Typography variant="p">FAQ</Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <Typography variant="h6">Our Office</Typography> <br />
              <div>
                <Typography variant="p">Ring Road,Dhaka</Typography>
                <br />
                <Typography variant="p">phone: 01407113179</Typography>
                <br />
                <Typography variant="p">
                  Email:greencar@gmail.com
                </Typography>{" "}
                <br />
                <Typography variant="p">&copy; 2020 Auto LTD</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
