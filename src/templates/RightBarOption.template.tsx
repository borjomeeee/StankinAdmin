import React from "react";

import "./RightBarOption.template.scss";

type IRightBarOptionTemplate = {
  label?: string;

  children: React.ReactChild[];
};

const RightBarOptionTemplate = ({
  label,
  children,
}: IRightBarOptionTemplate) => {
  // const items = 
  return (
    <div className="right-bar__section">
      {label && <div className="section__label">{label}</div>}
      <div className="section__child">{children}</div>
    </div>
  );
};

export default RightBarOptionTemplate;
