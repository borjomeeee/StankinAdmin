import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import "./style.scss";

import { IInitialState } from "../../redux/store";

import LabeledInputComponent from "../../components/LabeledInput";
import ButtonComponent from "../../components/Button";

import { checkAdminKeyAction } from "../../actions/App.actions";

import CircularProgress from "@material-ui/core/CircularProgress";

const AuthScreen = ({ app, checkKey }: ConnectedProps<typeof connector>) => {
  const [keyInputValue, setKeyInputValue] = useState("");

  const onSubmitAuth = () => {
    checkKey(keyInputValue);
  };

  if (app.isLoading) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__title">Введите ключ:</div>

        <div className="auth__input">
          <LabeledInputComponent
            label="Ключ"
            value={keyInputValue}
            onChangeValue={setKeyInputValue}
          />
        </div>

        <div className="auth__submit">
          <ButtonComponent label="Войти" onClick={onSubmitAuth} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
});

const mapDispatchToProps = {
  checkKey: (key: string) => checkAdminKeyAction(key),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AuthScreen);
