import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import "./RightBar.component.scss";

const RightBarComponent = () => {
  const history = useHistory();
  const location = useLocation();

  return location.pathname === "/" ? (
    <h1 onClick={() => history.push("/group/1")}>MainRightBar</h1>
  ) : (
    <h1 onClick={() => history.push("/")}>GroupRightBar</h1>
  );
};

export default RightBarComponent;
