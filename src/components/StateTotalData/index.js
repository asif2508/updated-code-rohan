import {Component} from 'react'
import './index.css'

class StateTotalData extends Component {
  state = {
    confirmedData: {},
    activeData: {},
    recoveredData: {},
    deceasedData: {},
  }

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    const {eachStateTotalData} = this.props

    const totalConfirmed = eachStateTotalData.confirmed
    const totalRecovered = eachStateTotalData.recovered

    const totalDeceased = eachStateTotalData.deceased

    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    const confirmedData = {
      name: 'Confirmed',
      logo: '/img/check-mark 1.png',
      value: totalConfirmed,
    }

    const activeData = {
      name: 'Active',
      logo: '/img/protection 1.png',
      value: totalActive,
    }

    const recoveredData = {
      name: 'Recovered',
      logo: '/img/recovered 1.png',
      value: totalRecovered,
    }
    const deceasedData = {
      name: 'Deceased',
      logo: '/img/breathing 1.png',
      value: totalDeceased,
    }

    this.setState({
      confirmedData,
      activeData,
      recoveredData,
      deceasedData,
    })
  }

  onGetTotal = value => {
    const {onGetCategory} = this.props
    onGetCategory(value)
  }

  render() {
    const {confirmedData, activeData, recoveredData, deceasedData} = this.state

    const {active} = this.props
    const itsactiveonload = active ? 'confirmed-block' : ''

    return (
      <>
        <ul className="ul-list-eachstate">
          <li
            className={`category-item ${confirmedData.name} ${itsactiveonload} `}
            tabIndex="-1"
            key={confirmedData.name}
            value={confirmedData.name}
            onClick={() => this.onGetTotal(confirmedData.name)}
          >
            <div id="stateSpecificConfirmedCasesContainer">
              <p className="stats-title">{confirmedData.name}</p>
              <img
                src="https://res.cloudinary.com/du19z1lrd/image/upload/v1666595955/Group_ezjlx5.png"
                alt="state specific confirmed cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{confirmedData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${activeData.name}`}
            tabIndex="-1"
            key={activeData.name}
            value={activeData.name}
            onClick={() => this.onGetTotal(activeData.name)}
          >
            <div id="stateSpecificActiveCasesContainer">
              <p className="stats-title">{activeData.name}</p>
              <img
                src="https://res.cloudinary.com/du19z1lrd/image/upload/v1666595955/protection_2_ljlejt.png"
                alt="state specific active cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{activeData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${recoveredData.name}`}
            tabIndex="-1"
            key={recoveredData.name}
            value={recoveredData.name}
            onClick={() => this.onGetTotal(recoveredData.name)}
          >
            <div id="stateSpecificRecoveredCasesContainer">
              <p className="stats-title">{recoveredData.name}</p>
              <img
                src="https://res.cloudinary.com/du19z1lrd/image/upload/v1666595955/recovered_1_s3isii.png"
                alt="state specific recovered cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{recoveredData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${deceasedData.name}`}
            tabIndex="-1"
            key={deceasedData.name}
            value={deceasedData.name}
            onClick={() => this.onGetTotal(deceasedData.name)}
          >
            <div id="stateSpecificDeceasedCasesContainer">
              <p className="stats-title">{deceasedData.name}</p>
              <img
                src="https://res.cloudinary.com/du19z1lrd/image/upload/v1666595955/Outline_vstiok.png"
                alt="state specific deceased cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{deceasedData.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}
export default StateTotalData
