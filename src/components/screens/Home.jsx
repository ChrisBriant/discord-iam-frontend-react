import { useState, useEffect, useContext } from 'react'
import { getIdpList, getSession, refresh } from '../../auth/auth'
import AuthenticatedDisplay from '../AuthenticatedDisplay';
import SignInDisplay from '../SignInDisplay';
import TermsAndConditions from '../TermsAndConditions';
import Banner from '../Banner';
import Title from '../Title';
import {Context as AuthContext} from '../../context/AuthContext';
import SideBar from '../SideBar/SideBar';
import DashBoard from "../dashPanels/DashBoard";

const Home = () => {
    const [loadingSession, setLoadingSession] = useState(true);
    const [idps, setIdps] = useState([]);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackSubmittedError, setFeedbackSubmittedError] = useState(false);
    const [sessionRefresh,setSessionRefresh] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const {state:{profile,eligibleRoles,activeRoles,authenticated}, setProfile, setAuthenticated,setActiveRoles, setEligibleRoles } = useContext(AuthContext);

    //Function to set the profile and roles
    const setProfileAndRoles = (profile) => {
      let eligRoles = [];
      let roles = [];
      
      if(profile.user_data.eligible_roles_association) {
        eligRoles = profile.user_data.eligible_roles_association;
      }
      if(profile.user_data.roles) {
        roles = profile.user_data.roles;
      }
      setProfile(profile);
      setActiveRoles(roles);
      setEligibleRoles(eligRoles);
    }

    useEffect(() => {
        getSession().then((res) => {
            //Set loaded, profile and authenticated 
            setProfile(res);
            setProfileAndRoles(res);
            setLoadingSession(false);
            setAuthenticated(true);
        }).catch(err => {
        console.log("ERR", err);
        if(err.message === "Network Error") {
            console.log("THERE IS  A NETWORK ERR");
            setErrorMessage("There is a network error, please try again later.");
            return;
        }
        if(err.response.status === 401) {
            //Try refresh
            refresh().then( async (res) => {
                const profile = await getSession();

                console.log("HERE IS THE PROFILE", profile);
                setProfileAndRoles(profile);

                setLoadingSession(false);
                setAuthenticated(true);
            }).catch(async err => {
            if(err.response.status === 401) {
                //Re-authentication required
                setLoadingSession(false);
                setAuthenticated(false);
                //Authentication has failed so the user needs to sign in
                try {
                const idpList = await getIdpList();
                setIdps(idpList);
                } catch(err) {
                console.error("An error occurred retrieving the IDP list.", err);
                }

            }
            });
        }
        });
    }, [sessionRefresh])



    const handleSignIn = (logonUrl) => {
        window.location.href = logonUrl;
    }

    const onSignOut = async () => {
        //Set the IDP list
        try {
        const idpList = await getIdpList();
        setIdps(idpList);
        } catch(err) {
        console.error("An error occurred retrieving the IDP list.", err);
        }

        setAuthenticated(false);
        setLoadingSession(false);
        setProfile(null);
    }

    return(
        <div className="main">
          {
            errorMessage === ""
            ? loadingSession
              ? <p>Loading...</p>
              : <>
                {
                  authenticated
                  ? <> 
                    {
                      profile?.accepted_terms
                      ? <DashBoard />
                      : <TermsAndConditions setSessionRefresh={setSessionRefresh} />
                    }
                  
                  </>
                  : <SignInDisplay handleSignIn={handleSignIn} idps={idps} />
                }
              </> 
            : <p className='error'>{errorMessage}</p>
          }
        </div>
    );
}

export default Home;