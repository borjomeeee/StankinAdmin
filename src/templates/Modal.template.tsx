import React from "react";

import "./Modal.template.scss";

type IModalTemplate = {
  title: string;
  onClose: () => void;

  children: React.ReactChild;
};

const ModalTemplate = ({ title, children, onClose }: IModalTemplate) => {
  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__title">{title}</div>

        {children}

        <div className="modal__close" onClick={onClose}></div>
      </div>
    </div>
  );
};

export default ModalTemplate;
