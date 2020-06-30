import React, { useMemo, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import "./Group.screen.scss";

import { IInitialState } from "../redux/store";

import GroupFilterBarComponent from "../components/GroupFilterBar.component";
import GroupLessonCardComponent from "../components/GroupLessonCard.component";
import EditLessonModalComponent from "../components/EditLessonModal.component";
import GroupRightBarComponent from "../components/GroupRightBar.component";

import { ILesson } from "../models/Lesson.model";
import { IGroup } from "../models/Group.model";

import EditRemoveHOC from "../HOCs/EditRemove.HOC";
import { useEffect } from "react";
import {
  downloadLessonsAction,
  removeLessonAction,
  changeLessonAction,
} from "../actions/Lessons.actions";

import ModalTemplate from "../templates/Modal.template";

type IGroupScreenParamsProps = {
  groupId?: string;
};

const GroupScreen = ({
  lessons,
  groups,
  groupScreen,
  downloadLessons,
  removeLesson,
  changeLesson,
}: ConnectedProps<typeof connector>) => {
  const history = useHistory();
  const { groupId }: IGroupScreenParamsProps = useParams();

  const [currEditLesson, setCurrEditLesson] = useState<null | ILesson>(null);

  useEffect(() => {
    if (groupId) {
      downloadLessons(groupId);
    }
  }, [downloadLessons, groupId]);

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
              onRemove={() => removeLesson(group.id, item.id)}
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
  lessons: state.lessons,
  groups: state.groups,
  groupScreen: state.groupScreen,
});

const mapDispatchToProps = {
  downloadLessons: (groupId: string) => downloadLessonsAction(groupId),
  removeLesson: (groupId: string, lessonId: string) =>
    removeLessonAction(groupId, lessonId),
  changeLesson: (lesson: ILesson) => changeLessonAction(lesson),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GroupScreen);
