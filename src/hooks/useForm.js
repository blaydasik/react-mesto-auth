import { useState } from "react";

export function useForm(inputValues) {

  const [values, setValues] = useState(inputValues);

  function handleChange(evt) {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}