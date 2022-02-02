import React from 'react'
import UserApiClient from "../services/user.api.client";
import PropTypes from 'prop-types'
import {withTranslation} from 'react-i18next'

//Images//
import AnakinVarykino from "../images/Anakin_at_Varykino.png"
import starWars_logo from "../images/starwars_logo.png";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      badUser: false,
      badPassword: false
    }
  }

  static get propTypes() {
    return {
      onAuthenticationSuccess: PropTypes.func
    }
  }

  async loginChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  async submitLogin() {

    const data =  await UserApiClient.checkIfUserNameAndPasswordAreOk(this.state.username, this.state.password)
    console.log('loginData', data)


    switch(data.message) {
      case 'ok':
        this.setState({badUser: false})
        this.setState({badPassword: false})

          const {user} = await UserApiClient.getUser(data.userId, data.token)
          console.log('user', data.userId)
          this.props.onAuthenticationSuccess(data.userId, data.token, user)
        break
      case 'user not found':
        this.setState({badUser: true})
        this.setState({badPassword: false})
        break
      case 'bad password':
        this.setState({badPassword: true})
        break
      default:
        break
    }
  }

  async _submit(event) {
    event.preventDefault()
    console.log('click')
    await this.submitLogin()
  }

  render() {
    console.log(this.state.username)
    return (
        <div className={"login_container"}>
          <div className={"login_header"}>
            <div className={"login_header-welcome"}>
              <img src={starWars_logo} alt={"logo"}/>
              Sign in to Make your own Star Wars Vacation
            </div>
          </div>
          {/*<div className={"login_image_pane"}>*/}
            <img src={AnakinVarykino} alt={"Anakin in from of Varykino altar"}/>
          {/*</div>*/}
          <div className={"login_form_pane"}>
            <div className={"login_form_pane-title"}>
              Far Far Away Travel
            </div>
            <form className={"login_username"}>
              <label className={"login_label"}>
                <input
                    className={"login_username-input"}
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder="Enter Username"
                    onChange={(event) => this.loginChange(event)}
                />
              </label>
              <label className={"login_label"}>
                <input
                    className={"login_username-input"}
                    type="text"
                    name="password"
                    value={this.state.password}
                    placeholder="Enter password"
                    onChange={(event) => this.loginChange(event)}
                />
              </label>
              <div className={"login_button-submit"}
                   onClick={(event) => this._submit(event)}>Login
              </div>
            </form>
            <div className={"login_social_media"}>
              <div className={"login_social_media-button"}>

              </div>
              <div className={"login_social_media-button"}>

              </div>
              <div className={"login_social_media-button"}>

              </div>
            </div>
          </div>
        </div>
    )
  }

}

export default (withTranslation()(Login))

