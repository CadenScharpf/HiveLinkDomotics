import React from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import { Box, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  HomeSchema,
  INewHome,
  user_address,
  user_home,
} from "hive-link-common";
import axios from "axios";
import { set } from "lodash";
import { useNavigate } from "react-router-dom";
import NewAddress from "../address/NewAddress";
import { useAuth } from "../../../common/hooks/auth";
import AddIcon from "@mui/icons-material/Add";

function NewHomePage(props: IRouteProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [addresses, setAddresses] = React.useState<user_address[]>();
  const auth = useAuth();
  const [addressModalOpen, setAddressModalOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (auth.user) {
      auth.user.getAddresses().then((addresses) => {
        setAddresses(addresses);
      });
    }
  }, [auth.user]);
  const navigate = useNavigate();

  const handleSubmit = (formValue: INewHome) => {
    if (formValue.address_id === -1) {
      formValue.address_id = null;
    } else if (typeof formValue.address_id === "string") {
      formValue.address_id = parseInt(formValue.address_id);
    }
    auth.user &&
      auth.user
        .addHome(formValue)
        .then((home) => {
          console.log(home);
          navigate(`/user/homes/${home.id}`);
        })
        .catch((error) => {
          setMessage(error.message);
          console.log(error);
        });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Modal
        open={addressModalOpen}
        onClose={
          () => {
            setAddressModalOpen(false);
            auth.user?.getAddresses().then((addresses) => {
              setAddresses(addresses);
            });
          }
          //refresh addresses
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "75%",
            height: "75%",
            maxHeight: "1000px",
            maxWidth: "1000px",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            background: "white",
          }}
        >
          <NewAddress />
        </Box>
      </Modal>
      <AddHomeIcon sx={{ fontSize: "150px" }} />
      <Typography variant="h3">New Home</Typography>
      {message && <Typography variant="h5">{message}</Typography>}
      <Formik
        initialValues={{ name: "", address_id: -1 }}
        validationSchema={HomeSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Box className="form-group">
            <Typography component="label" htmlFor="name">
              Name*:
            </Typography>
            <Field name="name" type="text" placeholder="Beach House" />
            <ErrorMessage
              name="name"
              component="div"
              className="alert alert-danger"
            />
          </Box>
          <Box className="form-group">
            <Typography component="label" htmlFor="address_id">
              Address:
            </Typography>
            <Field name="address_id" as="select">
              <option>Select an address</option>
              {addresses &&
                addresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.address_line1}
                  </option>
                ))}
            </Field>
            <Tooltip title="Add a new address">
              <IconButton onClick={() => setAddressModalOpen(true)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
}

export default NewHomePage;
