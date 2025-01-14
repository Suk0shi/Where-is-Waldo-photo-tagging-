import Loading from '../components/Loading'
import { useState } from 'react'
import beachImg from '../assets/images/beach.webp'
import skiImg from '../assets/images/ski-slopes.webp'
import trackImg from '../assets/images/track-and-field.webp'
import { useNavigate, Link } from "react-router-dom";
import '../styles/Games.css'


function Games() {
  const [backendAlert, setBackendAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function createToken(level) {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/startTimer`, {
        method: 'Post', 
        headers: {
        //   'Authorization': `${localStorage.getItem('SavedToken')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'level': level}),
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        
        return response.json();
      })
      .then((response) => {
        console.log(response)
        let token = response.token;
        localStorage.setItem("SavedToken", 'Bearer ' + token);
        localStorage.setItem("SavedLevel", response.level);
      })
      .then(() => {
        navigate('/level')
      })
      .catch((err) => {
        setLoading(false);
        setBackendAlert('*The backend is starting up. Please wait a moment before trying again; this may take up to 50 seconds.')
        console.log(err)
      });
    }

    return (
      <div className="backgroundBorderContainer">
        <div className='backgroundBorder'>
          <div className='pageContainer'>
            {loading ? 
              <Loading/>
              : 
              <>
                <h1>Select Level</h1>
                <div className="levelContainer">
                  <div className='levelCard'>
                    <h2>Beach</h2>
                      <div to="/level" onClick={() => createToken('beach')} onMouseOver={(e) => (e.currentTarget.style.cursor = 'pointer')}>
                          <img src={beachImg} alt="Link to start wheres waldo beach level" />
                      </div>  
                  </div>
                  <div className='levelCard'>
                    <h2>Ski Slopes</h2>
                      <div to="/level" onClick={() => createToken('ski')} onMouseOver={(e) => (e.currentTarget.style.cursor = 'pointer')}>
                          <img src={skiImg} alt="Link to start wheres waldo ski slopes level" />
                      </div>  
                  </div>
                  <div className='levelCard'>
                    <h2>Track and Field</h2>
                      <div to="/level" onClick={() => createToken('track')} onMouseOver={(e) => (e.currentTarget.style.cursor = 'pointer')}>
                          <img src={trackImg} alt="Link to start wheres waldo track and field level" />
                      </div>  
                  </div>
                </div>
                <div className='backendAlert'>{backendAlert}</div>
              </>
            }
          </div>
          <div className="pageLinks">
              <Link to="/">
                  Games
              </Link> 
              <Link to="/leaderboard">
                  Leaderboard
              </Link>
          </div>
        </div>
      </div>
    )
}

export default Games