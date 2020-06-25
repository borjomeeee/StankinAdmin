import React from "react";
import { useLocation } from "react-router-dom";

import "./RightBar.component.scss";

import MainRightBarComponent from "./MainRightBar.component";
import GroupRightBarComponent from "./GroupRightBar.component";

// export const RightBarSectionChild = () => <></.

const RightBarComponent = () => {
  const location = useLocation();

  return location.pathname === "/" ? (
    <MainRightBarComponent />
  ) : (
    <GroupRightBarComponent />
  );
};

export default RightBarComponent;
