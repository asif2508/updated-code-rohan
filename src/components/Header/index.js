import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    return (
      <>
        <div className="header-container">
          <Link to="/" className="link">
            <h1 className="logo">COVID19INDIA</h1>
          </Link>
          <ul className="navBar">
            <Link to="/" className="link">
              <li className="item">Home</li>
            </Link>
            <Link to="/about" className="link">
              <li className="item">About</li>
            </Link>
          </ul>
        </div>
      </>
    )
  }
}

export default Header
