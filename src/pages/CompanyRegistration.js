import { Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firbase";

const initialState = {
  companyName: "",
  companyEmail: "",
  phoneNo: "",
  country: "",
  employees: "",
};

const CompanyRegistration = ({ user }) => {
  const [form, setForm] = useState(initialState);
  const { companyName, companyEmail, country, phoneNo, employees } = form;

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCompanyRegistration = async (e) => {
    e.preventDefault();

    if (companyName && companyEmail && country && phoneNo) {
      try {
        await addDoc(collection(db, "companies"), {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          authorEmail: user.email,
          userId: user.uid,
        });
        toast.success("Registration SUccessful");
      } catch (err) {
        console.log(err);
      }
    }
    navigate("/admin");
  };

  return (
    <div>
      <Container>
        <Typography
          variant="h5"
          style={{ textAlign: "center", margin: "50px 0px" }}
        >
          Register Your Company on EASYHR
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <div>
              <form onSubmit={handleCompanyRegistration}>
                <div>
                  <input
                    type="text"
                    name="companyName"
                    value={companyName}
                    placeholder="Company Name"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>{" "}
                <br />
                <div>
                  <input
                    type="text"
                    name="companyEmail"
                    value={companyEmail}
                    placeholder="Company Email"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>
                <br />
                <div>
                  <input
                    type="text"
                    name="country"
                    value={country}
                    placeholder="Country"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>
                <br />
                <div>
                  <input
                    type="number"
                    name="phoneNo"
                    value={phoneNo}
                    placeholder="Phone No"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>{" "}
                <br />
                <div>
                  <input
                    type="number"
                    name="employees"
                    value={employees}
                    placeholder="Total Employee"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>{" "}
                <br />
                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "15px 0px",
                      cursor: "pointer",
                    }}
                    type="submit"
                  >
                    {/* {id ? "Update" : "Submit"} */}
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CompanyRegistration;
