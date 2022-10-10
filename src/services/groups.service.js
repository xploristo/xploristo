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
  deleteAssignment(groupId, assignmentId) {
    return customFetch(
      `/groups/${groupId}/assignments/${assignmentId}`,
      'DELETE'
    );
  },
  getAssignment(groupId, assignmentId) {
    return customFetch(`/groups/${groupId}/assignments/${assignmentId}`);
  },
  getAssignments(groupId) {
    return customFetch(`/groups/${groupId}/assignments`);
  },
  enrollStudents(groupId, studentsData) {
    return customFetch(`/groups/${groupId}/students`, 'POST', studentsData);
  },
};
