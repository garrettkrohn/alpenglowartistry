import { useState } from "react";
import React from "react";

const useInput = (validateValue: Function) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const setValue = (value: string) => {
    setEnteredValue(value);
  };

  return {
    value: enteredValue,
    valueChangeHandler,
    inputBlurHandler,
    hasError,
    isValid: valueIsValid,
    reset,
    setValue,
  };
};

export default useInput;
