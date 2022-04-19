import { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const CheckOut = (props) => {
  const [formsInputValidty, setFormsInputValidty] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isFourChar = (value) => value.trim().length === 4;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = inputNameRef.current.value;
    const enteredStreet = inputStreetRef.current.value;
    const enteredPostal = inputPostalRef.current.value;
    const enteredCity = inputCityRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = isFourChar(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);

    setFormsInputValidty({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formsInputValidty.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formsInputValidty.street ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formsInputValidty.city ? "" : classes.invalid
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    formsInputValidty.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputNameRef} />
        {!formsInputValidty.name && <p>Please enter valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={inputStreetRef} />
        {!formsInputValidty.street && <p>Please enter valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={inputPostalRef} />
        {!formsInputValidty.postalCode && (
          <p>Please enter valid postal code!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={inputCityRef} />
        {!formsInputValidty.city && <p>Please enter valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
