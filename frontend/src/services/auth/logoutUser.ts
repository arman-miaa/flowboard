import { removeCookie } from "./tokenHandlers";

export const logoutUser = () => {
    removeCookie("accessToken");
    if (typeof window !== 'undefined') {
        localStorage.removeItem("flowboard_user");
        localStorage.removeItem("flowboard_token");
    }
};
