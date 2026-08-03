import { useContext } from "react";
import {Context as DataContext} from "../context/DataContext.jsx";


const ChannelList = () => {
    const {state:{channels,selectedChannel}} = useContext(DataContext);

    return(
        <div className="channelList">
            {
                channels.length > 0 && selectedChannel
                ? channels.map((ch) => (
                    <div key={ch.id} className={ch.id === selectedChannel.id ? "channelItem selected" : "channelItem" }>
                        <p  >{ch.name}</p>
                    </div>
                ))
                : <p>Loading...</p>
            }
        </div>
    );
}

export default ChannelList;