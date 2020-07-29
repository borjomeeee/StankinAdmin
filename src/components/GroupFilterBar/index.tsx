import React from "react";

import ArrowBack from "@material-ui/icons/ArrowBack";

type IGroupFilterBarComponent = {
  label: string;
  onClick: () => void;
};

const GroupFilterBarComponent = ({
  label,
  onClick,
}: IGroupFilterBarComponent) => {
  // const history = useHistory();
  return (
    <div className="filter-bar">
      <div onClick={() => onClick()} className="filter-bar__back">
        <ArrowBack style={{ fontSize: 24 }} />
      </div>
      <div className="filter-bar__title">{label}</div>
    </div>
  );
};

export default GroupFilterBarComponent;
