import createDataContext from './createDataContext';

const defaultState = {
  profile : null,
  eligibleRoles: [],
  activeRoles : [],
}

const dataReducer = (state,action) => {

  switch(action.type) {
    case 'setProfile':
      let eligRoles = [];
      let roles = [];

      if(action.payload.user_data.eligible_roles_association) {
        eligRoles = action.payload.user_data.eligible_roles_association;
      }
      if(action.payload.user_data.roles) {
        roles = action.payload.user_data.roles;
      }
      return {...state,
        profile:action.payload,
        eligibleRoles : eligRoles,
        activeRoles : roles
      };
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