import { useState } from "react";

const useDefaultInput = (
  defaultValue: string,
  isRequired: boolean = true
): [string, string, (value: string) => void, () => boolean] => {
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

  return [inputValue, inputError, onChangeInputValue, checkValidInputValue];
};

export default useDefaultInput;
