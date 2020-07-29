import React from "react";

type IButtonComponent = {
  label: string;
  onClick: () => void;
};

const ButtonComponent = ({ label, onClick }: IButtonComponent) => {
  return (
    <div onClick={onClick} className="button">
      <div className="button__text">{label}</div>
    </div>
  );
};

export default ButtonComponent;
