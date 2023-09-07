import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "yup-phone";

import { IRegisterRes, IUser } from "hive-link-common";
import AuthService from "../../services/auth.service";
import { INewUser } from "hive-link-common";
import { useAuth } from "../../hooks/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";

const PHONE_NO_REGEX = /^[0-9\- ]{8,14}$/;

const Register: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const auth = useAuth();
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: INewUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .test(
        "len",
        "The first name must be between 3 and 20 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    lastName: Yup.string()
      .test(
        "len",
        "The last name must be between 3 and 20 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
    /* telephone: Yup.string()
      .matches(PHONE_NO_REGEX, "Phone number is not valid")
      .required("This field is required!"), */
  });

  const handleRegister = (formValue: INewUser) => {
    auth
      .register(formValue)
      .then((response) => {
        setSuccessful(true);
        navigate("/user/profile");
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName"> First Name </label>
                  <Field
                    name="firstName"
                    type="text"
                    className="form-control"
                    val=""
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName"> Last Name </label>
                  <Field
                    name="lastName"
                    type="text"
                    className="form-control"
                    val=""
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                {/* <div className="form-group">
                  <label htmlFor="telephone"> Telephone </label>
                  <Field
                    name="telephone"
                    type="tel"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="telephone"
                    component="div"
                    className="alert alert-danger"
                  />
                </div> */}

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
