import { api } from '../helpers/api';

export function fetchLessons(classId) {
  return api.get(`http://127.0.0.1:8000/api/classes/${classId}/lessons`);
}

export function createLesson(payloads) {
  return api.post('http://127.0.0.1:8000/api/lesson/create', payloads);
}
