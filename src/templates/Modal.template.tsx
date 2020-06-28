import React from "react";

import "./Modal.template.scss";

import Close from "@material-ui/icons/Close";

type IModalTemplate = {
  title: string;
  onClose: () => void;

  children: React.ReactChild;
};

const ModalTemplate = ({ title, children, onClose }: IModalTemplate) => {
  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__top">
          <div className="modal__title">{title}</div>
          <div className="modal__close" onClick={onClose}>
            <Close style={{ fontSize: 24 }} />
          </div>
        </div>

        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};

export default ModalTemplate;
