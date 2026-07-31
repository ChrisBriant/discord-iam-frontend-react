import createDataContext from './createDataContext';

const defaultState = {
  profile : null,
  eligibleRoles: [],
  activeRoles : [],
}

const dataReducer = (state,action) => {

  switch(action.type) {
    case 'setProfile':
      console.log("SET PROFILE", action.payload)
      return {...state,profile:action.payload};
    case 'setEligibleRoles':
      return {...state,eligibleRoles:action.payload};
    case 'setActiveRoles':
      return {...state,activeRoles:action.payload};
    default:
      return defaultState;
  }
};

//Setters

const setProfile = (dispatch) => (data) => {
  dispatch({type:'setProfile', payload:data});
}

const setActiveRoles = (dispatch) => (data) => {
  dispatch({type:'setActiveRoles', payload:data});
}

const setEligibleRoles = (dispatch) => (data) => {
  dispatch({type:'setEligibleRoles', payload:data});
}

export const {Provider, Context} = createDataContext (
    dataReducer,
    { setProfile, setActiveRoles, setEligibleRoles},
    {...defaultState}
);