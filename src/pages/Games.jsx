import Header from '../components/Header'
import { useState } from 'react'
import beachImg from '../assets/images/beach.webp'
import skiImg from '../assets/images/ski-slopes.webp'
import trackImg from '../assets/images/track-and-field.webp'
import { Link, redirect } from "react-router-dom";
import '../styles/Games.css'


function Games() {

    function createToken(level) {
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
        if (response === 'miss') {
            console.log(response)
        } else {
            console.log(response)
            let token = response.token;
            localStorage.setItem("SavedToken", 'Bearer ' + token);
            localStorage.setItem("SavedLevel", response.level);

        }
        
      })
      .catch((err) => {
        console.log(err)
      });
    }

    return (
      <>
        <Header></Header>
        <div className="levelContainer">
          <div className='levelCard'>
            <h2>Beach</h2>
              <Link to="/level" onClick={e => createToken('beach')}>
                  <img src={beachImg} alt="Link to start wheres waldo beach level" />
              </Link>  
          </div>
          <div className='levelCard'>
            <h2>Ski Slopes</h2>
              <Link to="/level" onClick={e => createToken('ski')}>
                  <img src={skiImg} alt="Link to start wheres waldo ski slopes level" />
              </Link>  
          </div>
          <div className='levelCard'>
            <h2>Track and Field</h2>
              <Link to="/level" onClick={e => createToken('track')}>
                  <img src={trackImg} alt="Link to start wheres waldo track and field level" />
              </Link>  
          </div>
        </div>
        
      </>
    )
}

export default Games