import React from "react";
import { useHistory } from "react-router-dom";

import ArrowBack from "@material-ui/icons/ArrowBack";

type GroupFilterBarComponent = {
  label: string;
};

const GroupFilterBarComponent = ({ label }: GroupFilterBarComponent) => {
  const history = useHistory();
  return (
    <div className="filter-bar">
      <div onClick={() => history.goBack()} className="filter-bar__back">
        <ArrowBack style={{ fontSize: 24 }} />
      </div>
      <div className="filter-bar__title">{label}</div>
    </div>
  );
};

export default GroupFilterBarComponent;
