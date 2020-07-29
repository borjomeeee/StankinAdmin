import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import FilterSelect from "../FilterSelect";

import { FilterValuesGroupType } from "../../utils/enums";
import { IInitialState } from "../../redux/store";

const MainFilterBar = ({ mainScreen }: ConnectedProps<typeof connector>) => {
  const [typeFilterData, setTypeFilterData] = useState({
    data: [FilterValuesGroupType.ALL, FilterValuesGroupType.WRONG_ONCE],
    selected: mainScreen.typeGroupFilter,
  });

  const onChangeTypeFilter = (value: string) => {
    setTypeFilterData({
      ...typeFilterData,
      selected: value as FilterValuesGroupType,
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

const mapStateToProps = (state: IInitialState) => ({
  mainScreen: state.mainScreen,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainFilterBar);
