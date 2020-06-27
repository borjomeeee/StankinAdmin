import React, { useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import "./Group.screen.scss";

import GroupFilterBarComponent from "../components/GroupFilterBar.component";
import GroupLessonCardComponent from "../components/GroupLessonCard.component";

import { ILesson } from "../models/Lesson.model";
import { IGroup } from "../models/Group.model";

import EditRemoveHOC from "../HOCs/EditRemove.HOC";
import { useEffect } from "react";
import { downloadLessonsAction } from "../actions/Lessons.actions";
import { IInitialState } from "../redux/store";

type IGroupScreenParamsProps = {
  groupId?: string;
};

const GroupScreen = ({
  lessons,
  groups,
  groupScreen,
  downloadLessons,
}: ConnectedProps<typeof connector>) => {
  const history = useHistory();
  const { groupId }: IGroupScreenParamsProps = useParams();

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
              onEdit={() => console.log("Edit lesson: ", item.id)}
              onRemove={() => console.log("Remove lesson: ", item.id)}
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
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GroupScreen);
