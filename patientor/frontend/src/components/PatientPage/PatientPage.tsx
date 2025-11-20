import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Gender, Patient, Entry, NewEntry, EntryFormRef } from "../../types";
import { Transgender, Male, Female } from "@mui/icons-material";

import patientService from "../../services/patients";
import { useNotification } from "../../hooks/index";

import EntryForm from "./EntryForm";
import Togglable from "./Togglable";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      case Gender.Other:
        return <Transgender />;
      default:
        return null;
    }
  };

  const patientId = useParams().id;

  const notifyWith = useNotification();

  const [patient, setPatient] = useState<Patient | null>(null); // or get directly from patients if they are in redux

  useEffect(() => {
    if (patientId) {
      patientService
        .getOne(patientId)
        .then((patient) => setPatient(patient))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [patientId]);

  const addEntry = (entryToAdd: NewEntry) => {
    if (entryFormRef.current) {
      entryFormRef.current.toggleVisibility();
    }
    if (patient) {
      patientService
        .createEntry(patient.id, entryToAdd)
        .then((addedEntry) => {
          if (patient.entries) {
            setPatient({
              ...patient,
              entries: patient.entries.concat(addedEntry),
            });
          } else {
            setPatient({
              ...patient,
              entries: [addedEntry],
            });
          }
          notifyWith(`a new entry for ${addedEntry.date} was added`, false, 2000);
        })
        .catch((error) => {
          console.log(error);
          notifyWith(
            `${error.response.data.error[0].message}. Field: ${error.response.data.error[0].path}`,
            true,
            5000
          );
        });
    }
  };

  const entryFormRef = useRef<EntryFormRef>(null); // access internal method of Togglable to close the EntryForm after a new entry was created

  const createEntryForm = () => {
    return (
      <Togglable buttonLabel="create new entry" ref={entryFormRef}>
        <EntryForm createEntry={addEntry} />
      </Togglable>
    );
  };

  if (patient) {
    return (
      <>
        <div>
          <h2>
            {patient.name} {genderIcon(patient.gender)}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <p>{patient.dateOfBirth ? <>date of birth: {patient.dateOfBirth}</> : <>no date of birth registered</>}</p>
        </div>
        {createEntryForm()}
        {(patient.entries && patient.entries.length !== 0) ? (
          <div>
            <h3>entries</h3>
            {patient.entries.map((entry: Entry) => (
              <EntryDetails key={entry.id} entry={entry} />
            ))}
          </div>
        ) : null}
      </>
    );
  } else {
    return <h2>No patient with this id</h2>;
  }
};

export default PatientPage;
