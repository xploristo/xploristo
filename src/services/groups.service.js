import { customFetch } from '../helpers/custom-fetch.js';

export default {
  createGroup(groupData) {
    return customFetch('/groups', 'POST', groupData);
  },
  getGroups() {
    // TODO Paginate
    return customFetch('/groups');
  },
  getGroup(groupId) {
    return customFetch(`/groups/${groupId}`);
  },
  updateGroup(groupId, groupData) {
    return customFetch(`/groups/${groupId}`, 'PUT', groupData);
  },
  deleteGroup(groupId) {
    return customFetch(`/groups/${groupId}`, 'DELETE');
  },
  createAssignment(groupId, assignmentData) {
    return customFetch(
      `/groups/${groupId}/assignments`,
      'POST',
      assignmentData
    );
  },
  updateAssignment(groupId, assignmentId, assignmentData) {
    return customFetch(
      `/groups/${groupId}/assignments/${assignmentId}`,
      'PUT',
      assignmentData
    );
  },
  updateAssignmentTest(groupId, assignmentId, testData) {
    return customFetch(
      `/groups/${groupId}/assignments/${assignmentId}/test`,
      'PUT',
      testData
    );
  },
  updateAssignmentTestDocument(groupId, assignmentId, document) {
    return customFetch(
      `/groups/${groupId}/assignments/${assignmentId}/test/document`,
      'PUT',
      document
    );
  },
  resetAssignmentTest(groupId, assignmentId) {
    return customFetch(
      `/groups/${groupId}/assignments/${assignmentId}/test/reset`,
      'PUT'
    );
  },
  deleteAssignment(groupId, assignmentId) {
    return customFetch(
      `/groups/${groupId}/assignments/${assignmentId}`,
      'DELETE'
    );
  },
  getAssignment(groupId, assignmentId) {
    return customFetch(`/groups/${groupId}/assignments/${assignmentId}`);
  },
  getAssignmentTestDocumentDownloadUrl(groupId, assignmentId) {
    return customFetch(
      `/groups/${groupId}/assignments/${assignmentId}/test/document-download-url`
    );
  },
  enrollStudents(groupId, studentsData) {
    return customFetch(`/groups/${groupId}/students`, 'POST', studentsData);
  },
  addTeacher(groupId, { teacherEmail }) {
    return customFetch(`/groups/${groupId}/teachers`, 'POST', {
      teacherEmail,
    });
  },
  deleteTeacher(groupId, teacherId) {
    return customFetch(`/groups/${groupId}/teachers/${teacherId}`, 'DELETE');
  },
};
