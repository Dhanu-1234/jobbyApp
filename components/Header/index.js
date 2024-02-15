import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <div className="nav-website-logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-website-logo-styles"
        />
      </div>
      <ul className="nav-links-container">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="mob-nav-link">
            <AiFillHome />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jobs" className="mob-nav-link">
            <BsBriefcaseFill />
          </Link>
        </li>
        <li className="nav-item">
          <button
            type="button"
            aria-label="Logout Button"
            className="mob-nav-link mob-logout-btn"
            onClick={onLogout}
          >
            <FiLogOut />
          </button>
        </li>
      </ul>
      <div className="nav-logout-btn-container">
        <button type="button" className="nav-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
