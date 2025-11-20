import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage/PatientPage";
import Notification from "./components/Notification";
import { useInitialization } from "./hooks/index";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]); // patients could be put into redux instead of keeping the original pattern
  const stateInitializer = useInitialization();
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`); // sanity check

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    stateInitializer();
  }, [stateInitializer]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Notification />
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path="/:id" element={<PatientPage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;

// or pass patientId as props to PatientPage, as in
// const matchPatient = useMatch("/:id");
// const patientId = matchPatient && matchPatient.params.id ? matchPatient.params.id : null;
