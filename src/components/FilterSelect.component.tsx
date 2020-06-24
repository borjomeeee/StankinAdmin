import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

type IFilterSelectComponent = {
  props?: React.ComponentProps<typeof FormControl>;

  selectData: string[];
  itemSelected: string;

  onChangeItem: (value: string) => void;
};

const FilterSelectComponent = ({
  props,

  selectData,
  itemSelected,

  onChangeItem,
}: IFilterSelectComponent) => {
  const onChangeValue = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChangeItem(event.target.value as string);
  };

  return (
    <div className="filter-select">
      <FormControl variant="outlined" {...props}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={itemSelected}
          onChange={onChangeValue}
        >
          {selectData.map((item: string, index: number) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterSelectComponent;
