import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import "./RightBar.component.scss";

import MainRightBarComponent from "./MainRightBar.component";

const RightBarComponent = () => {
  const history = useHistory();
  const location = useLocation();

  return location.pathname === "/" ? (
    <MainRightBarComponent />
  ) : (
    <h1 onClick={() => history.push("/")}>GroupRightBar</h1>
  );
};

export default RightBarComponent;
