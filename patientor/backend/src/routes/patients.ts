import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import { NonSensitivePatient, NewPatient, Patient, NewEntry, Entry } from "../types";
import { newEntrySchema, newPatientSchema } from '../utils';
import * as z from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  console.log('--patients - fetch all patients');
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res: Response<Patient>) => {
  const id = req.params.id;
  console.log('--patients - fetch patient with id ', id);
  const patient = patientService.getPatient(id);
  if (patient) {
    return res.json(patient);
  } else {
    return res.status(404).end();
  }
});

// Ex 9.13
// router.post('/', (req, res) => {
//   console.log('posted this: ', req.body);
//   try {
//     const newPatient = toNewPatient(req.body);
//     const addedPatient = patientService.addPatient(newPatient);
//     res.json(addedPatient);
//   } catch (error: unknown) {
//     let errorMessage = 'Something went wrong :(';
//     if (error instanceof Error) {
//       errorMessage = 'Error: ' + error.message;
//     }
//     res.status(400).send(errorMessage);
//   }
// });

// Ex 9.14
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

// Ex 9.14
router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedConfidentialPatient = patientService.addPatient(req.body);
  res.json(addedConfidentialPatient);
});

// Ex 9.27
const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry>) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    const addedEntry = patientService.addEntry(req.body, patient);
    console.log('--patients - successfully added entry: ', addedEntry);
    return res.json(addedEntry);
  } else {
    return res.status(404).end();
  }
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
