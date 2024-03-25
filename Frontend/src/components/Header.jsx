import { Link, redirect } from "react-router-dom";
import '../styles/Head.css'

function Header() {

  return (
    <>
      <header>
        <div className="title">
            <h1>Where's Waldo</h1>
        </div>
        <div className="pageLinks">
            <Link to="/">
                Games
            </Link> 
            <Link to="/leaderboard">
                Leaderboard
            </Link>
        </div>
      </header>
    </>
  )
}

export default Header