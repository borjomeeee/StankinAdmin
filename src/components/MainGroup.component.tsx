import React from "react";

import "./MainGroup.component.scss";

type IMainGroupComponent = {
  props: React.ComponentProps<"div">;
  title: string;
};

const MainGroupComponent = ({ props, title }: IMainGroupComponent) => {
  return (
    <div {...props} className="group-card">
      <div className="group-card__title">{title}</div>
    </div>
  );
};

export default MainGroupComponent;
