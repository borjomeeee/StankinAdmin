import React from "react";

import Search from "@material-ui/icons/Search";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

type IIconedInputComponent = {
  label: string;

  value: string;
  onChange: (value: string) => void;
};

const IconedInputComponent = ({
  label,
  value,
  onChange,
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
              <Search style={{ fontSize: 24 }} />
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
