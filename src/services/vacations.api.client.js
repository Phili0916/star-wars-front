class VacationsApiClient {

  static async createVacation(jwt, body) {
    console.log('jwt', jwt)
    console.log('body', body)
  }

  static async getAllVacations(jwt) {
    console.log('jwt', jwt)
    const response = await fetch ('http://localhost:9090/star-wars_vacation/' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      }
     })
    console.log(response, 'response')
    if(!response.ok) {
      throw await response.json()
    }
    return response.json()
  }

  static async getVacationBy(jwt, params) {
    console.log('params', params)
    let url = new URL('http://localhost:9090/star-wars_vacation/:criterion/')
    console.log('url', url)

    for(const[key, value] of Object.entries(params)) {
      url.searchParams.append(key, value)
    }

    const getVacationByResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      }})
    if(!getVacationByResponse.ok) {
      throw await getVacationByResponse.json()
    }
    return await getVacationByResponse.json()
  }




}

export default VacationsApiClient