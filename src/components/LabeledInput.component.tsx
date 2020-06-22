import React from "react";

import TextField from "@material-ui/core/TextField";

type ILabeledInputComponent = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const LabeledInputComponent = ({
  label,
  value,
  onChange,
}: ILabeledInputComponent) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="labeled-input">
      <TextField
        id="outlined-basic"
        variant="outlined"
        label={label}
        value={value}
        onChange={handleChange}
        fullWidth
      />
    </div>
  );
};

export default LabeledInputComponent;
