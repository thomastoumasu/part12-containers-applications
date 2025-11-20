import * as z from "zod";
import { newPatientSchema, newEntrySchema } from "./utils";

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
  }

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string
}

export interface Patient { // can also simply extend NewPatient
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof newPatientSchema>;

export type NewEntry = z.infer<typeof newEntrySchema>;

export type Entry = NewEntry & { id: string };

// interface BaseEntry {
  //   id: string;
  //   date: string;
  //   description: string;
  //   specialist: string;
  //   diagnosisCodes?: Array<Diagnosis['code']>;
  // }
  
  // type SickLeave = {
  //   startDate: string;
  //   endDate: string;
  // };
  
  // type Discharge = {
  //     date: string;
  //     criteria: string;
  // };
  
  // interface HealthCheckEntry extends BaseEntry {
  //   type: "HealthCheck";
  //   healthCheckRating: HealthCheckRating;
  // }
  
  // interface OccupationalHealthcareEntry extends BaseEntry {
  //   type: "OccupationalHealthcare";
  //   employerName: string;
  //   sickLeave?: SickLeave;
  // }
  
  // interface HospitalEntry extends BaseEntry {
  //   type: "Hospital";
  //   discharge: Discharge;
  // }
  
  // export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;