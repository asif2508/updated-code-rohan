import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchResult = props => {
  const {statename, statecode, id} = props

  return (
    <li className="search-style">
      <Link to={`/state/${id}`} className="link-search">
        <div className="search-result">
          <p className="search-result-heading font-face-gm">{statename}</p>

          <button type="button" className="search-button">
            {statecode}
            <BiChevronRightSquare
              id="searchResultChevronRightIcon"
              alt="line icon"
              className="icon-right"
            />
          </button>
        </div>
      </Link>
    </li>
  )
}

export default SearchResult
