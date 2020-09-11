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
import UpdateScheduleModalComponent from "../../components/UpdateScheduleModal";

const MainScreen = ({
  app,
  removeGroupAction,
  updateSchedulesAction,
}: ConnectedProps<typeof connector>) => {
  const [visibleUpdateScheduleModal, setVisibleUpdateScheduleModal] = useState<
    boolean
  >(false);

  const [currEditGroup, setCurrEditGroup] = useState<IGroup | null>(null);

  // Handlers
  const onRemoveGroup = (groupId: string) => {
    removeGroupAction(app.appKey, groupId);
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
            onClick={setVisibleUpdateScheduleModal.bind(null, true)}
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

      {visibleUpdateScheduleModal && (
        <ModalTemplate
          title="Обновление расписаний"
          onClose={setVisibleUpdateScheduleModal.bind(null, false)}
        >
          <UpdateScheduleModalComponent
            onSubmit={updateSchedulesAction.bind(null, app.appKey)}
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
  removeGroupAction,
  updateSchedulesAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainScreen);
