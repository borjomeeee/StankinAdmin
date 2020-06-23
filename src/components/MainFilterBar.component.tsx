import React, { useState } from "react";

import FilterSelect from "./FilterSelect.component";

import { TypeFilterValues } from "../utils/enums";

const MainFilterBar = () => {
  const [typeFilterData, setTypeFilterData] = useState({
    data: [TypeFilterValues.ALL, TypeFilterValues.WRONG_ONCE],
    selected: TypeFilterValues.ALL,
  });

  const onChangeTypeFilter = (value: string) => {
    setTypeFilterData({
      ...typeFilterData,
      selected: value as TypeFilterValues,
    });
  };
  return (
    <div className="filter-bar">
      <div className="filter-bar__title">Все группы</div>
      <div className="filter-bar__option">
        <FilterSelect
          props={{
            className: "filter-bar__option-component",
          }}
          selectData={typeFilterData.data}
          itemSelected={typeFilterData.selected}
          onChangeItem={onChangeTypeFilter}
        />
      </div>
    </div>
  );
};

export default MainFilterBar;
