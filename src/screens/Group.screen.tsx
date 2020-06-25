import React, { useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import "./Group.screen.scss";

import GroupFilterBarComponent from "../components/GroupFilterBar.component";
import GroupLessonCardComponent from "../components/GroupLessonCard.component";

import { ILesson } from "../models/Lesson.model";
import { IGroup } from "../models/Group.model";

import EditRemoveHOC from "../HOCs/EditRemove.HOC";

type IGroupScreenParamsProps = {
  groupId?: string;
};

const GroupScreen = ({ lessons, groups }: ConnectedProps<typeof connector>) => {
  const history = useHistory();
  const { groupId }: IGroupScreenParamsProps = useParams();

  const group: IGroup | undefined = useMemo(
    () =>
      groupId
        ? groups.reduce(
            (acc: undefined | IGroup, item: IGroup) =>
              acc || (item.id === +groupId ? item : acc),
            undefined
          )
        : undefined,
    [groupId, groups]
  );

  if (!group) {
    history.push("/");
    return <></>;
  }

  const groupLessons = lessons.get(group.id) || [];

  const GroupLessons = () => (
    <div className="group__lessons">
      {groupLessons.map((item: ILesson) => (
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

const mapStateToProps = (state: any) => ({
  lessons: state.lessons,
  groups: state.groups,
});

const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(GroupScreen);
