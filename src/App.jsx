import './App.css'
import Title from './components/Title';
import SideBar from './components/SideBar/SideBar';
import MainRoutes from './components/MainRoutes';

function App() {


  return (
    <div className='page'>
      <SideBar />
      <div className="content">
        <Title />
        <MainRoutes />
        {/* <div className="main">
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
        </div> */}
      </div>


    </div>
  )
}

export default App