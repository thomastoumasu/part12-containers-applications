import * as React from "react";
import { useSelector } from "react-redux";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RootState } from "../../store";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const MultipleSelect = ({ addDiagnosisCode }: { addDiagnosisCode: (diagnosisCode: string[]) => void}) => {
  const [code, setCode] = React.useState<string[]>([]);
  const diagnoses = useSelector((state: RootState) => state.diagnoses);
    
  const handleChange = (event: SelectChangeEvent<typeof code>) => {
    const {
      target: { value },
    } = event;
    // console.log("setCode, target.value ", event.target.value);
    const diagnosisCodes = (event.target.value.constructor === Array) ? event.target.value : [event.target.value as string];
    addDiagnosisCode(diagnosisCodes);

    setCode(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="diagnosis">diagnosis</InputLabel>
        <Select
          labelId="diagnosis"
          multiple
          value={code}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnosis" />}
          MenuProps={MenuProps}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;