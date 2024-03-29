import Header from '../Header'
import './index.css'

const Home = props => {
  const findJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-description-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for job, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button type="button" className="home-find-jobs-btn" onClick={findJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
