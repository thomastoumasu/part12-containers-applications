import { NonSensitivePatient, Patient, NewPatient, NewEntry, Entry } from "../types";
import patients from "../../data/patients";
import { v4 as uuid } from 'uuid';

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const id = uuid();
  const patient: Patient = { ...newPatient, id };
  patients.push(patient);
  return patient;
};

const addEntry = (newEntry: NewEntry, patient: Patient): Entry => {
  const id = uuid();
  const entry: Entry = { ...newEntry, id };
  if (patient.entries) {
    patient.entries.push(entry);
  } else {
    patient.entries = [entry];
  }
  return entry;
};

export default { getPatients, addPatient, getPatient, addEntry };
