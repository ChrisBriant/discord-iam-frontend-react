import ChannelFeed from "./ChannelFeed";

const DashBoard = () => {
    return(
        <div className="dashBoard">
            <ChannelFeed />
            <div className="panel events"></div>
        </div>
    );
}

export default DashBoard;