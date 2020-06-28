import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";

import "./Main.screen.scss";

import { IInitialState } from "../redux/store";

import MainFilterBar from "../components/MainFilterBar.component";
import MainGroupComponent from "../components/MainGroup.component";

import EditRemoveHOC from "../HOCs/EditRemove.HOC";

import { IGroup } from "../models/Group.model";
import { removeGroupAction } from "../actions/Groups.actions";
import ModalTemplate from "../templates/Modal.template";
import EditGroupModalComponent from "../components/EditGroupModal.component";

const MainScreen = ({
  groups,
  mainScreen,

  removeGroup,
}: ConnectedProps<typeof connector>) => {
  const [currEditGroup, setCurrEditGroup] = useState<IGroup | null>(null);
  // Handlers
  const onRemoveGroup = (groupId: string) => {
    removeGroup(groupId);
  };

  const onEditGroup = (groupId: IGroup) => {
    setCurrEditGroup(groupId);
  };

  const MainGroups = () => (
    <div className="main__groups">
      {groups
        .filter((group: IGroup) =>
          group.title.startsWith(mainScreen.searchGroupText)
        )
        .map((group: IGroup) => (
          <EditRemoveHOC
            key={group.id}
            onEdit={() => onEditGroup(group)}
            onRemove={() => onRemoveGroup(group.id)}
          >
            <Link
              to={{
                pathname: `/group/${group.id}`,
                state: { group },
              }}
            >
              <MainGroupComponent
                props={{
                  onClick: () => console.log(`Touched group: ${group.id}`),
                }}
                title={group.title}
              />
            </Link>
          </EditRemoveHOC>
        ))}
    </div>
  );
  return (
    <div className="main">
      <div className="filters">
        <MainFilterBar />
      </div>

      <div className="content main__content">
        <MainGroups />
      </div>

      {currEditGroup && (
        <ModalTemplate
          title="Изменение группы"
          onClose={() => setCurrEditGroup(null)}
        >
          <EditGroupModalComponent group={currEditGroup} />
        </ModalTemplate>
      )}
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  groups: state.groups,
  mainScreen: state.mainScreen,
});

const mapDispatchToProps = {
  removeGroup: (groupId: string) => removeGroupAction(groupId),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainScreen);
