import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class CourseItemDetails extends Component {
  state = {
    isLoading: true,
    isFailed: false,
    isSuccess: false,
    itemDetails: {},
  }

  componentDidMount() {
    this.fetchCourseDetails()
  }

  fetchCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.course_details.map(eachItem => ({
        description: eachItem.description,
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))

      this.setState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        itemDetails: updatedData,
      })
    } else {
      this.setState({
        isLoading: false,
        isSuccess: false,
        isFailed: true,
      })
    }
  }

  render() {
    const {isLoading, isFailed, isSuccess, itemDetails} = this.state
    const {description, imageUrl, name} = itemDetails

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
              <div>
                <img src={imageUrl} alt={name} />
              </div>
              <div>
                <h1> {name} </h1>
                <p> {description} </p>
              </div>
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
                <button type="button" onClick={this.fetchCourseDetails}>
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

export default CourseItemDetails
