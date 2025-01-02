import { Button } from "@mui/material"
import { useLogoutMutation } from "../api/authApi"

export const LogoutButton = () => {
    const [createLogoutMutation, {isLoading}] = useLogoutMutation()

    const clickHandler = () => {
        createLogoutMutation();
    }

    return (
        <Button onClick={clickHandler}>
            LogOut
        </Button>
    )
}
