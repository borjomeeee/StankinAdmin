import React from "react";

import "./DateMiniCard.component.scss";

import Close from "@material-ui/icons/Close";

type IDateMiniCardComponent = {
  date: Date;

  onRemove?: () => void;
};

const DateMiniCardComponent = ({ date, onRemove }: IDateMiniCardComponent) => {
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  return (
    <div className="date-card">
      <div className="date-card__date">
        {`${day.length === 1 ? "0" : ""}${day}/${
          month.length === 1 ? "0" : ""
        }${month}`}
      </div>
      {onRemove && (
        <div className="date-card__remove" onClick={onRemove}>
          <Close style={{ fontSize: 16 }}/>
        </div>
      )}
    </div>
  );
};

export default DateMiniCardComponent;
