import React from 'react'
import UserApiClient from "../../services/user.api.client";
import PropTypes from 'prop-types'
import HomePageImageSlider from "./homePageImageSlider"
import {withTranslation} from 'react-i18next'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      vacation: undefined
    }
  }

  static propTypes() {
    return {
      allVacations: PropTypes.object
    }

}

render() {
  console.log(typeof this.props.allVacations, 'allVacations Home')
    return (
        this.props.allVacations
        ? (<div className={'home_slider_container'}>
              <div className={'home_slider-inner'}>
          {(this.props.allVacations.vacation).map(vacation => (
          <HomePageImageSlider
              vacation={vacation}
              allVacations={this.props.allVacations}
          />
          ))}
              </div>
        </div>
    )
            : null)

  }
}

export default(withTranslation()(Home))