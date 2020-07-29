import React from "react";
import { Link } from "react-router-dom";

import { IGroup } from "../../models/Group.model";

import MainGroupComponent from "../MainGroup";

import { EditRemoveTemplate } from "../../templates";

interface IMainGroupListComponent {
  groups: IGroup[];

  onEditGroup: (group: IGroup) => void;
  onRemoveGroup: (groupId: string) => void;
}

const MainGroupListComponent: React.FC<IMainGroupListComponent> = ({
  groups,

  onEditGroup,
  onRemoveGroup,
}) => {
  const renderMainGroupListItem = (group: IGroup) => {
    return (
      <React.Fragment key={group.id}>
        <Link
          to={{
            pathname: `/group/${group.id}`,
            state: { group },
          }}
        >
          <EditRemoveTemplate
            onRemove={() => onRemoveGroup(group.id)}
            onEdit={() => onEditGroup(group)}
          >
            <MainGroupComponent {...group} />
          </EditRemoveTemplate>
        </Link>
      </React.Fragment>
    );
  };
  return <React.Fragment>{groups.map(renderMainGroupListItem)}</React.Fragment>;
};

export default MainGroupListComponent;
