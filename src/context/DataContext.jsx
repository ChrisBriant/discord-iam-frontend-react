import createDataContext from './createDataContext';

const defaultState = {
  channels : [],
  feed : [],
  selectedChannel : null,
  events : [],
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

const setFeed = (dispatch) => (data) => {
  dispatch({type:'setFeed', payload:data});
}

const setEvents = (dispatch) => (data) => {
  dispatch({type:'setEvents', payload:data});
}

export const {Provider, Context} = createDataContext (
    dataReducer,
    { setChannels,
      setSelectedChannel,
      setFeed,
      setEvents,
    },
    {...defaultState}
);