const ActionsSelect = ({actions}) => {
    console.log("ACTIONS SELECT", actions);

    return (
        <div className="actionsList">
            <h3><strong>Actions</strong></h3>
                {
                    actions.map((action) => (
                        <div key={action} className="actionItem">
                            <p>{action}</p>
                        </div>
                    ))
                }
        </div>
    );
}

export default ActionsSelect;