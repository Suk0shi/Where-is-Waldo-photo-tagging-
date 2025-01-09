import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Header from './components/Header'
import beachImg from './assets/images/beach.webp'
import skiImg from './assets/images/ski-slopes.webp'
import trackImg from './assets/images/track-and-field.webp'
import './App.css'

function App() {
  const [showBox, setShowBox] = useState(false)
  const [hitBox, setHitBox] = useState([])
  const [left, setLeft] = useState("")
  const [top, setTop] = useState("")
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [finTime, setFinTime] = useState("")
  const [leaderboardForm, setLeaderboardForm] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [level, setLevel] = useState('')

  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
      switch (`${localStorage.getItem('SavedLevel')}`) {
    case 'beach':
      setLevel(beachImg);
      break;
    case 'ski':
      setLevel(skiImg);
      break;
    case 'track':
      setLevel(trackImg);
      break;
    }
    }, 500);
    
  }, []);
    
  
  

  //make onclick targeting box with dropdown menue
  const targetingBox = (e) => {
    e.preventDefault();
    if (finTime === '') {
      setX((e.nativeEvent.x-e.currentTarget.getBoundingClientRect().left)/e.target.width);
      setY((e.nativeEvent.y-e.currentTarget.getBoundingClientRect().top)/e.target.height);
      console.log((e.nativeEvent.x-e.currentTarget.getBoundingClientRect().left)/e.target.width);
      console.log((e.nativeEvent.y-e.currentTarget.getBoundingClientRect().top)/e.target.height);
      if (showBox===false) {
        setShowBox(true)
        setTop(e.pageY)
        setLeft(e.pageX)
      } else {
        setShowBox(false);
      }
    }
  }

  function submitAnswer(e, target) {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_API_URL}/checkcoordinate`, {
        method: 'Post', 
        headers: {
          'Authorization': `${localStorage.getItem('SavedToken')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'level':`${localStorage.getItem('SavedLevel')}`, 'target':`${target}`, 'x':`${x}`, 'y':`${y}`}),
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
          setShowBox(false)
        } else if (response.leaderboard === true) {
          setHitBox(prevHitBox => [...prevHitBox, left + ' ' + top])
          setShowBox(false)
          setFinTime(`${response.message}`)
          setLeaderboardForm(true)
          localStorage.setItem("SavedToken", 'Bearer ' + response.token);
        } else if (response.complete === true) {
          console.log('win')
          setHitBox(prevHitBox => [...prevHitBox, left + ' ' + top])
          setShowBox(false)
          setFinTime(`${response.message}`)
        } else {
          console.log(response)
          localStorage.setItem("SavedToken", 'Bearer ' + response);
          setHitBox(prevHitBox => [...prevHitBox, left + ' ' + top])
          setShowBox(false)
        }
        
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    fetch(`${import.meta.env.VITE_API_URL}/addLeaderboard`, {
        method: 'Post', 
        headers: {
          'Authorization': `${localStorage.getItem('SavedToken')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((response) => {
        console.log(response)
        navigate('/leaderboard')
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    const newValue = value.toUpperCase().replace(/[^A-Z]/g, '');
    
    setInputValue(newValue);
  };

  return (
    <>
      <Header></Header>
      {level === '' ? undefined : 
      <div className='imgContainer'>
        <a href='' onClick={targetingBox}>
          <img src={level} alt="Where's Waldo beach image" ismap="true"/>
        </a>
      </div> }
      {showBox ?
      <div className='targetContainer' style={{top: `${top-25}px`, left: `${left-41}px`}}>
        <div className='targetingBox'></div>
        <div className='dropDown'>
          <ul>
            <li><a href='' onClick={e => submitAnswer(e, "waldo")}>Waldo</a></li>
            <li><a href='' onClick={e => submitAnswer(e, "wenda")}>Wenda</a></li>
            <li><a href='' onClick={e => submitAnswer(e, "wizard")}>Wizard</a></li>
            <li><a href='' onClick={e => submitAnswer(e, "odlaw")}>Odlaw</a></li>
          </ul>
        </div>
      </div> : undefined}
      {hitBox.length ? hitBox.map((e) => {
        const [hitX, hitY] = e.split(' ');
        return <div className='hitBox' style={{top: `${hitY-25}px`, left: `${hitX-21}px`}}></div>
      })
      : undefined}
      {(finTime === "" || leaderboardForm === true) ? undefined : 
        <div className='winDisplay'><h2>{finTime}</h2><Link to="/">Play Again</Link></div>}
      {leaderboardForm === false ? undefined : 
      <form id='leaderboardForm' action="" method='POST' onSubmit={handleSubmit}>
        <h2>{finTime}</h2>
        <label htmlFor="username"> Username (3 Letters)</label>
        <input type="text" name='username' placeholder='ABC' minLength={3} maxLength={3} 
        onChange={handleInputChange} value={inputValue} required/>
        <button>Submit time</button>
        <Link to="/">
          Cancel
        </Link> 
      </form>
      }
    </>
  )
}

export default App