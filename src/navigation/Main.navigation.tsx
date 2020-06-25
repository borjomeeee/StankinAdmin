import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainScreen from "../screens/Main.screen";
import GroupScreen from "../screens/Group.screen";

import RightBarComponent from "../components/RightBar.component";
import CommonHeaderComponent from "../components/Header.component";

const MainNavigation = () => {
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

export default MainNavigation;
