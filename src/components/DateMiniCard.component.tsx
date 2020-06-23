import React from "react";

import "./DateMiniCard.component.scss";

type IDateMiniCardComponent = {
  date: Date;
};

const DateMiniCardComponent = ({ date }: IDateMiniCardComponent) => {
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  return (
    <div className="date-card">
      <div className="date-card__date">
        {`${day.length === 1 ? "0" : ""}${day}/${
          month.length === 1 ? "0" : ""
        }${month}`}
      </div>
    </div>
  );
};

export default DateMiniCardComponent;
