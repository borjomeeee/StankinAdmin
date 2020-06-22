import React from "react";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

type ILabeledFilterSelectComponent = {
  props: React.ComponentProps<typeof FormControl>;

  selectData: string[];
  itemSelected: string;

  onChangeItem: (value: string) => void;
};

const LabeledFilterSelectComponent = ({
  props,

  selectData,
  itemSelected,

  onChangeItem,
}: ILabeledFilterSelectComponent) => {
  const onChangeValue = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChangeItem(event.target.value as string);
  };

  return (
    // <div {...props} className={`${props.className} labeled-filter-select`}>
    //   <label className="labeled-filter-select__label">{label}</label>
    //   <div className="labeled-filter-select__select">{selectDefault}</div>
    // </div>
    <FormControl variant="outlined" {...props}>
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
  );
};

export default LabeledFilterSelectComponent;
