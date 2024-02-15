import {Component} from 'react'
import {useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmploymentType from '../EmplymentType'
import './index.css'

class Jobs extends Component {
  state = {profileDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const profileDetails = data.profile_details
    const updatedProfileDetails = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    console.log(updatedProfileDetails)
    if (response.ok === true) {
      this.setState({profileDetails: updatedProfileDetails})
    }
  }

  render() {
    const {employmentTypesList} = this.props
    console.log(this.props)
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    console.log(profileImageUrl)
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-content-container">
          <div className="jobs-filters-profile-container">
            <div className="jobs-profile-container">
              <img
                src={profileImageUrl}
                alt={name}
                className="jobs-profile-img-styles"
              />
              <h3 className="jobs-profile-heading">{name}</h3>
              <p className="jobs-profile-bio">{shortBio}</p>
            </div>
            <hr className="jobs-line-styles" />
            <div className="jobs-employment-container">
              <h4 className="jobs-employment-heading">Type of Employment</h4>
              <ul>
                {employmentTypesList.map(eachObj => (
                  <EmploymentType
                    key={eachObj.employmentTypeId}
                    employmentType={eachObj}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-search-job-list-container">
            <p>.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
