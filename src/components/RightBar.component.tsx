import React from "react";
import { useLocation } from "react-router-dom";

import "./RightBar.component.scss";

import MainRightBarComponent from "./MainRightBar.component";
import GroupRightBar from "./GroupRightBar.component";

// export const RightBarSectionChild = () => <></.

const RightBarComponent = () => {
  const location = useLocation();

  console.log("Render!");

  return location.pathname === "/" ? (
    <MainRightBarComponent />
  ) : (
    <GroupRightBar />
  );
};

export default RightBarComponent;
