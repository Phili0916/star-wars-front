import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* Navbar Block Components */
import Navbar from "./components/navbarBlock/navbar";
import SideMenuMobileNavBar from "./components/navbarBlock/sideMenuMobileNavBar";
import SideMenuMobileBackground from "./components/navbarBlock/sideMenuMobileBackground";


/* Components */
import Login from "./components/login";
import Home from "./components/homePageBlock/home"
import StarWarsVacations from "./components/starwarsVacations";

/* CSS Styles */
import './styles/app.css'
import './styles/navbar.css'
import './styles/login.css'
import'./styles/hamburgerButton.css'
import './styles/sideMenuMobileNavBar.css'
import './styles/sideMenuMobileBackground.css'
import './styles/vacationCard.css'
import './styles/starwarsVacations.css'
import './styles/homePageImageSlider.css'
import './styles/home.css'

import vacationsApiClient from "./services/vacations.api.client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      allVacations: undefined,
      error: true,
      login: false,
      showHamburgerNavLinks: false
    }
  }

  async _login(userId, jwt, user) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("jwt", JSON.stringify(jwt))
    if (user) {
      await this.setState({user})
    }
  }

  async _logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("jwt")
    await this.setState({login: true, user: undefined})
  }

  async componentDidMount() {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user, 'user')
      if (user) {
        await this.setState({user: user})
      }
      if (JSON.parse(localStorage.getItem('user'))) {
        await this.setState({user: user})
      }
      const allVacations = await vacationsApiClient.getAllVacations(JSON.parse(localStorage.getItem('jwt')))
      console.log('allVacations', allVacations)
      if (allVacations) {
        await this.setState({allVacations: allVacations})
      }
      if (JSON.parse(localStorage.getItem('allVacations'))) {
        await this.setState({allVacations: allVacations})
      }
    } catch (error) {
      console.error(error)
      this.setState({error: true})
    }
  }

/* Navbar Hamburger Menu */

  showHamburgerNavLinks() {
    this.setState((prevState) => {
      prevState.showHamburgerNavLinks = true
      return prevState
    })
  }

  hideHamburgerNavLinks() {
    this.setState((prevState) => {
      prevState.showHamburgerNavLinks = false
      return prevState
    })
  }

  render() {
    console.log(this.state.allVacations, 'index allVacations')
    return (
        <div className={'app_container'}>
          {this.state.user !== undefined
              ? (
                  <BrowserRouter>
                    <Navbar
                        source={this.props?.navigate}
                        user={this.state.user}
                        onLogout={() => this._logout()}
                        onLogin={() => this._login()}
                        onShowHamburgerMenuLinks={() => this.showHamburgerNavLinks()}
                    />
                    {this.state.showHamburgerNavLinks
                    ? <>
                            <SideMenuMobileNavBar
                                source={this.props?.navigate}
                                user={this.state.user}
                                onHideHamburgerNavLinks={() => this.hideHamburgerNavLinks()}
                            />
                        <SideMenuMobileBackground
                          onHideHamburgerNavLinks={() => this.hideHamburgerNavLinks()}
                        />
                        </>
                    : null}

                    <Routes>
                      {this.state.allVacations !== undefined
                        ?
                          <Route exact path='/'
                                 element={<Home
                                     user={this.state.user}
                                     allVacations={this.state.allVacations}
                                 />}
                          />
                          : null }
                      <Route path='/vacations'
                             element={
                               <StarWarsVacations
                                   user={this.state.user}
                               />
                             }
                      />
                    </Routes>
                  </BrowserRouter>
              )
              :
              <Login
                  onAuthenticationSuccess={async (userId, jwt, user) => await this._login(userId, jwt, user)}
              />
          }
        </div>
    )

  }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);


