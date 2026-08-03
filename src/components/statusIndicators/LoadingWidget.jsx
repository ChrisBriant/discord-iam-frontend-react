const LoadingWidget = (props) => {
  return (
    <div className="spin-container">
        <div className="spin lds-dual-ring"></div>
        {
          props.message
          ? <p className="center-text">{ props.message }</p>
          : <p className="center-text">Loading, please wait...</p>
        }
    </div>
  );
}

export default LoadingWidget;