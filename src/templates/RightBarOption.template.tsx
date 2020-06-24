import React from "react";

import "./RightBarOption.template.scss";

type IRightBarOptionTemplate = {
  label: string;

  children: React.ReactChild | React.ReactChild[];
};

const RightBarOptionTemplate = ({
  label,
  children,
}: IRightBarOptionTemplate) => {
  const RightBarItems = () => (
    <>
      {Array.isArray(children) ? (
        children.map((item: React.ReactChild, index: number) => (
          <div key={index} className="option__child">
            {item}
          </div>
        ))
      ) : (
        <div className="option__child">{children}</div>
      )}
    </>
  );
  return (
    <div className="right-bar__option option">
      <div className="option__label">{label}</div>
      <RightBarItems />
    </div>
  );
};

export default RightBarOptionTemplate;
