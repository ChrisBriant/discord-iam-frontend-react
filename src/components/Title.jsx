import powerSword from '../assets/power_sword.png';

const Title = () => {
    return(
        <div id="title" className='panel'>
            <div className='head'>
                <h1>AIAM</h1>
                <h2>Power Sword</h2>
            </div>
            <div className="body">
                {/* <img id="powerSwordLogo" src={powerSword} className="img" alt="PowerSword Hero Image" /> */}
            </div>
            <div className='footer'>
                <h3>Secure the Keys to Your Kingdom</h3>
            </div>
        </div>
    )
}

export default Title;