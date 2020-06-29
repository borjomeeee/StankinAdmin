import { useState } from "react";

const useDefaultInput = (
  defaultValue: string,
  isRequired: boolean = true
): [
  string,
  string,
  (error: string) => void,
  (value: string) => void,
  () => boolean
] => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [inputError, setInputError] = useState("");

  const onChangeInputValue = (value: string) => {
    if (inputError) {
      setInputError("");
    }
    setInputValue(value);
  };

  const checkValidInputValue = () => {
    if (!isRequired) return true;

    if (inputValue === "") {
      setInputError("Поле не должно быть пустым");
      return false;
    }
    return true;
  };

  const setErrorInput = (error: string) => {
    setInputError(error);
  };

  return [
    inputValue,
    inputError,
    setErrorInput,
    onChangeInputValue,
    checkValidInputValue,
  ];
};

export default useDefaultInput;
