import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    isFailed: false,
    isSuccess: false,
    coursesList: [],
  }

  componentDidMount() {
    this.fetchApiDetails()
  }

  fetchApiDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    if (response.ok) {
      const updated = data.courses.map(eachItem => ({
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
        name: eachItem.name,
      }))
      this.setState({
        isLoading: false,
        isFailed: false,
        isSuccess: true,
        coursesList: updated,
      })
    } else {
      this.setState({
        isLoading: false,
        isFailed: true,
        isSuccess: false,
      })
    }
  }

  render() {
    const {isLoading, isFailed, isSuccess, coursesList} = this.state
    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid="loader" className="spinner">
              <TailSpin
                height="80"
                width="80"
                color="#4fa94b"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {isSuccess && (
            <div>
              <h1>Courses</h1>
              <ul>
                {coursesList.map(eachItem => (
                  <Course key={eachItem.id} details={eachItem} />
                ))}
              </ul>
            </div>
          )}
          {isFailed && (
            <div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                  alt="failure view"
                />
              </div>
              <h1>Oops! something Went Wrong</h1>
              <p> we cannot seem to find the page you are looking for </p>
              <div>
                <button type="button" onClick={this.fetchApiDetails}>
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
