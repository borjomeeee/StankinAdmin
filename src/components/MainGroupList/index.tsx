import React from "react";
import { Link } from "react-router-dom";

import { IGroup } from "../../models/Group.model";

import MainGroupComponent from "../MainGroup";

import { EditRemoveTemplate } from "../../templates";
import { useSelector } from "react-redux";
import { IInitialState } from "../../redux/store";

interface IMainGroupListComponent {
  onEditGroup: (group: IGroup) => void;
  onRemoveGroup: (groupId: string) => void;
}

const MainGroupListComponent: React.FC<IMainGroupListComponent> = ({
  onEditGroup,
  onRemoveGroup,
}) => {
  const allGroups = useSelector((state: IInitialState) => state.groups);
  const mainScreen = useSelector((state: IInitialState) => state.mainScreen);

  const currGroups = allGroups.filter((group: IGroup) =>
    group.title.startsWith(mainScreen.searchGroupText)
  );

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
  return (
    <React.Fragment>{currGroups.map(renderMainGroupListItem)}</React.Fragment>
  );
};

export default MainGroupListComponent;
