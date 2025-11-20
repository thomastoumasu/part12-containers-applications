import { useState } from "react";
import { HealthCheckRating, NewEntry, assertNever, EntryType } from "../../types";
import MultipleSelect from "./MultipleSelect";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, Textarea, Radio, Input } from "@mui/joy";
import { Stack, TextField } from "@mui/material";

const EntryForm = ({ createEntry }: { createEntry: (newEntry: NewEntry) => void }) => {
  const newEntryStyle = {
    paddingTop: 2,
    paddingLeft: 20,
    paddingBottom: 20,
    border: "dashed",
    borderWidth: 1,
    marginBottom: 5,
  };
  const formTypeButtonStyle = {
    marginLeft: 20,
    marginBottom: 20,
  };
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const switchForm = (formType: EntryType) => {
    switch (formType) {
      case EntryType.HealthCheck:
        return <HealthCheckForm createEntry={createEntry} />;
      case EntryType.Hospital:
        return <HospitalForm createEntry={createEntry} />;
      case EntryType.OccupationalHealthcare:
        return <OccupationalHealthcareForm createEntry={createEntry} />;
      default:
        return assertNever(formType);
    }
  };

  return (
    <div style={newEntryStyle}>
      <h3>New Entry:</h3>
      <Stack direction="row">
        {Object.values(EntryType).map((t, i) => (
          <div key={i}>
            <Radio
              size="lg"
              color="danger"
              name="form type"
              onChange={() => setEntryType(t)}
              checked={t === entryType}
              style={formTypeButtonStyle}
              sx={{ m: 1 }}
            />
            {t}
          </div>
        ))}
      </Stack>
      {switchForm(entryType)}
    </div>
  );
};

const HealthCheckForm = ({ createEntry }: { createEntry: (newEntry: NewEntry) => void }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[] | undefined>(undefined);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date: date ? date.format("YYYY-MM-DD") : "",
      description,
      specialist,
      diagnosisCodes,
      type: EntryType.HealthCheck as const,
      healthCheckRating,
    };
    console.log("HealthCheckForm newEntry: ", newEntry);

    createEntry(newEntry);
    setDate(dayjs());
    setDescription("");
    setSpecialist("");
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDiagnosisCodes(undefined);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="date" value={date} onChange={(newValue) => setDate(newValue)} sx={{ m: 1 }} />
        </LocalizationProvider>
        <MultipleSelect addDiagnosisCode={(diagnosisCodes: string[]) => setDiagnosisCodes(diagnosisCodes)} />
        <FormControl>
          {/* <FormLabel>description</FormLabel> */}
          <Textarea
            placeholder="write description"
            minRows={2}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            sx={{ m: 1 }}
          />
          {/* <FormHelperText>This is a helper text.</FormHelperText> */}
        </FormControl>
        <div>
          <label>
            <Stack direction="row" spacing={2}>
              {Object.keys(HealthCheckRating)
                .filter((key) => isNaN(Number(key)))
                .map((r, i) => (
                  <div key={i}>
                    <Radio
                      name="rating"
                      onChange={() => setHealthCheckRating(HealthCheckRating[r as keyof typeof HealthCheckRating])}
                      checked={HealthCheckRating[r as keyof typeof HealthCheckRating] === healthCheckRating}
                      sx={{ m: 1 }}
                    />
                    {r}
                  </div>
                ))}
            </Stack>
          </label>
        </div>
        <div>
          <TextField
            label="specialist"
            variant="standard"
            // helperText="specialist"
            value={specialist}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSpecialist(event.target.value);
            }}
            sx={{ m: 1 }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const HospitalForm = ({ createEntry }: { createEntry: (newEntry: NewEntry) => void }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[] | undefined>(undefined);
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(dayjs());
  const [criteria, setCriteria] = useState("");

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date: date ? date.format("YYYY-MM-DD") : "",
      description,
      specialist,
      diagnosisCodes,
      type: EntryType.Hospital as const,
      discharge: {
        date: dischargeDate ? dischargeDate.format("YYYY-MM-DD") : "",
        criteria,
      },
    };
    console.log("HospitalForm: newEntry: ", newEntry);

    createEntry(newEntry);
    setDate(dayjs());
    setDescription("");
    setSpecialist("");
    setDischargeDate(dayjs());
    setDiagnosisCodes(undefined);
    setCriteria("");
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="date" value={date} onChange={(newValue) => setDate(newValue)} sx={{ m: 1 }} />
        </LocalizationProvider>
        <MultipleSelect addDiagnosisCode={(diagnosisCodes: string[]) => setDiagnosisCodes(diagnosisCodes)} />
        <FormControl>
          {/* <FormLabel>description</FormLabel> */}
          <Textarea
            placeholder="write description"
            minRows={2}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            sx={{ m: 1 }}
          />
          {/* <FormHelperText>This is a helper text.</FormHelperText> */}
        </FormControl>
        <div>
          <TextField
            label="discharge criteria"
            value={criteria}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCriteria(event.target.value);
            }}
            sx={{ m: 1 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="discharge date"
              value={dischargeDate}
              onChange={(newValue) => setDischargeDate(newValue)}
              sx={{ m: 1 }}
            />
          </LocalizationProvider>
        </div>
        <div>
          <TextField
            label="specialist"
            variant="standard"
            // helperText="specialist"
            value={specialist}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSpecialist(event.target.value);
            }}
            sx={{ m: 1 }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const OccupationalHealthcareForm = ({ createEntry }: { createEntry: (newEntry: NewEntry) => void }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[] | undefined>(undefined);
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const sickLeave = startDate
      ? { startDate: startDate.format("YYYY-MM-DD"), endDate: endDate ? endDate.format("YYYY-MM-DD") : "" }
      : undefined;
    const newEntry = {
      date: date ? date.format("YYYY-MM-DD") : "",
      description,
      specialist,
      diagnosisCodes,
      type: EntryType.OccupationalHealthcare as const,
      employerName,
      sickLeave,
    };
    console.log("OccupationalHealthcareForm: newEntry: ", newEntry);

    createEntry(newEntry);
    setDate(dayjs());
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes(undefined);
    setEmployerName("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <div>
          <Input
            variant="outlined"
            placeholder="employer"
            color="danger"
            value={employerName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmployerName(event.target.value);
            }}
            sx={{
              "&::before": {
                display: "none",
              },
              "&:focus-within": {
                outline: "2px solid var(--Input-focusedHighlight)",
                outlineOffset: "2px",
              },
              m: 1,
            }}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="date" value={date} onChange={(newValue) => setDate(newValue)} sx={{ m: 1 }} />
        </LocalizationProvider>
        <MultipleSelect addDiagnosisCode={(diagnosisCodes: string[]) => setDiagnosisCodes(diagnosisCodes)} />
        <FormControl>
          {/* <FormLabel>description</FormLabel> */}
          <Textarea
            placeholder="write description"
            minRows={2}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            sx={{ m: 1 }}
          />
          {/* <FormHelperText>This is a helper text.</FormHelperText> */}
        </FormControl>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="sick leave startDate"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ m: 1 }}
            />
            <DatePicker
              label="sick leave endDate"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{ m: 1 }}
            />
          </LocalizationProvider>
        </div>
        <div>
          <TextField
            label="specialist"
            variant="standard"
            // helperText="specialist"
            value={specialist}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSpecialist(event.target.value);
            }}
            sx={{ m: 1 }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default EntryForm;

{
  /* <div>
  <label>
    specialist
    <input type="text" value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
  </label>
</div> */
}

{
  /* <div>
  <label>
    discharge date
    <input type="date" value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)} />
  </label>
</div> */
}
