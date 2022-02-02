import React from "react";
import PropTypes from 'prop-types'
import {withTranslation} from 'react-i18next'
import withRouter from '../../helper/withRouter'
import {Navbar} from "./navbar";

export class HamburgerButton extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      user: PropTypes.object
    }
  }

  _navigate(destination) {
    this.props.navigate(destination)
  }

  render() {
    return (
         <div className={'nav_hamburger_button'} onClick={this.props.click}>
               <div className={'nav_hamburger-button-line'}></div>
               <div className={'nav_hamburger-button-line'}></div>
               <div className={'nav_hamburger-button-line'}></div>
             </div>

    )
  }
}

export default withRouter(withTranslation()(HamburgerButton))