import Header from '../components/Header'
import { useState } from 'react'
import { useEffect } from 'react';
import '../styles/Leaderboard.css'

function Leaderboard() {

  const [leaderboard, setLeaderboard] = useState();
  const [level, setLevel] = useState('beach');

  useEffect(() => {
    fetch(`https://whereiswaldo.adaptable.app/leaderboard/${level}`, {
      mode: 'cors'})
      .then((response) => response.json())
      .then((data) => { console.log(data), setLeaderboard(data)})
  }, [ level ]);

    return (
      <>
        <div className="background">
        <Header></Header>
        {(leaderboard === undefined) ? <h1>Loading</h1> : 
          <div className="tableContainer">
            <div className="leaderboardSelectContainer">
              <button className='leaderboardSelect' onClick={e => setLevel('beach')}>Beach</button>
              <button className='leaderboardSelect' onClick={e => setLevel('ski')}>Ski Slopes</button>
              <button className='leaderboardSelect' onClick={e => setLevel('track')}>Track and Field</button>
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
        }
        </div>
      </>
    )
}

export default Leaderboard