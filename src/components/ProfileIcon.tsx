import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const ProfileIcon = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();

    return (
        <React.Fragment>
        <Tooltip title="Account settings">
            <IconButton onClick={() => navigate("/profile")} sx={{ ml: 2, '&:focus': { outline: 'none'} }} >
            <Avatar alt={user?.name} src={user?.picture} />
            </IconButton>
        </Tooltip>
        </React.Fragment>
    );
};

export default ProfileIcon;