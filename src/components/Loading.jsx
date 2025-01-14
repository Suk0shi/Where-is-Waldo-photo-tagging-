import loadingGif from '../assets/images/loading.gif'
import '../styles/Loading.css'

function Loading() {

  return (
    <div className='loadingPage'>
          <h1>Loading...</h1>
          <img className='loadingGif' src={loadingGif} alt="Loading..." />
          <h3>Hold tight! The backend is spinning up and should be ready in less than a minute.</h3>
    </div>
  )
}

export default Loading