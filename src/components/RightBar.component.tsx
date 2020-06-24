import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import "./RightBar.component.scss";

import MainRightBarComponent from "./MainRightBar.component";
import GroupRightBar from "./GroupRightBar.component";

const RightBarComponent = () => {
  const location = useLocation();

  return location.pathname === "/" ? (
    <MainRightBarComponent />
  ) : (
    <GroupRightBar />
  );
};

export default RightBarComponent;
