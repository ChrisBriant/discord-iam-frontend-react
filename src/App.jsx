import { useState, useEffect, useContext } from 'react'
import './App.css'
import { getIdpList, getSession, refresh } from './auth/auth'
import AuthenticatedDisplay from './components/AuthenticatedDisplay';
import SignInDisplay from './components/SignInDisplay';
import TermsAndConditions from './components/TermsAndConditions';
import Banner from './components/Banner';
import Title from './components/Title';
import {Context as AuthContext} from './context/AuthContext';

function App() {
  const [loadingSession, setLoadingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  //const [profile, setProfile] = useState(null);
  const [idps, setIdps] = useState([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSubmittedError, setFeedbackSubmittedError] = useState(false);
  const [sessionRefresh,setSessionRefresh] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const {state:{profile,eligibleRoles,activeRoles}, setProfile } = useContext(AuthContext);


  useEffect(() => {
    getSession().then((res) => {
      //Set loaded, profile and authenticated 
      setProfile(res);
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
            setProfile(profile);
            console.log("HERE IS THE PROFILE", profile);
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


  return (
    <div className='page'>
      <div className="sideBar">
        
      </div>
      <div className="content">
        <Title />
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
                      ? <div className="dashboard">

                      </div>
                      : <TermsAndConditions setSessionRefresh={setSessionRefresh} />
                    }
                  
                  </>
                  : <SignInDisplay handleSignIn={handleSignIn} idps={idps} />
                }
              </> 
            : <p className='error'>{errorMessage}</p>
          }
        </div>
      </div>


    </div>
  )
}

export default App