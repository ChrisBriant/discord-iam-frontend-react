import createDataContext from './createDataContext';

const defaultState = {
  channels : [],
  feed : [],
  selectedChannel : null,
  events : [],
  users : [],
  roles : {
    data : [],
  },
  selectedPanel : null,
}

const dataReducer = (state,action) => {

  switch(action.type) {
    case 'setChannels':
      return {...state,channels:action.payload};
    case 'setSelectedChannel':
      return {...state,selectedChannel:action.payload};
    case 'setFeed':
      return {...state,feed:action.payload};
    case 'setEvents':
      return {...state,events:action.payload};
    case 'setUsers':
      return {...state,users:action.payload};
    case 'setRoles':
      return {...state,roles:action.payload};
    case 'setSelectedPanel':
      return {...state,selectedPanel:action.payload};
    default:
      return defaultState;
  }
};

//Setters

const setChannels = (dispatch) => (data) => {
  dispatch({type:'setChannels', payload:data});
}

const setSelectedChannel = (dispatch) => (data) => {
  dispatch({type:'setSelectedChannel', payload:data});
}

const setSelectedPanel = (dispatch) => (data) => {
  console.log("SETTING SELECTED PANEL", data);
  dispatch({type:'setSelectedPanel', payload:data});
}

const setFeed = (dispatch) => (data) => {
  dispatch({type:'setFeed', payload:data});
}

const setEvents = (dispatch) => (data) => {
  dispatch({type:'setEvents', payload:data});
}

const setUsers = (dispatch) => (data) => {
  dispatch({type:'setUsers', payload:data});
}

const setRoles = (dispatch) => (data) => {
  dispatch({type:'setRoles', payload:data});
}

export const {Provider, Context} = createDataContext (
    dataReducer,
    { setChannels,
      setSelectedChannel,
      setFeed,
      setEvents,
      setUsers,
      setSelectedPanel,
    },
    {...defaultState}
);