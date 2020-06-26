import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainScreen from "../screens/Main.screen";
import GroupScreen from "../screens/Group.screen";

import RightBarComponent from "../components/RightBar.component";
import CommonHeaderComponent from "../components/Header.component";
import { IInitialState } from "../redux/store";
import { downloadGroupsAction } from "../actions/Groups.actions";
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";

const MainNavigation = ({
  downloadGroups,
}: ConnectedProps<typeof connector>) => {
  useEffect(() => {
    downloadGroups();
  }, [downloadGroups]);

  return (
    <Router>
      <div className="content">
        <div className="screen">
          <CommonHeaderComponent />

          <Switch>
            <Route path="/group/:groupId" exact component={GroupScreen} />
            <Route path="/" exact component={MainScreen} />
          </Switch>
        </div>

        <RightBarComponent />
      </div>
    </Router>
  );
};

const mapStateToProps = (state: IInitialState) => ({});

const mapDispatchToProps = {
  downloadGroups: () => downloadGroupsAction(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainNavigation);
