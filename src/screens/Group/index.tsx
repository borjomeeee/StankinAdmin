import React, { useMemo, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import { IInitialState } from "../../redux/store";

import GroupFilterBarComponent from "../../components/GroupFilterBar";
import GroupLessonCardComponent from "../../components/GroupLessonCard";
import EditLessonModalComponent from "../../components/EditLessonModal";
import GroupRightBarComponent from "../../components/GroupRightBar";

import { ILesson } from "../../models/Lesson.model";
import { IGroup } from "../../models/Group.model";

import EditRemoveHOC from "../../templates/EditRemove";
import {
  downloadLessonsAction,
  removeLessonAction,
} from "../../actions/Lessons.actions";

import ModalTemplate from "../../templates/Modal";

import CircularProgress from "@material-ui/core/CircularProgress";

type IGroupScreenParamsProps = {
  groupId?: string;
};

const GroupScreen = ({
  app,
  lessons,
  groups,
  groupScreen,
  downloadLessons,
  removeLesson,
}: ConnectedProps<typeof connector>) => {
  const history = useHistory();
  const { groupId }: IGroupScreenParamsProps = useParams();

  const [currEditLesson, setCurrEditLesson] = useState<null | ILesson>(null);

  useEffect(() => {
    if (groupId) {
      downloadLessons(app.appKey, groupId);
    }
  }, [downloadLessons, groupId, app.appKey]);

  const group: IGroup | undefined = useMemo(
    () =>
      groupId
        ? groups.reduce(
            (acc: undefined | IGroup, item: IGroup) =>
              acc || (item.id === groupId ? item : acc),
            undefined
          )
        : undefined,
    [groupId, groups]
  );

  if (app.isLoading) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  if (!group) {
    history.push("/");
    return <></>;
  }

  let groupLessons = lessons.get(group.id) || [];

  const GroupLessons = () => (
    <div className="group__lessons">
      {groupLessons
        .filter((item: ILesson) =>
          item.title.startsWith(groupScreen.searchLessonText)
        )
        .map((item: ILesson) => (
          <div className="group-lesson" key={item.id}>
            <EditRemoveHOC
              onEdit={setCurrEditLesson.bind(null, item)}
              onRemove={() => removeLesson(app.appKey, group.id, item.id)}
            >
              <GroupLessonCardComponent lesson={item} />
            </EditRemoveHOC>
          </div>
        ))}
    </div>
  );

  return (
    <div className="group">
      <div className="filters">
        <GroupFilterBarComponent label={group.title} />
      </div>
      <div className="content group__content">
        <GroupLessons />
      </div>

      <GroupRightBarComponent group={group} />

      {currEditLesson && (
        <ModalTemplate
          title="Изменение пары"
          onClose={() => setCurrEditLesson(null)}
        >
          <EditLessonModalComponent
            lesson={currEditLesson}
            onSubmit={() => setCurrEditLesson(null)}
          />
        </ModalTemplate>
      )}
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  lessons: state.lessons,
  groups: state.groups,
  groupScreen: state.groupScreen,
});

const mapDispatchToProps = {
  downloadLessons: (key: string, groupId: string) =>
    downloadLessonsAction(key, groupId),
  removeLesson: (key: string, groupId: string, lessonId: string) =>
    removeLessonAction(key, groupId, lessonId),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GroupScreen);
