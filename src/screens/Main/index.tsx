import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import "./style.scss";

import { IInitialState } from "../../redux/store";

import {
  removeGroupAction,
  downloadGroupsAction,
} from "../../actions/Groups.actions";

import { updateSchedulesAction } from "../../actions/App.actions";

import { ButtonComponent } from "../../components";

import MainFilterBar from "../../components/MainFilterBar";
import EditGroupModalComponent from "../../components/EditGroupModal";
import MainRightBarComponent from "../../components/MainRightBar";

import { IGroup } from "../../models/Group.model";

import ModalTemplate from "../../templates/Modal";

import CircularProgress from "@material-ui/core/CircularProgress";
import MainGroupListComponent from "../../components/MainGroupList";

const MainScreen = ({
  app,
  removeGroup,
  updateSchedulesAction,
}: ConnectedProps<typeof connector>) => {
  const [currEditGroup, setCurrEditGroup] = useState<IGroup | null>(null);

  // Handlers
  const onRemoveGroup = (groupId: string) => {
    removeGroup(app.appKey, groupId);
  };

  const onEditGroup = (groupId: IGroup) => {
    setCurrEditGroup(groupId);
  };

  const onSubmitEditGroup = () => {
    setCurrEditGroup(null);
  };

  if (app.isLoading) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="main">
      <div className="main__top-bar">
        <div className="main__filters filters">
          <MainFilterBar />
        </div>

        <div className="main__download">
          <ButtonComponent
            label="Обновить расписания"
            onClick={updateSchedulesAction.bind(null, app.appKey)}
          />
        </div>
      </div>

      <div className="content main__content">
        <div className="main__groups">
          <MainGroupListComponent
            onEditGroup={onEditGroup}
            onRemoveGroup={onRemoveGroup}
          />
        </div>
      </div>

      {currEditGroup && (
        <ModalTemplate
          title="Изменение группы"
          onClose={() => setCurrEditGroup(null)}
        >
          <EditGroupModalComponent
            group={currEditGroup}
            onClose={onSubmitEditGroup}
          />
        </ModalTemplate>
      )}

      <MainRightBarComponent />
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  groups: state.groups,
  mainScreen: state.mainScreen,
});

const mapDispatchToProps = {
  removeGroup: (key: string, groupId: string) =>
    removeGroupAction(key, groupId),
  updateSchedulesAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainScreen);
