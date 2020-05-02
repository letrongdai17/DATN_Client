import { api } from '../helpers/api';

export function fetchClassesData() {
  return api.get('/classes');
}

export function fetchClassStudentsRolledUp(classId) {
  return api.get(`/classes/${classId}/students-roll-up`);
}

export function fetchClassStudentsByLessonId(lessonId) {
  return api.get(`/class/${lessonId}/students`);
}

export function foo() {}
