import React from "react";
import { connect } from "react-redux";

import { Location } from "history";
import { useLocation } from "react-router-dom";

import { IGroup } from "./Main.screen";
import GroupFilterBarComponent from "../components/GroupFilterBar.component";

type IGroupScreenLocationState = {
  group: IGroup;
};

const GroupScreen = () => {
  const location: Location = useLocation();
  const group = (location.state as IGroupScreenLocationState).group;

  return (
    <div className="group">
      <div className="filters">
        <GroupFilterBarComponent label={group.title} />
      </div>
      <div className="content group__content"></div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  lessons: state.lessons,
});

const mapDsipatchToProps = null;

export default connect(mapStateToProps, mapDsipatchToProps)(GroupScreen);
