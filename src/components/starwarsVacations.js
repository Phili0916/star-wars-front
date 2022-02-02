import React from "react";
import PropTypes from "prop-types";
import VacationsApiClient from "../services/vacations.api.client";
import {withTranslation} from "react-i18next";
import VacationCard from "./VacationCard";

class StarWarsVacations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allVacations: undefined,
      vacation: undefined
    }
  }

  static propTypes() {
    return {
      user: PropTypes.object
    }
  }

  async componentDidMount() {
    const allVacations = await VacationsApiClient.getAllVacations(JSON.parse(localStorage.getItem('jwt')))
    console.log('allVacations', allVacations)
    if(allVacations) {
      await this.setState({'allVacations': allVacations})
    }
    if(JSON.parse(localStorage.getItem('allVacations'))) {
      await this.setState({allVacations: allVacations})
    }
  }

  render() {
    return(
        this.state.allVacations === undefined
            ? (<div className={'vacation_container'}>
                Hello Vacations
            </div> )
        : (<div className={'vacation_container'}>
            <div className={'vacation_card'}>
              {(this.state.allVacations.vacation).map(vacation => (
                  <VacationCard
                    vacation={vacation}
                    allVacations={this.state.allVacations}
                    user={this.props.user}
                  />
              ))}
            </div>
        </div> )
    )
  }

}

export default (withTranslation()(StarWarsVacations))