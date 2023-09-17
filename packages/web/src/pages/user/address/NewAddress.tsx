import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddressSchema, INewAddress } from "hive-link-common";
import React from "react";
import { useAuth } from "../../../hooks/auth";
import { set } from "lodash";

function NewAddress() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const auth = useAuth();
  const handleSubmit = (formValue: INewAddress) => {
    formValue.mobile = isMobile
      ? formValue.telephone
      : formValue.mobile === ""
      ? null
      : formValue.mobile;
    formValue.address_line2 = formValue.address_line2 === "" ? null : formValue.address_line2;
    setLoading(true);
    auth.user &&
      auth.user
        .addAddress(formValue)
        .then((address) => {
          setLoading(false);
          setMessage("success");
        })
        .catch((error) => {
          setLoading(false);
          setMessage(error.message);
          console.log(error);
        });
  };
  return (
    <Box sx={{ overflow: "scroll" }}>
      {message && (
        <Box
          className={
            message === "success" ? "alert alert-success" : "alert alert-danger"
          }
        >
          <Typography variant="body1">
            {message === "success" ? "Adress Created" : message}
          </Typography>
        </Box>
      )}
      <Typography variant="h4">New Address</Typography>
      <Formik
        initialValues={{
          address_line1: "",
          address_line2: "",
          city: "",
          postal_code: "",
          country: "",
          telephone: "",
          mobile: "",
        }}
        validationSchema={AddressSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Box className="form-group">
            <Typography component="label" htmlFor="address_line1">
              Address Line 1*:
            </Typography>
            <Field
              name="address_line1"
              type="text"
              placeholder="123 Main St."
            />
            <ErrorMessage
              name="address_line1"
              component="div"
              className="alert alert-danger"
            />
          </Box>

          <Box className="form-group">
            <Typography component="label" htmlFor="address_line2">
              Address Line 2:
            </Typography>
            <Field name="address_line2" type="text" placeholder="Apt. 1" />
            <ErrorMessage
              name="address_line2"
              component="div"
              className="alert alert-danger"
            />
          </Box>

          <Box className="form-group">
            <Typography component="label" htmlFor="city">
              City*:
            </Typography>
            <Field name="city" type="text" placeholder="San Diego" />
            <ErrorMessage
              name="city"
              component="div"
              className="alert alert-danger"
            />
          </Box>

          <Box className="form-group">
            <Typography component="label" htmlFor="postal_code">
              Postal Code*:
            </Typography>
            <Field name="postal_code" type="text" placeholder="92109" />
            <ErrorMessage
              name="postal_code"
              component="div"
              className="alert alert-danger"
            />
          </Box>

          <Box className="form-group">
            <Typography component="label" htmlFor="country">
              Country*:
            </Typography>
            <Field name="country" type="text" placeholder="USA" />
            <ErrorMessage
              name="country"
              component="div"
              className="alert alert-danger"
            />
          </Box>

          <Box className="form-group">
            <Typography component="label" htmlFor="telephone">
              Telephone:
            </Typography>
            <Field name="telephone" type="text" placeholder="555-555-5555" />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isMobile}
                  onChange={() => setIsMobile(!isMobile)}
                />
              }
              label="Mobile"
            />
            <ErrorMessage
              name="telephone"
              component="div"
              className="alert alert-danger"
            />
          </Box>

          {!isMobile && (
            <Box className="form-group">
              <Typography component="label" htmlFor="mobile">
                Mobile:
              </Typography>
              <Field name="mobile" type="text" placeholder="555-555-5555" />
              <ErrorMessage
                name="mobile"
                component="div"
                className="alert alert-danger"
              />
            </Box>
          )}

          <Box className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              <span>Submit</span>
            </button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
}

export default NewAddress;
