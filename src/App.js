import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";

import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { signOut } from "firebase/auth";
import { auth, db } from "./firbase";
import Auth from "./pages/Auth";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Resources from "./pages/Resources";
import CompanyRegistration from "./pages/CompanyRegistration";
import Admin from "./pages/Admin";
import EmployeeDetail from "./pages/EmployeeDetail";
import EmployeeLogIn from "./pages/EmployeeLogIn";
import { collectionGroup, onSnapshot } from "firebase/firestore";

const initialState = {
  employeeEmail: "",
  companyName: "",
  companyEmail: "",
};

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  //Getting single employee

  const [employees, setEmployees] = useState([]);
  const [state, setState] = useState(initialState);
  const { employeeEmail, companyEmail, companyName } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const unsub = onSnapshot(collectionGroup(db, "employees"), (snapShot) => {
      let list = [];

      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      //   console.log("Retrieved data:", list);

      setEmployees(list);
    });

    return () => {
      unsub();
    };
  }, []);
  const employee = employees.find(
    (e) =>
      e.companyEmail === companyEmail &&
      e.employeeEmail === employeeEmail &&
      e.companyName === companyName
  );
  const handleEmployeeLogin = async (e) => {
    e.preventDefault();
    if (employee) {
      alert("LogIn Successful");
      navigate("/employeedetails");
    } else {
      alert("An error occured");
    }
  };

  return (
    <div className="App">
      <Header user={user} handleLogOut={handleLogOut}></Header>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/auth" element={<Auth></Auth>}></Route>
        <Route path="/solutions" element={<Solutions></Solutions>}></Route>
        <Route path="/pricing" element={<Pricing></Pricing>}></Route>
        <Route path="/auth" element={<Auth></Auth>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/resources" element={<Resources></Resources>}></Route>
        <Route
          path="/employeeLogin"
          element={
            <EmployeeLogIn
              handleChange={handleChange}
              handleEmployeeLogin={handleEmployeeLogin}
              state={state}
            ></EmployeeLogIn>
          }
        ></Route>
        <Route
          path="/employeedetails"
          element={<EmployeeDetail employee={employee}></EmployeeDetail>}
        ></Route>
        <Route path="/admin" element={<Admin user={user}></Admin>}></Route>
        <Route
          path="/companyregistration"
          element={<CompanyRegistration user={user}></CompanyRegistration>}
        ></Route>
        <Route path="*" element={<Notfound></Notfound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
