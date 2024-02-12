import { FIREBASE_API_KEY } from "../common/secret-key";

class AuthProvider {
    async login(req?: any): Promise<any> {
      return fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify(req)
        },
      )
        .then(response => response.json())
        .then(res => {
          return res;
        })
        .catch(error => console.log('error:: ', error));
    }

    async register(req?: any): Promise<any> {
      return fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify(req)
        },
      )
        .then(response => response.json())
        .then(res => {
          return res;
        })
        .catch(error => console.log('error:: ', error));
    }}

export default new AuthProvider();