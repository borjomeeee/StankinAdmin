import React from "react";

import TextField, { TextFieldProps } from "@material-ui/core/TextField";

interface ILabeledInputComponent {
  errorMsg?: string;
  onChangeValue: (value: string) => void;
}

const LabeledInputComponent: React.FC<ILabeledInputComponent & TextFieldProps> = ({
  label,
  value,

  errorMsg,
  autoFocus,

  onChangeValue,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(event.target.value);
  };

  return (
    <div className="labeled-input">
      <TextField
        error={errorMsg !== undefined && errorMsg.length > 1}
        id={errorMsg ? "outlined-error-helper-text" : "outlined-basic"}
        variant="outlined"
        label={label}
        value={value}
        onChange={handleChange}
        helperText={errorMsg || ""}
        autoFocus={autoFocus}
        fullWidth
      />
    </div>
  );
};

export default LabeledInputComponent;
