import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Main.screen.scss";

import { IGroupsInitialState } from "../redux/store";

import MainFilterBar from "../components/MainFilterBar.component";
import MainGroupComponent from "../components/MainGroup.component";

import EditRemoveHOC from "../HOCs/EditRemove.HOC";

import { IGroup } from "../models/Group.model";

type IMainScreen = {
  groups: IGroupsInitialState;
};

const MainScreen = ({ groups }: IMainScreen) => {
  const MainGroups = () => (
    <div className="main__groups">
      {groups.map((group: IGroup) => (
        <EditRemoveHOC
          key={group.id}
          onEdit={() => console.log(`Edit group: ${group.id}`)}
          onRemove={() => console.log(`Remove group: ${group.id}`)}
        >
          <Link
            to={{
              pathname: `/group/${group.id}`,
              state: { group },
            }}
          >
            <MainGroupComponent
              props={{
                onClick: () => console.log(`Touched group: ${group.id}`),
              }}
              title={group.title}
            />
          </Link>
        </EditRemoveHOC>
      ))}
    </div>
  );
  return (
    <div className="main">
      <div className="filters">
        <MainFilterBar />
      </div>

      <div className="content main__content">
        <MainGroups />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  groups: state.groups,
});

const mapDsipatchToProps = null;

export default connect(mapStateToProps, mapDsipatchToProps)(MainScreen);
