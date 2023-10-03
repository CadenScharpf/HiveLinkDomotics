import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { INewRoom, RoomSchema } from "hive-link-common";
import React from "react";
import { useHomeData } from "../Home";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CancelIcon from '@mui/icons-material/Cancel';
export const schema: yup.ObjectSchema<INewRoom> = yup.object({
  name: yup
    .string()
    .min(2, "Too short")
    .max(50, "Too Long")
    .defined("Name is required"),
});

function NewRoomPage() {
  const home = useHomeData();
  const [state, setState] = React.useState<{
    successful: boolean;
    message: string;
  }>({ successful: false, message: "" });

  const handleSubmit = (formValue: INewRoom) => {
    console.log("asdf");
    home
      .createRoom(formValue)
      .then((res) => {
        setState({ successful: true, message: "" });
      })
      .catch((err) => {
        setState({ successful: false, message: err.message });
      });
  };
  if (state.successful) {
    return <CheckCircleIcon sx={{ color: "green" }} />;
  } else if (state.message) {
    return (
        <Box sx={{display: 'flex', alignItems: "center", height: 'auto', maxHeight: '50px'}}><Typography color="red"variant="body1">{state.message}</Typography>
        <IconButton sx={{height: '2rem', color: 'red'}} onClick={() => setState({ successful: false, message: "" })}>
            <CloseIcon />
        </IconButton></Box>
        
    );
  } else {
    return (
      <Formik
        initialValues={{ name: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
         {({ errors, touched }) => (
        <Form>
          <Field style={{border: `1px solid ${(errors.name && touched.name)? "red":"black"}`}}name="name" type="text" placeholder="Room Name" />
          <IconButton type="submit"><ArrowOutwardIcon sx={{color: 'green'}}/></IconButton>
        </Form>
        )}
      </Formik>
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default NewRoomPage;
