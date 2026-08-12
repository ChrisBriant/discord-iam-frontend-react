import { useContext } from "react";
import { Context as DataContext } from "../../context/DataContext";

const ActionsSelect = ({actions}) => {
    const {setSelectedPanel} = useContext(DataContext);

    return (
        <div className="actionsList">
            <h3><strong>Actions</strong></h3>
                {
                    actions.map((action) => (
                        <div key={action} className="actionItem" onClick={() => setSelectedPanel(action)}>
                            <p>{action}</p>
                        </div>
                    ))
                }
        </div>
    );
}

export default ActionsSelect;