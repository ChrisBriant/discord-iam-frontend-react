import { useContext } from "react";
import {Context as DataContext} from "../context/DataContext.jsx";


const ChannelList = () => {
    const {state:{channels}} = useContext(DataContext);

    return(
        <div className="channelList">
            {
                channels.length > 0
                ? channels.map((ch) => (
                    <div key={ch.id}>
                        <p className="channelItem">{ch.name}</p>
                    </div>
                ))
                : <p>Loading...</p>
            }
        </div>
    );
}

export default ChannelList;