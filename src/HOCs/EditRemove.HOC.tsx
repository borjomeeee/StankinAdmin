import React from "react";

import "./EditRemove.HOC.scss";

import Delete from "@material-ui/icons/Delete";
import Create from "@material-ui/icons/Create";

type IEditRemoveHOC = {
  children: React.ReactChild;

  onEdit: () => void;
  onRemove: () => void;
};

const EditRemoveHOC = ({ children, onEdit, onRemove }: IEditRemoveHOC) => {
  return (
    <div className="edit-remove__container">
      <div className="edit-remove__child">{children}</div>
      <div className="edit-remove__options">
        <div
          onClick={onRemove}
          className="edit-remove__option edit-remove__option-remove"
        >
          <Delete style={{ fontSize: 24 }} />
        </div>
        <div
          onClick={onEdit}
          className="edit-remove__option edit-remove__option-edit"
        >
          <Create style={{ fontSize: 24 }} />
        </div>
      </div>
    </div>
  );
};

export default EditRemoveHOC;
