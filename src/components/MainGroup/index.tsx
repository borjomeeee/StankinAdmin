import React from "react";

import { IGroup } from "../../models/Group.model";

const MainGroupComponent: React.FC<IGroup> = ({ title }) => {
  return (
    <div className="group-card">
      <div className="group-card__title">{title}</div>
    </div>
  );
};

export default MainGroupComponent;
