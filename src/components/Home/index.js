import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
// eslint-disable-next-line import/no-named-as-default
import Header from '../Header'
import Footer from '../Footer'
import TotalStats from '../TotalStats'
import './index.css'
import SearchResult from '../SearchResult'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    search: '',
    filteredSearchList: [],
    statesinfo: [],
  }

  componentDidMount() {
    this.getAllData()
  }

  getAllData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      let nationalWideConfirmedCases = 0
      let nationalWideRecoveredCases = 0
      let nationalWideDeceasedCases = 0
      let nationalWideActiveCases = 0

      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          nationalWideConfirmedCases += total.confirmed ? total.confirmed : 0
          nationalWideRecoveredCases += total.recovered ? total.recovered : 0
          nationalWideDeceasedCases += total.deceased ? total.deceased : 0
        }
      })
      nationalWideActiveCases +=
        nationalWideConfirmedCases -
        (nationalWideRecoveredCases + nationalWideDeceasedCases)

      const states = statesList.map(each => ({
        stateName: each.state_name,
        stateCode: each.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.deceased),
        other: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.other),
        population: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].meta.population),
      }))

      this.setState({
        totalActiveCases: nationalWideActiveCases,
        totalRecoveredCases: nationalWideRecoveredCases,
        totalDeceasedCases: nationalWideDeceasedCases,
        totalConfirmedCases: nationalWideConfirmedCases,
        isLoading: false,
        statesinfo: states,
      })
    }
  }

  renderAllNationalData = () => {
    const {
      totalConfirmedCases,
      totalActiveCases,
      totalRecoveredCases,
      totalDeceasedCases,
    } = this.state

    return (
      <>
        <div id="countryWideConfirmedCases" className="stats-block-column">
          <p className="stats-title red">Confirmed</p>
          <img
            src="https://res.cloudinary.com/du19z1lrd/image/upload/v1666595955/Group_ezjlx5.png "
            className="stats-icon"
            alt="country wide confirmed cases pic"
          />

          <p className="stats-number red">{totalConfirmedCases}</p>
        </div>
        <div id="countryWideActiveCases" className="stats-block-column">
          <p className="stats-title blue">Active</p>
          <img
            src="https://res.cloudinary.com/du19z1lrd/image/upload/v1666595955/protection_2_ljlejt.png"
            className="stats-icon"
            alt="country wide active cases pic"
          />
          <p className="stats-number blue">{totalActiveCases}</p>
        </div>
        <div id="countryWideRecoveredCases" className="stats-block-column">
          <p className="stats-title green">Recovered</p>
          <img
            src="https://res.cloudinary.com/du19z1lrd/image/upload/v1666595955/recovered_1_s3isii.png"
            className="stats-icon"
            alt="country wide recovered cases pic"
          />
          <p className="stats-number green">{totalRecoveredCases}</p>
        </div>
        <div id="countryWideDeceasedCases" className="stats-block-column ">
          <p className="stats-title gray">Deceased</p>
          <img
            src="https://res.cloudinary.com/du19z1lrd/image/upload/v1666595955/Outline_vstiok.png "
            className="stats-icon"
            alt="country wide deceased cases pic"
          />
          <p className="stats-number gray">{totalDeceasedCases}</p>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" id="homeRouteLoader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  whenAscendingSortButtonClicked = () => {
    const {statesinfo} = this.state
    const sortedList = statesinfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({statesinfo: sortedList})
  }

  whenDescendingSortButtonClicked = () => {
    const {statesinfo} = this.state
    const sortedList = statesinfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({statesinfo: sortedList})
  }

  renderAllStatesList = () => {
    const {statesinfo} = this.state

    return (
      <div className="all-states-table" id="stateWiseCovidDataTable">
        <div className="responsivetable">
          <div className="table-header">
            <div className="state-name-heading">
              <p className="table-header-title ">States/UT</p>
              <button
                className="order"
                type="button"
                id="ascendingSort"
                onClick={this.whenAscendingSortButtonClicked}
              >
                <FcGenericSortingAsc className="order-icon" />
              </button>
              <button
                className="order"
                type="button"
                id="descendingSort"
                onClick={this.whenDescendingSortButtonClicked}
              >
                <FcGenericSortingDesc className="order-icon" />
              </button>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Confirmed</p>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Active</p>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Recovered</p>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Deceased</p>
            </div>
            <div className="other-tables-bar">
              <p className="table-header-title">Population</p>
            </div>
          </div>
          <div className="state-wise-data-container">
            <ul className="other-tables">
              {statesinfo.map(each => (
                <TotalStats key={each.stateCode} data={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  searchStarted = event => {
    const searchItem = event.target.value
    const searchResult = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )

    return this.setState({
      search: event.target.value,
      filteredSearchList: searchResult,
    })
  }

  showSearchList = () => {
    const {filteredSearchList} = this.state

    return (
      <ul className="search-result-container" id="searchResultsUnorderedList">
        {filteredSearchList.map(each => (
          <SearchResult
            key={each.state_code}
            statename={each.state_name}
            statecode={each.state_code}
            id={each.state_code}
          />
        ))}
      </ul>
    )
  }

  removeFilteredList = () => {
    this.setState({filteredSearchList: []})
  }

  render() {
    const {isLoading, filteredSearchList, search} = this.state
    const showSearchList =
      filteredSearchList.length === 0 ? '' : this.showSearchList()

    return (
      <div className="main-container">
        <Header />
        <div className="container">
          <div className="search-container">
            <BsSearch id="searchIcon" className="search-icon" />
            <input
              type="search"
              placeholder="Enter the State"
              className="search-bar"
              onChange={this.searchStarted}
              // eslint-disable-next-line react/no-unknown-property
              onAbort={this.removeFilteredList}
            />
          </div>
          {search.length > 0 ? showSearchList : ''}
          {isLoading ? (
            this.renderLoadingView()
          ) : (
            <>
              <div className="country-stats">
                {this.renderAllNationalData()}
              </div>
              <div className="state-table">{this.renderAllStatesList()}</div>
            </>
          )}

          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
