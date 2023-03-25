import Navigation from "../../navigation/Navigation";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
    return( 
        <>
        <Navigation />
        <Outlet />
        </>
    )
}

export default LayoutMain;