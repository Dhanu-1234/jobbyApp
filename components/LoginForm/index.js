import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {errorMsg: '', loginFailed: false, username: '', password: ''}

  onSuccessSubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    this.setState({username: '', password: '', errorMsg: ''})
  }

  onFailureSubmit = errorMsg => {
    this.setState({loginFailed: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      this.onSuccessSubmit(jwtToken)
    } else {
      const errorMsg = data.error_msg
      this.onFailureSubmit(errorMsg)
    }
  }

  onUsernameInputChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInputChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsg, loginFailed, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo-styles"
            />
          </div>
          <div className="user-input-container">
            <label htmlFor="username" className="label-styles">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="input-styles"
              value={username}
              onChange={this.onUsernameInputChange}
            />
            <label htmlFor="password" className="label-styles">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input-styles"
              value={password}
              onChange={this.onPasswordInputChange}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {loginFailed && <p className="error-msg">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
