import { api } from '../helpers/api';

export function fetchLessons(classId, currentPage, perPage) {
  return api.get(`http://127.0.0.1:8000/api/classes/${
    classId}/lessons?current_page=${currentPage}&per_page=${perPage}`);
}

export function createLesson(payloads) {
  return api.post('http://127.0.0.1:8000/api/lesson/create', payloads);
}

export function fetchLessonStudentsRolledUp(lessonId) {
  return api.get(`http://127.0.0.1:8000/api/lessons/${lessonId}/students-rolled-up`);
}

export function fetchClassByLessonId(lessonId) {
  return api.get(`lesson/${lessonId}/class`);
}
