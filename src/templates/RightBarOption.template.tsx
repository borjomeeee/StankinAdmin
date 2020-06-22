import React from "react";

import "./RightBarOption.template.scss";

type IRightBarOptionTemplate = {
  label: string;

  children: React.ReactChild;
};

const RightBarOptionTemplate = ({
  label,
  children,
}: IRightBarOptionTemplate) => {
  return (
    <div className="right-bar__option option">
      <div className="option__label">{label}</div>
      <div className="option__child">{children}</div>
    </div>
  );
};

export default RightBarOptionTemplate;
