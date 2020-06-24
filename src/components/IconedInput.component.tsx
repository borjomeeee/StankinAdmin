import React from "react";

import Icon from "@material-ui/core/Icon";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

type IIconedInputComponent = {
  label: string;

  value: string;
  onChange: (value: string) => void;

  icon: React.ReactElement;
};

const IconedInputComponent = ({
  label,
  value,
  onChange,
  icon,
}: IIconedInputComponent) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="iconed-input">
      <TextField
        label={label || ""}
        id="outlined-start-adornment"
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
        fullWidth
      />
    </div>
  );
};

export default IconedInputComponent;
