import React from "react";
import PropTypes from 'prop-types'
import {withTranslation} from 'react-i18next'
import withRouter from '../../helper/withRouter'
import Login from "../login";
import {SideMenuMobileNavBar} from "./sideMenuMobileNavBar";
import hamburgerButton, {HamburgerButton} from "./hamburgerButton";


export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginButton: true,
      showHamburgerNavButton: true
    }
  }

  static get propTypes() {
    return {
      errors: PropTypes.string,
      t: PropTypes.func, //with Translations
      onLogout: PropTypes.func,
      onLogin: PropTypes.func,
      history: PropTypes.object,
      user: PropTypes.object,
      onShowHamburgerMenuLinks: PropTypes.func
    }
  }

  async _login() {
    await this.props.onLogin()

  }
  async _logout() {
    await this.props.onLogout()
  }

  _navigate(destination) {
    this.props.navigate(destination)
  }

  render() {
    return (
        <nav className={"nav_container"}>
          {this.state.showHamburgerNavButton
              ?
              ( <HamburgerButton
                  click={this.props.onShowHamburgerMenuLinks}
                  />
              )
              : null }
          {/*{this.state.showNHamburgerNavLinks === true ?*/}
              <div className={"nav_logo"}>

              <img src="https://www.pngitem.com/pimgs/m/28-283197_starwars-clipart-rebel-alliance-rebel-alliance-hd-png.png"
                   alt="star wars logo" />
              </div>
              <ul className={"nav_links"}>
                     <li className={"nav_links-home"} onClick={() => this._navigate('/')}>Home</li>
                      <li className={"nav_links-vacations"} onClick={() => this._navigate('/vacations')}>Vacations</li>
                      <li className={"nav_links-contact"} onClick={() => this._navigate('/contact')}>Contact</li>

              </ul>
          {this.props.user !== undefined
          ? (<div className={'nav_buttons'} onClick={(event)=> this._logout(event)}>
                <button
                    className={'nav_buttons-logout'}
                    type={"submit"}
                >
                  Logout
                </button>
            </div>)
            :
              (<div className={'nav_buttons'} onClick={(event)=> this._login(this._login)}>
                <button
                    className={'nav_buttons-login'}
                    type={"submit"}
                >
                  Login
                </button>
              </div>)}
        </nav>
    )
  }
}

export default withRouter(withTranslation()(Navbar))
