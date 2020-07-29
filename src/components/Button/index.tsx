import React from "react";

type IButtonComponent = {
  label: string;
  onClick: () => void;
};

const ButtonComponent: React.FC<IButtonComponent> = ({
  label,
  onClick,
  ...props
}) => {
  const onTriggerClickEvent = () => onClick();
  return (
    <div onClick={onTriggerClickEvent} className="button">
      <div className="button__text">{label}</div>

      {props.children}
    </div>
  );
};

export default ButtonComponent;
