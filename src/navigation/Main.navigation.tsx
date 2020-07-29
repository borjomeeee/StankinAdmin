import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import { IInitialState } from "../redux/store";

import MainScreen from "../screens/Main";
import GroupScreen from "../screens/Group";
import AuthScreen from "../screens/Auth";

import CommonHeaderComponent from "../components/Header";

import { downloadGroupsAction } from "../actions/Groups.actions";
import { clearErrorAction } from "../actions/App.actions";

import ModalTemplate from "../templates/Modal";

const MainNavigation = ({
  app,
  downloadGroups,
  clearError,
}: ConnectedProps<typeof connector>) => {
  useEffect(() => {
    if (app.isAuth) {
      downloadGroups(app.appKey);
    }
  }, [app.isAuth, downloadGroups, app.appKey]);

  return (
    <>
      {app.error.length > 0 && (
        <ModalTemplate title="Ошибка!" onClose={clearError.bind(null)}>
          <div className="modal-text">{app.error}</div>
        </ModalTemplate>
      )}

      <Router>
        {!app.isAuth ? (
          <AuthScreen />
        ) : (
          <div className="content">
            <div className="screen">
              <CommonHeaderComponent />

              <Switch>
                <Route path="/group/:groupId" exact>
                  <GroupScreen />
                </Route>
                <Route path="/" exact>
                  <MainScreen />
                </Route>
              </Switch>
            </div>
          </div>
        )}
      </Router>
    </>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
});

const mapDispatchToProps = {
  downloadGroups: (key: string) => downloadGroupsAction(key),
  clearError: () => clearErrorAction(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainNavigation);
