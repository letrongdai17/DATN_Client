import { api } from '../helpers/api';

export function fetchClassesData() {
  return api.get('http://127.0.0.1:8000/api/classes');
}

export function fetchClassStudentsRolledUp(classId) {
  return api.get(`http://127.0.0.1:8000/api/classes/${classId}/students-roll-up`);
}

export function foo() {}
