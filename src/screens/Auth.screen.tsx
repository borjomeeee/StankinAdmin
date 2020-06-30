import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import "./Auth.screen.scss";

import LabeledInputComponent from "../components/LabeledInput.component";
import ButtonComponent from "../components/Button.component";
import { checkAdminKeyAction } from "../actions/App.actions";

const AuthScreen = ({ checkKey }: ConnectedProps<typeof connector>) => {
  const [keyInputValue, setKeyInputValue] = useState("");

  const onSubmitAuth = () => {
    checkKey(keyInputValue);
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__title">Введите ключ:</div>

        <div className="auth__input">
          <LabeledInputComponent
            label="Ключ"
            value={keyInputValue}
            onChange={setKeyInputValue}
          />
        </div>

        <div className="auth__submit">
          <ButtonComponent label="Войти" onClick={onSubmitAuth} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  checkKey: (key: string) => checkAdminKeyAction(key),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AuthScreen);
