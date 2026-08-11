import { Context as DataContext } from "../../context/AuthContext";
import { useContext } from "react";

const UsersPanel = () => {
    const {state:{users}} = useContext(DataContext);

    return (
        <div id="userPanel" className="panel">
            {
                users.map((user) => (
                    <div className="userItem">
                        <p>{user.userName}</p>
                    </div>
                ))
            }

        </div>
    );
}

export default UsersPanel;