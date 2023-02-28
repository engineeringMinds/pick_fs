import React, { useState } from 'react';
import { omit } from 'lodash';

function useForm(callback) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    event.persist();

    let name = event.target.name;
    let value = event.target.value;

    console.log(`this is handleChange= name: ${name}, value: ${value}`);

    validate(event, name, value);

    setValues({ ...values, [name]: value });
  }

  function validate(event, name, value) {
    // function to validate the values

    console.log(`this is validate= name: ${name}, value: ${value}`);

    switch (name) {
      case 'email':
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value) &&
          !new RegExp(/^([+]\d{2})?\d{10}$/).test(value)
        ) {
          setErrors({
            ...errors,
            email: 'Enter a valid email address or a registered mobile number',
          });
        } else {
          let newObj = omit(errors, 'email');
          setErrors(newObj);
        }
        break;
      case 'password':
        if (!new RegExp(/^.{8,}$/).test(value)) {
          setErrors({
            ...errors,
            password: 'Password should contains atleast 8 charaters',
          });
        } else {
          let newObj = omit(errors, 'password');
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      alert('There is an Error!');
    }
  };

  return { values, errors, handleChange, handleSubmit };
}

export default useForm;
