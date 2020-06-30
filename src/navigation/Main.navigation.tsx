import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import { IInitialState } from "../redux/store";

import MainScreen from "../screens/Main.screen";
import GroupScreen from "../screens/Group.screen";
import AuthScreen from "../screens/Auth.screen";

import CommonHeaderComponent from "../components/Header.component";

import ModalTemplate from "../templates/Modal.template";

const MainNavigation = ({ app }: ConnectedProps<typeof connector>) => {
  const [appModalErrorVisible, setAppModalVisible] = useState(false);

  useEffect(() => {
    setAppModalVisible(true);
  }, [app.error]);

  if (appModalErrorVisible && app.error !== "") {
    return (
      <ModalTemplate
        title="Ошибка!"
        onClose={setAppModalVisible.bind(null, false)}
      >
        <div className="modal-text">{app.error}</div>
      </ModalTemplate>
    );
  }

  if (!app.isAuth) {
    return <AuthScreen />;
  }

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

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainNavigation);
