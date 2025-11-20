import { useSelector } from "react-redux";
import {
  Entry,
  assertNever,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
  EntryType,
} from "../../types";
import { LocalHospital, MonitorHeart, SafetyCheck } from "@mui/icons-material";
import { RootState } from "../../store";

const entryStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const OccupationalHealthcareDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  const diagnoses = useSelector((state: RootState) => state.diagnoses);

  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <SafetyCheck /> : Occupational Healthcare, employer: {entry.employerName}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((code: string, i) => {
            const name = diagnoses.find((d) => d.code === code)?.name;
            return (
              <li key={i}>
                {code} {name}
              </li>
            );
          })}
        </ul>
      ) : null}
      {entry.sickLeave ? (
        <div>
          sick leave: from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}{" "}
        </div>
      ) : null}
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const HealtchCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const diagnoses = useSelector((state: RootState) => state.diagnoses);

  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <MonitorHeart /> : Health Check
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((code: string, i) => {
            const name = diagnoses.find((d) => d.code === code)?.name;
            return (
              <li key={i}>
                {code} {name}
              </li>
            );
          })}
        </ul>
      ) : null}
      <div>rating: {HealthCheckRating[entry.healthCheckRating]}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => {
  const diagnoses = useSelector((state: RootState) => state.diagnoses);

  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <LocalHospital /> : Hospital Admission
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((code: string, i) => {
            const name = diagnoses.find((d) => d.code === code)?.name;
            return (
              <li key={i}>
                {code} {name}
              </li>
            );
          })}
        </ul>
      ) : null}
      <div>
        discharge on {entry.discharge.date}: {entry.discharge.criteria}
      </div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareDetails entry={entry} />;
    case EntryType.HealthCheck:
      return <HealtchCheckDetails entry={entry} />;
    case EntryType.Hospital:
      return <HospitalDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
