import Loading from '../components/Loading'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/Leaderboard.css'

function Leaderboard() {

  const [leaderboard, setLeaderboard] = useState();
  const [level, setLevel] = useState('beach');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/leaderboard/${level}`, {
      mode: 'cors'})
      .then((response) => response.json())
      .then((data) => { console.log(data), setLeaderboard(data)})
  }, [ level ]);

    return (
      <div className="backgroundBorderContainer">
        <div className='backgroundBorder'>
          {(leaderboard === undefined) ? 
            <div className='pageContainer'>
              <Loading/>
            </div>
          : 
          <>
            <div className="tableContainer">
              <div className="leaderboardSelectContainer">
                <button className='leaderboardSelect' onClick={() => setLevel('beach')}>Beach</button>
                <button className='leaderboardSelect' onClick={() => setLevel('ski')}>Ski Slopes</button>
                <button className='leaderboardSelect' onClick={() => setLevel('track')}>Track and Field</button>
              </div>
              <h2 className='highScores'>High Scores</h2>
              <table>
                <tr className='tableHead'>
                  <th>Rank</th>
                  <th>Time</th>
                  <th>Name</th>
                </tr>
              {leaderboard.leaderboard.map((data, index) => (
                  <tr className={'tr'+(index+1)} key={index + 'div'}>
                    <td key={index}>{index+1}</td>
                    <td key={index+data.time}>{data.time}</td>
                    <td key={index+data.username}>{data.username}</td>
                  </tr>
                ))}
              </table>
            </div>
          </>
          }
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

export default Leaderboard