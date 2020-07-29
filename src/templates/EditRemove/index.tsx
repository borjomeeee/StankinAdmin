import React from "react";

import Delete from "@material-ui/icons/Delete";
import Create from "@material-ui/icons/Create";

type IEditRemoveTemplate = {
  children: React.ReactChild;

  onEdit: () => void;
  onRemove: () => void;
};

const EditRemoveTemplate = ({
  children,
  onEdit,
  onRemove,
}: IEditRemoveTemplate) => {
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

export default EditRemoveTemplate;
