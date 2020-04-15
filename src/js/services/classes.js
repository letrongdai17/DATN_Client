import { api } from '../helpers/api';

export function fetchClassesData() {
  return api.get('http://127.0.0.1:8000/api/classes');
}

export function foo() {}
