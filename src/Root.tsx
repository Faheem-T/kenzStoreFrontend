import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    selectUser,
    userLoggedIn,
} from "./app/features/auth/authSlice";
import { useEffect } from "react";
import { useMeQuery, useRefreshQuery } from "./app/api/authApi";
import { Navbar } from "./app/components/Navbar";
import { Box } from "@mui/material";

const Root = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    // Initial api call that attempt to
    // fetch accessToken and user object
    const { data: meData } = useMeQuery();

    useEffect(() => {
        if (!user) {
            if (meData) {
                const { user, accessToken } = meData.data;
                dispatch(userLoggedIn({ user, accessToken }));
            } else {
                console.log("request to /auth/me failed");
            }
        }
    }, [user, meData]);

    return (
        <>
            <Navbar />
            <Box sx={{ paddingX: 12 }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Root;
