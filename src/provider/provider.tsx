import { NINJAS_API_KEY } from "../common/secret-key";

class Provider {
  async getMainList(req?: any): Promise<any> {
    return fetch(
      'https://api.api-ninjas.com/v1/covid19?country=malaysia',
      {
        method: 'GET',
        headers: {
          'X-Api-Key': NINJAS_API_KEY,
        },
      },
    )
      .then(response => response.json())
      .then(res => res)
      .catch(error => console.log('error:: ', error));
  }

  async getCountryCovidData(req?: any): Promise<any> {
    return fetch(`https://api.api-ninjas.com/v1/covid19?`, {
      method: 'GET',
      headers: {
        'X-Api-Key': NINJAS_API_KEY,
      },
    })
      .then(response => response.json())
      .then(res => res)
      .catch(error => console.log('error:: ', error));
  }

  async getCountryCovidCases(country: string): Promise<any> {
    return fetch(`https://api.api-ninjas.com/v1/covid19?type=cases&country=${country}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': NINJAS_API_KEY,
      },
    })
      .then(response => response.json())
      .then(res => res)
      .catch(error => console.log('error:: ', error));

  }

  async getCountryCovidDeaths(country: string): Promise<any> {
    return fetch(`https://api.api-ninjas.com/v1/covid19?type=deaths&country=${country}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': NINJAS_API_KEY,
      },
    })
      .then(response => response.json())
      .then(res => res)
      .catch(error => console.log('error:: ', error));

  }

  async getCovidByDate(date:string): Promise<any> {
    return fetch(`https://api.api-ninjas.com/v1/covid19?date=${date}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': NINJAS_API_KEY,
      },
    })
      .then(response => response.json())
      .then(res => res)
      .catch(error => console.log('error:: ', error));

  }

  async getCovidData(req: {type?:string,country?:string, date?:string}): Promise<any> {
    return fetch(`https://api.api-ninjas.com/v1/covid19`, {
      method: 'GET',
      headers: {
        body: JSON.stringify(req),
        'X-Api-Key': NINJAS_API_KEY,
      },
    })
      .then(response => response.json())
      .then(res => res)
      .catch(error => console.log('error:: ', error));

  }
}

export default new Provider();
