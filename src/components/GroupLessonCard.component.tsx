import React from "react";

import "./GroupLessonCard.component.scss";

import DateMiniCardComponent from "./DateMiniCard.component";

import { TypeStudentGroup } from "../utils/enums";

import { ILesson } from "../models/Lesson.model";

type IGroupLessonCardComponent = {
  lesson: ILesson;
};

const GroupLessonCardComponent = ({ lesson }: IGroupLessonCardComponent) => {
  return (
    <div className="group-lesson__container">
      <div className="group-lesson__time">
        <div className="group-lesson__start-at">{lesson.time.startAt}</div>
        <div className="group-lesson__end-at">{lesson.time.endAt}</div>
      </div>
      <div className="group-lesson__main">
        <div className="group-lesson__type">{lesson.type}</div>
        <div className="group-lesson__title">{lesson.title}</div>
        <div className="group-lesson__place">{lesson.place}</div>
        <div className="group-lesson__teacher">{lesson.teacher}</div>
      </div>
      <div className="group-lesson__dates dates">
        <div className="dates__label">Даты</div>
        <div className="dates__container">
          {lesson.dates.map((item: Date, index: number) => (
            <DateMiniCardComponent key={index} date={item} />
          ))}
        </div>
      </div>

      {lesson.studentGroup !== TypeStudentGroup.NONE && (
        <div className="group-lesson__student-group">{lesson.studentGroup}</div>
      )}
    </div>
  );
};

export default GroupLessonCardComponent;
