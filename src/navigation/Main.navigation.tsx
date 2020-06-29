import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import MainScreen from "../screens/Main.screen";
import GroupScreen from "../screens/Group.screen";

import CommonHeaderComponent from "../components/Header.component";

import { downloadGroupsAction } from "../actions/Groups.actions";

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
            <Route path="/" exact>
              <MainScreen />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  downloadGroups: () => downloadGroupsAction(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainNavigation);
