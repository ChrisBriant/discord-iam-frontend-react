const TabMenu = ({menuButtons}) => {
    return (
        <div className="tabMenu">
            {
                menuButtons.map((button, idx) => (
                    <button 
                        key={idx} 
                        className="btn"
                        onClick={button.onClick}
                    >
                        {button.name}
                    </button>
                ))
            }
        </div>
    )
}

export default TabMenu;