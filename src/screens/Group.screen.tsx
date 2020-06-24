import React from "react";
import { connect } from "react-redux";

import "./Group.screen.scss";

import { Location } from "history";
import { useLocation } from "react-router-dom";

import { IGroup } from "./Main.screen";

import GroupFilterBarComponent from "../components/GroupFilterBar.component";
import GroupLessonCardComponent from "../components/GroupLessonCard.component";

import { TypeLessonType, TypeStudentGroup } from "../utils/enums";

import { ILessonTime, LessonTime } from "../models/LessonTime.model";
import EditRemoveHOC from "../HOCs/EditRemove.HOC";

export type ILesson = {
  id: number;
  title: string;
  teacher: string;
  type: TypeLessonType;
  dates: Date[];
  time: ILessonTime;
  place: string;
  studentGroup: TypeStudentGroup;
  groupId: number;
};

const lessons: ILesson[] = [
  {
    id: 1,
    title: "Технологии программирования",
    teacher: "Иванов Иван Иванович",
    type: TypeLessonType.LECTURE,
    dates: [
      new Date(2020, 6, 23),
      new Date(2020, 6, 22),
      new Date(2020, 6, 21),
    ],
    time: new LessonTime(1),
    place: "0101",
    studentGroup: TypeStudentGroup.NONE,
    groupId: 1,
  },
  {
    id: 2,
    title: "Политология",
    teacher: "Саркисова Валерия Петровна",
    type: TypeLessonType.LAB,
    dates: [
      new Date(2020, 5, 23),
      new Date(2020, 5, 22),
      new Date(2020, 5, 21),
    ],
    time: new LessonTime(2),
    place: "0101",
    studentGroup: TypeStudentGroup.A,
    groupId: 1,
  },
  {
    id: 3,
    title: "Архитектура ЭВМ",
    teacher: "Мурашкин Денис Дмитриевич",
    type: TypeLessonType.SEMINAR,
    dates: [new Date(2020, 6, 1), new Date(2020, 6, 2), new Date(2020, 6, 3)],
    time: new LessonTime(3),
    place: "0101",
    studentGroup: TypeStudentGroup.B,
    groupId: 1,
  },
];

type IGroupScreenLocationState = {
  group: IGroup;
};

const GroupScreen = () => {
  const location: Location = useLocation();
  const group = (location.state as IGroupScreenLocationState).group;

  const GroupLessons = () => (
    <div className="group__lessons">
      {lessons.map((item: ILesson) => (
        <div className="group-lesson">
          <EditRemoveHOC
            onEdit={() => console.log("Edit lesson: ", item.id)}
            onRemove={() => console.log("Remove lesson: ", item.id)}
          >
            <GroupLessonCardComponent key={item.id} lesson={item} />
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
});

const mapDsipatchToProps = null;

export default connect(mapStateToProps, mapDsipatchToProps)(GroupScreen);
