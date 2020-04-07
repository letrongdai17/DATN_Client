import { api } from '../helpers/api';

export function signIn(user) {
  return api.post('http://127.0.0.1:8000/api/login', user);
}

export function foo() {}
