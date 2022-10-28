import {Component} from 'react'
import {FaTimes} from 'react-icons/fa'
import {GoThreeBars} from 'react-icons/go'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {isToggleActive: false}

  Close = () => {
    this.setState({isToggleActive: false})
  }

  handleClick = () => {
    this.setState({isToggleActive: true})
  }

  render() {
    const {isToggleActive} = this.state
    console.log(isToggleActive)
    return (
      <>
        <div className="header-container">
          <Link to="/" className="link">
            <h1 className="logo">
              <span>COVID19</span> <span className="india-color">INDIA</span>
            </h1>
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
        <div className="mobile-menu">
          <div className="mobile-header-container">
            <Link to="/" className="link">
              <h1 className="logo">COVID19INDIA</h1>
            </Link>
            <div className="nav-icon">
              {isToggleActive ? (
                <FaTimes className="icon-header" onClick={this.Close} />
              ) : (
                <GoThreeBars
                  className="icon-header"
                  onClick={this.handleClick}
                />
              )}
            </div>
          </div>

          <div className="menu">
            {isToggleActive && (
              <>
                <ul className="navBar">
                  <Link to="/" className="link">
                    <li className="item">Home</li>
                  </Link>

                  <li className="item">Vaccination</li>

                  <Link to="/about" className="link">
                    <li className="item">About</li>
                  </Link>
                </ul>
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Header
