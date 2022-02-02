import React from "react";
import PropTypes from 'prop-types'
import {withTranslation} from 'react-i18next'
import withRouter from '../../helper/withRouter'
import {Navbar} from "./navbar";

export class SideMenuMobileNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

static get propTypes() {
    return {
      onHideHamburgerNavLinks: PropTypes.func
    }
}

  render() {
    console.log(this.props.user, 'sideNavMenu')
    return (
        <nav className={'nav_hamburger_container'}>
          <ul className={"nav_hamburger_links"}>
            <li className={"nav_hamburger_links-home"} onClick={() => this._navigate('/')}>Home</li>
            <li className={"nav_hamburger_links-vacations"} onClick={() => this._navigate('/vacations')}>Vacations</li>
            <li className={"nav_hamburger_links-contact"} onClick={() => this._navigate('/contact')}>Contact</li>
            <div className={"nav_hamburger_links-back-button"}
                 onClick={this.props.onHideHamburgerNavLinks}>Back
            </div>
          </ul>
        </nav>
    )
  }
}

export default withRouter(withTranslation()(SideMenuMobileNavBar))
