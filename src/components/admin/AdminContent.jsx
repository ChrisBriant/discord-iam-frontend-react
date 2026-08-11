import { useContext } from "react";
import { Context as DataContext } from "../../context/DataContext";
import UsersPanel from "../dashPanels/UsersPanel";
import RolesPanel from "../dashPanels/RolesPanel";

const AdminContent = () => {
    const {state:{selectedPanel}} = useContext(DataContext);

    const getConsoleToDisplay = () => {
        switch(selectedPanel) {
            case 'users' :
                return <UsersPanel />;
            case 'roles' :
                return <RolesPanel />;
            default :
                return null;
        } 
    }

    return(
        <div id="adminContent">
            {
                getConsoleToDisplay()
            }
        </div>
    )
}

export default AdminContent;