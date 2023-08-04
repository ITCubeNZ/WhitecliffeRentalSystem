import React from "react";
import { useEffect, useState } from "react";
import "../App.css";

const Login = () => {
  const initialValues = { name: "", mailAddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    //console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //send login information
    //Validation check
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    //if sent without error.
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    } else {
    }
  }, [formErrors]);

  //Validation check
  const validate = (values) => {
    const errors = {};
    //Single-byte alphanumeric characters only (empty characters OK)
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    //If the value is empty, put it in the errors array.
    if (!values.name) {
      errors.name = "Please enter your name.";
    }
    if (!values.mailAddress) {
      errors.mailAddress = "Please enter your e-mail address";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Please enter your password";
    } else if (values.password.length < 4) {
      errors.password = "Please enter a password between 4 and 15 characters";
    } else if (values.password.length > 15) {
      errors.password = "Please enter a password between 4 and 15 characters";
    }
    return errors;
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" value={formValues.name} onChange={(e) => handleChange(e)} />
          </div>
          <p className="errorMsg">{formErrors.name}</p>
          <div className="formField">
            <label>Email Address</label>
            <input type="text" name="mailAddress" placeholder="Email" value={formValues.mailAddress} onChange={(e) => handleChange(e)} />
          </div>
          <p className="errorMsg">{formErrors.mailAddress}</p>

          <div className="formField">
            <label>Password</label>
            <input type="text" name="password" placeholder="Password" value={formValues.password} onChange={(e) => handleChange(e)} />
          </div>
          <p className="errorMsg">{formErrors.password}</p>
          <button className="submitButton">Submit</button>
          {Object.keys(formErrors).length === 0 && isSubmit && <div className="msgOk">Login Successful</div>}
        </div>
      </form>
    </div>
  );
};

export default Login;
