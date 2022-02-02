class UserApiClient {

  static async checkIfUserNameAndPasswordAreOk (username, pwd) {

    const response = await fetch('http://localhost:9090/star-wars_vacation/user_auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password: pwd
      })
    })

    const userdata = await response.json()
    if(!userdata.userId) {
      console.log(userdata.message)
      return userdata
    } else {
      console.log('found data.userId')
      window.jwt = userdata.token
      userdata.message = 'ok'
      return userdata
    }
  }

  static async signup(body) {
    const userRegistrationResponse = await fetch('http://localhost:9090/star-wars_vacation/user_auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    console.log('userRegistrationResponse', userRegistrationResponse)
    if (!userRegistrationResponse.ok) {
      throw await userRegistrationResponse.json()
    }
    return await userRegistrationResponse.json()
  }

  static async getUser(userId, token) {
    const response = await fetch(`http://localhost:9090/star-wars_vacation/user_auth/getUser/`+ userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })

    if(!response.ok) {
      throw await response.json()
    }
    return await response.json()
  }

}

export default UserApiClient