import React from "react";
import PropTypes from "prop-types";
//import starwarsVacations from "./starwarsVacations";
import VacationsApiClient from "../services/vacations.api.client";
import UserApiClient from "../services/user.api.client";
import {withTranslation} from "react-i18next";

class VacationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vacation: props.vacation,
      confirmAddVacation: false,
      showReadMoreButton: true,
      id: undefined,
    }
  }

  static propTypes() {
    return {
      vacation: PropTypes.object,
      allVacations: PropTypes.object
    }
  }

  async componentDidMount(customParams) {
    // const array = window.location.pathname.split('/')
    // const id = array.pop()
    const params = customParams || {}
    // const user = await UserApiClient.getUser(this.props.user?._id, JSON.parse(localStorage.getItem('jwt')))
    // await this.setState({user: user})
    // console.log('user', user)

    const results = await VacationsApiClient.getVacationBy(JSON.parse(localStorage.getItem('jwt')), params)
    await this.setState({vacation: results.vacation})
    console.log('vacation title', this.state.vacation?.title)
      // console.log('vacation title', this.props.vacation[1].vacation[0]?.title)
  }
  render() {
    console.log(this.state.allVacations, 'allVacations')
    console.log(this.state.vacation.imageUrl[1], 'array', this.state.vacation.imageFile)
    return(
        <div className={'card_container'}>
          <div className={'card_body'}>
            {this.state.vacation.imageUrl.length > 0 &&
                <img src={"http://localhost:9090/images"+this.state.vacation.imageUrl[1]}
                     alt={'azerty'}/>
            }
            <div className={'card_title'}>
              {this.state.vacation?.title}
              <div className={'card_location'}>
                {this.state.vacation?.location?.planet}
              </div>
            </div>
          </div>
          <div className={'card_actions-read-button'}>
            Read More
          </div>
        </div>
    )
  }
}

export default (withTranslation()(VacationCard))