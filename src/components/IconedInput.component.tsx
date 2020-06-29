import React from "react";

import Icon from "@material-ui/core/Icon";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

type IIconedInputComponent = {
  label?: string;

  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;

  icon: React.ReactElement;
  error?: string;
  autoFocus?: boolean;
};

const IconedInputComponent = ({
  label,
  value,
  onChange,
  onEnter,
  icon,
  error,
  autoFocus,
}: IIconedInputComponent) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div className="iconed-input">
      <TextField
        label={label || ""}
        id={error ? "outlined-error-helper-text" : "outlined-start-adornment"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon style={{ fontSize: 24 }}>{icon}</Icon>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        helperText={error || ""}
        autoFocus={autoFocus}
        error={error !== undefined && error.length > 1}
        fullWidth
      />
    </div>
  );
};

export default IconedInputComponent;
