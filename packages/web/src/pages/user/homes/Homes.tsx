import React, { useState } from "react";
import { IRouteProps } from "../../common/types/IRouteProps";
import { useAuth } from "../../../hooks/auth";
import { user_home } from "hive-link-common";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

function Homes(props: IRouteProps) {
  const auth = useAuth();
  const [homes, setHomes] = React.useState<user_home[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const location = useLocation();

  const layoutConfig = {
    titleBarHeight: 50
  }

  React.useEffect(() => {
    if (auth.user) {
      auth.user
        .getHomes()
        .then((homes) => {
          setHomes(homes);
        })
        .catch((err) => {
          setMessage(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [auth.user]);

  return (
    <>
      {message && <div>{message}</div>}
      {homes && !loading ? (
        <Box sx={{ width: "100%", height: "100%" }}>
          <Box id="homes-title-bar" sx={{height: `${layoutConfig.titleBarHeight}`,display: 'flex', justifyContent: "center"}}>
            <Typography variant="h5">Homes</Typography>
          </Box>
          <Box sx={{width: '100%', height:`calc(100% - ${layoutConfig.titleBarHeight})px`}}>
            {homes.length > 0 ? (
              <Grid container spacing={3}>
                {homes.map((home) => (
                  <Grid key={`homePreviewGridItem::${home.id}`} item xs={12} sm={6} md={4} lg={3} xl={2} sx={{}}>
                    <HomePreview
                      key={`homePreview::${home.id}`}
                      home={home}
                      route={props.path + "/" + home.id}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <p>No homes to display</p>
            )}

          </Box>
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

const HomePreview = (props: { home: user_home; route: string }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ border: "1.5px solid black", height: "100px" }}
      onClick={() => navigate(props.route)}
    >
      <div>{props.home.name}</div>
      <div>ID: {props.home.id}</div>
      <div>USER_ID: {props.home.user_id}</div>
      <div>address_id: {props.home.address_id}</div>
    </div>
  );
};

export default Homes;
