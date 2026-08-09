import createDataContext from './createDataContext';

const defaultState = {
  profile : null,
  eligibleRoles: [],
  activeRoles : [],
  authenticated : false,
  //Defines what the roles give access to in the front end
  roleDefinitions : {
    "Event Manager" : {
      actions : ["events"]
    },
    "Event Administrator" : {
        actions : ["events"]
    },
    "Channel Manager" : {
        actions : ["channels"]
    },
    "User Manager" : {
        actions : ["users"]
    },
    "Role Manager" : {
        actions : ["roles"]
    },
  },
  //For handling what actions the user is able to do
  availableActions : [],
}

function getActionsForRoles(userRoles) {
  const actions = userRoles.flatMap(role => defaultState.roleDefinitions[role]?.actions || []);
  return [...new Set(actions)];
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
      //Process the actions the user has available based on their active roles
      const activeRoleNames = action.payload.map((r) => r.name);
      const availableActions = getActionsForRoles(activeRoleNames);
      console.log("AVAILABLE ACTIONS", availableActions)
      return {...state,activeRoles:action.payload,availableActions:availableActions};
    case 'setAuthenticated':
      console.log("SETTING AUTHENTICATED", action.payload);
      return {...state,authenticated:action.payload};
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

const setAuthenticated = (dispatch) => (data) => {
  dispatch({type:'setAuthenticated', payload:data});
}

export const {Provider, Context} = createDataContext (
    dataReducer,
    { setProfile, setActiveRoles, setEligibleRoles,setAuthenticated},
    {...defaultState}
);