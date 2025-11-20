import * as z from "zod";

export enum EntryType {
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

const diagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional()
});

const baseEntrySchema = z.object({
  date: z.string().date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(diagnosisSchema.shape.code).optional()
});

const sickLeave = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
});

const discharge = z.object({
  date: z.string().date(),
  criteria: z.string()
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export type HealthCheckEntry = z.infer<typeof healthCheckEntrySchema>;

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string(),
  sickLeave: sickLeave.optional()
});

export type OccupationalHealthcareEntry = z.infer<typeof occupationalHealthcareEntrySchema>;

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: discharge
});

export type HospitalEntry = z.infer<typeof hospitalEntrySchema>;

const newEntrySchema = z.discriminatedUnion("type", [healthCheckEntrySchema, occupationalHealthcareEntrySchema, hospitalEntrySchema]);

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date().optional(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

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

// export interface Diagnosis {
//   code: string;
//   name: string;
//   latin?: string;
// }

// export enum Gender {
//   Male = "male",
//   Female = "female",
//   Other = "other"
// }

// export interface Patient {
//   id: string;
//   name: string;
//   occupation: string;
//   gender: Gender;
//   ssn?: string;
//   dateOfBirth?: string;
// }

export type PatientFormValues = Omit<Patient, "id" | "entries">;

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export interface EntryFormRef {
  toggleVisibility: () => void
}