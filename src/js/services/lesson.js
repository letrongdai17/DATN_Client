import { api } from '../helpers/api';

export function fetchLessons(classId, currentPage, perPage) {
  return api.get(`classes/${
    classId}/lessons?current_page=${currentPage}&per_page=${perPage}`);
}

export function createLesson(payloads) {
  return api.post('lesson/create', payloads);
}

export function fetchLessonStudentsRolledUp(lessonId) {
  return api.get(`lessons/${lessonId}/students-rolled-up`);
}

export function fetchClassByLessonId(lessonId) {
  return api.get(`lesson/${lessonId}/class`);
}
