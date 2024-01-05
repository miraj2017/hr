import { Container, Grid, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firbase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const initialState = {
  employeeName: "",
  employeeEmail: "",
  startingDate: "",
  salary: "",
  position: "",
  vacation: "",
  vacationTaken: "",
  phoneNo: "",
};

const Employees = ({ company, user }) => {
  // keep employees in databse
  const [form, setForm] = useState(initialState);
  const {
    employeeName,
    employeeEmail,
    startingDate,
    salary,
    position,
    vacation,
    vacationTaken,
    phoneNo,
  } = form;

  const { companyName, companyEmail, id, authorEmail } = company;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmployees = async (e) => {
    e.preventDefault();
    if (
      employeeName &&
      employeeEmail &&
      startingDate &&
      salary &&
      position &&
      vacation &&
      vacationTaken &&
      phoneNo
    ) {
      try {
        await addDoc(
          collection(
            db,
            "companies",
            id, // Assuming companyEmail is the document ID
            "employees"
          ),
          {
            ...form,
            timestamp: serverTimestamp(),
            companyName: companyName,
            companyEmail: companyEmail,
            authorEmail: authorEmail,
          }
        );
        alert("Employee added successfully");
        setForm(initialState);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // get employees
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "companies", id, "employees"),
      (snapShot) => {
        let list = [];

        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        setEmployees(list);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // Delete employees
  const handleDelete = async (Id) => {
    if (window.confirm("Are you sure you wanted to delete the employee?")) {
      try {
        // setLoading(true);
        await deleteDoc(doc(db, "companies", id, "employees", Id));
        alert("Employee deleted successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // get vacation requests

  const [vacations, setVacations] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "vacation"),

      (snapShot) => {
        let list = [];

        snapShot.docs.forEach((doc) => {
          const employeeData = { id: doc.id, ...doc.data() };
          if (employeeData.authorEmail === user.email) {
            list.push(employeeData);
          }
        });

        setVacations(list);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleVacationApprove = async (vacationId, calculate) => {
    try {
      const vacationRef = doc(db, "vacation", vacationId);

      // const currentVacationTaken = vacation?.vacationTaken || 0;
      // const currentDays = vacation?.days || 0;

      await updateDoc(vacationRef, {
        status: "approved",
        vacationTaken:
          Number(calculate?.vacationTaken) + Number(calculate.days),
      });

      alert("Vacation has been approved");
    } catch (err) {
      console.error(err);
    }
  };
  const handleVacationDecline = async (vacationId) => {
    try {
      const vacationRef = doc(db, "vacation", vacationId);

      await updateDoc(vacationRef, {
        status: "declined",
      });

      alert("Vacation has been declined");
    } catch (err) {
      console.error(err);
    }
  };

  // get salary request
  const [salaries, setSalaries] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "salary"),

      (snapShot) => {
        let list = [];

        snapShot.docs.forEach((doc) => {
          const employeeData = { id: doc.id, ...doc.data() };
          if (employeeData.authorEmail === user.email) {
            list.push(employeeData);
          }
        });

        setSalaries(list);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  const handleSalaryApprove = async (salaryId) => {
    try {
      const salaryRef = doc(db, "salary", salaryId);

      await updateDoc(salaryRef, {
        status: "approved",
      });

      alert("Salary has been approved");
    } catch (err) {
      console.error(err);
    }
  };
  const handleSalaryDecline = async (salaryId) => {
    try {
      const salaryRef = doc(db, "salary", salaryId);

      await updateDoc(salaryRef, {
        status: "declined",
      });

      alert("Salary has been declined");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Container>
        <Typography
          variant="h5"
          style={{ textAlign: "center", margin: "50px 0px" }}
        >
          Add an Employee
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
              <form onSubmit={handleEmployees}>
                <div>
                  <input
                    type="text"
                    name="employeeName"
                    value={employeeName}
                    placeholder="Employee Name"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>{" "}
                <br />
                <div>
                  <input
                    type="text"
                    name="employeeEmail"
                    value={employeeEmail}
                    placeholder="Employee Email"
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
                    placeholder="Phone Number"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>{" "}
                <br />
                <div>
                  <input
                    type="text"
                    name="position"
                    value={position}
                    placeholder="Position"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>
                <br />
                <div>
                  <input
                    type="text"
                    name="startingDate"
                    value={startingDate}
                    placeholder="Starting Date"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>
                <br />
                <div>
                  <input
                    type="number"
                    name="salary"
                    value={salary}
                    placeholder="Salary"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>{" "}
                <br />
                <div>
                  <input
                    type="number"
                    name="vacation"
                    value={vacation}
                    placeholder="Total Vacation"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>
                <br />
                <div>
                  <input
                    type="number"
                    name="vacationTaken"
                    value={vacationTaken}
                    placeholder="Vacation Taken"
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>
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
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
        <div>
          <Typography variant="h5" style={{ margin: "100px 0px" }}>
            All Employees
          </Typography>
          <Grid container spacing={2}>
            <Grid
              xs={12}
              sm={12}
              md={10}
              lg={10}
              style={{ textAlign: "center", margin: "0 auto" }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Position</TableCell>
                      <TableCell align="right">Salary</TableCell>
                      <TableCell align="right">Vacation</TableCell>
                      <TableCell align="right">VacationTaken</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.employeeEmail}>
                        <TableCell component="th" scope="row">
                          {employee.employeeName}
                        </TableCell>
                        <TableCell align="right">
                          {employee.employeeEmail}
                        </TableCell>
                        <TableCell align="right">{employee.position}</TableCell>
                        <TableCell align="right">{employee.salary}</TableCell>
                        <TableCell align="right">{employee.vacation}</TableCell>
                        <TableCell align="right">
                          {employee.vacationTaken}
                        </TableCell>
                        <TableCell align="right">
                          <button
                            onClick={() => handleDelete(employee.id)}
                            style={{ cursor: "pointer" }}
                          >
                            Remove Employee
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>{" "}
        {/* {companyEmail === vacation?.companyEmail &&
          vacation?.status === "pending" && ( */}
        {vacations
          .filter(
            (vacation) =>
              user?.email === vacation.authorEmail &&
              vacation.companyEmail === companyEmail &&
              vacation.status === "pending"
          )
          .map((vacation) => (
            <div key={vacation?.id}>
              <Typography variant="h5" style={{ margin: "100px 0px" }}>
                Vacation Requests
              </Typography>{" "}
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Employee Name</TableCell>
                          <TableCell align="right">Employee Email</TableCell>
                          <TableCell align="right">Total Vacation</TableCell>
                          <TableCell align="right">Vacation Taken</TableCell>
                          <TableCell align="right">Requested</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={vacation?.employeeEmail}>
                          <TableCell component="th" scope="row">
                            {vacation?.employeeName}
                          </TableCell>
                          <TableCell align="right">
                            {vacation?.employeeEmail}
                          </TableCell>
                          <TableCell align="right">
                            {vacation?.vacation}
                          </TableCell>
                          <TableCell align="right">
                            {vacation?.vacationTaken}
                          </TableCell>
                          <TableCell align="right">{vacation?.days}</TableCell>
                          <TableCell align="right">
                            <button
                              onClick={() =>
                                handleVacationApprove(vacation?.id, vacation)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleVacationDecline(vacation?.id)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Declined
                            </button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </div>
          ))}
        {salaries
          .filter(
            (salary) =>
              user?.email === salary.authorEmail &&
              salary.companyEmail === companyEmail &&
              salary.status === "pending"
          )
          .map((salary) => (
            <div key={salary?.id}>
              <Typography variant="h5" style={{ margin: "100px 0px" }}>
                Salary Requests
              </Typography>{" "}
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Employee Name</TableCell>
                          <TableCell align="right">Employee Email</TableCell>
                          <TableCell align="right">Employee Salary</TableCell>

                          <TableCell align="right">Requested</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={vacation?.employeeEmail}>
                          <TableCell component="th" scope="row">
                            {salary?.employeeName}
                          </TableCell>
                          <TableCell align="right">
                            {salary?.employeeEmail}
                          </TableCell>
                          <TableCell align="right">{salary?.salary}</TableCell>

                          <TableCell align="right">{vacation?.days}</TableCell>
                          <TableCell align="right">
                            <button
                              onClick={() => handleSalaryApprove(salary?.id)}
                              style={{ cursor: "pointer" }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleSalaryDecline(salary?.id)}
                              style={{ cursor: "pointer" }}
                            >
                              Declined
                            </button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </div>
          ))}
      </Container>
    </div>
  );
};

export default Employees;
