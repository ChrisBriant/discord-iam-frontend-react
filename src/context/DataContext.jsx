import createDataContext from './createDataContext';

const defaultState = {
  channels : [],
}

const dataReducer = (state,action) => {

  switch(action.type) {
    case 'setChannels':
      return {...state,currentPlayerTurn:action.payload};
    default:
      return defaultState;
  }
};

//Setters

const setChannels = (dispatch) => (data) => {
  dispatch({type:'setChannels', payload:data});
}

export const {Provider, Context} = createDataContext (
    dataReducer,
    { setChannels,},
    {...defaultState}
);