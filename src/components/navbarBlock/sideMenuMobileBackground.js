import React from "react";
import PropTypes from 'prop-types'
import {withTranslation} from 'react-i18next'
import withRouter from '../../helper/withRouter'
import {SideMenuMobileNavBar} from "./sideMenuMobileNavBar";

export class SideMenuMobileBackground extends React.Component {
  constructor(props) {
    super(props);
  }

static get propTypes() {
    return {
      onHideHamburgerNavLinks: PropTypes.func
    }
}

  render() {

    return (
      <div
          className={'nav_hamburger_background'}
          onClick={this.props.onHideHamburgerNavLinks}
      >
      </div>
    )
  }
}

export default withRouter(withTranslation()(SideMenuMobileBackground))

